import * as PIXI from "pixi.js";
import { Entity, EntityInterface } from "../base/base";

export interface BoxInterface extends EntityInterface {}

export class Box extends Entity {
  constructor(app: PIXI.Container, x: number, y: number, widthCount: number, heightCount: number, resource: string) {
    super(app, x, y, widthCount, heightCount, resource);
  }
}