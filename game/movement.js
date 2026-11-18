
import { state } from "./state.js";
import { playSound } from "./audio.js";
import { isEnemyCaughtPlayer, moveEnemy } from "./enemy.js";
import { isInsideGrid, isBlocked, isBox, isLockedDoor } from "./collision.js";


// Check Jump power lands on goal 
function isGoal(row, col){
    return (
        state.goal.row == row && 
        state.goal.col == row
    );
}

// Activate falling block
function activateFallingBlock() {
    if (!state.fallBlock) return;

    if (state.counter > state.fallBlock.steps) {

        const alreadyExists = isBlocked(
            state.fallBlock.row,
            state.fallBlock.col
        );

        if (!alreadyExists) {
            state.block.push({
                row: state.fallBlock.row,
                col: state.fallBlock.col
            });

            playSound("fall");
        }
    }
}

// Collect key and power-up
function collectItems() {

    // Collect key
    if (
        !state.lock &&
        state.player.row === state.key[0].row &&
        state.player.col === state.key[0].col
    ) {
        state.lock = true;
        playSound("key");
    }

    // Collect jump power-up
    if (
        state.powerUp &&
        state.powerUp.isHere &&
        state.player.row === state.powerUp.row &&
        state.player.col === state.powerUp.col
    ) {
        state.powerUp.isHere = false;
        state.hasPower = true;
        playSound("powerup");
    }
}

// Move player
export function movePlayer(rowChange, colChange) {

    if (state.won) return false;
    if (state.lost) return false;

    let newRow = state.player.row + rowChange;
    let newCol = state.player.col + colChange;

    let jumped = false;
    let pushedBox = false;

    // Grid boundaries
    if (!isInsideGrid(newRow, newCol)) {
        return false;
    }

    // Block collision and jumping
    if (isBlocked(newRow, newCol)) {

        if (!state.hasPower) {
            return false;
        }

        const jumpRow = newRow + rowChange;
        const jumpCol = newCol + colChange;

        // Landing boundaries
        if (!isInsideGrid(jumpRow, jumpCol)) {
            return false;
        }

        // Cannot land on another block
        if (isBlocked(jumpRow, jumpCol)) {
            return false;
        }

        // Cannot land on a box
        if (isBox(jumpRow, jumpCol)) {
            return false;
        }

        // Cannot land on a locked door
        if (isLockedDoor(jumpRow, jumpCol)) {
            return false;
        }

        // Cannot allow jump direclty to goal 
        if (isGoal(jumpRow, jumpCol)) {
            return false ;
        }

        // Jump over block
        newRow = jumpRow;
        newCol = jumpCol;

        // Consume power
        state.hasPower = false;
        jumped = true;
    }

    // Door collision
    if (isLockedDoor(newRow, newCol)) {
        return false;
    }

    // Box pushing
    const boxIndex = state.box.findIndex(
        item => item.row === newRow && item.col === newCol
    );

    if (boxIndex !== -1) {

        const newBoxRow = newRow + rowChange;
        const newBoxCol = newCol + colChange;

        // Box boundaries
        if (!isInsideGrid(newBoxRow, newBoxCol)) {
            return false;
        }

        // Box cannot enter a block
        if (isBlocked(newBoxRow, newBoxCol)) {
            return false;
        }

        // Box cannot push another box
        if (isBox(newBoxRow, newBoxCol)) {
            return false;
        }

        // Box cannot enter locked door
        if (isLockedDoor(newBoxRow, newBoxCol)) {
            return false;
        }

        // Push box
        state.box[boxIndex].row = newBoxRow;
        state.box[boxIndex].col = newBoxCol;

        pushedBox = true;
    }

    // Move player
    state.player.row = newRow;
    state.player.col = newCol;

    
    state.counter++;
    moveEnemy();
    
    
    // Movement sounds
    if (jumped) {
        playSound("jump");
    } else if (pushedBox) {
        playSound("push");
    } else {
        playSound("move");
    }
    
    // Update step count
    collectItems();
    
    // Activate falling block
    activateFallingBlock();
    
    // Winning condition
    if (
        state.player.row === state.goal.row &&
        state.player.col === state.goal.col
    ) {
        state.won = true;
        playSound("win");
    }
    
    return true;
}
