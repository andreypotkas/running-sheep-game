import * as PIXI from "pixi.js";
import { appConfig } from "../../app";
import { Game } from "./game/game";
import { Menu } from "./menu/menu";

export class GameApp {
  public app: PIXI.Application<HTMLCanvasElement>;
  private currentScene: PIXI.Container;
  private menu: PIXI.Container;

  constructor() {
    this.app = new PIXI.Application<HTMLCanvasElement>({ width: appConfig.constants.APP_WIDTH, height: appConfig.constants.APP_HEIGHT, resizeTo: window });
    this.menu = new Menu(this);
    this.currentScene = this.menu;

    this.app.stage.addChild(this.currentScene);
    document.body.appendChild(this.app.view);

    this.setupEventListeners();
  }

  private setupEventListeners(): void {
    // window.addEventListener("resize", () => {
    //   this.app.renderer.resize(window.innerWidth, window.innerHeight);
    //   this.currentScene.emit("resize");
    // });
  }

  public runGame() {
    this.app.stage.removeChildren();
    this.currentScene = new Game(this);
    this.app.stage.addChild(this.currentScene);
    // this.app.render();
  }

  public runMenu() {
    this.app.stage.removeChildren();
    this.currentScene = this.menu;
    this.app.stage.addChild(this.currentScene);
    this.app.render();
  }

  public start(): void {}
}
