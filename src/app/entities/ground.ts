import * as PIXI from "pixi.js";
import { createSpriteFromImage } from "../components/utils";
import { APP_HEIGHT, APP_WIDTH, BASE_ENTITY_SIZE, GROUND_HEIGHT } from "../constants";
import { roundToCeilWithZeroLastDigit } from "../lib/utils";
import { Box } from "./box";
import { Pit } from "./pit";

export interface GroundInterface {
  sprite: PIXI.Sprite;
  addPitsAndBoxes(numberOfObstacles: number): void;
  getPits(): Pit[];
  getBoxes(): Pit[];
}

export class Ground implements GroundInterface {
  private readonly app: PIXI.Application<HTMLCanvasElement>;
  private readonly pits: Pit[] = [];
  private readonly boxes: Box[] = [];
  public readonly sprite: PIXI.Sprite;

  constructor(app: PIXI.Application<HTMLCanvasElement>) {
    this.app = app;
    this.sprite = createSpriteFromImage("assets/img/ground.png", APP_WIDTH, GROUND_HEIGHT, 0, APP_HEIGHT - GROUND_HEIGHT);
  }

  public addPitsAndBoxes(numberOfObstacles: number): void {
    const spaceBetweenObstacles = APP_WIDTH / (numberOfObstacles * 2);

    for (let i = 1; i < numberOfObstacles; i++) {
      const pitX = roundToCeilWithZeroLastDigit(i * spaceBetweenObstacles * 2);
      const pitY = APP_HEIGHT - GROUND_HEIGHT;
      const pit = new Pit(this.app, pitX, pitY, 2, 2, "assets/img/pit.jpg");
      this.pits.push(pit);
      this.app.stage.addChild(pit.sprite);
    }

    for (let i = 1; i < numberOfObstacles; i++) {
      const boxX = roundToCeilWithZeroLastDigit(i * spaceBetweenObstacles * 2 + spaceBetweenObstacles);
      const boxY = APP_HEIGHT - GROUND_HEIGHT - BASE_ENTITY_SIZE * i;
      const box = new Box(this.app, boxX, boxY, 1, i, "assets/img/box.jpg");
      this.boxes.push(box);
      this.app.stage.addChild(box.sprite);
    }
  }

  public getPits(): Pit[] {
    return this.pits;
  }

  public getBoxes(): Box[] {
    return this.boxes;
  }
}
