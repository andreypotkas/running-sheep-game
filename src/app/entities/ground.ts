import * as PIXI from "pixi.js";
import { appConfig } from "../appConfig";
import { createSpriteFromImage, roundToCeilWithZeroLastDigit } from "../lib/utils";
import { Box } from "./box";
import { Pit } from "./pit";

export interface GroundInterface {
  sprite: PIXI.Sprite;
  addPitsAndBoxes(): void;
  getPits(): Pit[];
  getBoxes(): Pit[];
}
const groundPitSizes = [
  { w: 2, h: 2 },
  { w: 2, h: 2 },
  { w: 2, h: 2 },
  { w: 2, h: 2 },
  { w: 2, h: 2 },
];

const groundBoxSizes = [
  { w: 1, h: 2 },
  { w: 1, h: 1 },
  { w: 1, h: 2 },
  { w: 1, h: 1 },
  { w: 1, h: 2 },
  { w: 1, h: 1 },
];

export class Ground implements GroundInterface {
  private readonly app: PIXI.Application<HTMLCanvasElement>;
  private readonly pits: Pit[] = [];
  private readonly boxes: Box[] = [];
  public readonly sprite: PIXI.Sprite;

  constructor(app: PIXI.Application<HTMLCanvasElement>) {
    this.app = app;
    this.sprite = createSpriteFromImage(
      "assets/img/ground.png",
      appConfig.constants.APP_WIDTH,
      appConfig.constants.GROUND_HEIGHT,
      0,
      appConfig.constants.APP_HEIGHT - appConfig.constants.GROUND_HEIGHT
    );
  }

  public addPitsAndBoxes(): void {
    const spaceBetweenObstacles = appConfig.constants.APP_WIDTH / ((groundBoxSizes.length + groundPitSizes.length) * 2);

    groundPitSizes.forEach((item, index) => {
      const pitX = roundToCeilWithZeroLastDigit(window.innerWidth + index * spaceBetweenObstacles * 2);
      const pitY = appConfig.constants.APP_HEIGHT - appConfig.constants.GROUND_HEIGHT;
      const pit = new Pit(this.app, pitX, pitY, item.w, item.h, "assets/img/pit.jpg");
      this.pits.push(pit);
      this.app.stage.addChild(pit.sprite);
    });

    groundBoxSizes.forEach((item, index) => {
      const boxX = roundToCeilWithZeroLastDigit(window.innerWidth + index * spaceBetweenObstacles * 2 + spaceBetweenObstacles);
      const boxY = appConfig.constants.GROUND_LEVEL - appConfig.constants.BASE_SIZE * item.h;
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
