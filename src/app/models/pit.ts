import * as PIXI from "pixi.js";

export class Pit {
  public readonly graphics: PIXI.Graphics;
  public readonly size: { width: number; height: number };

  constructor(x: number, y: number) {
    this.graphics = new PIXI.Graphics();
    this.graphics.beginFill(0x000000); // Black color for pit
    this.graphics.drawRect(0, 0, 100, 100); // Adjust size as needed
    this.graphics.position.set(x, y);
    this.size = { width: 100, height: 100 };
  }
}
