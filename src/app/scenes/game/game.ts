import * as PIXI from "pixi.js";
import { appConfig, soundManager } from "../../../app";
import { CharacterInterface } from "../../entities/character/character";
import { TopBarContainer } from "../../entities/topBar";
import { CollisionDetector } from "../../lib/collisionDetector";
import { createGradientText } from "../../lib/utils";
import { backToMenuButton } from "../../ui/buttons/backToMenu";
import { restartGameButton } from "../../ui/buttons/restartGame";
import { MainApp } from "../app";
import { initGameScene } from "../utils";

export class Game extends PIXI.Container {
  public app: MainApp;
  public character!: CharacterInterface;
  public collisionDetector: CollisionDetector;
  public topBar!: TopBarContainer;

  constructor(app: MainApp) {
    super();

    const { character, ground } = initGameScene(this);
    this.app = app;
    this.collisionDetector = new CollisionDetector(ground, character, this.endGame.bind(this));

    this.runGame();
  }

  public runGame(): void {
    this.character.handleStartGame();
    this.addChild(this.character.sprite);

    this.app.app.ticker.add(this.update, this);
  }

  public endGame(): void {
    this.character.handleEndGame();
    const prevBestScore = localStorage.getItem("bestScore");
    const currentScore = this.character.x / 10;

    if (prevBestScore) {
      const currentBestScore = Math.max(+JSON.parse(prevBestScore), currentScore);
      localStorage.setItem("bestScore", JSON.stringify(currentBestScore));
    } else {
      localStorage.setItem("bestScore", JSON.stringify(currentScore));
    }

    this.showGameOverScreen(currentScore);
    this.app.app.ticker.remove(this.update, this);
  }

  private checkIsCharacterFinished() {
    const isFinished = this.character.rightX >= appConfig.constants.FINISH_POINT;
    if (isFinished) this.endGame();
  }

  private showGameOverScreen(currentScore: number): void {
    const { BASE_SIZE, APP_WIDTH, APP_HEIGHT } = appConfig.constants;
    soundManager.playCollideSound();
    const backToMenu = backToMenuButton(this.character.x, this.backToMenu.bind(this));
    const restartButton = restartGameButton(this.character.x, this.restartGame.bind(this));
    const scoreText = createGradientText(`YOUR SCORE: ${currentScore}`, BASE_SIZE * 0.75, this.character.x + APP_WIDTH / 4, APP_HEIGHT / 4);

    this.addChild(restartButton, backToMenu, scoreText);
  }

  private moveStage() {
    this.position.x -= appConfig.constants.HORIZONTAL_MOVE_STEP;
  }

  private restartGame() {
    return this.app.runGame();
  }

  private backToMenu() {
    return this.app.runMenu();
  }

  private update() {
    this.topBar.update(this.character.x);
    this.character.update();
    this.collisionDetector.checkObstacleCollisions();
    this.checkIsCharacterFinished();

    if (this.character.x > window.innerWidth / 4) {
      this.moveStage();
      this.topBar.moveForward();
    }
  }
}
