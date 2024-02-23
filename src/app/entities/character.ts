import gsap from "gsap";
import * as PIXI from "pixi.js";
import { APP_WIDTH, BASE_ENTITY_SIZE, MOVE_SPEED } from "../constants";
import { Entity, EntityInterface } from "./base";
import { Platform, PlatformInterface } from "./platform";

export interface CharacterInterface extends EntityInterface {
  platforms: PlatformInterface[];
  moveUp(platformHeight: number): void;
  moveForward(): void;
  isFinishReached: () => boolean;
  moveDown: (num: number) => void;
  update: (callback: () => void) => void;
}

export class Character extends Entity {
  public platforms: PlatformInterface[] = [];

  constructor(app: PIXI.Application<HTMLCanvasElement>, x: number, y: number, widthCount: number, heightCount: number, resource: string) {
    super(app, x, y, widthCount, heightCount, resource);

    window.addEventListener("keydown", (e) => this.handleJump(e));
  }

  public update(callback: () => void) {
    this.moveForward();
    this.scrollWindowToCenter();
    this.platforms.filter((item) => item.isMoving).forEach((platform: PlatformInterface) => platform.moveForward());
    if (this.isFinishReached()) callback();
  }

  public moveUp(): void {
    this.y = this.sprite.y - BASE_ENTITY_SIZE;
  }

  public moveForward() {
    this.x += MOVE_SPEED;
  }

  public moveDown(steps: number) {
    gsap.to(this.sprite, { duration: 0.2 * steps, y: this.sprite.y + BASE_ENTITY_SIZE * steps });
    this.platforms.filter((item) => item.isMoving).forEach((item) => item.moveDown(steps));
  }

  public isFinishReached() {
    return !!(this.x >= APP_WIDTH - 200);
  }

  private scrollWindowToCenter() {
    const screenCenterX = window.innerWidth / 2;
    window.scroll(this.x - screenCenterX, 0);
  }

  private addPlatform() {
    const platform = new Platform(this.app, this.x, this.y, 1, 1, "assets/img/platform.jpg");
    this.app.stage.addChild(platform.sprite);
    this.platforms.push(platform);
    this.moveUp();
  }

  private handleJump(e: KeyboardEvent) {
    if (e.code === "Space") setTimeout(() => this.addPlatform(), 0);
  }
}
