const DRAW_SIZE = 32;

export function prepareCanvasContext(context) {
  if (!context) {
    context = document.createElement('canvas').getContext('2d');
    context.fillStyle = "#000";
    context.font = `${DRAW_SIZE}px "Apple Color Emoji","Segoe UI","Segoe UI Emoji","Segoe UI Symbol",Arial`;
  } else {
    context.clearRect(0, 0, DRAW_SIZE * 2, DRAW_SIZE * 2);
  }
  return context;
}

export function canDrawCharacter(character, context) {
  context = prepareCanvasContext(context);
  context.fillText(character, 0, DRAW_SIZE);

  return context.getImageData(DRAW_SIZE / 2, DRAW_SIZE / 2, 1, 1).data[0] !== 0;
}

export function getCharacterWidth(character, context) {
  context = prepareCanvasContext(context);

  return context.measureText(character).width;
}
