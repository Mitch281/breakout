import * as PIXI from "pixi.js";
import Ball from "./classes/Ball";
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

function removeTileAtIndex(tiles: Tile[], tileIndex: number): void {
    tiles.splice(tileIndex, 1);
}

async function main(): Promise<void> {
    const app = new PIXI.Application();
    await app.init({ width: SCREEN_WIDTH, height: SCREEN_HEIGHT });
    document.body.append(app.canvas);

    app.ticker.maxFPS = MAX_FPS;

    const paddle = new Paddle();
    const tiles = createTiles();
    const ball = new Ball();

    app.ticker.add(() => {
        clearStage(app.stage);

        paddle.draw(app.stage);
        paddle.detectMovement();

        for (const tile of tiles) {
            tile.draw(app.stage);
        }

        ball.draw(app.stage);
        ball.move();

        const ballCollisionWithPaddleLocation = ball.detectCollisionWithPaddleAndGetLocation(paddle);
        switch (ballCollisionWithPaddleLocation) {
            case "middle":
                ball.velocity.y *= -1;
                break;
            case "left":
                ball.velocity.y *= -1;
                if (ball.velocity.x > 0) {
                    ball.velocity.x *= -1;
                }
                break;
            case "right":
                ball.velocity.y *= -1;
                if (ball.velocity.x < 0) {
                    ball.velocity.x *= -1;
                }
                break;
        }

        const wallThatBallCollidedWith = ball.detectCollisionWithWallAndGetWall();
        switch (wallThatBallCollidedWith) {
            case "top":
                ball.velocity.y *= -1;
                break;
            case "left":
            case "right":
                ball.velocity.x *= -1;
                break;
            case "bottom":
                // Game over.
                app.ticker.stop();
                break;
        }

        const tileBallCollidedWithAndCollisionDirection = ball.detectCollisionWithTileAndGetTileAndDirection(tiles);
        if (tileBallCollidedWithAndCollisionDirection) {
            const { tile, tileIndex, direction: collisionDirection } = tileBallCollidedWithAndCollisionDirection;
            switch (collisionDirection) {
                case "up":
                case "down":
                    ball.velocity.y *= -1;
                    break;
                case "left":
                case "right":
                    ball.velocity.x *= -1;
                    break;
            }

            tile.remove(app.stage);
            removeTileAtIndex(tiles, tileIndex);
        }
    });
}

main()
    .then()
    .catch(error => console.log("error starting: ", error));
