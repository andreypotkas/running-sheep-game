import { appConfig } from "../appConfig";
import { BoxInterface } from "../entities/box";
import { CharacterInterface } from "../entities/character";
import { GroundInterface } from "../entities/ground";
import { PitInterface } from "../entities/pit";
import { PlatformInterface } from "../entities/platform";

export class CollisionDetector {
  private readonly ground: GroundInterface;
  private readonly character: CharacterInterface;
  private readonly endGameCallback: () => void;
  constructor(ground: GroundInterface, character: CharacterInterface, endGameCallback: () => void) {
    this.ground = ground;
    this.character = character;
    this.endGameCallback = endGameCallback;
  }
  private isCharacterReachedPit(character: CharacterInterface, pit: PitInterface): boolean {
    return character.x === pit.x;
  }
  private isCharacterCollidedPit(character: CharacterInterface, pit: PitInterface): boolean {
    return character.rightX === pit.rightX && character.estimatedBottomY > appConfig.constants.GROUND_LEVEL;
  }

  private isCharacterReachedBox(character: CharacterInterface, box: BoxInterface): boolean {
    return character.rightX === box.x;
  }
  private isCharacterCollidedBox(character: CharacterInterface, box: BoxInterface): boolean {
    return character.rightX === box.x && character.estimatedBottomY > box.y;
  }
  private isCharacterLeaveBox(character: CharacterInterface, box: BoxInterface): boolean {
    return character.x === box.rightX;
  }

  private isPlatformCollidedPit(platform: PlatformInterface, pit: PitInterface): boolean {
    return platform.rightX === pit.rightX && platform.estimatedBottomY > appConfig.constants.GROUND_LEVEL;
  }
  private isPlatformCollidedBox(platform: PlatformInterface, box: BoxInterface): boolean {
    return platform.rightX === box.x && platform.estimatedBottomY > box.y;
  }
  private isPlatformLeaveBox(platform: PlatformInterface, box: BoxInterface): boolean {
    return platform.x === box.rightX;
  }

  public checkObstacleCollisions(): void {
    const pits = this.ground.getPits();
    const boxes = this.ground.getBoxes();

    pits.forEach((pit) => {
      const isCharacterReachedPit = this.isCharacterReachedPit(this.character, pit);

      if (isCharacterReachedPit) {
        this.character.moveDown(pit.heightSize);
        this.character.movingPlatforms.forEach((platform) => platform.moveDown(pit.heightSize));
      }

      const isCharacterCollidedPit = this.isCharacterCollidedPit(this.character, pit);

      if (isCharacterCollidedPit) {
        this.endGameCallback();
      }

      this.character.platforms.forEach((item) => {
        const isPlatformCollidedPit = this.isPlatformCollidedPit(item, pit);

        if (isPlatformCollidedPit) {
          item.stop();
        }
      });
    });

    boxes.forEach((box) => {
      const isCharacterCollidedBox = this.isCharacterCollidedBox(this.character, box);
      const isCharacterLeaveBox = this.isCharacterLeaveBox(this.character, box);

      if (isCharacterCollidedBox) {
        this.endGameCallback();
      }

      if (isCharacterLeaveBox) {
        this.character.moveDown(box.heightSize);
      }

      this.character.platforms.forEach((item) => {
        const isPlatformCollidedBox = this.isPlatformCollidedBox(item, box);
        const isPlatformLeaveBox = this.isPlatformLeaveBox(item, box);

        if (isPlatformCollidedBox) {
          item.stop();
        }

        if (isPlatformLeaveBox) {
          item.moveDown(box.heightSize);
        }
      });
    });
  }
}
