import * as PIXI from "pixi.js";
import { MOVE_SPEED } from "../constants";

export interface SquareInterface {
  graphics: PIXI.Graphics;
  size: {
    width: number;
    height: number;
  };
  moveForward(): void;
}

export class Square implements SquareInterface {
  public readonly graphics: PIXI.Graphics;
  public readonly size: { width: number; height: number };

  constructor(x: number, y: number) {
    this.graphics = new PIXI.Graphics();
    this.graphics.beginFill(0xff0000);
    this.graphics.drawRect(0, -100, 100, 100);
    this.graphics.position.set(x, y);
    this.size = { width: 100, height: 100 };
  }

  public moveForward() {
    this.graphics.x += MOVE_SPEED;
  }
}
