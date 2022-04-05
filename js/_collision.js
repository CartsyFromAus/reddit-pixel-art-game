class CollisionType {
	constructor(objectHolderName, collisionType, onCollision) {
		this.objectHolderName = objectHolderName;
		this.checkForCollision = CheckCollision[collisionType];
		this.onCollision = onCollision;

		GAME.CollisionTypes.push(this);
	}

	// Main function called by gameloop each frame
	check() {
		// Get list of objects that we should check
		let objectsToCheck;

		if (!GAME.currentMap[this.objectHolderName]) {
			return;
		}

		if (Array.isArray(GAME.currentMap[this.objectHolderName])) {
			objectsToCheck = GAME.currentMap[this.objectHolderName];
		} else {
			objectsToCheck = [GAME.currentMap[this.objectHolderName]];
		}

		// Loop through all of the objectsToCheck and see if any have a collision
		let collision = objectsToCheck.find(this.checkForCollision.bind(this));

		if (collision) {
			this.onCollision(collision);
			return true;
		}
	}
}

// Returns true or false, whether the circle and rectangle are overlapping
function circleRectCollision(circle, rectangle) {
	// Find the closest point to the circle within the rectangle
	let closestX = clamp(circle.x, rectangle.left, rectangle.right);
	let closestY = clamp(circle.y, rectangle.top, rectangle.bottom);

	// Calculate the distance between the circle's center and this closest point
	let distanceX = circle.x - closestX;
	let distanceY = circle.y - closestY;

	// If the distance is less than the circle's radius, an intersection occurs
	let distanceSquared = (distanceX ** 2) + (distanceY ** 2);
	return distanceSquared < (circle.radius ** 2);
}

// Returns true or false, whether the two circles are overlapping
function circleCircleCollision(circleA, circleB) {
	let a = circleA.radius + circleB.radius;
	let x = circleA.x - circleB.x;
	let y = circleA.y - circleB.y;

	return (a > Math.hypot(x, y));
}

// Checks if moving the player here would cause a collision
function isFree(x, y) {

	// Make sure player is within room bounds
	if (x < 0) return false;
	if (y < 0) return false;
	if (x + TILESIZE > GAME.currentMap.bg.width) return false;
	if (y + TILESIZE > GAME.currentMap.bg.height) return false;

	let playerCollision = {
		x: x + TILESIZE / 2,
		y: y + TILESIZE / 2,
		radius: (TILESIZE - 2) / 2
	}

	// Loop through every wall on the map and check if the player would hit it
	for (const wall of GAME.currentMap.walls) {
		const wallCollision = {
			left: wall.x,
			top: wall.y,
			right: wall.x + TILESIZE,
			bottom: wall.y + TILESIZE,
		};

		// Check if this wall overlaps player
		if (circleRectCollision(playerCollision, wallCollision)) {
			return false;
		}
	}

	// Loop through every door on the map and check if the player would hit it
	if (GAME.ui.keyCount < 1) {
		for (const door of GAME.currentMap.doors) {
			// Check if this wall overlaps player
			const doorCollision = {
				left: door.x,
				top: door.y,
				right: door.x + TILESIZE,
				bottom: door.y + TILESIZE,
			}

			if (circleRectCollision(playerCollision, doorCollision)) {
				return false;
			}
		}
	}

	// Success - space is free
	return true;
}

// Checks if there's a wall at a specific tile space
function spaceHasWall(x, y) {
	// Loop through walls
	return Boolean(GAME.currentMap.walls.find(w => w.x === x && w.y === y));
}

function updatePlayerCollision() {
	GAME.playerCollision = {
		x: GAME.player.x + TILESIZE / 2,
		y: GAME.player.y + TILESIZE / 2,
		radius: (TILESIZE - 2) / 2
	};
}


var CheckCollision = {
	'rect': (object) => {
		let player = GAME.playerCollision;
		let rectangle = {
			left: object.x,
			top: object.y,
			right: object.x + TILESIZE,
			bottom: object.y + TILESIZE,
		};

		return circleRectCollision(player, rectangle);
	},
	'circle': (object) => {
		let player = GAME.playerCollision;
		let circle = {
			x: object.x + TILESIZE / 2,
			y: object.y + TILESIZE / 2,
			radius: (TILESIZE - 2) / 2
		}

		return circleCircleCollision(player, circle);
	},
}