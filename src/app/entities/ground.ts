import * as PIXI from "pixi.js";
import { appConfig } from "../../app";
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
  private readonly container: PIXI.Container;
  private readonly pits: Pit[] = [];
  private readonly boxes: Box[] = [];
  public readonly sprite: PIXI.Sprite;

  constructor(container: PIXI.Container) {
    this.container = container;
    this.sprite = createSpriteFromImage("assets/img/ground.png", appConfig.constants.GAME_WIDTH, appConfig.constants.GROUND_HEIGHT, 0, appConfig.constants.GROUND_LEVEL);
  }

  public addPitsAndBoxes(): void {
    const spaceBetweenObstacles = appConfig.constants.GAME_WIDTH / ((groundBoxSizes.length + groundPitSizes.length) * 2);

    groundPitSizes.forEach((item, index) => {
      const pitX = roundToCeilWithZeroLastDigit(window.innerWidth + index * spaceBetweenObstacles * 2);
      const pitY = appConfig.constants.APP_HEIGHT - appConfig.constants.GROUND_HEIGHT;
      const pit = new Pit(this.container, pitX, pitY, item.w, item.h, "assets/img/pit.jpg");
      this.pits.push(pit);
      this.container.addChild(pit.sprite);
    });

    groundBoxSizes.forEach((item, index) => {
      const boxX = roundToCeilWithZeroLastDigit(window.innerWidth + index * spaceBetweenObstacles * 2 + spaceBetweenObstacles);
      const boxY = appConfig.constants.GROUND_LEVEL - appConfig.constants.BASE_SIZE * item.h;
      const box = new Box(this.container, boxX, boxY, item.w, item.h, "assets/img/box.png");
      this.boxes.push(box);
      this.container.addChild(box.sprite);
    });
  }

  public getPits(): Pit[] {
    return this.pits;
  }

  public getBoxes(): Box[] {
    return this.boxes;
  }
}
