import { prepareCanvasContext, getCharacterWidth } from '../canvas';

export default function detectGenders(context) {
  context = prepareCanvasContext(context);

  return getCharacterWidth('🕵' /* Sleuth or Spy */, context)
    === getCharacterWidth('🕵🏻‍♀️' /* Female Sleuth */, context);
}
