import * as PIXI from "pixi.js";
import { BASE_SIZE } from "../../constants";
import { CustomButton } from "./base";

export const restartGameButton = (app: PIXI.Application<HTMLCanvasElement>, onClick: () => void) => {
  const centerX = app.stage.position.x + window.screen.width / 2;
  const centerY = app.renderer.height / 2;
  const width = BASE_SIZE * 4;
  const height = BASE_SIZE;
  const buttonX = centerX - width / 2;
  const buttonY = centerY - height / 2;

  const button = new CustomButton(width, height, { x: buttonX, y: buttonY }, onClick, false, "blue", "Restart game");

  return button;
};
