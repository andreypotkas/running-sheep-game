import * as PIXI from "pixi.js";
import { appConfig } from "../../../app";
import { CharacterInterface } from "../../entities/character";
import { GroundInterface } from "../../entities/ground";
import { TopBarContainer } from "../../entities/topBar";
import { CollisionDetector } from "../../lib/collisionDetector";
import { restartGameButton } from "../../ui/buttons/restartGame";
import { GameApp } from "../app";
import { initCommonAppElements } from "./utils";

export class Game extends PIXI.Container {
  public ground: GroundInterface;
  public character: CharacterInterface;
  public collisionDetector: CollisionDetector;
  public topBar: TopBarContainer;

  constructor(app: GameApp) {
    super();
    const { background, mountains, clouds, character, ground, topBar, finishLine } = initCommonAppElements(() => {});
    this.ground = ground;
    this.character = character;
    this.topBar = topBar;
    this.collisionDetector = new CollisionDetector(this.ground, this.character, () => {});

    this.addChild(background, ...mountains, this.ground.sprite, ...clouds, topBar, finishLine);
    this.ground.addPitsAndBoxes();
    this.addChild(character.sprite);

    // const startButton = startGameButton(this.container, this.runGame.bind(this));
    // this.container.addChild(startButton);

    addEventListener("orientationchange", (event) => {
      this.restartGame();
    });

    // document.body.appendChild(this.container);
  }

  // public toggleFullScreen(): void {
  //   if (!appConfig.constants.IS_FULLSCREEN) {
  //     if (this.container.requestFullscreen) {
  //       appConfig.constants.IS_FULLSCREEN = true;
  //       this.container.requestFullscreen();
  //       const scalingFactor = appConfig.constants.IS_FULLSCREEN ? appConfig.constants.SCALING_FACTOR : 1;
  //       this.container.scale.set(1, scalingFactor);
  //     }
  //   } else {
  //     if (document.exitFullscreen) {
  //       appConfig.constants.IS_FULLSCREEN = false;
  //       document.exitFullscreen();
  //       this.container.scale.set(1, 1);
  //     }
  //   }
  // }

  public update() {
    // this.character.handleStartGame();

    this.character.update();
    this.collisionDetector.checkObstacleCollisions();
    this.topBar.update(this.character.x);
    // this.checkIsCharacterFinished();

    if (this.character.x > window.innerWidth / 4) {
      this.moveStage();
      this.topBar.moveForward();
    }
  }

  private showGameOverScreen(): void {
    const restartButton = restartGameButton(this.character.x, this.restartGame.bind(this));
    this.addChild(restartButton);
  }

  private moveStage() {
    this.position.x -= appConfig.constants.HORIZONTAL_MOVE_STEP;
  }

  // private checkIsCharacterFinished() {
  //   const finish = appConfig.constants.GAME_WIDTH - window.screen.width;
  //   const isFinished = this.character.rightX >= finish;
  //   if (isFinished) this.endGame();
  // }

  private restartGame() {
    window.location.reload();
  }
}
