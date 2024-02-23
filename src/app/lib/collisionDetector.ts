import { GROUND_LEVEL } from "../constants";
import { BoxInterface } from "../entities/box";
import { CharacterInterface } from "../entities/character";
import { PitInterface } from "../entities/pit";
import { PlatformInterface } from "../entities/platform";

export class CollisionDetector {
  public static isCharacterReachedPit(character: CharacterInterface, pit: PitInterface): boolean {
    return character.x === pit.x;
  }
  public static isCharacterCollidedPit(character: CharacterInterface, pit: PitInterface): boolean {
    return character.rightX === pit.rightX && character.bottomY >= GROUND_LEVEL;
  }

  public static isCharacterReachedBox(character: CharacterInterface, box: BoxInterface): boolean {
    return character.rightX === box.x;
  }
  public static isCharacterCollidedBox(character: CharacterInterface, box: BoxInterface): boolean {
    return character.rightX === box.x && character.bottomY > box.y;
  }
  public static isCharacterLeaveBox(character: CharacterInterface, box: BoxInterface): boolean {
    return character.x === box.rightX;
  }

  public static isPlatformCollidedPit(platform: PlatformInterface, pit: PitInterface): boolean {
    return platform.rightX === pit.rightX && platform.bottomY >= GROUND_LEVEL;
  }
  public static isPlatformCollidedBox(platform: PlatformInterface, box: BoxInterface): boolean {
    return platform.rightX === box.x && platform.bottomY > box.y;
  }
  public static isPlatformLeaveBox(platform: PlatformInterface, box: BoxInterface): boolean {
    return platform.x === box.rightX;
  }
}
