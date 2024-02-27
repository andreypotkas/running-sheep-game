import * as PIXI from "pixi.js";
import type { MovableEntityInterface } from "../base/movable";
import { MovableEntity } from "../base/movable";

export interface PlatformInterface extends MovableEntityInterface {
  isMoving: boolean;
  stop(): void;
}

export class Platform extends MovableEntity {
  isMoving: boolean;
  constructor(app: PIXI.Container, x: number, y: number, widthCount: number, heightCount: number, resource: string) {
    super(app, x, y, widthCount, heightCount, resource);
    this.isMoving = true;
  }

  public stop() {
    this.isMoving = false;
  }
}
