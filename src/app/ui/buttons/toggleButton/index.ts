import { Graphics, Sprite } from "pixi.js";
import { createSpriteFromImage } from "../../../lib/utils";

export class ToggleButton extends Graphics {
  private normalColor: string = "blue";
  private hoverColor = 0x4682b4;
  private clickColor = 0x1e90ff;
  private buttonImage!: Sprite;
  private buttonActiveImage!: Sprite;
  private buttonWidth: number;
  private buttonHeight: number;
  private condition: boolean;

  constructor(buttonWidth: number, buttonHeight: number, position: { x: number; y: number }, handle: () => void, image: string, activeImage: string, condition: boolean) {
    super();
    this.eventMode = "dynamic";
    this.width = buttonWidth;
    this.height = buttonHeight;
    this.position.set(position.x, position.y);
    this.buttonWidth = buttonWidth;
    this.buttonHeight = buttonHeight;
    this.condition = condition;

    this.drawButton();
    this.addImages(image, activeImage);
    this.addHandlers(handle);
  }

  private drawButton(): void {
    this.clear();
    this.beginFill(this.normalColor);
    this.drawRoundedRect(0, 0, this.buttonWidth, this.buttonHeight, 10);
    this.endFill();
  }

  private addImages(image: string, activeImage: string): void {
    this.buttonImage = createSpriteFromImage(image, this.buttonWidth * 0.8, this.buttonHeight * 0.8, 0.1 * this.buttonWidth, 0.1 * this.buttonHeight);
    this.buttonActiveImage = createSpriteFromImage(activeImage, this.buttonWidth * 0.8, this.buttonHeight * 0.8, 0.1 * this.buttonWidth, 0.1 * this.buttonHeight);

    this.addChild(this.condition ? this.buttonActiveImage : this.buttonImage);
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

  private addHandlers(handle: () => void) {
    this.on("pointerover", this.onButtonHover);
    this.on("pointerout", this.onButtonOut);
    this.on("pointerdown", this.onButtonDown);
    this.on("pointerup", this.onButtonUp);
    this.on("click", this.handleInteraction.bind(this, handle));
    this.on("tap", this.handleInteraction.bind(this, handle));
  }

  private handleInteraction(handle: () => void) {
    handle();
    this.toggleImage();
  }

  private toggleImage() {
    if (this.condition) {
      this.condition = false;
      this.removeChild(this.buttonActiveImage);
      this.addChild(this.buttonImage);
    } else {
      this.condition = true;
      this.removeChild(this.buttonImage);
      this.addChild(this.buttonActiveImage);
    }
  }
}
