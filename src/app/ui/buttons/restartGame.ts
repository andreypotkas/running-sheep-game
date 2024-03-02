import { appConfig } from "../../../app";
import { CommonButton } from "./button";

export const restartGameButton = (characterX: number, onClick: () => void) => {
  const windowCenterX = characterX + window.innerWidth / 4;
  const windowCenterY = window.innerHeight / 2;

  const width = appConfig.constants.BASE_SIZE;
  const height = appConfig.constants.BASE_SIZE;

  const buttonX = windowCenterX + 2 * width;
  const buttonY = windowCenterY;

  const button = new CommonButton(width, height, { x: buttonX, y: buttonY }, onClick, "", "assets/img/ui/restart.png");

  return button;
};
