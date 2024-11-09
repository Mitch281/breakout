import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../screen-dimensions";
import { Position } from "../types";
import CircleSprite from "./CircleSprite";

const BALL_RADIUS = 5;
const STARTING_POSITION = {
    x: SCREEN_WIDTH / 2 - BALL_RADIUS,
    y: SCREEN_HEIGHT / 2 - BALL_RADIUS,
};

export default class Ball extends CircleSprite {
    radius: number = BALL_RADIUS;
    colour: string = "#b1ddf1";
    position: Position = STARTING_POSITION;
}
