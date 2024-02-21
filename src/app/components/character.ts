import gsap from "gsap";
import * as PIXI from "pixi.js";
import { APP_HEIGHT, MOVE_SPEED } from "../constants";

export interface CharacterInterface {
  sprite: PIXI.Sprite;
  moveUp(squareHeight: number): void;
  getPositionX(): number;
  moveForward(): void;
}

export class Character {
  private readonly texture: PIXI.Texture;
  public readonly sprite: PIXI.Sprite;

  constructor() {
    this.texture = PIXI.Texture.from("assets/img/character.jpg");
    this.sprite = new PIXI.Sprite(this.texture);
    this.sprite.position.set(0, APP_HEIGHT - 280);
  }

  public moveUp(squareHeight: number): void {
    gsap.to(this.sprite, { duration: 0.1, y: this.sprite.y - squareHeight });
  }

  public getPositionX() {
    return this.sprite.x + this.sprite.width;
  }

  public moveForward() {
    this.sprite.x += MOVE_SPEED;
  }
}
