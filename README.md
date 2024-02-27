# Running Sheep

Running Sheep is a simple browser-based game built using Pixi.js, GSAP, and TypeScript.
The game features three main scenes: loading, menu, and game level.
Players control a character, guiding it through obstacles to reach the finish line.

Project started from typescript pixi webpack configuration template.

```bash
 https://github.com/ltruchot/seed-pixi-typescript.git
```

## Getting Started

To run the game locally, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/andreypotkas/running-sheep-game.git
   ```

2. Navigate to the project directory:

   ```bash
   cd running-sheep-game
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Start the development server:

   ```bash
   npm start
   ```

5. Open your browser and navigate to `http://localhost:8080` to play the game.

## Technologies Used

- [Pixi.js](https://www.pixijs.com/): A fast and lightweight 2D rendering library.
- [GSAP (GreenSock Animation Platform)](https://greensock.com/): A JavaScript animation library.
- TypeScript: A statically typed superset of JavaScript that compiles to plain JavaScript.

## Scenes

### Loading

The loading scene displays a progress bar while the game's assets are being loaded. Once the loading is complete, the game transitions to the main menu.

### Menu

The menu scene provides options to start the game, toggle fullscreen mode, and view the best score.

### Game Level

In the game level scene, players control a character to navigate through obstacles and reach the finish line.

## Fullscreen Mode

The game supports fullscreen mode, allowing players to enjoy an immersive gaming experience.
