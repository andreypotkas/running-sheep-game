import * as PIXI from "pixi.js";
import { APP_HEIGHT, APP_WIDTH } from "../constants";
import { CharacterInterface } from "./character";
import { SquareInterface } from "./square";

let gameShiftX = 0;

export class Application {
  private readonly app: PIXI.Application<HTMLCanvasElement>;
  public squares: SquareInterface[] = [];

  constructor() {
    this.app = new PIXI.Application<HTMLCanvasElement>({
      width: APP_WIDTH,
      height: APP_HEIGHT,
      backgroundColor: 0x1099bb,
    });

    this.app.stage.on("gameover", () => this.app.stop());
  }

  public get stage(): PIXI.Container {
    return this.app.stage;
  }

  public get view(): HTMLCanvasElement {
    return this.app.view;
  }

  public start(character: CharacterInterface): void {
    document.body.appendChild(this.view);

    this.app.ticker.add((delta) => {
      character.moveForward();
      this.squares.forEach((square: SquareInterface) => square.moveForward());

      const screenCenterX = window.innerWidth / 2;

      // Check if character reaches the center of the screen
      if (character.getPositionX() > screenCenterX) {
        // Scroll the window to keep the character centered

        window.scroll(character.getPositionX() - screenCenterX, 0);
      }

      if (character.getPositionX() >= APP_WIDTH) {
        this.gameOver();
      }
    });
  }

  public stop(): void {
    this.app.ticker.stop();
    if (this.gameOver) {
      this.gameOver();
    }
  }

  public gameOver(): void {
    const restartButton = new PIXI.Text("Restart", { fontSize: 24, fill: 0xffffff });
    restartButton.interactive = true;
    restartButton.anchor.set(0.5);
    restartButton.position.set(APP_WIDTH / 2, APP_HEIGHT / 2);
    restartButton.on("pointerdown", () => {
      window.location.reload();
    });
    this.app.stage.addChild(restartButton);
  }
}
