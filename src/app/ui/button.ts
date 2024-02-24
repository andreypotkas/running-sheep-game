import * as PIXI from "pixi.js";
import { Graphics, Sprite, Text, TextStyle, Texture } from "pixi.js";
import { BASE_ENTITY_SIZE } from "../constants";

export class CustomButton extends Graphics {
  buttonColor = 0x3366ff;
  color = 0x3366ff;
  borderWidth = 3;
  borderRadius = 10;
  buttonWidth: number;
  buttonHeight: number;

  constructor(buttonWidth: number, buttonHeight: number, position: { x: number; y: number }, onClick: () => void, isHideOnClick: boolean, text?: string, image?: string) {
    super();

    this.buttonWidth = buttonWidth;
    this.buttonHeight = buttonHeight;
    this.position.set(position.x, position.y);

    this.drawButton();

    if (text) {
      this.addText(text.toUpperCase());
    }

    if (image) {
      this.addImage(image);
    }

    this.interactive = true;

    const handle = () => {
      this.setVisibility(isHideOnClick);
      onClick();
    };

    this.on("click", handle);
    this.on("tap", handle);
  }

  private drawButton(): void {
    this.clear();
    this.beginFill(this.buttonColor);
    this.drawRoundedRect(0, 0, this.buttonWidth, this.buttonHeight, this.borderRadius);
    this.endFill();
  }

  private addText(text: string): void {
    const textStyle = new TextStyle({
      fill: 0xffff00,
      fontSize: 24,
      fontWeight: "bold",
    });

    const buttonText = new Text(text, textStyle);

    buttonText.x = (this.buttonWidth - buttonText.width) / 2;
    buttonText.y = (this.buttonHeight - buttonText.height) / 2;

    this.addChild(buttonText);
  }

  private addImage(imagePath: string): void {
    const texture = Texture.from(imagePath);
    const sprite = new Sprite(texture);
    sprite.width = this.buttonWidth;
    sprite.height = this.buttonHeight;
    this.addChild(sprite);
  }

  public setVisibility(isVisible: boolean): void {
    this.visible = isVisible;
  }
}

export const createStartButton = (app: PIXI.Application<HTMLCanvasElement>, onClick: () => void) => {
  const centerX = app.renderer.width / 2;
  const centerY = app.renderer.height / 2;
  const width = BASE_ENTITY_SIZE * 4;
  const height = BASE_ENTITY_SIZE;
  const buttonX = centerX - width / 2;
  const buttonY = centerY - height / 2;

  const button = new CustomButton(width, height, { x: buttonX, y: buttonY }, onClick, false, "Start game");

  return button;
};

export const createFullScreenButton = (app: PIXI.Application<HTMLCanvasElement>, onClick: () => void) => {
  const centerX = app.renderer.width / 2;
  const centerY = app.renderer.height / 1.5;
  const width = BASE_ENTITY_SIZE * 2;
  const height = BASE_ENTITY_SIZE;
  const buttonX = centerX - width / 2;
  const buttonY = centerY - height / 2;

  const button = new CustomButton(width, height, { x: buttonX, y: buttonY }, onClick, true, "Full");

  return button;
};

export const createRestartButton = (app: PIXI.Application<HTMLCanvasElement>, onClick: () => void) => {
  const centerX = app.renderer.width / 2;
  const centerY = app.renderer.height / 2;
  const width = BASE_ENTITY_SIZE * 4;
  const height = BASE_ENTITY_SIZE;
  const buttonX = centerX - width / 2;
  const buttonY = centerY - height / 2;

  const button = new CustomButton(width, height, { x: buttonX, y: buttonY }, onClick, false, "Restart game");

  return button;
};
