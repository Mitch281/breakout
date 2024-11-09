import { X_SCALING, Y_SCALING } from "../tilemap";
import { Dimension, Position } from "../types";
import Sprite from "./Sprite";

const TILE_DIMENSIONS: Dimension = {
    x: X_SCALING - 2,
    y: Y_SCALING - 2,
};

export default class Tile extends Sprite {
    dimensions: Dimension = TILE_DIMENSIONS;

    constructor(position: Position, colour: string) {
        super(position, colour);
    }
}
