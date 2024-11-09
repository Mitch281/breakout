import { SCREEN_WIDTH } from "../screen-dimensions";
import { Dimension } from "../types";
import Sprite from "./Sprite";

const PADDLE_DIMENSIONS: Dimension = {
    x: 150,
    y: 10,
};

export default class Paddle extends Sprite {
    dimensions: Dimension = PADDLE_DIMENSIONS;

    HORIZONTAL_SPEED = 1;

    currentKeyBeingPressed: "ArrowLeft" | "ArrowRight" | null = null;

    constructor() {
        super({ x: SCREEN_WIDTH / 2 - PADDLE_DIMENSIONS.x / 2, y: 450 }, "white");
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
            if (this.detectPaddleHitEdgeOfScreen()) {
                this.velocity.x = 0;
                return;
            }
            this.velocity.x = -this.HORIZONTAL_SPEED;
        } else if (this.currentKeyBeingPressed === "ArrowRight") {
            if (this.detectPaddleHitEdgeOfScreen()) {
                this.velocity.x = 0;
                return;
            }
            this.velocity.x = this.HORIZONTAL_SPEED;
        } else {
            this.velocity.x = 0;
        }

        this.move();
    }

    private detectPaddleHitEdgeOfScreen(): boolean {
        const hasHitLeft = this.position.x === 0;
        const hasHitRight = this.position.x + this.dimensions.x === SCREEN_WIDTH;

        return (
            (hasHitLeft && this.currentKeyBeingPressed === "ArrowLeft") ||
            (hasHitRight && this.currentKeyBeingPressed === "ArrowRight")
        );
    }
}
