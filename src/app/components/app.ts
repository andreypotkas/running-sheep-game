import * as PIXI from "pixi.js";
import { appConfig } from "../../app";
import { Game } from "./game/game";
import { Menu } from "./menu/menu";

export class GameApp {
  public app: PIXI.Application<HTMLCanvasElement>;
  private currentScene: PIXI.Container;
  private menu: PIXI.Container;
  private game: Game;

  constructor() {
    this.app = new PIXI.Application<HTMLCanvasElement>({ width: appConfig.constants.APP_WIDTH, height: appConfig.constants.APP_HEIGHT, resizeTo: window });
    this.menu = new Menu(this);
    this.game = new Game(this);

    this.currentScene = this.menu;

    this.app.stage.addChild(this.currentScene);
    document.body.appendChild(this.app.view);

    this.setupEventListeners();
  }

  private setupEventListeners(): void {
    window.addEventListener("resize", () => {
      this.app.renderer.resize(window.innerWidth, window.innerHeight);
      this.currentScene.emit("resize");
    });
  }

  public switchScene(newScene: PIXI.Container): void {
    this.currentScene.removeChildren();
    this.currentScene = newScene;
    this.app.stage.addChild(this.currentScene);
  }

  public runGame() {
    this.currentScene.removeChildren();
    this.currentScene = this.game;
    this.app.stage.addChild(this.currentScene);
  }

  public openMenu() {
    this.currentScene.removeChildren();
    this.currentScene = this.menu;
    this.app.stage.addChild(this.currentScene);
  }

  public start(): void {
    // Здесь можно добавить логику для запуска приложения, например, загрузку начальной сцены и т. д.
  }
}
