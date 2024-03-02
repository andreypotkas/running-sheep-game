import { Graphics, Sprite, Text } from "pixi.js";
import { appConfig } from "../../../../app";
import { createButtonText, createSpriteFromImage } from "../../../lib/utils";

export class CommonButton extends Graphics {
  private normalColor: string = "blue";
  private hoverColor = 0x4682b4;
  private clickColor = 0x1e90ff;
  private buttonWidth: number;
  private buttonHeight: number;
  private buttonText?: Text;
  private buttonImage?: Sprite;

  constructor(buttonWidth: number, buttonHeight: number, position: { x: number; y: number }, handle: () => void, text?: string, image?: string) {
    super();
    this.eventMode = "dynamic";
    this.buttonWidth = buttonWidth;
    this.buttonHeight = buttonHeight;
    this.position.set(position.x, position.y);

    this.drawButton();

    if (text) this.addText(text.toUpperCase());
    if (image) this.addImage(image);

    this.addHandlers(handle);
  }

  private drawButton(): void {
    this.clear();
    this.beginFill(this.normalColor);
    this.drawRoundedRect(0, 0, this.buttonWidth, this.buttonHeight, 10);
    this.endFill();
  }

  private addText(text: string): void {
    const textSize = appConfig.constants.BASE_SIZE * 0.4;
    this.buttonText = createButtonText(text, textSize, 0, 0);
    this.buttonText.anchor.set(0.5);
    this.buttonText.position.set(this.buttonWidth / 2, this.buttonHeight / 2);

    this.addChild(this.buttonText);
  }

  private addImage(imagePath: string): void {
    this.buttonImage = createSpriteFromImage(imagePath, this.buttonWidth * 0.8, this.buttonHeight * 0.8, 0.1 * this.buttonWidth, 0.1 * this.buttonHeight);
    this.addChild(this.buttonImage);
  }

  private onButtonHover(): void {
    this.tint = this.hoverColor;
    document.body.style.cursor = "pointer";
  }

  private onButtonOut(): void {
    this.tint = this.normalColor;
    document.body.style.cursor = "default";
  }

  private onButtonDown(): void {
    this.tint = this.clickColor;
  }

  private onButtonUp(): void {
    this.tint = this.normalColor;
  }

  public setVisibility(isVisible: boolean): void {
    this.visible = isVisible;
  }

  private addHandlers(handle: () => void) {
    this.on("pointerover", this.onButtonHover);
    this.on("pointerout", this.onButtonOut);
    this.on("pointerdown", this.onButtonDown);
    this.on("pointerup", this.onButtonUp);
    this.on("click", handle);
    this.on("tap", handle);
  }
}
