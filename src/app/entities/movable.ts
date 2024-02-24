import gsap from "gsap";
import * as PIXI from "pixi.js";
import { appConfig } from "../../app";
import { Entity, EntityInterface } from "./base";

export interface MovableEntityInterface extends EntityInterface {
  estimatedY: number;
  estimatedBottomY: number;
  moveUp(): void;
  moveForward(): void;
  moveDown(steps: number): void;
}

export class MovableEntity extends Entity implements MovableEntityInterface {
  public estimatedY: number;
  constructor(app: PIXI.Application<HTMLCanvasElement>, x: number, y: number, widthCount: number, heightCount: number, resource: string) {
    super(app, x, y, widthCount, heightCount, resource);
    this.estimatedY = y;
  }

  get estimatedBottomY(): number {
    return this.estimatedY + this.height;
  }

  public moveUp(): void {
    this.estimatedY = this.estimatedY - appConfig.constants.VERTICAL_MOVE_STEP;
  }

  public moveForward() {
    this.x += appConfig.constants.HORIZONTAL_MOVE_STEP;
    gsap.to(this.sprite, { duration: 0.2, y: this.estimatedY });
  }

  public moveDown(steps: number) {
    this.estimatedY = this.estimatedY + appConfig.constants.VERTICAL_MOVE_STEP * steps;
  }
}
