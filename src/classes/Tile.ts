import { X_SCALING, Y_SCALING } from "../tilemap";
import { Dimension, Position } from "../types";
import RectSprite from "./RectSprite";

const TILE_DIMENSIONS: Dimension = {
    x: X_SCALING - 2,
    y: Y_SCALING - 2,
};

export default class Tile extends RectSprite {
    dimensions: Dimension = TILE_DIMENSIONS;

    constructor(position: Position, colour: string) {
        super(position, colour);
    }

    public getLeftPosition(): number {
        return this.position.x;
    }

    public getRightPosition(): number {
        return this.position.x + this.dimensions.x;
    }

    public getTopPosition(): number {
        return this.position.y;
    }

    public getBottomPosition(): number {
        return this.position.y + this.dimensions.y;
    }
}
