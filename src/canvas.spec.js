import { prepareCanvasContext, getCharacterWidth } from './canvas';

function MOCK_AND_CALL_THROUGH_STORING_RETURN_VALUE(method, returnValueArray) {
  return jest.fn(function() {
    const returnValue = method.apply(this, Array.from(arguments));
    returnValueArray.push(returnValue);
    return returnValue;
  });
}

const PLATFORM_FIXTURES = {
  'mac_os_10_12': {
    measureText: {
      '\u{1F478}': {
        height: 0,
        width: 0
      },
      '\u{1F478}\u{1F3FE}': {
        height: 0,
        width: 0
      },
      '\u{1F575}': {
        height: 0,
        width: 0
      },
      '\u{1F575}\u{FE0F}\u{200D}\u{2640}\u{FE0F}': {
        height: 0,
        width: 0
      }
    }
  }
};

describe('canvas utilities', () => {
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
    describe('with an existing canvas context', () => {

    });

    describe('with no canvas context', () => {

    });
  });

  describe('getCharacterWidth', () => {
    const Context2d = require('canvas').Context2d;
    const _realMeasureText = Context2d.prototype.measureText;

    beforeEach(() => {
      Context2d.prototype.measureText = jest.fn(() => ({width: 1234, height: -1234}));
    });

    afterEach(() => {
      Context2d.prototype.measureText = _realMeasureText;
    });

    describe('with an existing canvas context', () => {
      it('calls through to measureText and returns the width', () => {
        const context = document.createElement('canvas').getContext('2d');
        expect(getCharacterWidth('foo', context)).toBe(1234);
        expect(document.createElement).toHaveBeenCalledTimes(1);
        expect(document.createElement).toHaveBeenCalledWith('canvas');
        expect(Context2d.prototype.measureText).toHaveBeenCalledTimes(1);
        expect(Context2d.prototype.measureText).toHaveBeenCalledWith('foo');
      });
    });

    describe('with no canvas context', () => {
      it('calls through to measureText and returns the width without creating a context', () => {
        expect(getCharacterWidth('foo')).toBe(1234);
        expect(document.createElement).toHaveBeenCalledTimes(1);
        expect(document.createElement).toHaveBeenCalledWith('canvas');
        expect(Context2d.prototype.measureText).toHaveBeenCalledTimes(1);
        expect(Context2d.prototype.measureText).toHaveBeenCalledWith('foo');
      });
    });
  });
});
