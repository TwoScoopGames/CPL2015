var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");

var colors = [ "#ff0000", "#00ff00", "#0000ff" ];
var color = 0;

var keys = {
	32: "space",
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

var ship = new Image();
ship.src = "images/ship-f20.png";

var frame = 0;
var frames = 20;
var frameWidth = 232;

var playerX = 50;
var playerY = 50;
var playerSpeed = 5;

var bullets = [];

var render = function(elapsed) {
	var frameX = frame * frameWidth;
	frame++;
	if (frame >= frames) {
		frame = 0;
	}

	if (pressed["left"]) {
		playerX -= playerSpeed;
	}
	if (pressed["right"]) {
		playerX += playerSpeed;
	}
	if (pressed["up"]) {
		playerY -= playerSpeed;
	}
	if (pressed["down"]) {
		playerY += playerSpeed;
	}
	if (pressed["space"]) {
		bullets.push({
			x: playerX + (frameWidth / 2),
			y: playerY
		});
	}

	context.fillStyle = colors[color];
	color++;
	if (color >= colors.length) {
		color = 0;
	}
	context.clearRect(0, 0, canvas.width, canvas.height);
	context.drawImage(ship, frameX, 0, frameWidth, 240, playerX, playerY, frameWidth, 240);

	context.fillStyle = "#3fd0ea";
	bullets.forEach(function(bullet) {
		context.fillRect(bullet.x, bullet.y - 20, 5, 20);
		bullet.y -= 10;
	});
	window.requestAnimationFrame(render);
}
window.requestAnimationFrame(render);
