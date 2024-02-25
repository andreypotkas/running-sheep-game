import * as PIXI from "pixi.js";
import { Entity, EntityInterface } from "./base";

export interface PitInterface extends EntityInterface {}

export class Pit extends Entity {
  constructor(app: PIXI.Container, x: number, y: number, widthCount: number, heightCount: number, resource: string) {
    super(app, x, y, widthCount, heightCount, resource);
  }
}
