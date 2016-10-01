import { prepareCanvasContext, getCharacterWidth } from '../canvas';

export default function detectGenders(context) {
  context = prepareCanvasContext(context);

  return getCharacterWidth('\u{1F575}' /* Sleuth or Spy */, context)
    === getCharacterWidth('\u{1F575}\u{FE0F}\u{200D}\u{2640}\u{FE0F}' /* Female Sleuth */, context);
}
