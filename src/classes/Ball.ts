import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../screen-dimensions";
import { Position, Velocity } from "../types";
import CircleSprite from "./CircleSprite";
import Paddle from "./Paddle";

const BALL_RADIUS = 5;
const STARTING_POSITION: Position = {
    x: SCREEN_WIDTH / 2 - BALL_RADIUS,
    y: SCREEN_HEIGHT / 2 - BALL_RADIUS,
};
const STARTING_VELOCITY: Velocity = {
    x: 0,
    y: 1,
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

    public detectCollisionWithPaddle(paddle: Paddle): boolean {
        const topOfPaddle = paddle.position.y;
        const leftOfPaddle = paddle.position.x;
        const rightOfPaddle = paddle.position.x + paddle.dimensions.x;
        const bottomOfBall = this.getBottomPosition();
        const leftOfBall = this.getLeftPosition();
        const rightOfBall = this.getRightPosition();

        return bottomOfBall >= topOfPaddle && rightOfBall > leftOfPaddle && leftOfBall < rightOfPaddle;
    }
}
