//html
var itemsHTMLCollection = document.getElementsByClassName('parallax-item');
var itemsArray = Array.from(itemsHTMLCollection);
console.log('itemsArray', itemsArray)
//*input
var input = {
	mouseX: {
		start: 100,
		end: window.innerWidth,
		current:0,
	},
	mouseY: {
		start: 100,
		end: window.innerHeight,
		current: 0,

	},
};

input.mouseX.range = input.mouseX.end - input.mouseX.start;
input.mouseY.range = input.mouseY.end - input.mouseY.start;

//*output

var output = {
	x: {
		start: -100,
		end: 100,
		current: 0,
	},
	y: {
		start: -100,
		end: 100,
		current: 0,

	},
	zIndex: {
		range: 10000
	},
	scale: {
		start: 1,
		end: 0.3,
	}
};
output.scale.range = output.scale.end - output.scale.start;
output.x.range = output.x.end - output.x.start;
output.y.range = output.y.end - output.y.start;

var mouse = {
	x: 0,
	y: 0,
}

var updateInputs = function () {
	input.mouseX.current = mouse.x;
	input.mouseX.fraction = (input.mouseX.current - input.mouseX.start) / input.mouseX.range;

	input.mouseY.current = mouse.y;
	input.mouseY.fraction = (input.mouseY.current - input.mouseY.start) / input.mouseY.range;

}

var updateOutput = function() {
	output.x.current = output.x.end - (input.mouseX.fraction * output.x.range);
	
	output.y.current = output.y.end - (input.mouseY.fraction * output.y.range);

}

var updateEachParallaxItem = function() {

	itemsArray.forEach(function(item, k) {
			var depth = parseFloat(item.dataset.depth, 10);
			var itemOutput = {
				x: output.x.current - (output.x.current * depth),
				y: output.y.current - (output.y.current * depth),
				zIndex:output.zIndex.range - (output.zIndex.range * depth),
				scale: output.scale.start + (output.scale.range * depth)
			};
			console.log(k, 'depth', depth)
			item.style.zIndex = itemOutput.zIndex;
			item.style.transform = 'scale('+itemOutput.scale+') translate('+itemOutput.x+'px, '+itemOutput.y+'px)';
	});

}
var handleMouseMove = function (event) {
	mouse.x = event.clientX;
	mouse.y = event.clientY;
	updateInputs();
	updateOutput();
	updateEachParallaxItem();

}

var handleResize = function () {
	input.mouseX.end = window.innerWidth-200;
	input.mouseX.range = input.mouseX.end - input.mouseX.start;
	input.mouseY.end = window.innerHeight-200;
	input.mouseY.range = input.mouseY.end - input.mouseY.start;
}

window.addEventListener('mousemove', handleMouseMove);
window.addEventListener('resize', handleResize);