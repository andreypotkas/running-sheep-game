import * as PIXI from "pixi.js";

export function renderResetButton() {
  const restartButton = new PIXI.Text("Restart", { fontSize: 24, fill: 0xffffff });
  restartButton.interactive = true;
  restartButton.anchor.set(0.5);

  const centerX = window.innerWidth / 2 + window.scrollX;
  const centerY = window.innerHeight / 2 + window.scrollY;

  restartButton.position.set(centerX, centerY);

  restartButton.on("pointerdown", () => {
    window.location.reload();
  });

  return restartButton;
}

export function createSpriteFromImage(image: string, width: number, height: number, positionX: number, positionY: number) {
  const texture = PIXI.Texture.from(image);
  const sprite = new PIXI.Sprite(texture);
  sprite.width = width;
  sprite.height = height;
  sprite.position.set(positionX, positionY);

  return sprite;
}
