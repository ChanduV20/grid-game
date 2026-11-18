import { state } from "./state.js";

// Check grid boundaries
export function isInsideGrid(row, col) {
    return (
        row >= 0 &&
        row < state.SIZE &&
        col >= 0 &&
        col < state.SIZE
    );
}

// Check blocks
export function isBlocked(row, col) {
    return state.block.some(
        item => item.row === row && item.col === col
    );
}

// Check boxes
export function isBox(row, col) {
    return state.box.some(
        item => item.row === row && item.col === col
    );
}

// Check locked door
export function isLockedDoor(row, col) {
    return (
        state.key[1].row === row &&
        state.key[1].col === col &&
        state.lock === false
    );
}