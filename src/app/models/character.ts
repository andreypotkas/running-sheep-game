import gsap from "gsap";
import * as PIXI from "pixi.js";
import { APP_HEIGHT, APP_WIDTH, MOVE_SPEED } from "../constants";

export interface CharacterInterface {
  sprite: PIXI.Sprite;
  x: number;
  moveUp(squareHeight: number): void;
  moveForward(): void;
  isFinishReached: () => boolean;
}

export class Character {
  private readonly texture: PIXI.Texture;
  public readonly sprite: PIXI.Sprite;

  constructor() {
    this.texture = PIXI.Texture.from("assets/img/character.jpg");
    this.sprite = new PIXI.Sprite(this.texture);
    this.sprite.width = 100;
    this.sprite.height = 100;
    this.sprite.position.set(0, APP_HEIGHT - 400);
  }

  public moveUp(squareHeight: number): void {
    gsap.to(this.sprite, { duration: 0.1, y: this.sprite.y - squareHeight });
  }

  public get x() {
    return this.sprite.x + this.sprite.width;
  }

  public moveForward() {
    this.sprite.x += MOVE_SPEED;
  }

  public isFinishReached() {
    return !!(this.x >= APP_WIDTH - 200);
  }
}
