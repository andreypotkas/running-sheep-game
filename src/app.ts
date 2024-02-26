import { AppConfiguration } from "./app/appConfig";
import { MainApp } from "./app/components/app";
import { SoundManager } from "./app/lib/soundManager";

export const appConfig = new AppConfiguration();
export const soundManager = new SoundManager();
const game = new MainApp();
