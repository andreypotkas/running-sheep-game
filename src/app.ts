import { GameApp } from "./app/components/application";
import { Character } from "./app/models/character";
import { Square } from "./app/models/square";

const app = new GameApp();

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
app.runGame(character);
