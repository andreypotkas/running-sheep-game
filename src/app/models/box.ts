import * as PIXI from "pixi.js";

export class Box {
  public readonly graphics: PIXI.Graphics;
  public readonly size: { width: number; height: number };

  constructor(x: number, y: number, widthCount: number, heightCount: number) {
    this.graphics = new PIXI.Graphics();
    this.graphics.beginFill("orange");
    this.graphics.drawRect(0, 0, 100 * widthCount, 100 * heightCount);
    this.graphics.position.set(x, y - 100 * (heightCount - 1));
    this.size = { width: 100 * widthCount, height: 100 * heightCount };
  }
}
