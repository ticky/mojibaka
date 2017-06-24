/* global jest, describe, beforeEach, afterEach, expect, it */
import { getCharacterWidth } from './dom';

describe('dom', () => {
  const _realCreateElement = document.createElement;
  const _realGetBoundingClientRect = Element.prototype.getBoundingClientRect;

  beforeEach(() => {
    document.createElement = jest.fn((...args) => _realCreateElement.apply(document, args));
    Element.prototype.getBoundingClientRect = jest.fn(function() {
      const fontSize = parseFloat(window.getComputedStyle(this).fontSize);

      const fontMultiplier = fontSize / 16;

      return {
        left: 0,
        right: 0,
        width: 21 * fontMultiplier,
        height: 16 * fontMultiplier
      };
    });
  });

  afterEach(() => {
    document.createElement = _realCreateElement;
    Element.prototype.getBoundingClientRect = _realGetBoundingClientRect;
  });

  describe('getCharacterWidth', () => {
    it('calls through to getBoundingClientRect', () => {
      expect(getCharacterWidth('foo')).toBe(21);
      expect(document.createElement).toHaveBeenCalledWith('span');
      expect(Element.prototype.getBoundingClientRect).toHaveBeenCalledTimes(1);
    });

    it('accepts an optional font size override which it applies to the element', () => {
      expect(getCharacterWidth('foo', '24px')).toBe(32);
      expect(document.createElement).toHaveBeenCalledWith('span');
      expect(Element.prototype.getBoundingClientRect).toHaveBeenCalledTimes(1);
    });
  });
});
