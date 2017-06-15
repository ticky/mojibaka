export function getCharacterWidth(string) {
  const span = document.createElement('span');
  span.style.font = '1rem Times, "Times New Roman", serif';
  span.appendChild(document.createTextNode(string));

  document.documentElement.appendChild(span);
  const { width } = span.getBoundingClientRect();
  document.documentElement.removeChild(span);

  return Math.round(width);
}
