import gsap from "gsap";
import * as PIXI from "pixi.js";
import { appConfig } from "../../app";
import { Character } from "../entities/character/character";
import { TopBarContainer } from "../entities/topBar";
import { Cloud, CloudConfig } from "../entities/world/cloud";
import { Ground } from "../entities/world/ground";
import { createGradientText, createSpriteFromImage } from "../lib/utils";
import { toggleFullScreenButton } from "../ui/buttons/fullscreenToggler";
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
  const topBar = new TopBarContainer(0, 0, window.innerWidth, appConfig.constants.BASE_SIZE);
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

  container.character = character;
  container.topBar = topBar;

  container.addChild(background, ...mountains, ground.sprite, ...clouds, topBar, finishLine);
  ground.addPitsAndBoxes();

  return { container, background, mountains, clouds, character, ground, topBar, finishLine };
}

export function initMenuScene(container: PIXI.Container, toggleFullScreenCallback: () => void, startGameCallback: () => void) {
  const sun = new PIXI.Graphics();
  sun.beginFill(0xffff00);
  sun.drawCircle(0, 0, appConfig.constants.BASE_SIZE * 0.75);
  sun.endFill();
  sun.x = appConfig.constants.BASE_SIZE * 1;
  sun.y = appConfig.constants.BASE_SIZE * 1;

  gsap.to(sun, { duration: 2, rotation: Math.PI * 2, ease: "power1.inOut", repeat: -1 });

  const background = createSpriteFromImage("assets/img/base-bg.jpg", appConfig.constants.GAME_WIDTH, appConfig.constants.APP_HEIGHT, 0, 0);
  const mountains = [
    createSpriteFromImage("assets/img/mountain.png", appConfig.constants.APP_WIDTH / 2, appConfig.constants.APP_HEIGHT / 2, 0, 100),
    createSpriteFromImage("assets/img/mountain.png", appConfig.constants.APP_WIDTH / 2, appConfig.constants.APP_HEIGHT / 2, (appConfig.constants.APP_HEIGHT / 2) * 0.25, 100),
  ];
  const ground = createSpriteFromImage("assets/img/ground.png", appConfig.constants.APP_WIDTH, appConfig.constants.GROUND_HEIGHT, 0, appConfig.constants.GROUND_LEVEL);
  const characterIcon = createSpriteFromImage(
    "assets/img/character-icon.png",
    appConfig.constants.BASE_SIZE * 2,
    appConfig.constants.BASE_SIZE * 2,
    appConfig.constants.APP_WIDTH / 2 - appConfig.constants.BASE_SIZE,
    appConfig.constants.BASE_SIZE * 1.5
  );

  const clouds: PIXI.Sprite[] = cloudsData.slice(0, 10).map((item: CloudConfig, index) => {
    return new Cloud(appConfig.constants.APP_WIDTH, item, index).sprite;
  });

  const bestScore = JSON.parse(localStorage.getItem("bestScore") ?? "0");
  const titleText = createGradientText(`Running Sheep`.toUpperCase(), appConfig.constants.APP_WIDTH / 2, appConfig.constants.BASE_SIZE / 2);
  const bestScoreText = createGradientText(`Best Score: ${bestScore}`, appConfig.constants.APP_WIDTH / 2, appConfig.constants.APP_HEIGHT - appConfig.constants.BASE_SIZE * 1.5);
  const startButton = startGameButton(startGameCallback);
  const fullscreenButton = toggleFullScreenButton(toggleFullScreenCallback);

  container.addChild(background, ...mountains, sun, ground, ...clouds, characterIcon, titleText, bestScoreText, startButton, fullscreenButton);
}
