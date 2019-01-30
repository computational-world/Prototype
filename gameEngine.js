


function GameEngine(camera) {
	this.ctx = null;
	this.camera = camera;
	this.backward = false;
	this.forward = false;
	this.jump = false;
	this.keyS = false;
	this.fireStill = false;
	this.stand = false;
}



GameEngine.prototype.init = function(ctx) {
	
	this.ctx = ctx;
	var background = document.getElementById("background");
	ctx.canvas.width =  800;
	ctx.canvas.height = window.innerHeight / 1.5;
	background.style.width = 800 + "px";
	background.style.height = ctx.canvas.height + "px";
	background.style.backgroundColor = "#6dc8ed";
	this.startInput();
	
} 


GameEngine.prototype.startInput =  function() {
	var that = this;
	window.addEventListener("keydown", function (e) {

		
		var keyCode = e.keyCode;
		switch(keyCode) {
			case 68: // d
				that.forward = true;
				break;
			case 83: // s
				that.keyS = true;
				break;
			case 65: // a
				that.backward = true;
				break;
			case 87: // w
				that.jump = true;
				break;
			case 32:
				that.fireStill = true;
		}
		
		
		
	
    }, false);
	
	window.addEventListener("keyup", function (e) {
		
	
		var keyCode = e.keyCode;
		switch(keyCode) {
			case 68: // d
				that.forward = false;
				break;
			case 83: // s
				that.keyS = false;
				break;
			case 65: // a
				that.backward = false;
				break;
			case 87: // w
				that.jump = false;
				break;
			case 32:
				that.fireStill = false;
		}
		
		
	
    }, false);
	
	
}




function Timer() {
	this.time = 0;
	this.frameCount = 0;
}

