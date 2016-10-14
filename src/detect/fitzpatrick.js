import { prepareCanvasContext, getCharacterWidth } from '../canvas';

export default function detectFitzpatrick(context) {
  context = prepareCanvasContext(context);

  return getCharacterWidth('👸' /* Princess */, context)
    === getCharacterWidth('👸🏿' /* Princess, Type-5 */, context);
}
