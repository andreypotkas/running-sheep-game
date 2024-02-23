import * as PIXI from "pixi.js";
import { createSpriteFromImage } from "../components/utils";
import { APP_HEIGHT, APP_WIDTH, BASE_ENTITY_SIZE, GROUND_HEIGHT, GROUND_LEVEL } from "../constants";
import { roundToCeilWithZeroLastDigit } from "../lib/utils";
import { Box } from "./box";
import { Pit } from "./pit";

export interface GroundInterface {
  sprite: PIXI.Sprite;
  addPitsAndBoxes(): void;
  getPits(): Pit[];
  getBoxes(): Pit[];
}
const groundPitSizes = [
  { w: 2, h: 1 },
  { w: 2, h: 2 },
  { w: 3, h: 1 },
  { w: 2, h: 2 },
  { w: 2, h: 2 },
];

const groundBoxSizes = [
  { w: 2, h: 1 },
  { w: 2, h: 2 },
  { w: 3, h: 2 },
  { w: 2, h: 3 },
  { w: 2, h: 1 },
];

export class Ground implements GroundInterface {
  private readonly app: PIXI.Application<HTMLCanvasElement>;
  private readonly pits: Pit[] = [];
  private readonly boxes: Box[] = [];
  public readonly sprite: PIXI.Sprite;

  constructor(app: PIXI.Application<HTMLCanvasElement>) {
    this.app = app;
    this.sprite = createSpriteFromImage("assets/img/ground.png", APP_WIDTH, GROUND_HEIGHT, 0, APP_HEIGHT - GROUND_HEIGHT);
  }

  public addPitsAndBoxes(): void {
    const spaceBetweenObstacles = APP_WIDTH / ((groundBoxSizes.length + groundPitSizes.length) * 2);

    groundPitSizes.forEach((item, index) => {
      const i = index + 1;
      const pitX = roundToCeilWithZeroLastDigit(i * spaceBetweenObstacles * 2);
      const pitY = APP_HEIGHT - GROUND_HEIGHT;
      const pit = new Pit(this.app, pitX, pitY, item.w, item.h, "assets/img/pit.jpg");
      this.pits.push(pit);
      this.app.stage.addChild(pit.sprite);
    });

    groundBoxSizes.forEach((item, index) => {
      const i = index + 1;

      const boxX = roundToCeilWithZeroLastDigit(i * spaceBetweenObstacles * 2 + spaceBetweenObstacles);
      const boxY = GROUND_LEVEL - BASE_ENTITY_SIZE * item.h;
      const box = new Box(this.app, boxX, boxY, item.w, item.h, "assets/img/box.png");
      this.boxes.push(box);
      this.app.stage.addChild(box.sprite);
    });
  }

  public getPits(): Pit[] {
    return this.pits;
  }

  public getBoxes(): Box[] {
    return this.boxes;
  }
}
