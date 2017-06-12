import { getCharacterWidth } from '../dom';

export default function detectScale() {
  const ratio = getCharacterWidth('👩' /* woman */) / getCharacterWidth('J!i');
  return Math.round(ratio * 10) / 10;
}
