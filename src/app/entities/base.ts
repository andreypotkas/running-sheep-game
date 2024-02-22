import * as PIXI from "pixi.js";
import { createSpriteFromImage } from "../components/utils";
import { BASE_ENTITY_SIZE } from "../constants";

export interface EntityInterface {
  sprite: PIXI.Sprite;
  x: number;
  y: number;
  width: number;
  height: number;
}

export class Entity implements EntityInterface {
  public readonly sprite: PIXI.Sprite;
  public readonly width: number;
  public readonly height: number;

  constructor(x: number, y: number, widthSize: number, heightSize: number, resource: string) {
    this.height = BASE_ENTITY_SIZE * heightSize;
    this.width = BASE_ENTITY_SIZE * widthSize;
    this.sprite = createSpriteFromImage(resource, this.width, this.height, x, y);
  }

  public get x(): number {
    return this.sprite.position.x;
  }

  public set x(value: number) {
    this.sprite.position.x = value;
  }

  public get y(): number {
    return this.sprite.position.y;
  }

  public set y(value: number) {
    this.sprite.position.y = value;
  }
}
