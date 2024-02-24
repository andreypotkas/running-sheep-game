import gsap from "gsap";
import * as PIXI from "pixi.js";

import { createSpriteFromImage } from "../components/utils";
import { APP_HEIGHT, APP_WIDTH, BASE_ENTITY_SIZE } from "../constants";

export interface CloudConfig {
  imageId: number;
  height: number;
  width: number;
}

export class Cloud {
  posX: number;
  public readonly sprite: PIXI.Sprite;
  constructor(config: CloudConfig, index: number) {
    const cloudHeight = BASE_ENTITY_SIZE * config.height;
    const cloudWidth = BASE_ENTITY_SIZE * config.width;
    const posY = (Math.random() * APP_HEIGHT) / 3;
    this.posX = BASE_ENTITY_SIZE * 10 + index * 5 * BASE_ENTITY_SIZE;

    this.sprite = createSpriteFromImage(`assets/img/clouds/${config.imageId}.png`, cloudWidth, cloudHeight, this.posX, posY);
    const initialDuration = (this.posX / APP_WIDTH) * 100;

    this.animateSprite(initialDuration);
  }

  private animateSprite(duration: number) {
    gsap.to(this.sprite, {
      duration,
      x: -300,
      ease: "linear",
      onComplete: () => {
        this.sprite.x = APP_WIDTH;
        this.animateSprite(50);
      },
    });
  }
}
