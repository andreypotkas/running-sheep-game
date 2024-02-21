import * as PIXI from "pixi.js";
import { APP_HEIGHT, APP_WIDTH, GROUND_HEIGHT } from "../constants";

export function createGround() {
  const ground = new PIXI.Graphics();
  ground.beginFill(0x8b4513);
  ground.drawRect(0, APP_HEIGHT - GROUND_HEIGHT, APP_WIDTH, GROUND_HEIGHT);
  ground.endFill();
  return ground;
}
