import * as PIXI from "pixi.js";
import { APP_HEIGHT, APP_WIDTH, BASE_ENTITY_SIZE } from "../constants";

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

  const clouds = cloudsData.map((item, index) => {
    const cloadHeight = BASE_ENTITY_SIZE * item.height;
    const cloadWidth = BASE_ENTITY_SIZE * item.width;
    const posX = BASE_ENTITY_SIZE * 10 + index * 5 * BASE_ENTITY_SIZE;
    const posY = (Math.random() * APP_HEIGHT) / 3;
    return createSpriteFromImage(`assets/img/clouds/${item.imageId}.png`, cloadWidth, cloadHeight, posX, posY);
  });

  return { background, mountains, clouds };
}
