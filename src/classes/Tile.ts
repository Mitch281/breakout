import { Dimension, Position } from "../types";
import Sprite from "./Sprite";

const TILE_DIMENSIONS: Dimension = {
    x: 30,
    y: 5,
};

export default class Tile extends Sprite {
    dimensions: Dimension = TILE_DIMENSIONS;

    constructor(position: Position, colour: string) {
        super(position, colour);
    }
}
