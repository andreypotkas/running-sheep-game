import * as PIXI from "pixi.js";

export class Pit {
  public readonly graphics: PIXI.Graphics;
  public readonly size: { width: number; height: number };

  constructor(x: number, y: number, widthCount: number, depthCount: number) {
    this.graphics = new PIXI.Graphics();
    this.graphics.beginFill("blue");
    this.graphics.drawRect(0, 0, 100 * widthCount, 100 * depthCount);
    this.graphics.position.set(x, y);
    this.size = { width: 100 * widthCount, height: 100 * depthCount };
  }
}
