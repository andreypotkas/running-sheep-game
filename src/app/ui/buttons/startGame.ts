import { appConfig } from "../../../app";
import { CustomButton } from "./base";

export const startGameButton = (onClick: () => void) => {
  const centerX = appConfig.constants.APP_WIDTH / 2;
  const centerY = appConfig.constants.APP_HEIGHT / 2;
  const width = appConfig.constants.BASE_SIZE * 5;
  const height = appConfig.constants.BASE_SIZE;
  const buttonX = centerX - width / 2;
  const buttonY = centerY - height / 2;

  const button = new CustomButton(width, height, { x: buttonX, y: buttonY }, onClick, false, "blue", "Start game");

  return button;
};
