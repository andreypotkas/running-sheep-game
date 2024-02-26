import * as PIXI from "pixi.js";
import { appConfig } from "../../app";
import { Game } from "./game/game";
import { Menu } from "./menu/menu";

export class GameApp {
  public app: PIXI.Application<HTMLCanvasElement>;
  private currentScene: PIXI.Container;

  constructor() {
    this.app = new PIXI.Application<HTMLCanvasElement>({ width: appConfig.constants.APP_WIDTH, height: appConfig.constants.APP_HEIGHT, resizeTo: window });
    this.currentScene = new Menu(this);

    this.app.stage.addChild(this.currentScene);
    document.body.appendChild(this.app.view);

    this.setupEventListeners();
  }

  private setupEventListeners(): void {
    window.addEventListener("orientationchange", () => {
      window.location.reload();
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
