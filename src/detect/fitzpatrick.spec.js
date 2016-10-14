/* global jest, describe, beforeEach, expect, it */
import detectFitzpatrick from './fitzpatrick';
import { prepareCanvasContext, getCharacterWidth } from '../canvas';

jest.mock('../canvas');

describe('detectFitzpatrick', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('with an existing canvas context', () => {
    it('calls through to `prepareCanvasContext`', () => {
      const context = {};
      detectFitzpatrick(context);
      expect(prepareCanvasContext).toHaveBeenCalledTimes(1);
      expect(prepareCanvasContext).toHaveBeenCalledWith(context);
    });

    it('calls through to `getCharacterWidth`', () => {
      const context = {};
      detectFitzpatrick(context);
      expect(getCharacterWidth).toHaveBeenCalledTimes(2);
      expect(getCharacterWidth.mock.calls).toMatchSnapshot();
    });
  });

  describe('with no supplied canvas context', () => {
    it('calls through to `prepareCanvasContext`', () => {
      detectFitzpatrick();
      expect(prepareCanvasContext).toHaveBeenCalledTimes(1);
      expect(prepareCanvasContext).toHaveBeenCalledWith(undefined);
    });

    it('calls through to `getCharacterWidth`', () => {
      detectFitzpatrick();
      expect(getCharacterWidth).toHaveBeenCalledTimes(2);
      expect(getCharacterWidth.mock.calls).toMatchSnapshot();
    });
  });

  it('returns expected values on OS with differing fitzpatrick glyph sizes', () => {
    getCharacterWidth
      .mockImplementation((char) => {
        if (char === '👸') {
          return 32;
        } else if (char === '👸🏿') {
          return 64;
        }
      });
    expect(detectFitzpatrick()).toBe(false);
  });

  it('returns expected values on OS with matching fitzpatrick glyph sizes, and with float glyph sizes', () => {
    getCharacterWidth
      .mockImplementation((char) => {
        if (char === '👸') {
          return 32;
        } else if (char === '👸🏿') {
          return 32;
        }
      });
    expect(detectFitzpatrick()).toBe(true);

    getCharacterWidth
      .mockImplementation((char) => {
        if (char === '👸') {
          return 43.939998626708984;
        } else if (char === '👸🏿') {
          return 43.939998626708984;
        }
      });
    expect(detectFitzpatrick()).toBe(true);
  });
});