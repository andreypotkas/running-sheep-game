interface AppConfigurationInterface {
  isLandscapeOrientation: boolean;
  isFullScreen: boolean;
  initAppConstants(): void;
}

export type AppConfigObject = {
  STAGE_SIZE: number;
  APP_WIDTH: number;
  GAME_WIDTH: number;
  APP_HEIGHT: number;
  GROUND_HEIGHT: number;
  GROUND_LEVEL: number;
  BASE_SIZE: number;
  VERTICAL_MOVE_STEP: number;
  HORIZONTAL_MOVE_STEP: number;
  FINISH_POINT: number;
};

export class AppConfiguration implements AppConfigurationInterface {
  private userAgent: string;
  private isMobileDevice: boolean;
  private pixelRatio: number;
  public isLandscapeOrientation: boolean;
  public isFullScreen: boolean = false;
  public constants!: AppConfigObject;

  constructor() {
    this.userAgent = navigator.userAgent;
    this.isMobileDevice = this.detectMobileDevice();
    this.isLandscapeOrientation = this.detectLandscapeOrientation();
    this.pixelRatio = window.devicePixelRatio;
    this.initAppConstants();
  }

  initAppConstants() {
    this.userAgent = navigator.userAgent;
    this.isMobileDevice = this.detectMobileDevice();
    this.isLandscapeOrientation = this.detectLandscapeOrientation();
    this.pixelRatio = window.devicePixelRatio;
    let appHeight;
    let baseSize;
    let verticalMoveStep;
    let horizontalMoveStep;
    let stageSize;

    if (this.isMobileDevice) {
      if (this.isLandscapeOrientation) {
        stageSize = 10;
        appHeight = this.isFullScreen ? window.screen.height : window.innerHeight;
        baseSize = 40;
        verticalMoveStep = 40;
        horizontalMoveStep = 2;
      } else {
        stageSize = 15;
        appHeight = this.isFullScreen ? window.screen.height : window.innerHeight;
        baseSize = 50;
        verticalMoveStep = 50;
        horizontalMoveStep = 2;
      }
    } else {
      stageSize = 10;
      baseSize = 100;
      verticalMoveStep = 100;
      appHeight = this.isFullScreen ? window.screen.height : window.innerHeight;
      horizontalMoveStep = 5;
    }

    const gameWidth = window.innerWidth * stageSize;
    const groundHeight = 3 * baseSize;
    const groundLevel = appHeight - groundHeight;
    const appWidth = this.isFullScreen ? window.screen.width : window.innerWidth;
    const finishPoint = gameWidth - appWidth;

    this.constants = {
      STAGE_SIZE: stageSize,
      APP_WIDTH: appWidth,
      GAME_WIDTH: gameWidth,
      APP_HEIGHT: appHeight,
      GROUND_HEIGHT: groundHeight,
      GROUND_LEVEL: groundLevel,
      BASE_SIZE: baseSize,
      VERTICAL_MOVE_STEP: verticalMoveStep,
      HORIZONTAL_MOVE_STEP: horizontalMoveStep,
      FINISH_POINT: finishPoint,
    };
  }

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
}
