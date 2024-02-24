import * as PIXI from "pixi.js";
import { appConfig } from "../../appConfig";
import { CustomButton } from "./base";

export const startGameButton = (app: PIXI.Application<HTMLCanvasElement>, onClick: () => void) => {
  const centerX = app.renderer.width / 2;
  const centerY = app.renderer.height / 2;
  const width = appConfig.constants.BASE_SIZE * 4;
  const height = appConfig.constants.BASE_SIZE;
  const buttonX = centerX - width / 2;
  const buttonY = centerY - height / 2;

  const button = new CustomButton(width, height, { x: buttonX, y: buttonY }, onClick, false, "blue", "Start game");

  return button;
};
