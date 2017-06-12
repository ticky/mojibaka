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
      .mockImplementation((string) => {
        if (string === '👩') {
          return 16;
        } else if (string === 'J!i') {
          return 16;
        }
      });
    expect(detectScale()).toBe(1.0);
  });

  it('returns expected values on browser with 1:1.31 emoji sizes', () => {
    getCharacterWidth
      .mockImplementation((string) => {
        if (string === '👩') {
          return 21;
        } else if (string === 'J!i') {
          return 16;
        }
      });
    expect(detectScale()).toBe(1.3);
  });

  it('returns expected values on browser with 1:1.375 emoji sizes', () => {
    getCharacterWidth
      .mockImplementation((string) => {
        if (string === '👩') {
          return 22;
        } else if (string === 'J!i') {
          return 16;
        }
      });
    expect(detectScale()).toBe(1.4);
  });
});