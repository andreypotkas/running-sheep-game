import * as Sound from "@pixi/sound";

export class SoundManager {
  private backgroundMusic: Sound.Sound;
  private jumpSound: Sound.Sound;
  private collide: Sound.Sound;
  public isSoundOff: boolean = false;

  constructor() {
    this.backgroundMusic = Sound.Sound.from("assets/sounds/bg.mp3");
    this.jumpSound = Sound.Sound.from("assets/sounds/jump.mp3");
    this.collide = Sound.Sound.from("assets/sounds/collide.mp3");
    this.backgroundMusic.volume = 0.1;
    this.jumpSound.volume = 0.5;
    this.collide.volume = 0.5;
  }

  public playBackgroundMusic(loop: boolean = true): void {
    this.backgroundMusic.loop = loop;
    this.backgroundMusic.play();
  }

  public stopBackgroundMusic(): void {
    this.backgroundMusic.stop();
  }

  public pauseBackgroundMusic(): void {
    this.backgroundMusic.pause();
  }

  public resumeBackgroundMusic(): void {
    this.backgroundMusic.resume();
  }

  public setBackgroundMusicVolume(volume: number): void {
    this.backgroundMusic.volume = volume;
  }

  public playJumpSound(): void {
    this.jumpSound.play();
  }

  public playCollideSound(): void {
    this.collide.play();
  }

  public toggleSound() {
    if (!this.isSoundOff) {
      this.isSoundOff = true;
      this.backgroundMusic.volume = 0;
      this.jumpSound.volume = 0;
      this.collide.volume = 0;
    } else {
      this.isSoundOff = false;
      this.backgroundMusic.volume = 0.1;
      this.jumpSound.volume = 0.5;
      this.collide.volume = 0.5;
    }
  }
}
