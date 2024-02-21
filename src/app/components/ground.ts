import * as PIXI from "pixi.js";
import { APP_HEIGHT, APP_WIDTH, GROUND_HEIGHT } from "../constants";
import { Box } from "../models/box";
import { Pit } from "../models/pit";

export class Ground {
  private readonly ground: PIXI.Graphics;
  private readonly app: PIXI.Application<HTMLCanvasElement>;

  constructor(app: PIXI.Application<HTMLCanvasElement>) {
    this.app = app;
    this.ground = new PIXI.Graphics();
    this.ground.beginFill(0x8b4513);
    this.ground.drawRect(0, APP_HEIGHT - GROUND_HEIGHT, APP_WIDTH, GROUND_HEIGHT);
    this.ground.endFill();
    this.app.stage.addChild(this.ground);
    this.addPitsAndBoxes(5);
  }

  public addPitsAndBoxes(numberOfObstacles: number): void {
    const spaceBetweenObstacles = APP_WIDTH / (numberOfObstacles * 2);

    for (let i = 0; i < numberOfObstacles; i++) {
      const pitX = i * spaceBetweenObstacles * 2;
      const pitY = APP_HEIGHT - GROUND_HEIGHT;
      this.addPit(pitX, pitY, 2, 2);
    }

    for (let i = 0; i < numberOfObstacles; i++) {
      const boxX = i * spaceBetweenObstacles * 2 + spaceBetweenObstacles;
      const boxY = APP_HEIGHT - GROUND_HEIGHT - 100;
      this.addBox(boxX, boxY, 2, i);
    }
  }

  private addPit(x: number, y: number, width: number, depth: number): void {
    const pit = new Pit(x, y, width, depth).graphics;
    this.app.stage.addChild(pit);
  }

  private addBox(x: number, y: number, width: number, height: number): void {
    const box = new Box(x, y, width, height).graphics;
    this.app.stage.addChild(box);
  }
}
