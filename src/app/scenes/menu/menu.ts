import * as PIXI from "pixi.js";
import { appConfig } from "../../../app";
import { MainApp } from "../app";
import { initMenuScene } from "../utils";

export class Menu extends PIXI.Container {
  private app: MainApp;

  constructor(app: MainApp) {
    super();

    this.app = app;
    initMenuScene(this, this.toggleFullScreen.bind(this), this.onStartButtonClick.bind(this));
  }

  private onStartButtonClick(): void {
    this.app.runGame();
  }

  public toggleFullScreen(): void {
    appConfig.isFullScreen ? (appConfig.isFullScreen = false) : (appConfig.isFullScreen = true);

    if (appConfig.isFullScreen) {
      if (this.app.app.view.requestFullscreen) {
        this.app.app.view.requestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  }
}
