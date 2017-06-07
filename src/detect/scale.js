function getCharacterDOMWidth(string, font) {
  const span = document.createElement('span');
    span.style.font = 'Times, "Times New Roman", serif';
    span.appendChild(document.createTextNode(string));

  document.body.appendChild(span);
  const { width } = span.getBoundingClientRect();
  document.body.removeChild(span);

  return Math.round(width);
}

export default function detectScale(font='1rem Times, "Times New Roman", serif') {
  return (
    getCharacterDOMWidth('👩' /* woman */, font) / getCharacterDOMWidth('J!i', font)
  );
}
