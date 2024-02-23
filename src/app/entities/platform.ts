import gsap from "gsap";
import * as PIXI from "pixi.js";
import { BASE_ENTITY_SIZE, MOVE_SPEED } from "../constants";
import { Entity, EntityInterface } from "./base";

export interface PlatformInterface extends EntityInterface {
  isMoving: boolean;
  moveForward(): void;
  moveDown(steps: number): void;
  stop(): void;
}

export class Platform extends Entity {
  isMoving: boolean;
  constructor(app: PIXI.Application<HTMLCanvasElement>, x: number, y: number, widthCount: number, heightCount: number, resource: string) {
    super(app, x, y, widthCount, heightCount, resource);
    this.isMoving = true;
  }

  public moveForward() {
    this.sprite.x += MOVE_SPEED;
  }

  public moveDown(steps: number) {
    gsap.to(this.sprite, { duration: 0.2 * steps, y: this.y + BASE_ENTITY_SIZE * steps });
  }

  public stop() {
    this.isMoving = false;
  }
}
