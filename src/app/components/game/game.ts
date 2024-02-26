import * as PIXI from "pixi.js";
import { appConfig } from "../../../app";
import { CharacterInterface } from "../../entities/character";
import { TopBarContainer } from "../../entities/topBar";
import { CollisionDetector } from "../../lib/collisionDetector";
import { restartGameButton } from "../../ui/buttons/restartGame";
import { GameApp } from "../app";
import { initGameScene } from "../utils";

export class Game extends PIXI.Container {
  public app: GameApp;
  public character!: CharacterInterface;
  public collisionDetector: CollisionDetector;
  public topBar!: TopBarContainer;

  constructor(app: GameApp) {
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
    this.app.app.ticker.remove(this.update, this);
    this.showGameOverScreen();
    const prevBestScore = +JSON.parse(localStorage.getItem("bestScore") ?? "");
    const currentBestScore = Math.max(prevBestScore, this.character.x / 10);

    localStorage.setItem("bestScore", JSON.stringify(currentBestScore));
  }

  private checkIsCharacterFinished() {
    const isFinished = this.character.rightX >= appConfig.constants.FINISH_POINT;
    if (isFinished) this.endGame();
  }

  private showGameOverScreen(): void {
    const restartButton = restartGameButton(this.character.x, this.restartGame.bind(this));
    this.addChild(restartButton);
  }

  private moveStage() {
    this.position.x -= appConfig.constants.HORIZONTAL_MOVE_STEP;
  }

  private restartGame() {
    return this.app.runGame();
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
