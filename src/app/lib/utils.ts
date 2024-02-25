import * as PIXI from "pixi.js";

export function roundToCeilWithZeroLastDigit(number: number) {
  let roundedNumber = Math.ceil(number);

  while (roundedNumber % 10 !== 0) {
    roundedNumber++;
  }

  return roundedNumber;
}

export function createSpriteFromImage(image: string, width: number, height: number, positionX: number, positionY: number) {
  const texture = PIXI.Texture.from(image);
  const sprite = new PIXI.Sprite(texture);
  sprite.width = width;
  sprite.height = height;
  sprite.position.set(positionX, positionY);

  return sprite;
}

export function createText(content: string, fontSize: number, color: string, x: number, y: number) {
  const style = new PIXI.TextStyle({
    fill: color,
    fontSize,
  });
  const text = new PIXI.Text(content, style);
  text.position.set(x - text.width / 2, y);
  return text;
}
