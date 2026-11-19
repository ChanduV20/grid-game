export const levels = [
    {
        size: 8,
        enemy: {row: 7, col: 0},
        lock:false,
        powerUp: { row: 4, col: 0, isHere: true},
        fallBlock: { row: 6, col: 7, steps: 29},
        key: [{ row: 0, col: 7 }, {row: 6, col: 6}],
        player: { row: 0, col: 0 },
        goal: { row: 7, col: 7 },
        blocks:[
            {row:2,col:2},{row:5,col:5},{row:0,col:3},
            {row:3,col:5},{row:6,col:2},{row:6,col:4},
            {row:7,col:6}
        ],
        boxes: [
            {row:4,col:2},{row:3,col:5},{row:2,col:1},
            {row:2,col:0},{row:1,col:3},{row:4,col:7},
            {row:5,col:6},{row:3,col:6},{row:1,col:4}
        ],
        trap: {row:3,col:1} , 
        teleport: {row:4,col:6}
    },
    {
        size: 8,
        enemy: {row: 7, col: 0},
        lock: false,
        powerUp: { row: 4, col: 0, isHere: true},
        fallBlock: { row: 6, col: 7, steps: 30},
        key: [{ row: 0, col: 7 }, {row: 6, col: 6}],
        player: { row: 0, col: 0 },
        goal: { row: 7, col: 7 },
        blocks: [
            {row:2,col:2},{row:5,col:5},{row:0,col:3},
            {row:3,col:5},{row:6,col:2},{row:6,col:4},
            {row:7,col:6}
        ],
        boxes: []
    }
];