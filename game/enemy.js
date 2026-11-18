import { state } from "./state.js";
import { isInsideGrid, isBlocked, isBox, isLockedDoor } from "./collision.js";

// 1. Generate the four neighbouring positions
function getNeighborCells() {
    let dxy = [[0,0],[-1,0],[0,-1],[0,1],[1,0]];
    let priority = [];
    for (let i=0; i < dxy.length; i++){
        let u = state.enemy.row + dxy[i][0];
        let v = state.enemy.col + dxy[i][1];
        let val = Math.abs(state.player.row - u) + Math.abs(state.player.col - v);
        priority.push([val,u,v]);
    }
    priority.sort();
    return priority;
}

function isValidMove(row, col) {
    if (isInsideGrid(row,col) && !isBox(row,col) && !isBlocked(row,col) && !isLockedDoor(row,col)){
        return true;
    }return false;
}

// Move enemy to the highest-priority valid position
export function moveEnemy() {
    let queue = getNeighborCells();
    for (let i=0;i<queue.length;i++){
        if (isValidMove(queue[i][1],queue[i][2])){
            state.enemy.row = queue[i][1];
            state.enemy.col = queue[i][2];
            
            return;
        }
    }
}

export function isEnemyCaughtPlayer(){
    return ((state.player.row === state.enemy.row)&&
            (state.player.col === state.enemy.col));
}
