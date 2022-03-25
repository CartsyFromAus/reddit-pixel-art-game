
new TileType('killTiles', {
	onLoad: kt => ({
		x: kt.x * TILESIZE,
		y: kt.y * TILESIZE,
	}),
	uiInit: ()=> {
		//lives number text
		GAME.ui.lives = new PIXI.Text('3',{fontFamily :"Press Start 2P", fontSize: 8, fill : 0xffffff, align : 'left'});
		GAME.ui.addChild(GAME.ui.lives);
		GAME.currentMap.lives = 3;
	},
	uiUpdate: ()=> {
		GAME.ui.lives.text = GAME.currentMap.lives;
	}
	
});

new CollisionType('killTiles', 'rect', 
	function () {

		//sound
		zzfx(...[1.09,,373,,.25,.42,4,2.97,.6,,,,.19,.7,-4.4,.7,,.42,.03]);

		GAME.currentMap.lives--;

		GAME.player.x = TILESIZE * GAME.currentMap.startingLocation.x;
		GAME.player.y = TILESIZE * GAME.currentMap.startingLocation.y;
	}
);