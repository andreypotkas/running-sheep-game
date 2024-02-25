import { Graphics, Sprite, Text, TextStyle, Texture } from "pixi.js";

export class CustomButton extends Graphics {
  color = 0x3366ff;
  borderWidth = 3;
  borderRadius = 10;
  buttonWidth: number;
  buttonHeight: number;
  buttonColor: string;

  constructor(buttonWidth: number, buttonHeight: number, position: { x: number; y: number }, handle: () => void, buttonColor: string, text?: string, image?: string) {
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

    this.eventMode = "dynamic";

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
