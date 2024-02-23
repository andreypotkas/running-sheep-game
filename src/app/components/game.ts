import * as PIXI from "pixi.js";
import { APP_HEIGHT, APP_WIDTH, BASE_ENTITY_SIZE, GROUND_HEIGHT } from "../constants";
import { Character, CharacterInterface } from "../entities/character";
import { Ground } from "../entities/ground";
import { CollisionDetector } from "../lib/collisionDetector";
import { createSpriteFromImage, renderResetButton } from "./utils";

export class Game {
  readonly app: PIXI.Application<HTMLCanvasElement>;
  private readonly ground: Ground;
  public readonly character: CharacterInterface;

  constructor() {
    this.app = new PIXI.Application<HTMLCanvasElement>({ width: APP_WIDTH, height: APP_HEIGHT });
    const background = createSpriteFromImage("assets/img/base-bg.jpg", APP_WIDTH, APP_HEIGHT, 0, 0);
    this.character = new Character(this.app, 0, APP_HEIGHT - GROUND_HEIGHT - BASE_ENTITY_SIZE, 1, 1, "assets/img/character.jpg");
    this.ground = new Ground(this.app);

    this.app.stage.addChild(background);
    this.app.stage.addChild(this.ground.sprite);
    this.ground.addPitsAndBoxes(4);
    this.app.stage.addChild(this.character.sprite);

    this.runGame();
  }

  public runGame(): void {
    document.body.appendChild(this.app.view);

    this.app.ticker.add((delta) => {
      this.character.update(this.endGame);
      this.checkObstacleCollisions();
      // if (this.character.y > APP_HEIGHT - GROUND_HEIGHT) this.endGame();
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

  private checkObstacleCollisions(): void {
    const pits = this.ground.getPits();
    const boxes = this.ground.getBoxes();

    pits.forEach((pit) => {
      const isCharacterReachedPit = CollisionDetector.isCharacterReachedPit(this.character, pit);

      if (isCharacterReachedPit) {
        this.character.moveDown(pit.heightSize);
      }

      const isCharacterCollidedPit = CollisionDetector.isCharacterCollidedPit(this.character, pit);

      if (isCharacterCollidedPit) {
        this.endGame();
      }

      this.character.platforms.forEach((item) => {
        const isPlatformCollidedPit = CollisionDetector.isPlatformCollidedPit(item, pit);

        if (isPlatformCollidedPit) {
          item.stop();
        }
      });
    });

    boxes.forEach((box) => {
      const isCharacterCollidedBox = CollisionDetector.isCharacterCollidedBox(this.character, box);
      const isCharacterLeaveBox = CollisionDetector.isCharacterLeaveBox(this.character, box);

      if (isCharacterCollidedBox) {
        this.endGame();
      }

      if (isCharacterLeaveBox) {
        this.character.moveDown(box.heightSize);
      }

      this.character.platforms.forEach((item) => {
        const isPlatformCollidedBox = CollisionDetector.isPlatformCollidedBox(item, box);
        const isPlatformLeaveBox = CollisionDetector.isPlatformLeaveBox(item, box);

        if (isPlatformCollidedBox) {
          item.stop();
        }

        if (isPlatformLeaveBox) {
          item.moveDown(box.heightSize);
        }
      });
    });
  }
}
