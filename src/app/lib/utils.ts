import * as PIXI from "pixi.js";
import { appConfig } from "../../app";

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

export function createGraphics(color: string | number, width: number, height: number) {
  const graphics = new PIXI.Graphics();

  graphics.beginFill(color);
  graphics.drawRect(0, 0, width, height);
  graphics.endFill();
  return graphics;
}

export function createGradientText(content: string, x: number, y: number) {
  const style = new PIXI.TextStyle({
    fontFamily: "Arial",
    fontSize: appConfig.constants.BASE_SIZE * 0.5,
    fontWeight: "bold",
    fill: ["#ffffff", "#00ff99"],
    stroke: "#4a1850",
    strokeThickness: 5,
    dropShadow: true,
    dropShadowColor: "#000000",
    dropShadowBlur: 4,
    dropShadowAngle: Math.PI / 6,
    dropShadowDistance: 6,
  });
  const text = new PIXI.Text(content, style);
  text.position.set(x - text.width / 2, y);
  return text;
}
