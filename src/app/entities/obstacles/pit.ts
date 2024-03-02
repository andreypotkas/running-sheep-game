import * as PIXI from "pixi.js";
import { appConfig } from "../../../app";
import { createSpriteFromImage } from "../../lib/utils";
import { Entity, EntityInterface } from "../base/base";

export interface PitInterface extends EntityInterface {
  sprites: PIXI.Sprite[];
}

export class Pit extends Entity {
  public sprites: PIXI.Sprite[] = [];
  constructor(app: PIXI.Container, x: number, y: number, widthCount: number, heightCount: number, resource: string) {
    super(app, x, y, widthCount, heightCount, resource);

    for (let i = 0; i < heightCount; i++) {
      if (i === 0) {
        for (let j = 0; j < widthCount; j++) {
          const topPart = this.generateTopPart(x + j * appConfig.constants.BASE_SIZE, y);
          this.sprites.push(topPart);
        }
        continue;
      }

      for (let j = 0; j < widthCount; j++) {
        const topPart = this.generateBottomtPart(x + j * appConfig.constants.BASE_SIZE, y + appConfig.constants.BASE_SIZE * i);

        this.sprites.push(topPart);
      }
    }
  }

  private generateTopPart(x: number, y: number) {
    return createSpriteFromImage("assets/img/top-pit.png", appConfig.constants.BASE_SIZE, appConfig.constants.BASE_SIZE, x, y);
  }

  private generateBottomtPart(x: number, y: number) {
    return createSpriteFromImage("assets/img/pit.jpg", appConfig.constants.BASE_SIZE, appConfig.constants.BASE_SIZE, x, y);
  }
}
