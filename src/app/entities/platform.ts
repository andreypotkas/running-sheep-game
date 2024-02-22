import { MOVE_SPEED } from "../constants";
import { Entity, EntityInterface } from "./base";

export interface PlatformInterface extends EntityInterface {
  moveForward(): void;
}

export class Platform extends Entity {
  private readonly resource: string = "assets/img/platform.jpg";
  constructor(x: number, y: number, widthCount: number, heightCount: number, resource: string) {
    super(x, y, widthCount, heightCount, resource);
  }

  public moveForward() {
    this.sprite.x += MOVE_SPEED;
  }
}
