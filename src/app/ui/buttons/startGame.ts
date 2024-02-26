import { appConfig } from "../../../app";
import { CustomButton } from "./base";

export const startGameButton = (onClick: () => void) => {
  const centerX = appConfig.constants.APP_WIDTH / 2;
  const centerY = appConfig.constants.APP_HEIGHT / 2;
  const width = appConfig.constants.BASE_SIZE * 4;
  const height = appConfig.constants.BASE_SIZE * 1.25;
  const buttonX = centerX - width / 2;
  const buttonY = centerY;

  const button = new CustomButton(width, height, { x: buttonX, y: buttonY }, onClick, "blue", "Start game");

  return button;
};
