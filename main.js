
window.requestAnimFrame = (function () {
    return window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.oRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            function (/* function */ callback, /* DOMElement */ element) {
                window.setTimeout(callback, 1000 / 60);
            };
})();


// main function
window.onload = function() {
	
	const tileY = window.innerHeight / 2 + 105;
	const heroY = window.innerHeight / 2 + 5;

	var backToStand = true;
	const timer = new Timer();
	
	const AM = new AssetManager();
	const camera = new Camera();
	const gameEngine = new GameEngine(camera);
	const sprite = new SpriteSheets(gameEngine);
	const lvl = new Level();
	loadImage();
	
	AM.downloadAll(function() {
		var canvas = document.getElementById("gameWorld");
		var ctx = canvas.getContext("2d");
	
		
		loadEntity(); // loading all sprites into SpriteSheets class 
		
		hero = sprite.entity['hero'];
		gameEngine.init(ctx);  
		
		
		// alert(background.backgrounds[0].ranges);
		
		sprite.drawFrame("hero", "idle");
		lvl.draw(sprite);
		
	
		
		
		handleMoveEvent(); // handle hero's animation with key events 
		
		// resizing the canvas
		window.onresize = function() {
			gameEngine.init(ctx);  
			sprite.entity['tile'].canvasY = tileY;
			hero.canvasY = heroY + 5;
			sprite.drawFrame("hero", "idle");
			
			lvl.draw(sprite);
			sprite.entity['tile'].canvasY = window.innerHeight / 2 + 100;
			// hero.canvasY = heroY + 4;
		}
	});

	
	
	/**
	* Load all sprite sheets.
	*/	
	function loadEntity() {
		var cloud, tile, hero, tree, plants;
		cloud = new Cloud(gameEngine, AM.getAsset("img/cloud.png"));
		tile = new Tile(gameEngine, AM.getAsset("img/tiles.png"));
		// tree = new Tree(gameEngine, AM.getAsset("img/tree.png"));
		plants = new Plant(gameEngine, AM.getAsset("img/plants.png"));
		
		var heroMoves = [];
		heroMoves["idle"] = AM.getAsset("img/idle.png");
		heroMoves["idleB"] = AM.getAsset("img/idleB.png");
		heroMoves["walk"] = AM.getAsset("img/walk.png");
		heroMoves["walkB"] = AM.getAsset("img/walkb.png");
		heroMoves["fireStill"] = AM.getAsset("img/fire_still.png");
		heroMoves["fireStillB"] = AM.getAsset("img/fire_stillB.png");
		heroMoves["jump"] = AM.getAsset("img/jump.png");
		heroMoves["jumpB"] = AM.getAsset("img/jumpB.png");
		hero = new Hero(gameEngine, heroMoves);
		
		sprite.entity['cloud'] = cloud;
		sprite.entity['tile'] = tile;
		sprite.entity['plant'] = plants;
		sprite.entity['hero'] = hero;
		// sprite.entity['tree'] = tree;
		
		
		
	}
	
	
	
	/**
	* Load images into the game.
	*/
	function loadImage() {
		AM.queueDownload("img/tiles.png");
		AM.queueDownload("img/cloud.png");
		AM.queueDownload("img/idle.png");
		AM.queueDownload("img/idleB.png");
		AM.queueDownload("img/walk.png");
		AM.queueDownload("img/walkb.png");
		AM.queueDownload("img/fire_still.png");
		AM.queueDownload("img/fire_stillB.png");
		AM.queueDownload("img/jump.png");
		AM.queueDownload("img/jumpB.png");
		// AM.queueDownload("img/tree.png");
		AM.queueDownload("img/plants.png");
	}
	
	
	
	
	// /**
	// * Paint the background.
	// */
	// var updateBackground = function paintBackground() {
		
		// // sprite.entity['tile'].canvasY = tileY + 5;
		// // if (level.stage === 1) level.drawStage1(sprite);
		// // else if (level.stage === 2) level.drawStage2(water, tile);
		

	// }
	
	
	/**
	* Handle hero's animation.
	*/
	function handleMoveEvent() {
		timer.time++;
		if (timer.frameCounter < 1) { // slow down the animation
			timer.frameCounter++;
			window.requestAnimFrame(handleMoveEvent);
			return;
		}
		timer.frameCounter = 0;
		
		sprite.entity['hero'].update(timer, lvl, sprite);
		
		window.requestAnimFrame(handleMoveEvent);
		
	}
	
}


