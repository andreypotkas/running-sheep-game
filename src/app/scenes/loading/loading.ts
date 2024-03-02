import * as PIXI from "pixi.js";
import { appConfig } from "../../../app";
import { createGradientText, createGraphics } from "../../lib/utils";
import { MainApp } from "../app";

const resourcesToLoad = [
  "assets/img/base-bg.jpg",
  "assets/img/box.png",
  "assets/img/character-icon.png",
  "assets/img/character.png",
  "assets/img/finish-line.png",
  "assets/img/flag-icon.png",
  "assets/img/ground.png",
  "assets/img/hero.png",
  "assets/img/mountain.png",
  "assets/img/pit.jpg",
  "assets/img/platform.png",
  "assets/img/clouds/1.png",
  "assets/img/clouds/3.png",
  "assets/img/clouds/2.png",
  "assets/sounds/bg.mp3",
  "assets/sounds/collide.mp3",
  "assets/sounds/jump.mp3",
  "assets/img/top-pit.png",
  "assets/img/box-dark.png",
  "assets/img/box-light.png",
  "assets/img/ui/fullscreen-in.png",
  "assets/img/ui/fullscreen-out.png",
  "assets/img/ui/sound-on.png",
  "assets/img/ui/sound-off.png",
];

export class Loading extends PIXI.Container {
  public app: MainApp;
  private loadingText: PIXI.Text;
  private progressBar: PIXI.Graphics;

  constructor(app: MainApp) {
    super();
    this.app = app;
    const { BASE_SIZE, APP_WIDTH, APP_HEIGHT } = appConfig.constants;

    const background = createGraphics("#00FFFF", APP_WIDTH, APP_HEIGHT);
    const titleText = createGradientText(`RUNNING SHEEP`, BASE_SIZE * 0.75, APP_WIDTH / 2, BASE_SIZE);
    this.loadingText = createGradientText(`Loading........ ${0}%`, BASE_SIZE * 0.45, APP_WIDTH / 2, APP_HEIGHT / 2 - BASE_SIZE);
    this.progressBar = new PIXI.Graphics();
    this.addChild(background, this.progressBar, this.loadingText, titleText);
    this.loadResources();
  }

  private loadResources(): void {
    PIXI.Assets.load(resourcesToLoad, (progress: number) => {
      this.updateLoadingProgressBar(progress);
    })
      .then(() => {
        this.app.runMenu();
      })
      .catch((error) => {
        console.error("Error loading resources:", error);
      });
  }

  private updateLoadingProgressBar(progress: number) {
    const { BASE_SIZE, APP_WIDTH, APP_HEIGHT } = appConfig.constants;
    this.loadingText.text = `Loading... ${Math.ceil(progress * 100)}%`;

    const progressBarWidth = APP_WIDTH - 2 * BASE_SIZE;
    const currentProgressBarWidth = progressBarWidth * progress;
    const progressBarHeight = BASE_SIZE / 2;
    const posX = BASE_SIZE;
    const posY = APP_HEIGHT / 2;

    this.progressBar.clear();
    this.progressBar.beginFill(0xffff00);
    this.progressBar.drawRect(posX, posY, currentProgressBarWidth, progressBarHeight);
    this.progressBar.endFill();
  }
}
