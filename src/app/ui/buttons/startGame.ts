import { appConfig } from "../../../app";
import { CustomButton } from "./base";

export const startGameButton = (onClick: () => void) => {
  const centerX = appConfig.constants.APP_WIDTH / 2;
  const centerY = appConfig.constants.APP_HEIGHT / 1.5;
  const width = appConfig.constants.BASE_SIZE * 6;
  const height = appConfig.constants.BASE_SIZE * 1.25;
  const buttonX = centerX - width / 2;
  const buttonY = centerY - height / 2;

  const button = new CustomButton(width, height, { x: buttonX, y: buttonY }, onClick, "blue", "Start game");

  return button;
};
