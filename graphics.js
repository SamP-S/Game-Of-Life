var canvas;
var ctx;
var cursorPos = { x: -2, y: -2 };
var mousePos = { x: -2, y: -2 };
var isClick;

var BLACK = "#000000";
var WHITE = "#FFFFFF";
var RED = "#FF0000";
var GREEN = "#00FF00";
var BLUE = "#0000FF";

document.addEventListener("DOMContentLoaded", function(){
    canvas = document.getElementById("canvas");
    canvas.onclick = function(evt) {
        isClick = true;
    }
    canvas.onmousemove = function(evt) {
        let pos_x = evt.x - canvas.offsetLeft;
        let pos_y = evt.y - canvas.offsetTop;
        cursorPos = { x: pos_x, y: pos_y };
        let mouse_x = 2 * pos_x / canvas.width - 1;
        let mouse_y = 2 * pos_y / canvas.height - 1;
        mousePos = { x: mouse_x, y: mouse_y };
    }
    ctx = canvas.getContext("2d");
    ctx.fillStyle = BLACK;
    ctx.aspect = ctx.canvas.width / ctx.canvas.height;
    ctx.lineWidth = 4 / ctx.canvas.width;
    ctx.scale(ctx.canvas.width/2, ctx.canvas.height/2);
    ctx.translate(1, 1);
    ctx.fillRect(-1, -1, 2, 2);
})