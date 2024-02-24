import * as PIXI from "pixi.js";
import { APP_WIDTH, HORIZONTAL_MOVE_STEP } from "../constants";
import { CharacterInterface } from "../entities/character";
import { GroundInterface } from "../entities/ground";
import { CollisionDetector } from "../lib/collisionDetector";
import { createFullScreenButton, createRestartButton, createStartButton } from "../ui/button";
import { initCommonAppElements } from "./utils";

export class Game {
  public readonly app: PIXI.Application<HTMLCanvasElement>;
  public readonly ground: GroundInterface;
  public readonly character: CharacterInterface;
  public readonly collisionDetector: CollisionDetector;

  constructor() {
    const { app, background, mountains, clouds, character, ground } = initCommonAppElements();
    this.app = app;
    this.ground = ground;
    this.character = character;
    this.collisionDetector = new CollisionDetector(this.ground, this.character, this.endGame.bind(this));

    this.app.stage.addChild(background, ...mountains, this.ground.sprite, ...clouds, character.sprite);
    this.ground.addPitsAndBoxes();

    const startButton = createStartButton(this.app, this.runGame.bind(this));
    const fullScreenButton = createFullScreenButton(this.app, this.toggleFullScreen.bind(this));
    this.app.stage.addChild(startButton, fullScreenButton);

    window.addEventListener("resize", () => {
      this.app.renderer.resize(APP_WIDTH, window.screen.height);
      this.app.view.style.height = window.screen.height + "px";
    });

    document.body.appendChild(this.app.view);
  }

  public toggleFullScreen(): void {
    const isFullScreen = document.fullscreenElement !== null;

    if (!isFullScreen) {
      if (this.app.view.requestFullscreen) {
        this.app.view.requestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  }

  public runGame(): void {
    this.character.handleStartGame();

    this.app.ticker.add((delta) => {
      this.character.update(this.endGame);
      this.collisionDetector.checkObstacleCollisions();
      this.moveStage();
      this.checkIsCharacterFinished();
    });
  }

  public endGame(): void {
    this.app.ticker.stop();
    this.showGameOverScreen();
  }

  private showGameOverScreen(): void {
    const restartButton = createRestartButton(this.app, this.restartGame.bind(this));
    this.app.stage.addChild(restartButton);
  }

  private moveStage() {
    if (this.character.x > window.screen.width / 2) this.app.stage.position.x -= HORIZONTAL_MOVE_STEP;
  }

  private checkIsCharacterFinished() {
    const finish = APP_WIDTH - window.screen.width;
    const isFinished = this.character.rightX >= finish;
    if (isFinished) this.endGame();
  }

  private restartGame() {
    window.location.reload();
  }
}
