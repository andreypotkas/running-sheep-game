import * as PIXI from "pixi.js";
import { APP_HEIGHT, APP_WIDTH, BASE_ENTITY_SIZE, GROUND_HEIGHT } from "../constants";
import { Character, CharacterInterface } from "../entities/character";
import { Ground, GroundInterface } from "../entities/ground";
import { CollisionDetector } from "../lib/collisionDetector";
import { createSpriteFromImage, renderResetButton } from "./utils";

export class Game {
  public readonly app: PIXI.Application<HTMLCanvasElement>;
  public readonly ground: GroundInterface;
  public readonly character: CharacterInterface;
  public readonly collisionDetector: CollisionDetector;

  constructor() {
    this.app = new PIXI.Application<HTMLCanvasElement>({ width: APP_WIDTH, height: APP_HEIGHT, resizeTo: window });
    const background = createSpriteFromImage("assets/img/base-bg.jpg", APP_WIDTH, APP_HEIGHT, 0, 0);
    const mountain = createSpriteFromImage("assets/img/mountain.png", APP_WIDTH, APP_HEIGHT / 2, 0, 100);
    this.character = new Character(this.app, 0, APP_HEIGHT - GROUND_HEIGHT - BASE_ENTITY_SIZE, 1, 1, "assets/img/character.png");
    this.ground = new Ground(this.app);
    this.collisionDetector = new CollisionDetector(this.ground, this.character, this.endGame.bind(this));

    this.app.stage.addChild(background);
    this.app.stage.addChild(mountain);
    this.app.stage.addChild(this.ground.sprite);
    this.ground.addPitsAndBoxes();
    this.app.stage.addChild(this.character.sprite);

    window.addEventListener("resize", () => {
      this.app.renderer.resize(APP_WIDTH, APP_HEIGHT);
    });
  }

  public runGame(): void {
    document.body.appendChild(this.app.view);

    this.app.ticker.add((delta) => {
      this.character.update(this.endGame);
      this.collisionDetector.checkObstacleCollisions();
    });
  }

  public endGame(): void {
    this.app.ticker.stop();
    this.showGameOverScreen();
  }

  private showGameOverScreen(): void {
    const restartButton = renderResetButton();
    this.app.stage.addChild(restartButton);
  }
}
