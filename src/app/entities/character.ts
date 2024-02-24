import * as PIXI from "pixi.js";
import { roundToCeilWithZeroLastDigit } from "../lib/utils";
import { MovableEntity, MovableEntityInterface } from "./movable";
import { Platform, PlatformInterface } from "./platform";

export interface CharacterInterface extends MovableEntityInterface {
  platforms: PlatformInterface[];
  movingPlatforms: PlatformInterface[];
  update(): void;
  handleStartGame(): void;
}

export class Character extends MovableEntity {
  public platforms: PlatformInterface[] = [];

  constructor(app: PIXI.Application<HTMLCanvasElement>, x: number, y: number, widthCount: number, heightCount: number, resource: string) {
    super(app, x, y, widthCount, heightCount, resource);
    this.x = roundToCeilWithZeroLastDigit(window.innerWidth / 10);
  }

  public get movingPlatforms() {
    return this.platforms.filter((platform) => platform.isMoving);
  }

  public update() {
    this.moveForward();
    this.movingPlatforms.forEach((platform: PlatformInterface) => platform.moveForward());
  }

  public handleStartGame() {
    window.addEventListener("keydown", (e) => this.handleInteraction(e));
    window.addEventListener("touchstart", (e) => this.handleInteraction(e));
  }

  private addPlatform() {
    const platform = new Platform(this.app, this.x, this.estimatedBottomY, 1, 1, "assets/img/platform.png");
    this.app.stage.addChild(platform.sprite);
    this.platforms.push(platform);
  }

  private handleInteraction(e: KeyboardEvent | TouchEvent) {
    if (this.movingPlatforms.length > 3) return;

    this.moveUp();
    this.addPlatform();
  }
}
