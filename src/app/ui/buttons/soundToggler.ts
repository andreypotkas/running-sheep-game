import { appConfig, soundManager } from "../../../app";
import { ToggleButton } from "./toggleButton";

export const toggleSoundButton = (onClick: () => void) => {
  const { APP_WIDTH, BASE_SIZE } = appConfig.constants;
  const x = APP_WIDTH - BASE_SIZE * 1.1;
  const y = BASE_SIZE * 1.6;
  const width = BASE_SIZE;
  const height = BASE_SIZE;

  const button = new ToggleButton(width, height, { x: x, y: y }, onClick, "assets/img/ui/sound-on.png", "assets/img/ui/sound-off.png", soundManager.isSoundOff);

  return button;
};
