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

    HORIZONTAL_SPEED = 1;

    constructor() {
        super();
        this.detectMovement();
    }

    detectMovement(): void {
        document.addEventListener("keydown", (e: KeyboardEvent) => {
            console.log(e);
            switch (e.key) {
                case "ArrowRight":
                    console.log("yay");
                    this.velocity.x = this.HORIZONTAL_SPEED;
                    break;
                case "ArrowLeft":
                    this.velocity.x = -this.HORIZONTAL_SPEED;
                    break;
            }
        });
    }
}
