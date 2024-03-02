import { appConfig } from "../../../app";
import { ToggleButton } from "./toggleButton";

export const toggleFullScreenButton = (onClick: () => void) => {
  const { APP_WIDTH, BASE_SIZE } = appConfig.constants;
  const x = APP_WIDTH - BASE_SIZE * 1.1;
  const y = BASE_SIZE * 0.4;
  const width = BASE_SIZE;
  const height = BASE_SIZE;

  const button = new ToggleButton(width, height, { x: x, y: y }, onClick, "assets/img/ui/fullscreen-in.png", "assets/img/ui/fullscreen-out.png", appConfig.isFullScreen);

  return button;
};
