
import { state } from "./state.js";

export function drawGrid(grid) {
    grid.innerHTML = "";

    for (let row = 0; row < state.SIZE; row++) {
        for (let col = 0; col < state.SIZE; col++) {

            const cell = document.createElement("div");
            cell.className = "cell";

            const isBlocked = state.block.some(
                item => item.row === row && item.col === col
            );

            if (isBlocked) {
                cell.classList.add("block");
                grid.appendChild(cell);
                continue;
            }

            const hasBox = state.box.some(
                item => item.row === row && item.col === col
            );

            if (hasBox) {
                cell.classList.add("box");
                grid.appendChild(cell);
                continue;
            }

            if (row === state.player.row && col === state.player.col) {
                cell.textContent = "🙂";
                cell.classList.add("player");

            } else if (row === state.goal.row && col === state.goal.col) {
                cell.textContent = "⭐";
                cell.classList.add("goal");

            } else if (
                row === state.key[0].row &&
                col === state.key[0].col &&
                state.lock === false
            ) {
                cell.textContent = "🗝️";
                cell.classList.add("key");

            } else if (
                state.powerUp &&
                row === state.powerUp.row &&
                col === state.powerUp.col &&
                state.powerUp.isHere === true
            ) {
                cell.textContent = "🦘";

            } else if (
                row === state.key[1].row &&
                col === state.key[1].col &&
                state.lock === false
            ) {
                cell.classList.add("lock");

            } else if (
                state.fallBlock &&
                row === state.fallBlock.row &&
                col === state.fallBlock.col
            ) {
                const val = state.fallBlock.steps - state.counter;

                if (val >= 0) {
                    cell.textContent = val;
                }
            }

            grid.appendChild(cell);
        }
    }
}
