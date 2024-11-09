import { Dimension, Position } from "../types";
import Sprite from "./Sprite";

export default class Paddle extends Sprite {
    position: Position = {
        x: 10,
        y: 10,
    };
    dimensions: Dimension = {
        x: 10,
        y: 10,
    };
    colour: string = "white";
}
