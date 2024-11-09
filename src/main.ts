import * as PIXI from "pixi.js";
import Paddle from "./classes/Paddle";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "./screen-dimensions";

const MAX_FPS = 60;

async function main(): Promise<void> {
    const app = new PIXI.Application();
    await app.init({ width: SCREEN_WIDTH, height: SCREEN_HEIGHT });
    document.body.append(app.canvas);

    app.ticker.maxFPS = MAX_FPS;

    const paddle = new Paddle();

    app.ticker.add(() => {
        paddle.draw(app.stage);
    });
}

main()
    .then()
    .catch(error => console.log("error starting: ", error));
