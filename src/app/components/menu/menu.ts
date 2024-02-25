import * as PIXI from "pixi.js";
import { appConfig } from "../../../app";
import { createText } from "../../lib/utils";
import { CustomButton } from "../../ui/buttons/base";
import { toggleFullScreenButton } from "../../ui/buttons/fullscreenToggler";
import { startGameButton } from "../../ui/buttons/startGame";
import { GameApp } from "../app";
import { initMenuBackground } from "../game/utils";

export class Menu extends PIXI.Container {
  private app: GameApp;

  private titleText: PIXI.Text;
  private bestScoreText: PIXI.Text;
  private startButton: CustomButton;
  private fullscreenButton: CustomButton;

  constructor(app: GameApp) {
    super();
    this.app = app;
    initMenuBackground(this);

    const textSize = appConfig.constants.BASE_SIZE * 0.75;
    this.titleText = createText(`Running Sheep`.toUpperCase(), textSize, "yellow", appConfig.constants.APP_WIDTH / 2, appConfig.constants.BASE_SIZE);
    this.bestScoreText = createText(`Best Score: ${this.getBestScore()}`, textSize, "blue", appConfig.constants.APP_WIDTH / 2, appConfig.constants.BASE_SIZE * 3);
    this.startButton = startGameButton(this.onStartButtonClick.bind(this));
    this.fullscreenButton = toggleFullScreenButton(this.toggleFullScreen.bind(this));

    this.addChild(this.titleText, this.bestScoreText, this.startButton, this.fullscreenButton);
  }

  private onStartButtonClick(): void {
    this.app.runGame();
  }

  private toggleSound(): void {}

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
