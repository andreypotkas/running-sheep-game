import gsap from "gsap";
import * as PIXI from "pixi.js";

import { appConfig } from "../../../app";
import { createSpriteFromImage } from "../../lib/utils";

export interface CloudConfig {
  imageId: number;
  height: number;
  width: number;
}

export class Cloud {
  private containerWidth: number;
  private posX: number;
  public readonly sprite: PIXI.Sprite;

  constructor(containerWidth: number, config: CloudConfig, index: number) {
    this.containerWidth = containerWidth;

    const cloudHeight = appConfig.constants.BASE_SIZE * config.height;
    const cloudWidth = appConfig.constants.BASE_SIZE * config.width;

    const posY = (Math.random() * appConfig.constants.APP_HEIGHT) / 3;
    this.posX = appConfig.constants.BASE_SIZE * 10 + index * 5 * appConfig.constants.BASE_SIZE;

    this.sprite = createSpriteFromImage(`assets/img/clouds/${config.imageId}.png`, cloudWidth, cloudHeight, this.posX, posY);
    const initialDuration = (this.posX / this.containerWidth) * 20;

    this.animateSprite(initialDuration);
  }

  private animateSprite(duration: number) {
    gsap.to(this.sprite, {
      duration,
      x: -300,
      ease: "linear",
      onComplete: () => {
        this.sprite.x = this.containerWidth;
        this.animateSprite(60);
      },
    });
  }
}
