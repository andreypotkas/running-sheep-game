import * as PIXI from "pixi.js";
import { APP_HEIGHT, APP_WIDTH, BASE_ENTITY_SIZE, GROUND_HEIGHT, HORIZONTAL_MOVE_STEP } from "../constants";
import { Character, CharacterInterface } from "../entities/character";
import { Cloud } from "../entities/cloud";
import { Ground, GroundInterface } from "../entities/ground";
import { CollisionDetector } from "../lib/collisionDetector";
import { createFullScreenButton, createStartButton } from "../ui/button";
import { generateAppBackgroundElements, renderResetButton } from "./utils";

export class Game {
  public readonly app: PIXI.Application<HTMLCanvasElement>;
  public readonly ground: GroundInterface;
  public readonly character: CharacterInterface;
  public readonly collisionDetector: CollisionDetector;
  public readonly clouds: Cloud[];

  constructor() {
    // init app envaironment
    this.app = new PIXI.Application<HTMLCanvasElement>({ width: APP_WIDTH, height: APP_HEIGHT, resizeTo: window });
    const { background, mountains, clouds } = generateAppBackgroundElements();
    this.character = new Character(this.app, 0, APP_HEIGHT - GROUND_HEIGHT - BASE_ENTITY_SIZE, 1, 1, "assets/img/character.png");
    this.ground = new Ground(this.app);
    this.clouds = clouds;
    this.collisionDetector = new CollisionDetector(this.ground, this.character, this.endGame.bind(this));

    // add items to stage
    this.app.stage.addChild(background);
    mountains.forEach((item) => this.app.stage.addChild(item));
    clouds.forEach((item) => this.app.stage.addChild(item.sprite));
    this.app.stage.addChild(this.ground.sprite);
    this.ground.addPitsAndBoxes();
    this.app.stage.addChild(this.character.sprite);

    const startButton = createStartButton(this.app, this.runGame.bind(this));
    const fullScreenButton = createFullScreenButton(this.app, this.toggleFullScreen.bind(this));
    this.app.stage.addChild(startButton, fullScreenButton);

    window.addEventListener("resize", () => {
      window.location.reload();
    });

    document.body.appendChild(this.app.view);
  }

  public toggleFullScreen() {
    document.addEventListener("click", () => {
      this.app.view.requestFullscreen();
    });
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
    const restartButton = renderResetButton(this.character.x);
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
}
