/* global jest, describe, beforeEach, expect, it */
import * as index from './index';
import { prepareCanvasContext } from './canvas';
import detectFitzpatrick from './detect/fitzpatrick';
import detectGenders from './detect/genders';
import detectVersion from './detect/version';

jest.mock('./canvas');
jest.mock('./detect/fitzpatrick');
jest.mock('./detect/genders');
jest.mock('./detect/version');

describe('index', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('package', () => {
    it('exposes known public API methods', () => {
      expect(Object.keys(index)).toMatchSnapshot();
    });
  });

  describe('detectFitzpatrick', () => {
    it('is `detectFitzpatrick` from `detect/fitzpatrick`', () => {
      expect(index.detectFitzpatrick).toBe(detectFitzpatrick);
    });
  });

  describe('detectGenders', () => {
    it('is `detectGenders` from `detect/genders`', () => {
      expect(index.detectGenders).toBe(detectGenders);
    });
  });

  describe('detectVersion', () => {
    it('is `detectVersion` from `detect/version`', () => {
      expect(index.detectVersion).toBe(detectVersion);
    });
  });

  describe('detect', () => {
    describe('with an existing canvas context', () => {
      it('calls through to `prepareCanvasContext`', () => {
        const context = {};
        index.default(context);
        expect(prepareCanvasContext).toHaveBeenCalledTimes(1);
        expect(prepareCanvasContext).toHaveBeenCalledWith(context);
      });

      it('calls through to `detectFitzpatrick`', () => {
        const context = {};
        index.default(context);
        expect(detectFitzpatrick).toHaveBeenCalledTimes(1);
        expect(detectFitzpatrick).toHaveBeenCalledWith(context);
      });

      it('calls through to `detectGenders`', () => {
        const context = {};
        index.default(context);
        expect(detectGenders).toHaveBeenCalledTimes(1);
        expect(detectGenders).toHaveBeenCalledWith(context);
      });

      it('calls through to `detectVersion`', () => {
        const context = {};
        index.default(context);
        expect(detectVersion).toHaveBeenCalledTimes(1);
        expect(detectVersion).toHaveBeenCalledWith(context);
      });
    });

    describe('with no supplied canvas context', () => {
      it('calls through to `prepareCanvasContext`', () => {
        index.default();
        expect(prepareCanvasContext).toHaveBeenCalledTimes(1);
        expect(prepareCanvasContext).toHaveBeenCalledWith(undefined);
      });

      it('calls through to `detectFitzpatrick`', () => {
        index.default();
        expect(detectFitzpatrick).toHaveBeenCalledTimes(1);
        expect(detectFitzpatrick).toHaveBeenCalledWith(undefined);
      });

      it('calls through to `detectGenders`', () => {
        index.default();
        expect(detectGenders).toHaveBeenCalledTimes(1);
        expect(detectGenders).toHaveBeenCalledWith(undefined);
      });

      it('calls through to `detectVersion`', () => {
        index.default();
        expect(detectVersion).toHaveBeenCalledTimes(1);
        expect(detectVersion).toHaveBeenCalledWith(undefined);
      });
    });
  });
});
