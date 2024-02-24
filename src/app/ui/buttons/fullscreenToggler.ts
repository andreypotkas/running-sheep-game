import { appConfig } from "../../appConfig";
import { CustomButton } from "./base";

export const toggleFullScreenButton = (onClick: () => void) => {
  const x = window.innerWidth - appConfig.constants.BASE_SIZE * 1.2;
  const y = appConfig.constants.BASE_SIZE * 0.2;
  const width = appConfig.constants.BASE_SIZE;
  const height = appConfig.constants.BASE_SIZE;

  const button = new CustomButton(width, height, { x: x, y: y }, onClick, true, "transparent", "", "assets/img/fullscreen.png");

  return button;
};
