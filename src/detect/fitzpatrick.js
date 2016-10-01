import { prepareCanvasContext, getCharacterWidth } from '../canvas';

export default function detectFitzpatrick(context) {
  context = prepareCanvasContext(context);

  return getCharacterWidth('\u{1F478}' /* Princess */, context)
    === getCharacterWidth('\u{1F478}\u{1F3FE}' /* Princess, Type-5 */, context);
}
