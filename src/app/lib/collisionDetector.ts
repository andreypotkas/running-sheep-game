import { BoxInterface } from "../entities/box";
import { CharacterInterface } from "../entities/character";
import { PitInterface } from "../entities/pit";

export class CollisionDetector {
  public static characterBoxCollision(character: CharacterInterface, box: BoxInterface): boolean {
    if (character.x === box.x - box.width) console.log(character.x, box.x);
    const collisionPointX = box.x - box.width;
    return character.x === collisionPointX && character.y >= box.y;
  }

  public static characterPitCollision(character: CharacterInterface, pit: PitInterface): boolean {
    if (character.x === pit.x) console.log(character.x, pit.x);
    return character.x === pit.x;
  }
}
