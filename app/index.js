const Context2DConstructor = (CanvasRenderingContext2D || Context2d);
const _realFillText = Context2DConstructor.prototype.fillText;

let images;

Context2DConstructor.prototype.fillText = function(text) {
  const fillTextResponse = _realFillText.apply(this, Array.from(arguments));
  images[text] = this.canvas.toDataURL();
  return fillTextResponse;
};

import JSZip from 'jszip';
import useragent from 'express-useragent';
import { canDrawCharacter } from '../src/canvas';
import TEST_CHARS from '../src/__fixtures__/test-characters';

const userAgent = (() => {
  const { os, browser, version } = useragent.parse(navigator.userAgent);
  return `${os} - ${browser} ${version}`;
})();

function generate(evt) {
  evt.preventDefault();

  images = {};
  TEST_CHARS.forEach((char) => canDrawCharacter(char));

  const imageNames = Object.keys(images);

  if (imageNames.length === 0) {
    alert('No images generated for some reason?');
  }

  const zip = new JSZip();
  const imageFolder = zip.folder(userAgent);

  imageNames.forEach((name) => {
    imageFolder.file(
      `${name.split('').map((char) => char.charCodeAt(0).toString(16)).join('-')}.png`,
      images[name].split(',').slice(1).join(','),
      { base64: true }
    )
  });

  zip.generateAsync({type:"base64"}).then(function (base64) {
    location.href = "data:application/zip;base64," + base64;
  });
}

document.getElementById('generate').addEventListener('click', generate);
document.getElementById('userAgent').innerText = userAgent;