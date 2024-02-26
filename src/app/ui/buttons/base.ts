import { Graphics, Sprite, Text, TextStyle, Texture } from "pixi.js";
import { appConfig } from "../../../app";

export class CustomButton extends Graphics {
  private normalColor: string;
  private hoverColor = 0x4682b4;
  private clickColor = 0x1e90ff;
  private borderRadius = 10;
  private buttonWidth: number;
  private buttonHeight: number;
  private buttonText?: Text;
  private buttonImage?: Sprite;

  constructor(buttonWidth: number, buttonHeight: number, position: { x: number; y: number }, handle: () => void, buttonColor = "blue", text?: string, image?: string) {
    super();
    this.buttonWidth = buttonWidth;
    this.buttonHeight = buttonHeight;
    this.position.set(position.x, position.y);
    this.normalColor = buttonColor;

    this.drawButton();

    if (text) this.addText(text.toUpperCase());
    if (image) this.addImage(image);

    this.interactive = true;

    this.on("pointerover", this.onButtonHover);
    this.on("pointerout", this.onButtonOut);
    this.on("pointerdown", this.onButtonDown);
    this.on("pointerup", this.onButtonUp);

    this.on("click", handle);
    this.on("tap", handle);
  }

  private drawButton(): void {
    this.clear();
    this.beginFill(this.normalColor);
    this.drawRoundedRect(0, 0, this.buttonWidth, this.buttonHeight, this.borderRadius);
    this.endFill();
  }

  private addText(text: string): void {
    const textStyle = new TextStyle({
      fontFamily: "Arial",
      fontSize: appConfig.constants.BASE_SIZE * 0.75,
      fontWeight: "bold",
      fill: ["#ffffff", "yellow"],
      stroke: "#4a1850",
    });

    this.buttonText = new Text(text, textStyle);
    this.buttonText.anchor.set(0.5);
    this.buttonText.position.set(this.buttonWidth / 2, this.buttonHeight / 2);

    this.addChild(this.buttonText);
  }

  private addImage(imagePath: string): void {
    const texture = Texture.from(imagePath);
    this.buttonImage = new Sprite(texture);
    this.buttonImage.width = this.buttonWidth;
    this.buttonImage.height = this.buttonHeight;

    this.addChild(this.buttonImage);
  }

  private onButtonHover(): void {
    this.tint = this.hoverColor;
  }

  private onButtonOut(): void {
    this.tint = this.normalColor;
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
}
