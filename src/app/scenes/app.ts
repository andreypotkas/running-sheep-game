import * as PIXI from "pixi.js";
import { appConfig, soundManager } from "../../app";
import { Game } from "./game/game";
import { Loading } from "./loading/loading";
import { Menu } from "./menu/menu";

export class MainApp {
  public app: PIXI.Application<HTMLCanvasElement>;
  private currentScene: PIXI.Container;

  constructor() {
    this.app = new PIXI.Application<HTMLCanvasElement>({ width: appConfig.constants.APP_WIDTH, height: appConfig.constants.APP_HEIGHT, resizeTo: window });
    this.currentScene = new Loading(this);

    this.app.stage.addChild(this.currentScene);
    document.body.appendChild(this.app.view);
    soundManager.playBackgroundMusic();
    this.setupEventListeners();
  }

  private setupEventListeners(): void {
    window.addEventListener("resize", (e) => {
      appConfig.initAppConstants();

      if (this.currentScene instanceof Game) {
        this.currentScene.endGame();
        this.runGame();
      } else {
        this.runMenu();
      }
    });
  }

  public runGame() {
    this.app.stage.removeChildren();
    this.currentScene = new Game(this);
    this.app.stage.addChild(this.currentScene);
  }

  public runMenu() {
    this.app.stage.removeChildren();
    this.currentScene = new Menu(this);
    this.app.stage.addChild(this.currentScene);
  }

  public start(): void {}
}
