
export const state = {
    currentLevel: 0,
    SIZE: 0,
    player: null,
    goal: null,
    block: [],
    box: [],
    key: [],
    lock: false,
    fallBlock: null,
    powerUp: null,
    won: false,
    counter: 0,
    hasPower: false
};

export function resetState(level) {
    state.SIZE = level.size;

    state.player = { ...level.player };
    state.goal = { ...level.goal };

    state.block = level.blocks.map(item => ({ ...item }));
    state.box = level.boxes.map(item => ({ ...item }));
    state.key = level.key.map(item => ({ ...item }));

    state.lock = level.lock;

    state.fallBlock = level.fallBlock
        ? { ...level.fallBlock }
        : null;

    state.powerUp = level.powerUp
        ? { ...level.powerUp }
        : null;

    state.won = false;
    state.counter = 0;
    state.hasPower = false;
}
