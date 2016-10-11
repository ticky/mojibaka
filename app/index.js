import JSZip from 'jszip';
import useragent from 'express-useragent';

import { canDrawCharacter, getCharacterWidth } from '../src/canvas';

import TEST_CHARS from '../src/__fixtures__/test-characters';

require('./index.css');

document.addEventListener('DOMContentLoaded', () => {
  let images;

  const { os, browser, version } = useragent.parse(navigator.userAgent);
  const userAgent = `${os} - ${browser} ${version}`;

  function makeElementWithText(name, text) {
    const newElement = document.createElement(name);
    newElement.appendChild(document.createTextNode(text));
    return newElement;
  }

  const Context2DConstructor = (CanvasRenderingContext2D || Context2d);
  const _realFillText = Context2DConstructor.prototype.fillText;

  Context2DConstructor.prototype.fillText = function(text) {
    const fillTextResponse = _realFillText.apply(this, Array.from(arguments));
    images[text] = this.canvas.toDataURL();
    return fillTextResponse;
  };

  const workArea = document.getElementById('work-area');

  function generate(evt) {
    evt.preventDefault();

    images = {};
    const info = {};

    TEST_CHARS.forEach((char) => {
      info[char] = {
        width: getCharacterWidth(char)
      };

      canDrawCharacter(char);
    });

    const imageNames = Object.keys(images);

    if (imageNames.length === 0) {
      alert('No images generated for some reason?');
    }

    const zip = new JSZip();
    const imageFolder = zip.folder(userAgent);

    imageNames.forEach((name) => {
      const fileName = name
        .match(/([\uD800-\uDBFF][\uDC00-\uDFFFF]|[\S\s])/g)
        .map((char) => char.codePointAt(0).toString(16))
        .join('-');

      imageFolder.file(
        `${fileName}.png`,
        images[name].split(',').slice(1).join(','),
        { base64: true }
      );
    });

    imageFolder.file('info.json', JSON.stringify(info, null, '\t'));

    zip.generateAsync({ type: 'base64' }).then(function (base64) {
      const fixtureURI = `data:application/zip;base64,${base64}`;

      try {
        location.href = fixtureURI;
      } catch (e) {
        const fixtureLinkInfo = makeElementWithText(
          `p`,
          `It appears that your browser doesn't seem to support data URIs. Copy the link below into one that does (Safari, Firefox or Chrome) to download it.`
        );
        const fixtureLink = makeElementWithText(`a`, `Fixture ZIP link`);
        fixtureLink.href = fixtureURI;
        workArea.removeChild(generateButton);
        workArea.removeChild(userAgentReadout);
        workArea.appendChild(fixtureLinkInfo);
        workArea.appendChild(fixtureLink);
      }
    });
  }

  const generateButton = makeElementWithText(`button`, `🗜Generate test fixtures`);
  generateButton.addEventListener('click', generate);
  workArea.appendChild(generateButton);

  const userAgentReadout = makeElementWithText(`p`, `for ${userAgent} 👍🏼`);
  workArea.appendChild(userAgentReadout);
});