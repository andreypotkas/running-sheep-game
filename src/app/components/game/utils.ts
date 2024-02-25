import * as PIXI from "pixi.js";
import { appConfig } from "../../../app";
import { Character } from "../../entities/character";
import { Cloud, CloudConfig } from "../../entities/cloud";
import { Ground } from "../../entities/ground";
import { TopBarContainer } from "../../entities/topBar";
import { createSpriteFromImage } from "../../lib/utils";

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
  // { imageId: 2, width: 3, height: 2 },
  // { imageId: 3, width: 3, height: 2 },
  // { imageId: 1, width: 3, height: 2 },
  // { imageId: 2, width: 3, height: 2 },
  // { imageId: 3, width: 3, height: 2 },
  // { imageId: 2, width: 3, height: 2 },
  // { imageId: 3, width: 3, height: 2 },
  // { imageId: 1, width: 3, height: 2 },
  // { imageId: 2, width: 3, height: 2 },
  // { imageId: 3, width: 3, height: 2 },
];

export function initCommonAppElements(toggleFullScreenCallback: () => void) {
  const container = new PIXI.Container();
  const topBar = new TopBarContainer(0, 0, window.innerWidth, appConfig.constants.BASE_SIZE, toggleFullScreenCallback);
  const character = new Character(container, 0, appConfig.constants.APP_HEIGHT - appConfig.constants.GROUND_HEIGHT - appConfig.constants.BASE_SIZE, 1, 1, "assets/img/character.png");
  const ground = new Ground(container);
  const finishLine = createSpriteFromImage(
    "assets/img/finish-line.png",
    appConfig.constants.BASE_SIZE,
    appConfig.constants.APP_HEIGHT / 2,
    appConfig.constants.GAME_WIDTH - window.screen.width - appConfig.constants.BASE_SIZE * 3,
    appConfig.constants.APP_HEIGHT / 2 - appConfig.constants.GROUND_HEIGHT
  );

  const clouds: PIXI.Sprite[] = cloudsData.map((item: CloudConfig, index) => {
    return new Cloud(container.width, item, index).sprite;
  });
  const background = createSpriteFromImage("assets/img/base-bg.jpg", appConfig.constants.GAME_WIDTH, appConfig.constants.APP_HEIGHT, 0, 0);
  const mountains = [
    createSpriteFromImage("assets/img/mountain.png", appConfig.constants.GAME_WIDTH / 4, appConfig.constants.APP_HEIGHT / 2, 0, 100),
    createSpriteFromImage("assets/img/mountain.png", appConfig.constants.GAME_WIDTH / 4, appConfig.constants.APP_HEIGHT / 2, appConfig.constants.GAME_WIDTH * 0.25, 100),
    createSpriteFromImage("assets/img/mountain.png", appConfig.constants.GAME_WIDTH / 4, appConfig.constants.APP_HEIGHT / 2, appConfig.constants.GAME_WIDTH * 0.5, 100),
    createSpriteFromImage("assets/img/mountain.png", appConfig.constants.GAME_WIDTH / 4, appConfig.constants.APP_HEIGHT / 2, appConfig.constants.GAME_WIDTH * 0.75, 100),
  ];
  return { container, background, mountains, clouds, character, ground, topBar, finishLine };
}

export function initMenuBackground(container: PIXI.Container) {
  const background = createSpriteFromImage("assets/img/base-bg.jpg", appConfig.constants.GAME_WIDTH, appConfig.constants.APP_HEIGHT, 0, 0);
  const mountains = [
    createSpriteFromImage("assets/img/mountain.png", appConfig.constants.APP_WIDTH / 2, appConfig.constants.APP_HEIGHT / 2, 0, 100),
    createSpriteFromImage("assets/img/mountain.png", appConfig.constants.APP_WIDTH / 2, appConfig.constants.APP_HEIGHT / 2, (appConfig.constants.APP_HEIGHT / 2) * 0.25, 100),
  ];
  const clouds: PIXI.Sprite[] = cloudsData.map((item: CloudConfig, index) => {
    return new Cloud(appConfig.constants.APP_WIDTH, item, index).sprite;
  });

  container.addChild(background, ...mountains, ...clouds);
}
