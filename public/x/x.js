window.addEventListener('load', function(e) {

	// Set up a standard Quintus instance with only the
	// Sprites and Scene module (for the stage support) loaded.
	var Q = window.Q = Quintus({
		imagePath : "public/x/images/"
	}).include("Sprites, Scenes, 2D, Input, Anim, Users").setup({
		width : 800,
		height : 480
	});
	
	var users = [new Q.User().add("sit").add("play3cay").getOrder(0), new Q.User().add("sit").add("play3cay").getOrder(1),
	             new Q.User().add("sit").add("play3cay").getOrder(2), new Q.User().add("sit").add("play3cay").getOrder(3),
	             new Q.User().add("sit").add("play3cay").getOrder(4), new Q.User().add("sit").add("play3cay").getOrder(5),
	             new Q.User().add("sit").add("play3cay").getOrder(6), new Q.User().add("sit").add("play3cay").getOrder(7)];
	Q.scene("start", function(stage) {
		for (var i = 0; i < users.length; i ++){
			user = users[i];
			
			var avatar = new Q.Sprite({
				x: user.pos.x + user.viewDirection.dx * user.aWidth * 0.5 / 2,
				y: user.pos.y + user.viewDirection.dy * user.aHeight * 0.5 / 2,
				asset : "man_head.png",
				angle: 0,
				collisionMask: 0,
				scale: 0.5
			})
			stage.insert(avatar);
			
//			var userCard = new Q.Sprite({
//				x: user
//			})
		}
		var cardSet = new Q.Sprite({
			x : 400,
			y : 200,
			asset : 'card_set.png',
			angle : 0,
			collisionMask : 0,
			scale : 0.4
		});

		stage.insert(cardSet);
		
		var index = 0;
		castCard = function(){
			var user = users[index];
			if (user.gotCards.length < 3){
				user.getCard(0);
				var desPosCard = user.getPosNextCard();
				
				var cardFly = new Q.Sprite({
					x : 400,
					y : 200,
					asset : 'card_back.png',
					angle : 0,
					collisionMask : 0,
					scale : 0.4
				});
				stage.insert(cardFly);

				cardFly.add("tween");
				cardFly.animate({
					x : desPosCard.x,
					y : desPosCard.y,
					angle : 360,
					scaleX: 1
				}, 0.5, Q.Easing.Quadratic.Out, {callback: castCard});
			}
			index ++;
			if (index == 8) index = 0;
		}
		castCard();
		
		Q.Sprite.extend("Waiting", {
			  init: function(p) {
			    this._super(p,{
			      sprite: "waiting",
			      sheet: "waiting"
			    });

			    this.add("animation");
			  }
			});

			var waiter = new Q.Waiting({
				x : 400,
				y : 200
			});
			stage.insert(waiter);
			waiter.play("wait");
	});
	
	Q.load([ 'card_back.png', 'card_set.png', "man_head.png", "load_blue.png" ], function() {
		Q.sheet("waiting",
		        "load_blue.png",
		        {
		          tilew: 325,  // Each tile is 325 pixels wide
		          tileh: 30,  // and 30 pixels tall
		          sx: 0,   // start the sprites at x=0
		          sy: 0,    // and y=0
		          frames: 11
		         });
		
		Q.animations('waiting', {
			  wait: { frames: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], rate: 1}});
		Q.stageScene("start");

		// Turn visual debugging on to see the
		// bounding boxes and collision shapes
//		Q.debug = true;

		// Turn on default keyboard controls
		Q.input.keyboardControls();
	});

});
