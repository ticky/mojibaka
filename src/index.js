import { prepareCanvasContext } from './canvas';
import detectVersion from './detect/version';
import detectFitzpatrick from './detect/fitzpatrick';
import detectGenders from './detect/genders';

export default function detect() {
  const context = prepareCanvasContext();

  const version = detectVersion(context);

  return {
    version,
    fitzpatrick: version > 0 && detectFitzpatrick(context),
    genders: version >= 7.0 && detectGenders(context)
  };
}

export { canDrawCharacter } from './canvas';
export { default as detectVersion } from './detect/version';
export { default as detectFitzpatrick } from './detect/fitzpatrick';
export { default as detectGenders } from './detect/genders';
