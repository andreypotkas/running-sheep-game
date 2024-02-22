import { Entity, EntityInterface } from "./base";

export interface PitInterface extends EntityInterface {}

export class Pit extends Entity {
  constructor(x: number, y: number, widthCount: number, heightCount: number, resource: string) {
    super(x, y, widthCount, heightCount, resource);
  }
}
