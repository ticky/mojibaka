/* global describe, it, beforeEach, afterEach, expect, __dirname, jest */
import { Image, Context2d } from 'canvas';
import path from 'path';
import fs from 'fs';
import TEST_CHARS from './__fixtures__/test-characters';

import { prepareCanvasContext, canDrawCharacter, getCharacterWidth } from './canvas';

// import * as __CANVAS from 'canvas';
// import * as __LOCAL_CANVAS from './canvas';

// console.log('canvas.spec', __CANVAS, __LOCAL_CANVAS, __CANVAS === __LOCAL_CANVAS);

// neither 'canvas' nor './canvas' should be mocked,
// but for some reason 'canvas' remains mocked in this
// file, despite mocking not being requested
// bug filed at <https://github.com/facebook/jest/issues/1927>
jest.unmock('canvas');

const FIXTURE_PATH = path.resolve(__dirname, '__fixtures__');

const PLATFORMS = fs.readdirSync(FIXTURE_PATH)
  .filter((filename) => fs.statSync(path.resolve(FIXTURE_PATH, filename)).isDirectory());

function MOCK_AND_CALL_THROUGH_STORING_RETURN_VALUE(method, returnValueArray) {
  return jest.fn(function() {
    const returnValue = method.apply(this, Array.from(arguments));
    returnValueArray.push(returnValue);
    return returnValue;
  });
}

describe('canvas', () => {
  const _realCreateElement = document.createElement;
  const _realGetContext = HTMLCanvasElement.prototype.getContext;
  let _createdElements = [];
  let _createdContexts = [];

  beforeEach(() => {
    document.createElement = MOCK_AND_CALL_THROUGH_STORING_RETURN_VALUE(_realCreateElement, _createdElements);
    window.HTMLCanvasElement.prototype.getContext = MOCK_AND_CALL_THROUGH_STORING_RETURN_VALUE(_realGetContext, _createdContexts);
  });

  afterEach(() => {
    document.createElement = _realCreateElement;
    window.HTMLCanvasElement.prototype.getContext = _realGetContext;
    _createdElements = [];
    _createdContexts = [];
  });

  describe('prepareCanvasContext', () => {
    describe('with an existing canvas context', () => {
      it(`doesn't reconfigure the font and fillStyle`, () => {
        const context = document.createElement('canvas').getContext('2d');

        context.fillStyle = '#ff00ff';
        context.font = '12px Verdana';

        prepareCanvasContext(context);

        expect(context.fillStyle).toMatchSnapshot();
        expect(context.font).toMatchSnapshot();
        expect(document.createElement).toHaveBeenCalledTimes(1);
        expect(document.createElement).toHaveBeenCalledWith('canvas');
      });

      it('clears the canvas', () => {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');

        context.fillStyle = '#ff00ff';
        context.fillRect(0, 0, 64, 64);

        expect(canvas.toDataURL('image/png')).toMatchSnapshot();

        prepareCanvasContext(context);

        expect(canvas.toDataURL('image/png')).toMatchSnapshot();
        expect(document.createElement).toHaveBeenCalledTimes(1);
        expect(document.createElement).toHaveBeenCalledWith('canvas');
      });
    });

    describe('with no canvas context', () => {
      it(`creates a canvas with font and fillStyle`, () => {
        prepareCanvasContext();

        expect(document.createElement).toHaveBeenCalledTimes(1);
        expect(document.createElement).toHaveBeenCalledWith('canvas');
        expect(_createdElements.length).toBe(1);
        expect(_createdElements[0].toDataURL('image/png')).toMatchSnapshot();

        expect(window.HTMLCanvasElement.prototype.getContext).toHaveBeenCalledTimes(1);
        expect(window.HTMLCanvasElement.prototype.getContext).toHaveBeenCalledWith('2d');
        expect(_createdContexts.length).toBe(1);
        expect(_createdContexts[0].fillStyle).toMatchSnapshot();
        expect(_createdContexts[0].font).toMatchSnapshot();
      });
    });
  });

  describe('canDrawCharacter', () => {
    const _realFillText = Context2d.prototype.fillText;

    describe('in general', () => {
      beforeEach(() => {
        Context2d.prototype.fillText = jest.fn();
      });

      afterEach(() => {
        Context2d.prototype.fillText = _realFillText;
      });

      describe('with an existing canvas context', () => {
        it('calls through to fillText and confirms drawing', () => {
          const context = document.createElement('canvas').getContext('2d');
          expect(canDrawCharacter('■', context)).toMatchSnapshot();
          expect(document.createElement).toHaveBeenCalledTimes(1);
          expect(document.createElement).toHaveBeenCalledWith('canvas');
          expect(Context2d.prototype.fillText).toHaveBeenCalledTimes(1);
          expect(Context2d.prototype.fillText).toHaveBeenCalledWith('■', 0, 32);
        });
      });

      describe('with no canvas context', () => {
        it('calls through to fillText and confirms drawing without creating a context', () => {
          expect(canDrawCharacter('■')).toMatchSnapshot();
          expect(document.createElement).toHaveBeenCalledTimes(1);
          expect(document.createElement).toHaveBeenCalledWith('canvas');
          expect(Context2d.prototype.fillText).toHaveBeenCalledTimes(1);
          expect(Context2d.prototype.fillText).toHaveBeenCalledWith('■', 0, 32);
        });
      });
    });

    PLATFORMS.forEach((platform) => {
      describe(platform, () => {
        beforeEach(() => {
          Context2d.prototype.fillText = jest.fn(function(text) {
            const fileName = text
              .match(/([\uD800-\uDBFF][\uDC00-\uDFFFF]|[\S\s])/g)
              .map((char) => char.codePointAt(0).toString(16))
              .join('-');

            const image = new Image();
            image.src = fs.readFileSync(path.resolve(
              __dirname,
              `__fixtures__/${platform}/${fileName}.png`
            ));

            this.drawImage(image, 0, 0);
          });
        });

        afterEach(() => {
          Context2d.prototype.fillText = _realFillText;
        });

        TEST_CHARS.forEach((char) => {
          it(`shows expected behaviour for ${char}`, () => {
            expect(canDrawCharacter(char)).toMatchSnapshot();
            expect(document.createElement).toHaveBeenCalledTimes(1);
            expect(document.createElement).toHaveBeenCalledWith('canvas');
            expect(Context2d.prototype.fillText).toHaveBeenCalledTimes(1);
            expect(Context2d.prototype.fillText).toHaveBeenCalledWith(char, 0, 32);
          });
        });
      });
    });
  });

  describe('getCharacterWidth', () => {
    const _realMeasureText = Context2d.prototype.measureText;

    beforeEach(() => {
      Context2d.prototype.measureText = jest.fn(() => ({ width: 1234, height: -1234 }));
    });

    afterEach(() => {
      Context2d.prototype.measureText = _realMeasureText;
    });

    describe('with an existing canvas context', () => {
      it('calls through to measureText and returns the width', () => {
        const context = document.createElement('canvas').getContext('2d');
        expect(getCharacterWidth('foo', context)).toMatchSnapshot();
        expect(document.createElement).toHaveBeenCalledTimes(1);
        expect(document.createElement).toHaveBeenCalledWith('canvas');
        expect(Context2d.prototype.measureText).toHaveBeenCalledTimes(1);
        expect(Context2d.prototype.measureText).toHaveBeenCalledWith('foo');
      });
    });

    describe('with no canvas context', () => {
      it('calls through to measureText and returns the width without creating a context', () => {
        expect(getCharacterWidth('foo')).toMatchSnapshot();
        expect(document.createElement).toHaveBeenCalledTimes(1);
        expect(document.createElement).toHaveBeenCalledWith('canvas');
        expect(Context2d.prototype.measureText).toHaveBeenCalledTimes(1);
        expect(Context2d.prototype.measureText).toHaveBeenCalledWith('foo');
      });
    });
  });
});
