

function SpriteSheets(game) {
	this.game = game;
	this.entity = [];
}

SpriteSheets.prototype.drawTiles = function(name) {
	
	this.entity[name].draw();
}

SpriteSheets.prototype.drawFrame = function(name, move) {
	this.entity[name].draw(move);
}


function Level() {
	
	this.platforms = [];
}

Level.prototype.draw = function(sprite) {
	 
	 var bg , object, range;
	 
	
	 
	 for (var i = 0; i < background.backgrounds.length; i++) {
		
		bg = background.backgrounds[i];
		
		object = sprite.entity[bg.sprite];
		
		if (bg.sprite === 'tile') {
			range = bg.ranges[0][1] - bg.ranges[0][0];

			while (object.canvasX < range) {
				// object.draw();
				this.platforms.push(
					{
						'sprite': bg.sprite,

						'x' : object.canvasX

					}
				);
				object.canvasX += object.width - 10;
			}
		} else {
			var frameX, frameY, canvasX, canvasY;
			frameX = bg.ranges[0][0]; frameY = bg.ranges[0][1]; canvasX = bg.ranges[0][2];
			object.frameX = frameX; object.frameY = frameY; object.canvasX = canvasX;
			if (bg.ranges[0].length === 3) {
				
				// object.draw();
				this.platforms.push(
					{
						'sprite': bg.sprite,

						'x' : canvasX

					}
				);
			} else {
				canvasY = bg.ranges[0][3];
				object.canvasY = canvasY;
				// object.draw();
				this.platforms.push(
					{
						'sprite': bg.sprite,

						'x' : canvasX,
						
						'y' : canvasY
					}
				);
			}
			
		}
		
		
		
	 }
	 

	 
}

Level.prototype.update = function(sprite, heroX) {
	
	
	var object, current;
	for (var i = 0; i < this.platforms.length; i++) {
		current = this.platforms[i];
		object = sprite.entity[current.sprite];
		var x = current.x - heroX;
		
		if (x < object.game.ctx.canvas.width) {
			object.canvasX = x;
				
			if (current.y) {
				object.canvasY = current.y;
			}
			
			
			object.draw();
		}
	
	}
	
	
}



// Cloud image
function Cloud(game, img) {
	this.width = img.width;
	this.height = img.height;
	this.frameX = 0;
	this.frameY = 0;
	this.canvasX = 0;
	this.canvasY = 0;
	this.img = img;
	this.game = game;
}

Cloud.prototype.draw = function() {
	
	this.game.ctx.drawImage(this.img, this.frameX, this.frameY, this.width, this.height, this.canvasX, this.canvasY
	, this.width, this.height);
	

}		


// Plant image 
function Plant(game, img) {
	this.width = img.width / 8;
	this.height = img.height / 6;
	this.frameX = 0;
	this.frameY = 0;
	this.canvasX = 0;
	this.canvasY = window.innerHeight / 2 + 60;
	this.game = game;
	this.img = img;
}

Plant.prototype.draw = function() {
	
	this.game.ctx.drawImage(this.img, this.frameX * this.width, this.frameY * this.height , this.width , this.height,
			this.canvasX, this.canvasY, this.width , this.height);
}


// Tile images
function Tile(game, img) {
	this.width = img.width / 2;
	this.height = img.height / 3; 
	this.frameX = 0;
	this.frameY = 0;
	this.canvasX = -10;
	this.canvasY = window.innerHeight / 2 + 100;
	this.img = img;
	this.game = game;
}

Tile.prototype.draw = function() {
	this.game.ctx.drawImage(this.img, this.frameX, this.frameY, this.width, this.height, 
		this.canvasX, this.canvasY, this.width, this.height);
	
}


// tree image 
function Tree(game, img) {
	this.width = img.width;
	this.height = img.height; 
	this.frameX = 0;
	this.frameY = 0;
	this.canvasX = 0;
	this.canvasY = window.innerHeight / 2 + 80;
	this.img = img;
	this.game = game;
}

Tree.prototype.draw = function() {
	this.game.ctx.drawImage(this.img, this.frameX * this.width, this.frameY * this.height, this.width, this.height, 
		this.canvasX, this.canvasY, this.width, this.height);
}




// Main Hero
function Hero(game, moves) {

	this.direction = "forward";
	this.canvasX = 0;
	this.canvasY = window.innerHeight / 2 + 4;
	
	this.frameX = 0;
	this.frameY = 0;
	this.moves = moves;
	this.game = game;
	this.hasJump = false
	this.speed = 3;
	this.backToStand = false;
	
}

Hero.prototype.draw = function(move) {
	var img = this.moves[move];
	var width = img.width;
	var height = img.height;
	// this.game.ctx.clearRect(0, 
							// 0, 
							// this.game.camera.width, this.game.camera.height);
	this.game.ctx.clearRect(0, 0, this.game.ctx.canvas.width, this.game.ctx.canvas.height);
	
	if (move === 'walk' || move === 'walkB') { // walking image
		this.game.ctx.drawImage(img, 
		this.frameX * (width / 14) , this.frameY, 
		width / 14, height, 
		this.canvasX, this.canvasY, 
		width / 14, height);
	} else if (move === 'fireStill' || move === 'fireStillB') { // stand still and fire image
		this.game.ctx.drawImage(img, 
		this.frameX * (width / 5), this.frameY, 
		width / 5, height, 
		this.canvasX, this.canvasY, 
		width / 5, height);
	} else { // jump and stand still image
		this.game.ctx.drawImage(img, 
		0, 0, 
		width, height, 
		this.canvasX, this.canvasY, 
		width, height);
	} 
	
}

Hero.prototype.update = function(timer, lvl, sprite) {
	const heroY = window.innerHeight / 2 + 4;
	this.game.stand = (!this.game.backward 
					&& !this.game.forward 
					&& !this.game.jump
					&& !this.game.fireStill);
					
					
		if (this.game.forward) {
			
			this.direction = "forward";
			if (this.frameX > 13) {
				this.frameX = 0;
				if (this.canvasX < this.game.ctx.canvas.width - 150) this.canvasX += 10;
				// else alert("hi");
			} 	
			
			this.draw('walk');
			
			
			
			
			
			this.frameX++;
			// this.canvasX += 3;
			if (this.game.camera.x < this.game.ctx.canvas.width * 4) this.game.camera.x += this.speed;
			this.backToStand = true;
		} else if (this.game.backward) {
			
			this.direction = "backward";
			
			if (this.frameX < 0) {
				this.frameX = 13;
				this.canvasX -= 10;
				
			} 
				this.draw('walkB');
			
			
			
			this.frameX--;
			// this.canvasX -= 3;
			if (this.game.camera.x > 0) this.game.camera.x -= this.speed;
			
			this.backToStand = true;
		} else if (this.game.fireStill) {
			var that = this;
			if (this.frameX > 4) this.frameX = 0;
			
			
			
			var fireStill = setInterval(function() {
		
				if (that.frameX > 4) {
					clearInterval(fireStill);
					that.frameX = 0;
					that.backToStand = true;
				} else {
					if (that.direction === 'forward') that.draw("fireStill");
					else that.draw("fireStillB");
					that.frameX++;
					
				}
				
				
				
				lvl.update(sprite, that.game.camera.x);
			}, 60);
			
			
		} else if (this.game.jump && !this.hasJump) {
			var that = this;
			var upY = this.canvasY - 200;
			var downY = heroY;
			
			var ascending = setInterval(function() {
				if (that.canvasY <= upY) {
					clearInterval(ascending);
					that.hasJump = true;
				} else {
					that.canvasY -= 20;
					if (that.direction === 'forward') that.draw('jump');
					else that.draw('jumpB');
				}
				lvl.update(sprite, that.game.camera.x);
			}, 10);
			
			
			var descending = setInterval(function() {
				
				if (that.canvasY >= downY) {
					clearInterval(descending);
					that.hasJump = false;
				} else {
					that.canvasY += 20;
					if (that.direction === 'forward') that.draw('idle');
					else that.draw('idleB');
				}
				lvl.update(sprite, that.game.camera.x);
			}, 50);
			
			this.backToStand = true;
			
			
		} else if (this.game.stand && this.backToStand) {
			
			if (timer.time >= 10) {
				
				if (this.direction === 'forward') this.draw("idle");
				else this.draw("idleB");
				timer.time = 0;
				this.backToStand = false;
				this.game.stand = false;
			} else {
				timer.time++;
			}
			
		} 
		
		
		
		
		if (this.canvasX < 0) {
			this.canvasX = 0;
		} 
		
		
		
		lvl.update(sprite, this.game.camera.x);
	
		
		
		
		
}


