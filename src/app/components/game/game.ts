import * as PIXI from "pixi.js";
import { appConfig } from "../../../app";
import { CharacterInterface } from "../../entities/character";
import { GroundInterface } from "../../entities/ground";
import { TopBarContainer } from "../../entities/topBar";
import { CollisionDetector } from "../../lib/collisionDetector";
import { restartGameButton } from "../../ui/buttons/restartGame";
import { GameApp } from "../app";
import { initCommonAppElements } from "../utils";

export class Game extends PIXI.Container {
  public app: GameApp;
  public ground: GroundInterface;
  public character: CharacterInterface;
  public collisionDetector: CollisionDetector;
  public topBar: TopBarContainer;

  constructor(app: GameApp) {
    super();
    const { background, mountains, clouds, character, ground, topBar, finishLine } = initCommonAppElements(this);
    this.app = app;
    this.ground = ground;
    this.character = character;
    this.topBar = topBar;
    this.collisionDetector = new CollisionDetector(this.ground, this.character, this.endGame.bind(this));

    this.addChild(background, ...mountains, this.ground.sprite, ...clouds, topBar, finishLine);
    this.ground.addPitsAndBoxes();
    this.addChild(character.sprite);

    this.runGame();
  }

  public runGame(): void {
    this.character.handleStartGame();
    this.app.app.ticker.add(this.update, this);
  }

  public endGame(): void {
    this.app.app.ticker.remove(this.update, this);
    this.showGameOverScreen();
  }

  private checkIsCharacterFinished() {
    const { GAME_WIDTH, APP_WIDTH } = appConfig.constants;
    const finish = GAME_WIDTH - APP_WIDTH;
    const isFinished = this.character.rightX >= finish;
    if (isFinished) this.endGame();
  }

  private showGameOverScreen(): void {
    const restartButton = restartGameButton(this.character.x, this.restartGame.bind(this));
    this.addChild(restartButton);
  }

  private moveStage() {
    this.position.x -= appConfig.constants.HORIZONTAL_MOVE_STEP;
  }

  private restartGame() {
    return this.app.runMenu();
  }

  private update() {
    this.topBar.update(this.character.x);
    this.character.update();
    this.collisionDetector.checkObstacleCollisions();
    this.checkIsCharacterFinished();

    if (this.character.x > window.innerWidth / 4) {
      this.moveStage();
      this.topBar.moveForward();
    }
  }
}
