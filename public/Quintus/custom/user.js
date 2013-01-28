Quintus.Users = function(Q) {
	Q.GameObject.extend("User", {
		userName: null,
		fullName: null,
		aWidth: 142,
		aHeight: 120,
		avatar: null, //image dom node
		exp: null,
		money: null,
		init : function(userName, props) {
			Q._extend(this,props);
		}
	});
	
	Q.component("play3cay", {
		added: function(){
			this.entity.gotCards = [];
		},
		extend: {
			getCard: function(card){
				this.gotCards[this.gotCards.length] = card;
			}
		}
	})
	Q.component("sit", {
		added: function(){
			this.entity.order = null;
			this.entity.pos = null;
			this.entity.posFirstCard = null;
		},
		extend: {
			getOrder: function(order) {
				this.order = order;
				switch (order){
				case 0:
					this.pos = {x: 200, y: 0}
					break;
				case 1:
					this.pos = {x: 400, y: 0}
					break;
				case 2:
					this.pos = {x: 600, y: 0}
					break;
				case 3:
					this.pos = {x: 800, y: 240}
					break;
				case 4:
					this.pos = {x: 600, y: 480}
					break;
				case 5:
					this.pos = {x: 400, y: 480}
					break;
				case 6:
					this.pos = {x: 200, y: 480}
					break;
				case 7:
					this.pos = {x: 0, y: 240}
					break;
				}
				switch (order){
				case 0:
				case 1:
				case 2:
					this.posFirstCard = {x: this.pos.x - 20, y: this.pos.y + this.aHeight};
					this.viewDirection = {dx: 0, dy: 1};
					break;
				case 3:
					this.posFirstCard = {x: this.pos.x - this.aWidth, y: this.pos.y};
					this.viewDirection = {dx: -1, dy: 0};
					break;
				case 4:
				case 5:
				case 6:
					this.posFirstCard = {x: this.pos.x - 20, y: this.pos.y - this.aHeight};
					this.viewDirection = {dx: 0, dy: -1};
					break;
				case 7:
					this.posFirstCard = {x: this.pos.x + this.aWidth, y: this.pos.y};
					this.viewDirection = {dx: 1, dy: 0};
					break;
				}
				return this;
			},
			getPosNextCard: function(){
				var x = this.posFirstCard.x + (this.gotCards.length - 1) * 20;
				var y = this.posFirstCard.y;
				return {x : x, y: y};
			}
		}
	});
}