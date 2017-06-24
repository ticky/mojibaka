import { getCharacterWidth } from '../dom';

function detectScaleRatio(fontSize) {
  const emojiWidth = getCharacterWidth(
    '👩' /* woman */,
    fontSize
  );

  const stringWidth = getCharacterWidth(
    // This string was found to match the width of an emoji
    // at 16px on Google Chrome version 58 on macOS 10.12.5
    'J!i',
    fontSize
  );

  return emojiWidth / stringWidth;
}

export default function detectScale(fontSize) {
  // `detectScale` returns the ratio to a single decimal place, which
  // is more likely to be used for "good" things than the raw value 😉
  return Math.round(detectScaleRatio(fontSize) * 10) / 10;
}
