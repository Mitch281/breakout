// 0 is no tile
// 1 is purple tile
// 2 is red tile
// 3 is yellow tile
// 4 is green tile

import { SCREEN_HEIGHT, SCREEN_WIDTH } from "./screen-dimensions";

// prettier-ignore
export const TILEMAP = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 0],
    [0, 2, 2, 2, 2, 2, 2, 2, 2, 0],
    [0, 3, 3, 3, 3, 3, 3, 3, 3, 0],
    [0, 4, 4, 4, 4, 4, 4, 4, 4, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
];

export const X_SCALING = SCREEN_WIDTH / TILEMAP[0].length;
export const Y_SCALING = SCREEN_HEIGHT / TILEMAP.length;
