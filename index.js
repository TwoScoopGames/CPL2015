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
var score = 0;

var lastFrameTime = null;
var frameTimerMax = 50;
var frameTimer = 0;
var fireTimerMax = 100;
var fireTimer = fireTimerMax;

var explode = new Audio();
explode.src = "sounds/explode.wav";
explode.load();

var laser = new Audio();
laser.src = "sounds/laser.wav";
laser.load();

function overlaps(x1, y1, w1, h1, x2, y2, w2, h2) {
	return  x1 + w1 > x2 && x1 < x2 + w2 &&
		y1 + h1 > y1 && y1 < y2 + h2;
}

var render = function(time) {
	if (lastFrameTime === null) {
		lastFrameTime = time;
	}
	var elapsed = time - lastFrameTime;
	lastFrameTime = time;

	frameTimer += elapsed;
	while (frameTimer > frameTimerMax) {
		frameTimer -= frameTimerMax;
		frame++;
		if (frame >= frames) {
			frame = 0;
		}
	}

	var frameX = frame * frameWidth;
	var meteorFrameX = frame * meteorFrameWidth;
	fireTimer += elapsed;

	while (meteors.length < 3) {
		meteors.push({
			x: Math.floor(Math.random() * (canvas.width - 100)),
			y: -100 - Math.floor(Math.random() * 300),
			speed: 5 + Math.floor(Math.random() * 5)
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
	if (pressed["space"] && fireTimer > fireTimerMax) {
		fireTimer = 0;

		var l = laser.cloneNode(true);
		l.play();

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
		meteor.y += meteor.speed;
		if (meteor.y > canvas.height) {
			meteors.splice(i, 1);
		}
	});
	context.fillStyle = "#3fd0ea";
	bullets.forEach(function(bullet, i) {
		context.fillRect(bullet.x, bullet.y - 20, 5, 20);
		bullet.y -= 10;
		if (bullet.y < -20) {
			bullets.splice(i, 1);
			return;
		}
		meteors.forEach(function(meteor, i) {
			if (overlaps(bullet.x, bullet.y, 5, 20, meteor.x, meteor.y, 100, 100)) {
				score++;
				var e = explode.cloneNode(true);
				e.play();
				meteors.splice(i, 1);
			}
		});
	});

	context.fillStyle = "#fff";
	context.font = "25px helvetica";
	context.fillText("SCORE: " + score, 50, 50);

	window.requestAnimationFrame(render);
}
window.requestAnimationFrame(render);
