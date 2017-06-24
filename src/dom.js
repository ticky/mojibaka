export function getCharacterWidth(string, fontSize = '16px') {
  const span = document.createElement('span');
  span.style.font = `${fontSize} Times, "Times New Roman", serif`;
  span.appendChild(document.createTextNode(string));

  document.documentElement.appendChild(span);
  const { width } = span.getBoundingClientRect();
  document.documentElement.removeChild(span);

  return Math.round(width);
}
