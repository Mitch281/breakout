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

    currentKeyBeingPressed: "ArrowLeft" | "ArrowRight" | null = null;

    constructor() {
        super();
        this.initEventListeners();
    }

    initEventListeners(): void {
        document.addEventListener("keydown", (e: KeyboardEvent) => {
            if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
                this.currentKeyBeingPressed = e.key;
            }
        });

        document.addEventListener("keyup", (e: KeyboardEvent) => {
            if (e.key === "ArrowRight" && this.currentKeyBeingPressed === "ArrowRight") {
                this.currentKeyBeingPressed = null;
            } else if (e.key === "ArrowLeft" && this.currentKeyBeingPressed === "ArrowLeft") {
                this.currentKeyBeingPressed = null;
            }
        });
    }

    public detectMovement(): void {
        if (this.currentKeyBeingPressed === "ArrowLeft") {
            this.velocity.x = -this.HORIZONTAL_SPEED;
        } else if (this.currentKeyBeingPressed === "ArrowRight") {
            this.velocity.x = this.HORIZONTAL_SPEED;
        } else {
            this.velocity.x = 0;
        }

        this.move();
    }
}
