import * as PIXI from "pixi.js";
import { soundManager } from "../../app";
import { roundToCeilWithZeroLastDigit } from "../lib/utils";
import { MovableEntity, MovableEntityInterface } from "./movable";
import { Platform, PlatformInterface } from "./platform";

export interface CharacterInterface extends MovableEntityInterface {
  platforms: PlatformInterface[];
  movingPlatforms: PlatformInterface[];
  update(): void;
  handleStartGame(): void;
  handleEndGame(): void;
}

export class Character extends MovableEntity {
  public platforms: PlatformInterface[] = [];
  private container: PIXI.Container;

  constructor(container: PIXI.Container, x: number, y: number, widthCount: number, heightCount: number, resource: string) {
    super(container, x, y, widthCount, heightCount, resource);
    this.container = container;
    this.x = roundToCeilWithZeroLastDigit(window.innerWidth / 10);
  }
  private boundHandleInteraction = this.handleInteraction.bind(this);

  public get movingPlatforms() {
    return this.platforms.filter((platform) => platform.isMoving);
  }

  public update() {
    this.moveForward();
    this.movingPlatforms.forEach((platform: PlatformInterface) => platform.moveForward());
  }

  public handleStartGame() {
    window.addEventListener("keydown", this.boundHandleInteraction);
    window.addEventListener("touchstart", this.boundHandleInteraction);
  }

  public handleEndGame() {
    window.removeEventListener("keydown", this.boundHandleInteraction);
    window.removeEventListener("touchstart", this.boundHandleInteraction);
  }

  private addPlatform() {
    const platform = new Platform(this.container, this.x, this.estimatedBottomY, 1, 1, "assets/img/platform.png");
    this.container.addChild(platform.sprite);
    this.platforms.push(platform);
    soundManager.playJumpSound();
  }

  private handleInteraction(e: KeyboardEvent | TouchEvent) {
    if (this.movingPlatforms.length > 2) return;

    this.moveUp();
    this.addPlatform();
  }
}
