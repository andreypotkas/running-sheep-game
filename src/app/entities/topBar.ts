import * as PIXI from "pixi.js";
import { APP_WIDTH, BASE_SIZE, HORIZONTAL_MOVE_STEP } from "../constants";
import { toggleFullScreenButton } from "../ui/buttons/fullscreenToggler";

export class TopBarContainer extends PIXI.Container {
  private progressBar: PIXI.Graphics;
  private progressWidth: number;
  private progressHeight: number;
  private progressColor: number | string = "yellow";
  private progress: number;
  private scoreText: PIXI.Text;
  private characterIcon: PIXI.Sprite;
  private finishIcon: PIXI.Sprite;

  constructor(x: number, y: number, width: number, height: number, toggleFullScreenCallback: () => void) {
    super();
    this.position.set(x, y);
    this.progressWidth = width - 4 * BASE_SIZE;
    this.progressHeight = height / 5;
    this.progress = 0;

    this.progressBar = this.createProgressBar();
    this.scoreText = this.createScoreText();
    this.characterIcon = this.createCharacterIcon();
    this.finishIcon = this.createFinishIcon();

    const fullScreenButton = toggleFullScreenButton(toggleFullScreenCallback);

    this.addChild(this.progressBar, this.scoreText, this.finishIcon, this.characterIcon, fullScreenButton);
  }

  public update(characterPosX: number) {
    this.updateProgress(characterPosX);
    this.updateScore(characterPosX - 200);
  }

  private createProgressBar(): PIXI.Graphics {
    const progressBar = new PIXI.Graphics();
    progressBar.beginFill(this.progressColor);
    progressBar.drawRect(BASE_SIZE * 2, BASE_SIZE, this.progressWidth, this.progressHeight);
    progressBar.endFill();
    return progressBar;
  }

  private createScoreText(): PIXI.Text {
    const style = new PIXI.TextStyle({
      fontFamily: "Arial",
      fontSize: BASE_SIZE * 0.75,
      fontWeight: "bold",
      fill: "white",
    });

    const scoreText = new PIXI.Text("0", style);
    scoreText.position.set(BASE_SIZE * 0.2, BASE_SIZE * 0.15);

    return scoreText;
  }

  private createCharacterIcon(): PIXI.Sprite {
    const texture = PIXI.Texture.from("assets/img/character-icon.png");
    const characterIcon = new PIXI.Sprite(texture);
    characterIcon.anchor.set(0.5, 0.5);
    characterIcon.position.set(BASE_SIZE * 2, this.progressHeight * 3);
    return characterIcon;
  }

  private createFinishIcon(): PIXI.Sprite {
    const texture = PIXI.Texture.from("assets/img/flag-icon.png"); // Путь к изображению финиша
    const finishIcon = new PIXI.Sprite(texture);
    finishIcon.anchor.set(0.5, 0.5);
    finishIcon.position.set(BASE_SIZE * 2 + this.progressWidth, this.progressHeight * 3);
    return finishIcon;
  }

  public updateProgress(progressX: number): void {
    const finishPointX = APP_WIDTH - window.screen.width;
    const barLength = this.progressBar.width;
    const startPadding = BASE_SIZE * 2;

    this.characterIcon.x = (progressX / finishPointX) * barLength + startPadding;
  }

  public updateScore(score: number): void {
    this.scoreText.text = `${score}`;
  }

  public moveForward() {
    this.x += HORIZONTAL_MOVE_STEP;
  }
}
