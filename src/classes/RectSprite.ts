import * as PIXI from "pixi.js";
import { Dimension, Position, Velocity } from "../types";

export default abstract class RectSprite {
    position: Position;
    abstract dimensions: Dimension;
    velocity: Velocity = {
        x: 0,
        y: 0,
    };
    colour: string;

    constructor(position: Position, colour: string) {
        this.position = position;
        this.colour = colour;
    }

    public draw(stage: PIXI.Container<PIXI.ContainerChild>): void {
        const graphics = new PIXI.Graphics();
        graphics.fill(this.colour); // Convert color to hex format
        graphics.rect(this.position.x, this.position.y, this.dimensions.x, this.dimensions.y);
        graphics.fill();
        stage.addChild(graphics);
    }

    protected move(): void {
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
    }
}
