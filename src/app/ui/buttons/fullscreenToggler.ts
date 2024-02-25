import { appConfig } from "../../../app";
import { CustomButton } from "./base";

export const toggleFullScreenButton = (onClick: () => void) => {
  const x = window.innerWidth - appConfig.constants.BASE_SIZE * 1.2;
  const y = appConfig.constants.BASE_SIZE * 0.2;
  const width = appConfig.constants.BASE_SIZE * 0.75;
  const height = appConfig.constants.BASE_SIZE * 0.75;

  const button = new CustomButton(width, height, { x: x, y: y }, onClick, "transparent", "", "assets/img/fullscreen.png");

  return button;
};
