import gsap from "gsap";
import * as PIXI from "pixi.js";

import { appConfig } from "../../app";
import { createSpriteFromImage } from "../lib/utils";

export interface CloudConfig {
  imageId: number;
  height: number;
  width: number;
}

export class Cloud {
  posX: number;
  public readonly sprite: PIXI.Sprite;
  constructor(config: CloudConfig, index: number) {
    const cloudHeight = appConfig.constants.BASE_SIZE * config.height;
    const cloudWidth = appConfig.constants.BASE_SIZE * config.width;
    const posY = (Math.random() * appConfig.constants.APP_HEIGHT) / 3;
    this.posX = appConfig.constants.BASE_SIZE * 10 + index * 5 * appConfig.constants.BASE_SIZE;

    this.sprite = createSpriteFromImage(`assets/img/clouds/${config.imageId}.png`, cloudWidth, cloudHeight, this.posX, posY);
    const initialDuration = (this.posX / appConfig.constants.APP_WIDTH) * 100;

    this.animateSprite(initialDuration);
  }

  private animateSprite(duration: number) {
    gsap.to(this.sprite, {
      duration,
      x: -300,
      ease: "linear",
      onComplete: () => {
        this.sprite.x = appConfig.constants.APP_WIDTH;
        this.animateSprite(50);
      },
    });
  }
}
