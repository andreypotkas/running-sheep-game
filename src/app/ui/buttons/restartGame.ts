import { appConfig } from "../../../app";
import { CustomButton } from "./base";

export const restartGameButton = (characterX: number, onClick: () => void) => {
  const windowCenterX = characterX + window.innerWidth / 4;
  const windowCenterY = window.innerHeight / 2;

  const width = appConfig.constants.BASE_SIZE * 7;
  const height = appConfig.constants.BASE_SIZE * 1.25;

  const buttonX = windowCenterX - width / 2;
  const buttonY = windowCenterY - height / 2;

  const button = new CustomButton(width, height, { x: buttonX, y: buttonY }, onClick, "blue", "Restart game");

  return button;
};
