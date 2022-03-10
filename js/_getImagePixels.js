
//used for reading the pixels of an image (like the map data image)
function getImagePixels (img) {
	console.log('hyelo',img)
	//create temporary canvas element
	let canvas = document.createElement('canvas');
	let ctx = canvas.getContext('2d');

	//resize to match image
	canvas.width = img.width;
	canvas.height = img.height;

	//put image on canvas
	ctx.drawImage(img, 0, 0);

	//get pixels
	let pixels = ctx.getImageData(0, 0, img.width, img.height).data;

	//attach function for looping through all the pixels 
	pixels.eachPixel = function (callback) {
		console.log('getting pixels ')
		//loop through each pixel (which is made up of 4 values, so we skip 4 each time.)
		for (var i =0; i<this.length; i+=4) {
			let x = i/4%img.width;
			let y = floor(i/4/img.width);
			let r = this[i];
			let g = this[i+1];
			let b = this[i+2];
			let a = this[i+3];

			//transparent - dont call function
			if (this[i+3] !== 255) continue;

			//find the matching color and return the name
			if (this[i]==000 && this[i+1] == 000 && this[i+2] == 000) {callback(x,y,'black',	r,b,b,a); continue;}
			if (this[i]==255 && this[i+1] == 255 && this[i+2] == 255) {callback(x,y,'white',	r,b,b,a); continue;}
			if (this[i]==255 && this[i+1] == 000 && this[i+2] == 000) {callback(x,y,'red',		r,b,b,a); continue;}
			if (this[i]==255 && this[i+1] == 128 && this[i+2] == 000) {callback(x,y,'orange',	r,b,b,a); continue;}
			if (this[i]==255 && this[i+1] == 255 && this[i+2] == 000) {callback(x,y,'yellow',	r,b,b,a); continue;}
			if (this[i]==128 && this[i+1] == 255 && this[i+2] == 000) {callback(x,y,'lime',		r,b,b,a); continue;}
			if (this[i]==000 && this[i+1] == 255 && this[i+2] == 000) {callback(x,y,'green',	r,b,b,a); continue;}
			if (this[i]==000 && this[i+1] == 255 && this[i+2] == 128) {callback(x,y,'teal',		r,b,b,a); continue;}
			if (this[i]==000 && this[i+1] == 255 && this[i+2] == 255) {callback(x,y,'cyan',		r,b,b,a); continue;}
			if (this[i]==000 && this[i+1] == 128 && this[i+2] == 255) {callback(x,y,'sky',		r,b,b,a); continue;}
			if (this[i]==000 && this[i+1] == 000 && this[i+2] == 255) {callback(x,y,'blue',		r,b,b,a); continue;}
			if (this[i]==128 && this[i+1] == 000 && this[i+2] == 255) {callback(x,y,'purple',	r,b,b,a); continue;}
			if (this[i]==255 && this[i+1] == 000 && this[i+2] == 255) {callback(x,y,'magenta',	r,b,b,a); continue;}
			if (this[i]==255 && this[i+1] == 000 && this[i+2] == 128) {callback(x,y,'pink',		r,b,b,a); continue;}

			//no color was matched - dont call function
			//console.log('no color found', this[i],this[i+1],this[i+2],this[i+3])
			callback(x,y,undefined,r,b,b,a);
		}
	}

	return pixels;
}