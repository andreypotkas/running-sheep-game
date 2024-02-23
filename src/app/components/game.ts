import * as PIXI from "pixi.js";
import { appConfig } from "../appConfig";
import { APP_HEIGHT, APP_WIDTH, BASE_ENTITY_SIZE, GROUND_HEIGHT, HORIZONTAL_MOVE_STEP } from "../constants";
import { Character, CharacterInterface } from "../entities/character";
import { Ground, GroundInterface } from "../entities/ground";
import { CollisionDetector } from "../lib/collisionDetector";
import { generateAppBackgroundElements, renderResetButton } from "./utils";

export class Game {
  public readonly app: PIXI.Application<HTMLCanvasElement>;
  public readonly ground: GroundInterface;
  public readonly character: CharacterInterface;
  public readonly collisionDetector: CollisionDetector;

  constructor() {
    this.app = new PIXI.Application<HTMLCanvasElement>({ width: APP_WIDTH, height: APP_HEIGHT, resizeTo: window });
    const { background, mountains, clouds } = generateAppBackgroundElements();
    this.character = new Character(this.app, 0, APP_HEIGHT - GROUND_HEIGHT - BASE_ENTITY_SIZE, 1, 1, "assets/img/character.png");
    this.ground = new Ground(this.app);
    this.collisionDetector = new CollisionDetector(this.ground, this.character, this.endGame.bind(this));

    this.app.stage.addChild(background);
    mountains.forEach((item) => this.app.stage.addChild(item));
    clouds.forEach((item) => this.app.stage.addChild(item));
    this.app.stage.addChild(this.ground.sprite);
    this.ground.addPitsAndBoxes();
    this.app.stage.addChild(this.character.sprite);

    window.addEventListener("resize", () => {
      const { APP_HEIGHT, APP_WIDTH } = appConfig.initAppConstants();
      this.app.renderer.resize(APP_WIDTH, APP_HEIGHT);
    });
  }

  public runGame(): void {
    document.body.appendChild(this.app.view);

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
