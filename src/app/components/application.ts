import * as PIXI from "pixi.js";
import { APP_HEIGHT, APP_WIDTH } from "../constants";
import { CharacterInterface } from "../models/character";
import { SquareInterface } from "../models/square";
import { createGround } from "./ground";
import { renderResetButton } from "./utils";

export class GameApp {
  private readonly app: PIXI.Application<HTMLCanvasElement>;
  public squares: SquareInterface[] = [];
  private ground: PIXI.Graphics;

  constructor() {
    this.app = new PIXI.Application<HTMLCanvasElement>({
      width: APP_WIDTH,
      height: APP_HEIGHT,
      backgroundColor: 0x1099bb,
    });

    this.ground = createGround();
    this.app.stage.addChild(this.ground);
  }

  public get stage(): PIXI.Container {
    return this.app.stage;
  }

  public get view(): HTMLCanvasElement {
    return this.app.view;
  }

  public runGame(character: CharacterInterface): void {
    window.moveTo(0, 0);
    document.body.appendChild(this.view);

    this.app.ticker.add((delta) => {
      character.moveForward();
      this.squares.forEach((obstacle: SquareInterface) => obstacle.moveForward());
      this.scrollToCenterIfNeeded(character.x);
      if (character.isFinishReached()) this.endGame();
    });
  }

  public endGame(): void {
    this.app.ticker.stop();
    this.showGameOverScreen();
  }

  private showGameOverScreen(): void {
    const restartButton = renderResetButton();
    this.app.stage.addChild(restartButton);
  }

  private scrollToCenterIfNeeded(characterPosition: number) {
    const screenCenterX = window.innerWidth / 2;
    if (characterPosition > screenCenterX) {
      window.scroll(characterPosition - screenCenterX, 0);
    }
  }
}
