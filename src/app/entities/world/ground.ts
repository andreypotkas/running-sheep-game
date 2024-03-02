import * as PIXI from "pixi.js";
import { appConfig } from "../../../app";
import { roundToCeilWithZeroLastDigit } from "../../lib/utils";
import { createLevelGround } from "../../scenes/utils";
import { Box } from "../obstacles/box";
import { Pit } from "../obstacles/pit";

export interface GroundInterface {
  sprites: PIXI.Sprite[];
  addPitsAndBoxes(): void;
  getPits(): Pit[];
  getBoxes(): Box[];
}
const groundPitSizes = [
  { w: 2, h: 2 },
  { w: 2, h: 2 },
  { w: 2, h: 2 },
  { w: 2, h: 2 },
  { w: 2, h: 2 },
  { w: 2, h: 2 },
  { w: 2, h: 2 },
  { w: 2, h: 2 },
];

const groundBoxSizes = [
  { w: 1, h: 2 },
  { w: 1, h: 3 },
  { w: 1, h: 2 },
  { w: 1, h: 1 },
  { w: 1, h: 3 },
  { w: 1, h: 2 },
  { w: 1, h: 1 },
  { w: 1, h: 3 },
];

export class Ground implements GroundInterface {
  private readonly container: PIXI.Container;
  private readonly pits: Pit[] = [];
  private readonly boxes: Box[] = [];
  public readonly sprites: PIXI.Sprite[] = [];

  constructor(container: PIXI.Container) {
    this.container = container;
    this.sprites = createLevelGround(appConfig.constants.GAME_WIDTH, appConfig.constants.STAGE_SIZE);
  }

  public addPitsAndBoxes(): void {
    const spaceBetweenObstacles = (appConfig.constants.GAME_WIDTH - appConfig.constants.APP_WIDTH * 2) / (groundBoxSizes.length + groundPitSizes.length);

    groundPitSizes.forEach((item, index) => {
      const pitX = roundToCeilWithZeroLastDigit(window.innerWidth + index * spaceBetweenObstacles * 2);
      const pitY = appConfig.constants.GROUND_LEVEL;
      const pit = new Pit(this.container, pitX, pitY, item.w, item.h, "assets/img/base-bg.jpg");
      this.pits.push(pit);
      this.container.addChild(...pit.sprites);
    });

    groundBoxSizes.forEach((item, index) => {
      const boxX = roundToCeilWithZeroLastDigit(window.innerWidth + index * spaceBetweenObstacles * 2 + spaceBetweenObstacles);
      const boxY = appConfig.constants.GROUND_LEVEL - appConfig.constants.BASE_SIZE * item.h;
      const box = new Box(this.container, boxX, boxY, item.w, item.h, "assets/img/box-light.png");
      this.boxes.push(box);
      this.container.addChild(...box.sprites);
    });
  }

  public getPits(): Pit[] {
    return this.pits;
  }

  public getBoxes(): Box[] {
    return this.boxes;
  }
}
