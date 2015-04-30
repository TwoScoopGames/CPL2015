var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");

var colors = [ "#ff0000", "#00ff00", "#0000ff" ];
var color = 0;

var keys = {
	37: "left",
	38: "up",
	39: "right",
	40: "down"
};
var pressed = {};

window.addEventListener("keydown", function(e) {
	pressed[keys[e.keyCode]] = true;
});
window.addEventListener("keyup", function(e) {
	pressed[keys[e.keyCode]] = false;
});

var playerX = 50;
var playerSpeed = 5;
var render = function(elapsed) {
	if (pressed["left"]) {
		playerX -= playerSpeed;
	}
	if (pressed["right"]) {
		playerX += playerSpeed;
	}

	context.fillStyle = colors[color];
	color++;
	if (color >= colors.length) {
		color = 0;
	}

	context.clearRect(0, 0, canvas.width, canvas.height);
	context.fillRect(playerX, 500, 50, 50);
	window.requestAnimationFrame(render);
}
window.requestAnimationFrame(render);
