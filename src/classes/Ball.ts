import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../screen-dimensions";
import { Dimension, Direction, Position, Velocity } from "../types";
import CircleSprite from "./CircleSprite";
import Paddle from "./Paddle";
import Tile from "./Tile";

const BALL_RADIUS = 5;
const STARTING_POSITION: Position = {
    x: SCREEN_WIDTH / 2 - BALL_RADIUS,
    y: SCREEN_HEIGHT / 2 - BALL_RADIUS,
};
const STARTING_VELOCITY: Velocity = {
    x: -1,
    y: 3,
};

type BallDirection = "up" | "down" | "left" | "right" | "up-right" | "up-left" | "down-right" | "down-left";

export default class Ball extends CircleSprite {
    radius: number = BALL_RADIUS;
    colour: string = "#b1ddf1";
    position: Position = STARTING_POSITION;
    velocity: Velocity = STARTING_VELOCITY;

    private getLeftPosition(): number {
        return this.position.x - this.radius;
    }

    private getRightPosition(): number {
        return this.position.x + this.radius;
    }

    private getBottomPosition(): number {
        return this.position.y + this.radius;
    }

    private getTopPosition(): number {
        return this.position.y - this.radius;
    }

    private isBallHorizontallyWithinRect(rectPosition: Position, rectDimensions: Dimension) {
        const leftOfBall = this.getLeftPosition();
        const rightOfBall = this.getRightPosition();

        const leftOfRect = rectPosition.x;
        const rightOfRect = rectPosition.x + rectDimensions.x;

        return rightOfBall > leftOfRect && leftOfBall < rightOfRect;
    }

    private isBallVerticallyWithinRect(rectPosition: Position, rectDimensions: Dimension) {
        const topOfBall = this.getTopPosition();
        const bottomOfBall = this.getBottomPosition();

        const topOfRect = rectPosition.y;
        const bottomOfRect = rectPosition.y + rectDimensions.y;

        return topOfBall > topOfRect && bottomOfBall < bottomOfRect;
    }

    public detectCollisionWithPaddle(paddle: Paddle): boolean {
        const topOfPaddle = paddle.position.y;
        const bottomOfBall = this.getBottomPosition();

        return bottomOfBall >= topOfPaddle && this.isBallHorizontallyWithinRect(paddle.position, paddle.dimensions);
    }

    public detectCollisionWithWallAndGetWall(): "left" | "right" | "top" | "bottom" | null {
        if (this.getLeftPosition() <= 0) {
            return "left";
        }
        if (this.getRightPosition() >= SCREEN_WIDTH) {
            return "right";
        }
        if (this.getTopPosition() <= 0) {
            return "top";
        }
        if (this.getBottomPosition() >= SCREEN_HEIGHT) {
            return "bottom";
        }

        return null;
    }

    public getBallDirection(): BallDirection {
        if (this.velocity.x === 0 && this.velocity.y > 0) {
            return "down";
        }
        if (this.velocity.x === 0 && this.velocity.y < 0) {
            return "up";
        }
        if (this.velocity.y === 0 && this.velocity.x > 0) {
            return "right";
        }
        if (this.velocity.y === 0 && this.velocity.x < 0) {
            return "left";
        }
        if (this.velocity.x < 0 && this.velocity.y < 0) {
            return "up-left";
        }
        if (this.velocity.x > 0 && this.velocity.y < 0) {
            return "up-right";
        }
        if (this.velocity.x < 0 && this.velocity.y > 0) {
            return "down-left";
        }
        if (this.velocity.x > 0 && this.velocity.y > 0) {
            return "down-right";
        }

        throw new Error("Something went wrong during obtaining ball direction.");
    }

    public detectCollisionWithTileAndGetTileAndDirection(tiles: Tile[]): {
        tile: Tile;
        tileIndex: number;
        direction: Direction;
    } | null {
        const ballDirection = this.getBallDirection();
        for (let i = 0; i < tiles.length; i++) {
            const tile = tiles[i];
            const isBallHorizontallyWithinTile = this.isBallHorizontallyWithinRect(tile.position, tile.dimensions);
            const isBallVerticallyWithinTile = this.isBallVerticallyWithinRect(tile.position, tile.dimensions);
            if (ballDirection.includes("up")) {
                const isCollision =
                    isBallHorizontallyWithinTile &&
                    this.getBottomPosition() >= tile.getBottomPosition() &&
                    this.getTopPosition() <= tile.getBottomPosition();
                if (isCollision) {
                    return {
                        tile,
                        tileIndex: i,
                        direction: "up",
                    };
                }
            }
            if (ballDirection.includes("down")) {
                const isCollision =
                    isBallHorizontallyWithinTile &&
                    this.getBottomPosition() >= tile.getTopPosition() &&
                    this.getTopPosition() <= tile.getTopPosition();
                if (isCollision) {
                    return {
                        tile,
                        tileIndex: i,
                        direction: "down",
                    };
                }
            }
            if (ballDirection.includes("left")) {
                const isCollision =
                    isBallVerticallyWithinTile &&
                    this.getRightPosition() >= tile.getRightPosition() &&
                    this.getLeftPosition() <= tile.getRightPosition();
                if (isCollision) {
                    return {
                        tile,
                        tileIndex: i,
                        direction: "down",
                    };
                }
            }
            if (ballDirection.includes("right")) {
                const isCollision =
                    isBallVerticallyWithinTile &&
                    this.getLeftPosition() <= tile.getLeftPosition() &&
                    this.getRightPosition() >= tile.getLeftPosition();
                if (isCollision) {
                    return {
                        tile,
                        tileIndex: i,
                        direction: "right",
                    };
                }
            }
        }

        return null;
    }
}
