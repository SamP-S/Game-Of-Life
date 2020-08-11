
// 0    "empty"     colour  
function Cell(id, name, colour) {
    this.id = id;
    this.name = name;
    this.colour = colour;
}

var cells = [
    new Cell(0, "empty", BLACK),
    new Cell(1, "filled", WHITE),
    new Cell(2, "death", RED)
]

function get1dArray(max) {
    let arr = [];
    for (let i = 0; i < max; i++) {
        arr.push(0);
    }
    return arr;
}

function get2dArray(max_x, max_y) {
    let arr = [];
    for (let j = 0; j < max_y; j++) {
        arr.push(get1dArray(max_x));
    }
    return arr;
}

class StateMachine {
    constructor(states=null) {
        this.empty = {
            render: function(){},
            update: function(){},
            enter: function(){},
            exit: function(){}
        };
        if (states !=  null) {
            this.states = states;
        } else {
            this.states = {};
        }
        this.current = this.empty;
    }
    change(stateName, enterArgs) {
        if (!this.states[stateName]) {
            return false;
        }
        this.current.exit();
        this.current = this.states[stateName]();
        this.current.enter(enterArgs);
    }

    update(dt) {
        this.current.update(dt);
    }
    render() {
        this.current.render();
    }
}

class BaseState {
    constructor(){}
    enter(){}
    update(dt){}
    render(){}
    exit(){}
}

class MainMenuState {
    enter(){}
    update(dt){}
    render(){}
    exit(){}
}

class PlayState {
    constructor() {
        this.max_x = 64;
        this.max_y = 36;
        this.gameBoard = get2dArray(this.max_x, this.max_y);
        this.cellSize = 0;
        this.highlightPos = null;
    }
    enter(){}
    update(dt) {
        let i = Math.floor((mousePos.x + 1) / this.cellSize);
        let j = Math.floor((mousePos.y + 1) / this.cellSize / ctx.aspect);
        if (i < this.max_x && i >= 0 && j < this.max_y && j >= 0) {
            this.highlightPos = { x: i, y: j };
        } else {
            this.highlightPos = null;
        }
        if (isClick) {
            if (this.gameBoard[j][i] == 1) {
                this.gameBoard[j][i] = 0;
            } else {
                this.gameBoard[j][i] = 1;
            }
            isClick = false;
        }

        // process new state
        if (ctrlState == "next") {
            ctrlState = "none";
            let newBoard = get2dArray(this.max_x, this.max_y);
            for (let i = 0; i < this.max_x; i++) {
                for (let j = 0; j < this.max_y; j++) {
                    let count = 0;
                    for (let u = Math.max(i - 1, 0); u < Math.min(i + 2, this.max_x); u++) {
                        for (let v = Math.max(j - 1, 0); v < Math.min(j + 2, this.max_y); v++) {
                            if (u == i && v == j) {
                                continue;
                            }
                            if (this.gameBoard[v][u] == 1) {
                                count++;
                            }
                        }
                    }
                    // if cell dead
                    if (this.gameBoard[j][i] == 0) {
                        if (count == 3) {
                            newBoard[j][i] = 1;
                        } else {
                            newBoard[j][i] = 0;
                        }
                    }
                    // if cell alive
                    else {
                        if (count < 2 || count > 3) {
                            newBoard[j][i] = 0;
                        } else {
                            newBoard[j][i] = 1;
                        }
                    }
                }
            }
            this.gameBoard = newBoard;
        }
    }
    render() {
        let ndc_x =  2 / this.max_x;
        let ndc_y = ctx.aspect * 2 / this.max_y;
        if (ndc_x < ndc_y) {
            this.cellSize = ndc_x;
        } else {
            this.cellSize = ndc_y;
        }
        for (let i = 0; i < this.max_x; i++) {
            for (let j = 0; j < this.max_y; j++) {
                ctx.fillStyle = cells[this.gameBoard[j][i]].colour;
                ctx.fillRect(
                    -1 + i * this.cellSize,                 // x
                    -1 + j * this.cellSize * ctx.aspect,    // y
                    this.cellSize,                          // width
                    this.cellSize * ctx.aspect              // height
                )
            }
        }
        if (this.highlightPos != null) {
            ctx.strokeStyle = RED;
            ctx.strokeRect(
                -1 + this.highlightPos.x * this.cellSize,                 // x
                -1 + this.highlightPos.y * this.cellSize * ctx.aspect,    // y
                this.cellSize,                          // width
                this.cellSize * ctx.aspect              // height
            );
        }
    }
    exit(){}
}

class Vec2 {
    constructor(x=0,y=0) {
        this.x = x;
        this.y = y;
    }
}

var gameBoard = get2dArray(4,2);
var now, last, dt;

gameStateMachine = new StateMachine( {
    "base": function(){ return new BaseState()},
    "play": function(){ return new PlayState()}
 });

function timestamp() {
    return window.performance && window.performance.now ? window.performance.now() : new Date().getTime();
}

function mainLoop() {
    now = timestamp();
    dt = (now - last) / 1000;
    gameStateMachine.update(dt);
    gameStateMachine.render();
    last = now;
    window.requestAnimationFrame(mainLoop);
}

document.addEventListener("DOMContentLoaded", function(){
    ctx.fillStyle = RED;
    ctx.fillRect(-1, -1, 2, 2);
    last = timestamp();
    gameStateMachine.change("play");
    window.requestAnimationFrame(mainLoop);
})
