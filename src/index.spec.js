/* global describe, it, expect, jest */
import * as index from './index';

jest.mock('./canvas');
jest.mock('./detect/fitzpatrick');
jest.mock('./detect/genders');
jest.mock('./detect/version');

describe('index', () => {
  const { prepareCanvasContext } = require('./canvas');
  const { default: detectFitzpatrick } = require('./detect/fitzpatrick');
  const { default: detectGenders } = require('./detect/genders');
  const { default: detectVersion } = require('./detect/version');

  beforeEach(() => {
    jest.clearAllMocks()
  });

  describe('package', () => {
    it('exposes known public API methods', () => {
      expect(Object.keys(index)).toMatchSnapshot();
    });
  });

  describe('detect', () => {
    describe('with an existing canvas context', () => {
      it('calls through to `prepareCanvasContext`', () => {
        const context = {};
        require('./index').default(context);
        expect(prepareCanvasContext).toHaveBeenCalledTimes(1);
        expect(prepareCanvasContext).toHaveBeenCalledWith(context);
      });

      it('calls through to `detectVersion`', () => {
        const context = {};
        require('./index').default(context);
        expect(detectVersion).toHaveBeenCalledTimes(1);
        expect(detectVersion).toHaveBeenCalledWith(context);
      });
    });

    describe('with no supplied canvas context', () => {
      it('calls through to `prepareCanvasContext`', () => {
        require('./index').default();
        expect(prepareCanvasContext).toHaveBeenCalledTimes(1);
        expect(prepareCanvasContext).toHaveBeenCalledWith(undefined);
      });

      it('calls through to `detectVersion`', () => {
        require('./index').default();
        expect(detectVersion).toHaveBeenCalledTimes(1);
        expect(detectVersion).toHaveBeenCalledWith(undefined);
      });
    });
  });
});
