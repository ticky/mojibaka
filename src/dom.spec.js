/* global jest, describe, beforeEach, afterEach, expect, it */
import { getCharacterWidth } from './dom';

describe('dom', () => {
  const _realCreateElement = document.createElement;
  const _realGetBoundingClientRect = Element.prototype.getBoundingClientRect;

  beforeEach(() => {
    document.createElement = jest.fn((...args) => _realCreateElement.apply(document, args));
    Element.prototype.getBoundingClientRect = jest.fn(() => ({
      left: 0,
      right: 0,
      width: 21,
      height: 16
    }));
  });

  afterEach(() => {
    document.createElement = _realCreateElement;
    Element.prototype.getBoundingClientRect = _realGetBoundingClientRect;
  });

  describe('getCharacterWidth', () => {
    it('calls through to getBoundingClientRect', () => {
      expect(getCharacterWidth('foo')).toBe(21);
      expect(document.createElement).toHaveBeenCalledTimes(1);
      expect(document.createElement).toHaveBeenCalledWith('span');
      expect(Element.prototype.getBoundingClientRect).toHaveBeenCalledTimes(1);
    });
  });
});
