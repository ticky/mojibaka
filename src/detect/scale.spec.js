/* global jest, describe, beforeEach, expect, it */
import detectScale from './scale';
import { getCharacterWidth } from '../dom';

jest.mock('../dom');

describe('detectScale', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('returns expected values on browser with 1:1 emoji sizes', () => {
    getCharacterWidth
      .mockImplementation((string, fontSize) => {
        if (string === '👩') {
          return 16 * (fontSize ? parseInt(fontSize, 10) / 16 : 1);
        } else if (string === 'J!i') {
          return 16 * (fontSize ? parseInt(fontSize, 10) / 16 : 1);
        }
      });
    expect(detectScale()).toBe(1.0);
    expect(detectScale('32px')).toBe(1.0);
    expect(getCharacterWidth).toHaveBeenCalledWith('👩', undefined);
    expect(getCharacterWidth).toHaveBeenCalledWith('👩', '32px');
  });

  it('returns expected values on browser with 1:1.31 emoji sizes', () => {
    getCharacterWidth
      .mockImplementation((string, fontSize) => {
        if (string === '👩') {
          return 21 * (fontSize ? parseInt(fontSize, 10) / 16 : 1);
        } else if (string === 'J!i') {
          return 16 * (fontSize ? parseInt(fontSize, 10) / 16 : 1);
        }
      });
    expect(detectScale()).toBe(1.3);
    expect(detectScale('32px')).toBe(1.3);
    expect(getCharacterWidth).toHaveBeenCalledWith('👩', undefined);
    expect(getCharacterWidth).toHaveBeenCalledWith('👩', '32px');
  });

  it('returns expected values on browser with 1:1.375 emoji sizes', () => {
    getCharacterWidth
      .mockImplementation((string, fontSize) => {
        if (string === '👩') {
          return 22 * (fontSize ? parseInt(fontSize, 10) / 16 : 1);
        } else if (string === 'J!i') {
          return 16 * (fontSize ? parseInt(fontSize, 10) / 16 : 1);
        }
      });
    expect(detectScale()).toBe(1.4);
    expect(detectScale('32px')).toBe(1.4);
    expect(getCharacterWidth).toHaveBeenCalledWith('👩', undefined);
    expect(getCharacterWidth).toHaveBeenCalledWith('👩', '32px');
  });
});