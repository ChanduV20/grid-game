
import { movePlayer } from "./game/movement.js";

import {
    loadLevel,
    updateGame,
    nextLevel,
    restartLevel
} from "./game/gameManager.js";

import { state } from "./game/state.js";

import { isEnemyCaughtPlayer } from "./game/enemy.js";
import { playSound } from "./game/audio.js";

export const elements = {
    grid: document.getElementById("grid"),
    message: document.getElementById("message"),
    count: document.getElementById("count"),
    restartButton: document.getElementById("restart"),
    nextLevelButton: document.getElementById("nextLevel")
};

export function showOverlay(){
    state.lost = true;
            const overlay = document.createElement("div");
            overlay.id = "caughtOverlay";

            const img = document.createElement("img");
            img.src = "game\\images\\caught.png";
            img.alt = "Game Over";

            overlay.appendChild(img);
            elements.grid.appendChild(overlay);
}
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
        if (isEnemyCaughtPlayer()) {
            showOverlay();
            playSound("lost");
        }
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
