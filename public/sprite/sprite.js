// # Quintus Basic Sprite Example
//
// [Run the example](../examples/sprite/index.html)
//
// This example creates two simple sprites to test basic collision detection
// with regards to rotation, scaling and movement.
//
// Use the arrows keys to rotate and scale the top sprite and
// Z or Space to move the sprite up. X resets the position.
//
window.addEventListener('load', function(e) {

	// Set up a standard Quintus instance with only the
	// Sprites and Scene module (for the stage support) loaded.
	var Q = window.Q = Quintus({
		imagePath : "public/sprite/images/"
	}).include("Sprites, Scenes, 2D, Input, Anim").setup({
		width : 1000,
		height : 600
	});

	Q.Sprite.extend("ManHead", {
		init: function(p) {
			this._super(p, {
				x : 700,
				y : 250,
				asset : 'man_head.png',
				angle : 0,
				collisionMask : 0,
				scale : 0.6
		    });
		}
	});
	// Draw vertical lines at every 100 pixels for visual indicators
	function drawLines(ctx) {
		ctx.save();
		ctx.strokeStyle = '#FFFFFF';
		for ( var x = 0; x < 1000; x += 100) {
			ctx.beginPath();
			ctx.moveTo(x, 0);
			ctx.lineTo(x, 600);
			ctx.stroke();
		}
		ctx.restore();
	}

	Q.scene("start", function(stage) {

		var cardSet = new Q.Sprite({
			x : 200,
			y : 100,
			asset : 'card_set.png',
			angle : 0,
			collisionMask : 0,
			scale : 0.6
		});

		stage.insert(cardSet);
		
		var manHead = stage.insert(new Q.ManHead());
//		var manHead = new Q.Sprite({
//			x : 700,
//			y : 250,
//			asset : 'man_head.png',
//			angle : 0,
//			collisionMask : 1,
//			scale : 0.6
//		});
//		stage.insert(manHead);
		// A basic sprite shape a asset as the image
		var cardFly = new Q.Sprite({
			x : 200,
			y : 100,
			asset : 'card_back.png',
			angle : 0,
			collisionMask : 0,
			scale : 0.6
		});
		stage.insert(cardFly);

		cardFly.add("tween");

		cardFly.animate({
			x : 650,
			y : 250,
			angle : 360
		}, 0.5);
		// Add the 2D component for collision detection and gravity.
		// sprite1.add('2d')

		cardFly.on('step', function() {
		});

		// Bind the basic inputs to different behaviors of sprite1
		Q.input.on('up', stage, function(e) {
			cardFly.p.scale -= 0.1;
		});

		Q.input.on('down', stage, function(e) {
			cardFly.p.scale += 0.1;
		});

		Q.input.on('left', stage, function(e) {
			cardFly.p.angle -= 5;
		});

		Q.input.on('right', stage, function(e) {
			cardFly.p.angle += 5;
		});

		Q.input.on('fire', stage, function(e) {
			cardFly.p.vy = -600;
		});

		Q.input.on('action', stage, function(e) {
			cardFly.p.x = 500;
			cardFly.p.y = 100;
		});

		// Draw some lines after each frame
		stage.on('postrender', drawLines);
	});

	Q.load([ 'card_back.png', 'card_set.png', "man_head.png" ], function() {

		// Start the show
		Q.stageScene("start");

		// Turn visual debugging on to see the
		// bounding boxes and collision shapes
		Q.debug = true;

		// Turn on default keyboard controls
		Q.input.keyboardControls();
	});

});
