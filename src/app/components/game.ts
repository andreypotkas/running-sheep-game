import * as PIXI from "pixi.js";
import { AppConfigObject, appConfig } from "../appConfig";
import { CharacterInterface } from "../entities/character";
import { GroundInterface } from "../entities/ground";
import { TopBarContainer } from "../entities/topBar";
import { CollisionDetector } from "../lib/collisionDetector";
import { restartGameButton } from "../ui/buttons/restartGame";
import { startGameButton } from "../ui/buttons/startGame";
import { initCommonAppElements } from "./utils";

export class Game {
  public readonly app: PIXI.Application<HTMLCanvasElement>;
  public readonly ground: GroundInterface;
  public readonly character: CharacterInterface;
  public readonly collisionDetector: CollisionDetector;
  public readonly topBar: TopBarContainer;
  public config: AppConfigObject;
  private isFullScreen: boolean = false;

  constructor() {
    this.config = appConfig.initAppConstants();
    const { app, background, mountains, clouds, character, ground, topBar } = initCommonAppElements(this.toggleFullScreen.bind(this));
    this.app = app;
    this.ground = ground;
    this.character = character;
    this.topBar = topBar;
    this.collisionDetector = new CollisionDetector(this.ground, this.character, this.endGame.bind(this));

    this.app.stage.addChild(background, ...mountains, this.ground.sprite, ...clouds, topBar);
    this.ground.addPitsAndBoxes();
    this.app.stage.addChild(character.sprite);

    const startButton = startGameButton(this.app, this.runGame.bind(this));
    // const fullScreenButton = createFullScreenButton(this.app, this.toggleFullScreen.bind(this));
    this.app.stage.addChild(startButton);

    window.addEventListener("resize", () => {
      if (this.isFullScreen) {
        this.app.renderer.resize(this.config.APP_WIDTH, window.innerHeight);
      } else {
        this.app.renderer.resize(this.config.APP_WIDTH, window.screen.height);
      }
    });

    document.body.appendChild(this.app.view);
  }

  public toggleFullScreen(): void {
    if (!this.isFullScreen) {
      if (this.app.view.requestFullscreen) {
        this.app.view.requestFullscreen();
        this.isFullScreen = true;
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        this.isFullScreen = false;
      }
    }
  }

  public runGame(): void {
    this.character.handleStartGame();

    this.app.ticker.add((delta) => {
      this.character.update();
      this.collisionDetector.checkObstacleCollisions();
      this.checkIsCharacterFinished();
      this.topBar.update(this.character.x);

      if (this.character.x > window.screen.width / 3) {
        this.moveStage();
        this.topBar.moveForward();
      }
    });
  }

  public endGame(): void {
    this.app.ticker.stop();
    this.showGameOverScreen();
  }

  private showGameOverScreen(): void {
    const restartButton = restartGameButton(this.app, this.restartGame.bind(this));
    this.app.stage.addChild(restartButton);
  }

  private moveStage() {
    this.app.stage.position.x -= this.config.HORIZONTAL_MOVE_STEP;
  }

  private checkIsCharacterFinished() {
    const finish = this.config.APP_WIDTH - window.screen.width;
    const isFinished = this.character.rightX >= finish;
    if (isFinished) this.endGame();
  }

  private restartGame() {
    window.location.reload();
  }
}
