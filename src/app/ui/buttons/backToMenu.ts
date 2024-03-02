import { appConfig } from "../../../app";
import { CommonButton } from "./button";

export const backToMenuButton = (characterX: number, onClick: () => void) => {
  const windowCenterX = characterX + window.innerWidth / 4;
  const windowCenterY = window.innerHeight / 2;

  const width = appConfig.constants.BASE_SIZE * 4;
  const height = appConfig.constants.BASE_SIZE;

  const buttonX = windowCenterX - width * 0.75;
  const buttonY = windowCenterY;

  const button = new CommonButton(width, height, { x: buttonX, y: buttonY }, onClick, "Menu ");

  return button;
};
