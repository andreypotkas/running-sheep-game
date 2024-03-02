import * as PIXI from "pixi.js";
import { appConfig, soundManager } from "../../app";
import { Character } from "../entities/character/character";
import { TopBarContainer } from "../entities/topBar";
import { Cloud, CloudConfig } from "../entities/world/cloud";
import { Ground } from "../entities/world/ground";
import { createGradientText, createSpriteFromImage } from "../lib/utils";
import { toggleFullScreenButton } from "../ui/buttons/fullscreenToggler";
import { toggleSoundButton } from "../ui/buttons/soundToggler";
import { startGameButton } from "../ui/buttons/startGame";
import { Game } from "./game/game";

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
];

export function initGameScene(container: Game) {
  const { APP_HEIGHT, APP_WIDTH, BASE_SIZE, GROUND_HEIGHT, GAME_WIDTH, STAGE_SIZE } = appConfig.constants;

  const topBar = new TopBarContainer(0, 0, window.innerWidth, BASE_SIZE);
  const character = new Character(container, 0, APP_HEIGHT - GROUND_HEIGHT - BASE_SIZE, 1, 1, "assets/img/character.png");
  const ground = new Ground(container);
  const finishLine = createSpriteFromImage("assets/img/finish-line.png", BASE_SIZE, APP_HEIGHT / 2, GAME_WIDTH - APP_WIDTH - BASE_SIZE * 3, APP_HEIGHT / 2 - GROUND_HEIGHT);

  const clouds: PIXI.Sprite[] = cloudsData.map((item: CloudConfig, index) => new Cloud(GAME_WIDTH, item, index).sprite);
  const background = createSpriteFromImage("assets/img/base-bg.jpg", appConfig.constants.GAME_WIDTH, appConfig.constants.APP_HEIGHT, 0, 0);
  const mountains = createMountains(GAME_WIDTH, STAGE_SIZE);

  container.character = character;
  container.topBar = topBar;

  container.addChild(background, ...mountains, ...ground.sprites, ...clouds, topBar, finishLine);
  ground.addPitsAndBoxes();

  return { container, background, mountains, clouds, character, ground, topBar, finishLine };
}

export function initMenuScene(container: PIXI.Container, toggleFullScreenCallback: () => void, startGameCallback: () => void) {
  const { APP_HEIGHT, APP_WIDTH, BASE_SIZE, GROUND_HEIGHT, GROUND_LEVEL } = appConfig.constants;
  const sun = createSun();
  const background = createSpriteFromImage("assets/img/base-bg.jpg", APP_WIDTH, APP_HEIGHT, 0, 0);
  const mountains = createMountains(APP_WIDTH, 2);

  const ground = createSpriteFromImage("assets/img/ground.png", APP_WIDTH, GROUND_HEIGHT, 0, GROUND_LEVEL);
  const characterIcon = createSpriteFromImage("assets/img/character-icon.png", BASE_SIZE * 2, BASE_SIZE * 2, APP_WIDTH / 2 - BASE_SIZE, BASE_SIZE * 1.5);

  const clouds: PIXI.Sprite[] = cloudsData.slice(0, 10).map((item: CloudConfig, index) => new Cloud(appConfig.constants.APP_WIDTH, item, index).sprite);

  const bestScore = JSON.parse(localStorage.getItem("bestScore") ?? "0");
  const titleText = createGradientText(`Running Sheep`.toUpperCase(), BASE_SIZE * 0.55, appConfig.constants.APP_WIDTH / 2, appConfig.constants.BASE_SIZE / 2);
  const bestScoreText = createGradientText(`Best Score: ${bestScore}`, BASE_SIZE * 0.45, appConfig.constants.APP_WIDTH / 2, appConfig.constants.APP_HEIGHT - appConfig.constants.BASE_SIZE * 1.5);
  const startButton = startGameButton(startGameCallback);
  const fullscreenButton = toggleFullScreenButton(toggleFullScreenCallback);
  const soundButton = toggleSoundButton(() => soundManager.toggleSound());

  container.addChild(background, ...mountains, sun, ground, ...clouds, characterIcon, titleText, bestScoreText, startButton, fullscreenButton, soundButton);
}

function createSun() {
  const sun = new PIXI.Graphics();
  sun.beginFill(0xffff00);
  sun.drawCircle(0, 0, appConfig.constants.BASE_SIZE * 0.75);
  sun.endFill();
  sun.x = appConfig.constants.BASE_SIZE * 1;
  sun.y = appConfig.constants.BASE_SIZE * 1;

  return sun;
}

function createMountains(containerWidth: number, count: number) {
  const mountains: PIXI.Sprite[] = [];
  const { APP_HEIGHT } = appConfig.constants;
  const mountainHeight = APP_HEIGHT / 2;
  const mountainWidth = containerWidth / count;

  for (let i = 0; i < count; i++) {
    const mountainPosX = (containerWidth / count) * i;

    const mountain = createSpriteFromImage("assets/img/mountain.png", mountainWidth, mountainHeight, mountainPosX, 100);
    mountains.push(mountain);
  }

  return mountains;
}

export function createLevelGround(containerWidth: number, count: number) {
  const grounds: PIXI.Sprite[] = [];
  const { GROUND_HEIGHT, GROUND_LEVEL } = appConfig.constants;
  const groundWidth = containerWidth / count;

  for (let i = 0; i < count; i++) {
    const groundPosX = (containerWidth / count) * i;

    const ground = createSpriteFromImage("assets/img/ground.png", groundWidth, GROUND_HEIGHT, groundPosX, GROUND_LEVEL);
    grounds.push(ground);
  }

  return grounds;
}
