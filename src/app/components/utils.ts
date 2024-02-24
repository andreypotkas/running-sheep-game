import * as PIXI from "pixi.js";
import { APP_HEIGHT, APP_WIDTH, BASE_SIZE, GROUND_HEIGHT } from "../constants";
import { Character } from "../entities/character";
import { Cloud, CloudConfig } from "../entities/cloud";
import { Ground } from "../entities/ground";
import { TopBarContainer } from "../entities/topBar";
import { createSpriteFromImage } from "../lib/utils";

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

export function initCommonAppElements(toggleFullScreenCallback: () => void) {
  const app = new PIXI.Application<HTMLCanvasElement>({ width: APP_WIDTH, height: APP_HEIGHT, resizeTo: window });
  const topBar = new TopBarContainer(0, 0, window.innerWidth, 2 * BASE_SIZE, toggleFullScreenCallback);
  const character = new Character(app, 0, APP_HEIGHT - GROUND_HEIGHT - BASE_SIZE, 1, 1, "assets/img/character.png");
  const ground = new Ground(app);
  const clouds: PIXI.Sprite[] = cloudsData.map((item: CloudConfig, index) => {
    return new Cloud(item, index).sprite;
  });
  const background = createSpriteFromImage("assets/img/base-bg.jpg", APP_WIDTH, APP_HEIGHT, 0, 0);
  const mountains = [
    createSpriteFromImage("assets/img/mountain.png", APP_WIDTH / 4, APP_HEIGHT / 2, 0, 100),
    createSpriteFromImage("assets/img/mountain.png", APP_WIDTH / 4, APP_HEIGHT / 2, APP_WIDTH * 0.25, 100),
    createSpriteFromImage("assets/img/mountain.png", APP_WIDTH / 4, APP_HEIGHT / 2, APP_WIDTH * 0.5, 100),
    createSpriteFromImage("assets/img/mountain.png", APP_WIDTH / 4, APP_HEIGHT / 2, APP_WIDTH * 0.75, 100),
  ];
  return { app, background, mountains, clouds, character, ground, topBar };
}
