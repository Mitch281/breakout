import * as PIXI from "pixi.js";
import Paddle from "./classes/Paddle";
import Tile from "./classes/Tile";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "./screen-dimensions";
import { TILEMAP, X_SCALING, Y_SCALING } from "./tilemap";
import { Position } from "./types";

const MAX_FPS = 60;

function clearStage(stage: PIXI.Container<PIXI.ContainerChild>): void {
    for (const child of stage.children) {
        stage.removeChild(child);
    }
}

function getTileColourGivenTileType(tileType: number): string | null {
    switch (tileType) {
        case 1:
            return "purple";
        case 2:
            return "red";
        case 3:
            return "yellow";
        case 4:
            return "green";
        default:
            return null;
    }
}

function createTiles(): Tile[] {
    const tiles: Tile[] = [];
    for (let i = 0; i < TILEMAP[0].length; i++) {
        for (let j = 0; j < TILEMAP.length; j++) {
            const position: Position = {
                x: j * X_SCALING,
                y: i * Y_SCALING,
            };
            const colour = getTileColourGivenTileType(TILEMAP[i][j]);
            if (!colour) {
                continue;
            }

            const tile = new Tile(position, colour);
            tiles.push(tile);
        }
    }

    return tiles;
}

async function main(): Promise<void> {
    const app = new PIXI.Application();
    await app.init({ width: SCREEN_WIDTH, height: SCREEN_HEIGHT });
    document.body.append(app.canvas);

    app.ticker.maxFPS = MAX_FPS;

    const paddle = new Paddle();
    const tiles = createTiles();

    app.ticker.add(() => {
        clearStage(app.stage);

        paddle.draw(app.stage);
        paddle.detectMovement();

        for (const tile of tiles) {
            tile.draw(app.stage);
        }
    });
}

main()
    .then()
    .catch(error => console.log("error starting: ", error));
