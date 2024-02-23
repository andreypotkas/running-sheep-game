import * as PIXI from "pixi.js";
import { APP_WIDTH } from "../constants";
import { MovableEntity, MovableEntityInterface } from "./movable";
import { Platform, PlatformInterface } from "./platform";

export interface CharacterInterface extends MovableEntityInterface {
  platforms: PlatformInterface[];
  movingPlatforms: PlatformInterface[];
  isFinishReached: () => boolean;
  update: (callback: () => void) => void;
}

export class Character extends MovableEntity {
  public platforms: PlatformInterface[] = [];

  constructor(app: PIXI.Application<HTMLCanvasElement>, x: number, y: number, widthCount: number, heightCount: number, resource: string) {
    super(app, x, y, widthCount, heightCount, resource);

    window.addEventListener("keydown", (e) => this.handleKeyDown(e));
    window.addEventListener("touchstart", (e) => this.handleTouch(e));
  }

  public get movingPlatforms() {
    return this.platforms.filter((platform) => platform.isMoving);
  }

  public update(callback: () => void) {
    this.moveForward();
    this.movingPlatforms.forEach((platform: PlatformInterface) => platform.moveForward());
    if (this.isFinishReached()) callback();
  }

  public isFinishReached() {
    return !!(this.x >= APP_WIDTH - 200);
  }

  private addPlatform() {
    const platform = new Platform(this.app, this.x, this.estimatedBottomY, 1, 1, "assets/img/platform.png");
    this.app.stage.addChild(platform.sprite);
    this.platforms.push(platform);
  }

  private handleKeyDown(e: KeyboardEvent) {
    if (e.code === "Space") {
      this.moveUp();
      this.addPlatform();
    }
  }

  private handleTouch(e: TouchEvent) {
    this.moveUp();
    this.addPlatform();
  }
}
