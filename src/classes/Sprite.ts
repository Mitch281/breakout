import * as PIXI from "pixi.js";
import { Dimension, Position, Velocity } from "../types";

export default abstract class Sprite {
    abstract position: Position;
    abstract dimensions: Dimension;
    velocity: Velocity = {
        x: 0,
        y: 0,
    };
    abstract colour: string;

    public draw(stage: PIXI.Container<PIXI.ContainerChild>): void {
        const graphics = new PIXI.Graphics();
        graphics.fill(this.colour); // Convert color to hex format
        graphics.rect(this.position.x, this.position.y, this.dimensions.x, this.dimensions.y);
        graphics.fill();
        stage.addChild(graphics);
    }

    protected move(velocity: Velocity): void {
        this.velocity.x += velocity.x;
        this.velocity.y += velocity.y;
    }
}
