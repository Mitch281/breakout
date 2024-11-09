import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../screen-dimensions";
import { Dimension, Position, Velocity } from "../types";
import CircleSprite from "./CircleSprite";
import Paddle from "./Paddle";

const BALL_RADIUS = 5;
const STARTING_POSITION: Position = {
    x: SCREEN_WIDTH / 2 - BALL_RADIUS,
    y: SCREEN_HEIGHT / 2 - BALL_RADIUS,
};
const STARTING_VELOCITY: Velocity = {
    x: -1,
    y: 3,
};

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

    public detectCollisionWithPaddle(paddle: Paddle): boolean {
        const topOfPaddle = paddle.position.y;
        const bottomOfBall = this.getBottomPosition();

        return bottomOfBall >= topOfPaddle && this.isBallHorizontallyWithinRect(paddle.position, paddle.dimensions);
    }

    public detectCollisionWithWallAndGetWall(): "bottom" | "top" | "left" | "right" | null {
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
}
