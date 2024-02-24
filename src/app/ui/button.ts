import * as PIXI from "pixi.js";
import { Graphics, Sprite, Text, TextStyle, Texture } from "pixi.js";
import { BASE_ENTITY_SIZE } from "../constants";

export class CustomButton extends Graphics {
  color = 0x3366ff;
  borderWidth = 3;
  borderRadius = 10;
  buttonWidth: number;
  buttonHeight: number;
  buttonColor: string;

  constructor(buttonWidth: number, buttonHeight: number, position: { x: number; y: number }, onClick: () => void, isHideOnClick: boolean, buttonColor: string, text?: string, image?: string) {
    super();
    this.buttonColor = buttonColor;
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

  const button = new CustomButton(width, height, { x: buttonX, y: buttonY }, onClick, false, "blue", "Start game");

  return button;
};

export const createFullScreenButton = (app: PIXI.Application<HTMLCanvasElement>, onClick: () => void) => {
  const x = app.renderer.width - BASE_ENTITY_SIZE * 1.2;
  const y = BASE_ENTITY_SIZE * 0.2;
  const width = BASE_ENTITY_SIZE;
  const height = BASE_ENTITY_SIZE;

  const button = new CustomButton(width, height, { x: x, y: y }, onClick, true, "transparent", "", "assets/img/fullscreen.png");

  return button;
};

export const createRestartButton = (app: PIXI.Application<HTMLCanvasElement>, onClick: () => void) => {
  const centerX = app.stage.position.x + window.screen.width / 2;
  const centerY = app.renderer.height / 2;
  const width = BASE_ENTITY_SIZE * 4;
  const height = BASE_ENTITY_SIZE;
  const buttonX = centerX - width / 2;
  const buttonY = centerY - height / 2;

  const button = new CustomButton(width, height, { x: buttonX, y: buttonY }, onClick, false, "blue", "Restart game");

  return button;
};
