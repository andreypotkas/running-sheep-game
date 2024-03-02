import { appConfig } from "../../../app";
import { CommonButton } from "./button";

export const startGameButton = (onClick: () => void) => {
  const { APP_HEIGHT, APP_WIDTH, BASE_SIZE } = appConfig.constants;
  const centerX = APP_WIDTH / 2;
  const centerY = APP_HEIGHT / 2;
  const width = BASE_SIZE * 4;
  const height = BASE_SIZE;
  const buttonX = centerX - width / 2;
  const buttonY = centerY + 20;

  const button = new CommonButton(width, height, { x: buttonX, y: buttonY }, onClick, "Start game");

  return button;
};
