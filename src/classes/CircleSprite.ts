import * as PIXI from "pixi.js";
import { Position, Velocity } from "../types";

export default abstract class CircleSprite {
    abstract velocity: Velocity;
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

    public move(): void {
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
    }
}
