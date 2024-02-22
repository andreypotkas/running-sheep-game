import { Entity, EntityInterface } from "./base";

export interface BoxInterface extends EntityInterface {}

export class Box extends Entity {
  constructor(x: number, y: number, widthCount: number, heightCount: number, resource: string) {
    super(x, y, widthCount, heightCount, resource);
  }
}
