interface AppConfigurationInterface {
  userAgent: string;
  isMobileDevice: boolean;
  isLandscapeOrientation: boolean;
  pixelRatio: number;
  initAppConstants(): ConstantsObject;
}

type ConstantsObject = {
  APP_WIDTH: number;
  APP_HEIGHT: number;
  GROUND_HEIGHT: number;
  GROUND_LEVEL: number;
  BASE_ENTITY_SIZE: number;
  VERTICAL_MOVE_STEP: number;
  HORIZONTAL_MOVE_STEP: number;
};

class AppConfiguration implements AppConfigurationInterface {
  constructor() {
    this.userAgent = navigator.userAgent;
    this.isMobileDevice = this.detectMobileDevice();
    this.isLandscapeOrientation = this.detectLandscapeOrientation();
    this.pixelRatio = window.devicePixelRatio;
  }
  userAgent: string;
  isMobileDevice: boolean;
  isLandscapeOrientation: boolean;
  pixelRatio: number;

  detectMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(this.userAgent);
  }

  detectLandscapeOrientation() {
    return window.matchMedia("(orientation: landscape)").matches;
  }

  generateConfigObject() {
    return {
      userAgent: this.userAgent,
      isMobileDevice: this.isMobileDevice,
      isLandscapeOrientation: this.isLandscapeOrientation,
      pixelRatio: this.pixelRatio,
    };
  }

  initAppConstants() {
    let appWidth;
    let appHeight;
    let groundHeight;
    let groundLevel;

    if (this.isMobileDevice) {
      if (this.isLandscapeOrientation) {
        // На мобильных устройствах в альбомной ориентации
        appWidth = window.innerWidth * 4;
        appHeight = window.innerHeight;
        groundHeight = appHeight / 4;
        groundLevel = appHeight - groundHeight;
      } else {
        // На мобильных устройствах в портретной ориентации
        appWidth = window.innerWidth * 10;
        appHeight = window.innerHeight;
        groundHeight = appHeight / 4;
        groundLevel = appHeight - groundHeight;
        console.log(appHeight, appWidth);
      }
    } else {
      // На десктопе
      appWidth = window.innerWidth * 2;
      appHeight = window.innerHeight;
      groundHeight = appHeight / 4;
      groundLevel = appHeight - groundHeight;
    }

    return {
      APP_WIDTH: appWidth,
      APP_HEIGHT: appHeight,
      GROUND_HEIGHT: groundHeight,
      GROUND_LEVEL: groundLevel,
      BASE_ENTITY_SIZE: 100,
      VERTICAL_MOVE_STEP: 100,
      HORIZONTAL_MOVE_STEP: 5,
    };
  }
}

export const appConfig = new AppConfiguration();
