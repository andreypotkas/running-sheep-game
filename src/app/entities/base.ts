import * as PIXI from "pixi.js";
import { createSpriteFromImage } from "../components/utils";
import { BASE_ENTITY_SIZE } from "../constants";

export interface EntityInterface {
  app: PIXI.Application<HTMLCanvasElement>;
  sprite: PIXI.Sprite;
  x: number;
  rightX: number;
  y: number;
  bottomY: number;
  width: number;
  height: number;
  widthSize: number;
  heightSize: number;
}

export class Entity implements EntityInterface {
  public readonly app: PIXI.Application<HTMLCanvasElement>;
  public readonly sprite: PIXI.Sprite;
  public readonly width: number;
  public readonly height: number;
  public readonly widthSize: number;
  public readonly heightSize: number;

  constructor(app: PIXI.Application<HTMLCanvasElement>, x: number, y: number, widthSize: number, heightSize: number, resource: string) {
    this.app = app;

    this.widthSize = widthSize;
    this.heightSize = heightSize;
    this.height = BASE_ENTITY_SIZE * heightSize;
    this.width = BASE_ENTITY_SIZE * widthSize;
    this.sprite = createSpriteFromImage(resource, this.width, this.height, x, y);
  }

  public get x(): number {
    return this.sprite.position.x;
  }

  public get rightX(): number {
    return this.sprite.position.x + this.width;
  }

  public get y(): number {
    return this.sprite.position.y;
  }

  public get bottomY(): number {
    return this.sprite.position.y + this.height;
  }

  public set x(value: number) {
    this.sprite.position.x = value;
  }

  public set y(value: number) {
    this.sprite.position.y = value;
  }
}
