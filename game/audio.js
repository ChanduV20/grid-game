
const sounds = {
    move: new Audio("game\\audio\\move.mp3"),
    push: new Audio("game\\audio\\push.mp3"),
    key: new Audio("game\\audio\\key.mp3"),
    powerup: new Audio("game\\audio\\powerUp.mp3"),
    jump: new Audio("game\\audio\\jump.mp3"),
    fall: new Audio("game\\audio\\fall.mp3"),
    win: new Audio("game\\audio\\win.mp3")
};

// Preload sounds
Object.values(sounds).forEach(sound => {
    sound.preload = "auto";
    sound.volume = 0.5;
});

export function playSound(name) {
    const sound = sounds[name];

    if (!sound) return;

    sound.currentTime = 0;

    sound.play()
}
