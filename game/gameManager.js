
import { levels } from "../levels.js";
import { state, resetState } from "./state.js";
import { drawGrid } from "./grid.js";

export function loadLevel(elements) {
    const level = levels[state.currentLevel];

    resetState(level);

    elements.message.textContent = "Reach the star to win!";
    elements.count.textContent = "Number of steps: 0";

    elements.nextLevelButton.style.display = "none";

    elements.grid.style.setProperty("--size", state.SIZE);

    drawGrid(elements.grid);
}

export function updateGame(elements) {
    elements.count.textContent =
        "Number of steps: " + state.counter;

    drawGrid(elements.grid);

    if (state.won) {

        if (state.currentLevel < levels.length - 1) {
            elements.nextLevelButton.style.display = "inline-block";

            elements.message.textContent =
                "Level completed! Click Next Level.";

        } else {
            elements.nextLevelButton.style.display = "none";

            elements.message.textContent =
                "Congratulations! All levels completed!";
        }
    }
}

export function nextLevel(elements) {
    if (state.currentLevel < levels.length - 1) {
        state.currentLevel++;
        loadLevel(elements);
    }
}

export function restartLevel(elements) {
    loadLevel(elements);
}
