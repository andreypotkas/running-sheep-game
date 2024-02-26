import * as PIXI from "pixi.js";
import { appConfig } from "../../../app";
import { createSpriteFromImage, createText } from "../../lib/utils";
import { MainApp } from "../app";

export class Loading extends PIXI.Container {
  public app: MainApp;
  private loadingText: PIXI.Text;
  private progressBar: PIXI.Graphics;

  constructor(app: MainApp) {
    super();
    this.app = app;
    const { BASE_SIZE, APP_WIDTH, APP_HEIGHT } = appConfig.constants;

    const background = createSpriteFromImage("assets/img/base-bg.jpg", APP_WIDTH, APP_HEIGHT, 0, 0);
    const textSize = appConfig.constants.BASE_SIZE * 0.75;
    this.loadingText = createText(`Loading... ${0}%`, textSize, "yellow", APP_WIDTH / 2, APP_HEIGHT / 2 - BASE_SIZE);
    this.progressBar = new PIXI.Graphics();
    this.addChild(background, this.progressBar, this.loadingText);
    this.loadResources();
  }

  private loadResources(): void {
    const resourcesToLoad = [
      "assets/img/base-bg.jpg",
      "assets/img/box.png",
      "assets/img/character-icon.png",
      "assets/img/character.png",
      "assets/img/finish-line.png",
      "assets/img/flag-icon.png",
      "assets/img/fullscreen.png",
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
    ];

    PIXI.Assets.load(resourcesToLoad, (progress: number) => {
      const { BASE_SIZE, APP_WIDTH, APP_HEIGHT } = appConfig.constants;
      this.loadingText.text = `Loading... ${Math.ceil(progress * 100)}%`;

      const progressBarWidth = APP_WIDTH - BASE_SIZE * progress;
      this.progressBar.clear();
      this.progressBar.beginFill(0xffff00);
      this.progressBar.drawRect(BASE_SIZE / 2, APP_HEIGHT / 2, progressBarWidth, BASE_SIZE / 2);
      this.progressBar.endFill();
    })
      .then((resources) => {
        this.app.runMenu();
      })
      .catch((error) => {
        console.error("Error loading resources:", error);
      });
  }
}
