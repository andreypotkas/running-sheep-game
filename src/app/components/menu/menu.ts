import * as PIXI from "pixi.js";
import { appConfig } from "../../../app";
import { GameApp } from "../app";
import { initMenuEnvaironment } from "../utils";

export class Menu extends PIXI.Container {
  private app: GameApp;

  constructor(app: GameApp) {
    super();
    this.app = app;
    initMenuEnvaironment(this, this.toggleFullScreen.bind(this), this.onStartButtonClick.bind(this));
  }

  private onStartButtonClick(): void {
    this.app.runGame();
  }

  private getBestScore(): number {
    return 0;
  }

  public toggleFullScreen(): void {
    if (!appConfig.constants.IS_FULLSCREEN) {
      if (this.app.app.view.requestFullscreen) {
        appConfig.constants.IS_FULLSCREEN = true;
        this.app.app.view.requestFullscreen();
        const scalingFactor = appConfig.constants.IS_FULLSCREEN ? appConfig.constants.SCALING_FACTOR : 1;
        this.app.app.stage.scale.set(1, scalingFactor);
      }
    } else {
      if (document.exitFullscreen) {
        appConfig.constants.IS_FULLSCREEN = false;
        document.exitFullscreen();
        this.app.app.stage.scale.set(1, 1);
      }
    }
  }
}
