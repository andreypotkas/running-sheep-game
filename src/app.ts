import { Application } from "./app/components/application";
import { Character } from "./app/components/character";
import { Square } from "./app/components/square";

const app = new Application();

const squares: Square[] = [];
const character = new Character();
app.stage.addChild(character.sprite);

window.addEventListener("keydown", (e) => {
  if (e.code === "Space") {
    const square = new Square(character.sprite.x, character.sprite.y + character.sprite.height);
    app.stage.addChild(square.graphics);
    app.squares.push(square);
    character.moveUp(square.size.height);
  }
});
app.start(character);
