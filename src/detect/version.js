import { canDrawCharacter } from '../canvas';

const VERSION_CANDIDATE_EMOJI = {
  '6.1': '\u{1F619}', // Kissing Face With Smiling Eyes
  '7.0': '\u{1F642}', // Slightly Smiling Face
  '8.0': '\u{1F914}', // Thinking Face
  '9.0': '\u{1F923}'  // Rolling On The Floor Laughing
};

export default function detectVersion(context) {
  let maxVersion = 0.0;

  Object.keys(VERSION_CANDIDATE_EMOJI).forEach((unicodeVersion) => {
    const newVersion = parseFloat(unicodeVersion, 10);
    if (newVersion > maxVersion && canDrawCharacter(VERSION_CANDIDATE_EMOJI[unicodeVersion], context)) {
      maxVersion = newVersion;
    }
  });

  return maxVersion;
}
