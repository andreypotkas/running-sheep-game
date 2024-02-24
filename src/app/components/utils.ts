import * as PIXI from "pixi.js";
import { APP_HEIGHT, APP_WIDTH } from "../constants";
import { Cloud, CloudConfig } from "../entities/cloud";

export function renderResetButton(positionX: number) {
  const restartButton = new PIXI.Text("Restart", { fontSize: 48, fill: "yellow", fontWeight: "bold" });
  restartButton.interactive = true;
  restartButton.anchor.set(0.5);

  const centerY = window.screen.height / 2;

  restartButton.position.set(positionX, centerY);

  restartButton.on("pointerdown", () => {
    window.location.reload();
  });

  return restartButton;
}

export function createSpriteFromImage(image: string, width: number, height: number, positionX: number, positionY: number) {
  const texture = PIXI.Texture.from(image);
  const sprite = new PIXI.Sprite(texture);
  sprite.width = width;
  sprite.height = height;
  sprite.position.set(positionX, positionY);

  return sprite;
}

export function generateAppBackgroundElements() {
  const cloudsData = [
    { imageId: 1, width: 3, height: 2 },
    { imageId: 2, width: 3, height: 2 },
    { imageId: 3, width: 3, height: 2 },
    { imageId: 1, width: 3, height: 2 },
    { imageId: 2, width: 3, height: 2 },
    { imageId: 3, width: 3, height: 2 },
    { imageId: 1, width: 3, height: 2 },
    { imageId: 2, width: 3, height: 2 },
    { imageId: 3, width: 3, height: 2 },
    { imageId: 1, width: 3, height: 2 },
    { imageId: 2, width: 3, height: 2 },
    { imageId: 3, width: 3, height: 2 },
    { imageId: 2, width: 3, height: 2 },
    { imageId: 3, width: 3, height: 2 },
    { imageId: 1, width: 3, height: 2 },
    { imageId: 2, width: 3, height: 2 },
    { imageId: 3, width: 3, height: 2 },
    { imageId: 2, width: 3, height: 2 },
    { imageId: 3, width: 3, height: 2 },
    { imageId: 1, width: 3, height: 2 },
    { imageId: 2, width: 3, height: 2 },
    { imageId: 3, width: 3, height: 2 },
  ];

  const background = createSpriteFromImage("assets/img/base-bg.jpg", APP_WIDTH, APP_HEIGHT, 0, 0);
  const mountains = [
    createSpriteFromImage("assets/img/mountain.png", APP_WIDTH / 4, APP_HEIGHT / 2, 0, 100),
    createSpriteFromImage("assets/img/mountain.png", APP_WIDTH / 4, APP_HEIGHT / 2, APP_WIDTH * 0.25, 100),
    createSpriteFromImage("assets/img/mountain.png", APP_WIDTH / 4, APP_HEIGHT / 2, APP_WIDTH * 0.5, 100),
    createSpriteFromImage("assets/img/mountain.png", APP_WIDTH / 4, APP_HEIGHT / 2, APP_WIDTH * 0.75, 100),
  ];

  // Usage:
  const clouds: Cloud[] = cloudsData.map((item: CloudConfig, index) => {
    return new Cloud(item, index);
  });

  return { background, mountains, clouds };
}
