
export const state = {
    currentLevel: 0,
    SIZE: 0,
    enemy: null,
    player: null,
    goal: null,
    block: [],
    box: [],
    key: [],
    lock: false,
    fallBlock: null,
    powerUp: null,
    won: false,
    lost: false,
    counter: 0,
    hasPower: false, 
    trap: null,
};

export function resetState(level) {
    state.SIZE = level.size;

    state.enemy = { ...level.enemy };
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
    state.lost = false;
    state.counter = 0;
    state.hasPower = false;
    state.trap = level.traps.map(item => ({ ...item }));
}
