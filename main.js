
import { movePlayer } from "./game/movement.js";

import {
    loadLevel,
    updateGame,
    nextLevel,
    restartLevel
} from "./game/gameManager.js";

const elements = {
    grid: document.getElementById("grid"),
    message: document.getElementById("message"),
    count: document.getElementById("count"),
    restartButton: document.getElementById("restart"),
    nextLevelButton: document.getElementById("nextLevel")
};

// Keyboard controls
document.addEventListener("keydown", function(event) {

    const key = event.key.toLowerCase();

    const directions = {
        arrowup: [-1, 0],
        arrowdown: [1, 0],
        arrowleft: [0, -1],
        arrowright: [0, 1]
    };

    if (!(key in directions)) return;

    event.preventDefault();

    const [rowChange, colChange] = directions[key];

    const moved = movePlayer(rowChange, colChange);

    if (moved) {
        updateGame(elements);
    }
});

// Restart
elements.restartButton.addEventListener("click", function() {
    restartLevel(elements);
});

// Next level
elements.nextLevelButton.addEventListener("click", function() {
    nextLevel(elements);
});

// Start game
loadLevel(elements);
