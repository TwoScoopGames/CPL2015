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

var meteorImage = new Image();
meteorImage.src = "images/meteor-f20.png";

var frame = 0;
var frames = 20;
var frameWidth = 232;

var meteorFrameWidth = 100;

var playerX = (canvas.width / 2) - (frameWidth / 2);
var playerY = 400;
var playerSpeed = 5;

var bullets = [];
var meteors = [];

var render = function(elapsed) {
	var frameX = frame * frameWidth;
	var meteorFrameX = frame * meteorFrameWidth;
	frame++;
	if (frame >= frames) {
		frame = 0;
	}

	while (meteors.length < 1) {
		meteors.push({
			x: Math.floor(Math.random() * (canvas.width - 100)),
			y: -100
		});
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

	meteors.forEach(function(meteor, i) {
		context.drawImage(meteorImage, meteorFrameX, 0, meteorFrameWidth, 100, meteor.x, meteor.y, meteorFrameWidth, 100);
		meteor.y += 5;
		if (meteor.y > canvas.height) {
			meteors.splice(i, 1);
		}
	});
	context.fillStyle = "#3fd0ea";
	bullets.forEach(function(bullet) {
		context.fillRect(bullet.x, bullet.y - 20, 5, 20);
		bullet.y -= 10;
	});
	window.requestAnimationFrame(render);
}
window.requestAnimationFrame(render);
