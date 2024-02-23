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
    let baseEntitySize;
    let verticalMoveStep;

    if (this.isMobileDevice) {
      if (this.isLandscapeOrientation) {
        appWidth = window.innerWidth * 10;
        appHeight = window.innerHeight;
        baseEntitySize = 50;
        verticalMoveStep = 50;
      } else {
        appWidth = window.innerWidth * 20;
        appHeight = window.innerHeight;
        baseEntitySize = 50;
        verticalMoveStep = 50;
      }
    } else {
      baseEntitySize = 100;
      verticalMoveStep = 100;
      appWidth = window.innerWidth * 10;
      appHeight = window.innerHeight;
    }

    const groundHeight = Math.ceil(appHeight / 3);
    const groundLevel = appHeight - groundHeight;
    const horizontalMoveStep = 5;

    return {
      APP_WIDTH: appWidth,
      APP_HEIGHT: appHeight,
      GROUND_HEIGHT: groundHeight,
      GROUND_LEVEL: groundLevel,
      BASE_ENTITY_SIZE: baseEntitySize,
      VERTICAL_MOVE_STEP: verticalMoveStep,
      HORIZONTAL_MOVE_STEP: horizontalMoveStep,
    };
  }
}

export const appConfig = new AppConfiguration();
