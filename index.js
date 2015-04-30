var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");

var colors = [ "#ff0000", "#00ff00", "#0000ff" ];
var color = 0;

var render = function(elapsed) {
	context.fillStyle = colors[color];
	color++;
	if (color >= colors.length) {
		color = 0;
	}
	context.fillRect(50, 50, 50, 50);
	window.requestAnimationFrame(render);
}
window.requestAnimationFrame(render);
