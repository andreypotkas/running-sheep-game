import { appConfig } from "../../../app";
import { CustomButton } from "./base";

export const restartGameButton = (characterX: number, onClick: () => void) => {
  const windowCenterX = characterX + window.innerWidth / 4;
  const windowCenterY = window.innerHeight / 2;

  const buttonWidth = appConfig.constants.BASE_SIZE * 4;
  const buttonHeight = appConfig.constants.BASE_SIZE;

  const buttonX = windowCenterX - buttonWidth / 2;
  const buttonY = windowCenterY - buttonHeight / 2;

  const button = new CustomButton(buttonWidth, buttonHeight, { x: buttonX, y: buttonY }, onClick, false, "blue", "Restart game");

  return button;
};
