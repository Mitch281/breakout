import * as PIXI from "pixi.js";
import { Position, Velocity } from "../types";

export default abstract class CircleSprite {
    velocity: Velocity = {
        x: 0,
        y: 0,
    };

    abstract colour: string;
    abstract position: Position;
    abstract radius: number;

    public draw(stage: PIXI.Container<PIXI.ContainerChild>): void {
        const graphics = new PIXI.Graphics();
        graphics.fill(0xffffff);
        graphics.circle(this.position.x, this.position.y, this.radius);
        graphics.fill();
        stage.addChild(graphics);
    }

    protected move(): void {
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
    }
}
