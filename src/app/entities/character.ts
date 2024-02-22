import gsap from "gsap";
import { APP_WIDTH, MOVE_SPEED } from "../constants";
import { Entity, EntityInterface } from "./base";

export interface CharacterInterface extends EntityInterface {
  moveUp(platformHeight: number): void;
  moveForward(): void;
  isFinishReached: () => boolean;
  moveDown: (num: number) => void;
  update: () => void;
}

export class Character extends Entity {
  constructor(x: number, y: number, widthCount: number, heightCount: number, resource: string) {
    super(x, y, widthCount, heightCount, resource);
  }

  public update() {
    this.moveForward();
    this.scrollToCenterIfNeeded();
  }

  public moveUp(platformHeight: number): void {
    gsap.to(this.sprite, { duration: 0.1, y: this.sprite.y - platformHeight });
  }

  public moveForward() {
    this.sprite.x += MOVE_SPEED;
  }

  public moveDown(number: number) {
    this.sprite.y += number;
  }

  public isFinishReached() {
    return !!(this.x >= APP_WIDTH - 200);
  }

  private scrollToCenterIfNeeded() {
    const screenCenterX = window.innerWidth / 2;
    window.scroll(this.x - screenCenterX, 0);
  }
}
