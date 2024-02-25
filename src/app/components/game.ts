import * as PIXI from "pixi.js";
import { appConfig } from "../../app";
import { CharacterInterface } from "../entities/character";
import { GroundInterface } from "../entities/ground";
import { TopBarContainer } from "../entities/topBar";
import { CollisionDetector } from "../lib/collisionDetector";
import { restartGameButton } from "../ui/buttons/restartGame";
import { startGameButton } from "../ui/buttons/startGame";
import { initCommonAppElements } from "./utils";

export class Game {
  public app: PIXI.Application<HTMLCanvasElement>;
  public ground: GroundInterface;
  public character: CharacterInterface;
  public collisionDetector: CollisionDetector;
  public topBar: TopBarContainer;

  constructor() {
    const { app, background, mountains, clouds, character, ground, topBar, finishLine } = initCommonAppElements(this.toggleFullScreen.bind(this));
    this.app = app;
    this.ground = ground;
    this.character = character;
    this.topBar = topBar;
    this.collisionDetector = new CollisionDetector(this.ground, this.character, this.endGame.bind(this));

    this.app.stage.addChild(background, ...mountains, this.ground.sprite, ...clouds, topBar, finishLine);
    this.ground.addPitsAndBoxes();
    this.app.stage.addChild(character.sprite);

    const startButton = startGameButton(this.app, this.runGame.bind(this));
    this.app.stage.addChild(startButton);

    addEventListener("orientationchange", (event) => {
      this.restartGame();
    });

    document.body.appendChild(this.app.view);
  }

  public toggleFullScreen(): void {
    if (!appConfig.constants.IS_FULLSCREEN) {
      if (this.app.view.requestFullscreen) {
        appConfig.constants.IS_FULLSCREEN = true;
        this.app.view.requestFullscreen();
        const scalingFactor = appConfig.constants.IS_FULLSCREEN ? appConfig.constants.SCALING_FACTOR : 1;
        this.app.stage.scale.set(1, scalingFactor);
      }
    } else {
      if (document.exitFullscreen) {
        appConfig.constants.IS_FULLSCREEN = false;
        document.exitFullscreen();
        this.app.stage.scale.set(1, 1);
      }
    }
  }

  public runGame(): void {
    this.character.handleStartGame();

    this.app.ticker.add((delta) => {
      this.character.update();
      this.collisionDetector.checkObstacleCollisions();
      this.topBar.update(this.character.x);
      this.checkIsCharacterFinished();

      if (this.character.x > window.innerWidth / 4) {
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
    const restartButton = restartGameButton(this.character.x, this.restartGame.bind(this));
    this.app.stage.addChild(restartButton);
  }

  private moveStage() {
    this.app.stage.position.x -= appConfig.constants.HORIZONTAL_MOVE_STEP;
  }

  private checkIsCharacterFinished() {
    const finish = appConfig.constants.APP_WIDTH - window.screen.width;
    const isFinished = this.character.rightX >= finish;
    if (isFinished) this.endGame();
  }

  private restartGame() {
    window.location.reload();
  }
}
