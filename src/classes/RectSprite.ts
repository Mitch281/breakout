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
    graphics: PIXI.Graphics | null = null;

    constructor(position: Position, colour: string) {
        this.position = position;
        this.colour = colour;
    }

    public draw(stage: PIXI.Container<PIXI.ContainerChild>): void {
        this.graphics?.clear();
        const graphics = new PIXI.Graphics();
        graphics.fill(this.colour);
        graphics.rect(this.position.x, this.position.y, this.dimensions.x, this.dimensions.y);
        graphics.fill();
        this.graphics = stage.addChild(graphics);
    }

    public remove(stage: PIXI.Container<PIXI.ContainerChild>): void {
        if (!this.graphics) {
            return;
        }
        stage.removeChild(this.graphics);
    }

    protected move(): void {
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
    }
}
