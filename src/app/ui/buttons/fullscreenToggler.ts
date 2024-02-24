import { BASE_SIZE } from "../../constants";
import { CustomButton } from "./base";

export const toggleFullScreenButton = (onClick: () => void) => {
  const x = window.innerWidth - BASE_SIZE * 1.2;
  const y = BASE_SIZE * 0.2;
  const width = BASE_SIZE;
  const height = BASE_SIZE;

  const button = new CustomButton(width, height, { x: x, y: y }, onClick, true, "transparent", "", "assets/img/fullscreen.png");

  return button;
};
