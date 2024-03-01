import { AppConfiguration } from "./app/appConfig";
import { SoundManager } from "./app/lib/soundManager";
import { MainApp } from "./app/scenes/app";

export const appConfig = new AppConfiguration();
export const soundManager = new SoundManager();
const app = new MainApp();
