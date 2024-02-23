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

    window.addEventListener("keydown", (e) => this.handleJump(e));
  }

  public get movingPlatforms() {
    return this.platforms.filter((platform) => platform.isMoving);
  }

  public update(callback: () => void) {
    this.moveForward();
    this.scrollWindowToCenter();
    this.movingPlatforms.forEach((platform: PlatformInterface) => platform.moveForward());
    if (this.isFinishReached()) callback();
  }

  public isFinishReached() {
    return !!(this.x >= APP_WIDTH - 200);
  }

  private scrollWindowToCenter() {
    const screenCenterX = window.innerWidth / 2;
    window.scroll(this.x - screenCenterX, 0);
  }

  private addPlatform() {
    const platform = new Platform(this.app, this.x, this.estimatedBottomY, 1, 1, "assets/img/platform.jpg");
    this.app.stage.addChild(platform.sprite);
    this.platforms.push(platform);
  }

  private handleJump(e: KeyboardEvent) {
    if (e.code === "Space") {
      this.moveUp();
      this.addPlatform();
    }
  }
}
