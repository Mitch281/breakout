import * as PIXI from "pixi.js";
import Paddle from "./classes/Paddle";
import Tile from "./classes/Tile";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "./screen-dimensions";

const MAX_FPS = 60;

function clearStage(stage: PIXI.Container<PIXI.ContainerChild>): void {
    for (const child of stage.children) {
        stage.removeChild(child);
    }
}

async function main(): Promise<void> {
    const app = new PIXI.Application();
    await app.init({ width: SCREEN_WIDTH, height: SCREEN_HEIGHT });
    document.body.append(app.canvas);

    app.ticker.maxFPS = MAX_FPS;

    const paddle = new Paddle();
    const tile = new Tile({ x: 10, y: 10 }, "red");

    app.ticker.add(() => {
        clearStage(app.stage);
        paddle.draw(app.stage);
        tile.draw(app.stage);
        paddle.detectMovement();
    });
}

main()
    .then()
    .catch(error => console.log("error starting: ", error));
