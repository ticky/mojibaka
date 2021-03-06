import { prepareCanvasContext } from './canvas';
import detectVersion from './detect/version';
import detectFitzpatrick from './detect/fitzpatrick';
import detectGenders from './detect/genders';
import detectScale from './detect/scale';

export default function detect(context) {
  context = prepareCanvasContext(context);

  const version = detectVersion(context);

  return {
    version,
    fitzpatrick: version > 0 && detectFitzpatrick(context),
    genders: version >= 7.0 && detectGenders(context),
    scale: version > 0 && detectScale()
  };
}

export { default as detectVersion } from './detect/version';
export { default as detectFitzpatrick } from './detect/fitzpatrick';
export { default as detectGenders } from './detect/genders';
export { default as detectScale } from './detect/scale';
