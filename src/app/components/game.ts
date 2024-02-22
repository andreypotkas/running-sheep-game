import * as PIXI from "pixi.js";
import { APP_HEIGHT, APP_WIDTH, BASE_ENTITY_SIZE, GROUND_HEIGHT } from "../constants";
import { Character, CharacterInterface } from "../entities/character";
import { Ground } from "../entities/ground";
import { Platform, PlatformInterface } from "../entities/platform";
import { CollisionDetector } from "../lib/collisionDetector";
import { createSpriteFromImage, renderResetButton } from "./utils";

export class Game {
  readonly app: PIXI.Application<HTMLCanvasElement>;
  private readonly ground: Ground;
  public readonly character: CharacterInterface;
  public platforms: PlatformInterface[] = [];

  constructor() {
    this.app = new PIXI.Application<HTMLCanvasElement>({ width: APP_WIDTH, height: APP_HEIGHT });
    const background = createSpriteFromImage("assets/img/base-bg.jpg", APP_WIDTH, APP_HEIGHT, 0, 0);
    this.character = new Character(0, APP_HEIGHT - GROUND_HEIGHT - BASE_ENTITY_SIZE, 1, 1, "assets/img/character.jpg");
    this.ground = new Ground(this.app);

    this.app.stage.addChild(background);
    this.app.stage.addChild(this.ground.sprite);
    this.ground.addPitsAndBoxes(4);
    this.app.stage.addChild(this.character.sprite);

    window.addEventListener("keydown", (e) => {
      if (e.code === "Space") {
        const platform = new Platform(this.character.sprite.x, this.character.sprite.y, 1, 1, "assets/img/platform.jpg");
        this.app.stage.addChild(platform.sprite);
        this.platforms.push(platform);
        this.character.moveUp(platform.sprite.height);
      }
    });
    this.runGame();
  }

  public runGame(): void {
    document.body.appendChild(this.app.view);

    this.app.ticker.add((delta) => {
      this.character.update();
      this.platforms.forEach((platform: PlatformInterface) => platform.moveForward());
      this.checkObstacleCollisions(this.character);
      if (this.character.isFinishReached()) this.endGame();
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

  private checkObstacleCollisions(character: CharacterInterface): void {
    const pits = this.ground.getPits();
    const boxes = this.ground.getBoxes();

    pits.forEach((pit) => {
      const isCollided = CollisionDetector.characterPitCollision(character, pit);

      if (isCollided) {
        console.log("Boom with pit!");
        this.character.moveDown(pit.height);
        this.endGame();
      }
    });

    boxes.forEach((box) => {
      const isCollided = CollisionDetector.characterBoxCollision(character, box);

      if (isCollided) {
        console.log("Boom with box!");
        this.endGame();
      }
    });
  }
}
