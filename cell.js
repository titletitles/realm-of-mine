function Cell(i, j, cellWidth) {
	this.i = i;
	this.j = j;
	this.x = i * cellWidth;
	this.y = j * cellWidth;
	this.cellWidth = cellWidth;
	this.neighbor;
	this.neighborIcon;
	this.bomb = false;
	this.trap = false;
	this.revealed = false;
	this.shakeX = this.x + (this.cellWidth * 0.225);
	this.shakeY = this.y + (this.cellWidth * 0.225);
	this.tile = imgTile1;
}

Cell.prototype.setReveal = function() {
	this.revealed = true;
	if(this.neighbor == 0) {
		this.fill();
	}
}

Cell.prototype.setBomb = function() {
	this.bomb = true;
}

Cell.prototype.setTrap = function() {
	this.trap = true;
}

Cell.prototype.setTile = function(data) {
	this.tile = data;
}

Cell.prototype.fill = function() {
	for (var i = -1; i <= 1; i++) {
		for (var j = -1; j <= 1; j++) {
			if(this.i + i >= 0 && this.i + i < cols && this.j + j >= 0 && this.j + j < rows) {
				var neighbor = grid[this.i + i][this.j + j]
				if(!neighbor.bomb && !neighbor.trap && !neighbor.revealed) {
					neighbor.setReveal();
				}
			}
		}
	}
}

Cell.prototype.show = function() {
	stroke(0);
	noFill();
	//rect(this.x, this.y, this.cellWidth, this.cellWidth);
	image(this.tile, this.x, this.y, this.cellWidth, this.cellWidth);
	if(this.revealed) {
		if(this.bomb) {
			image(imgBombActive, this.x, this.y, this.cellWidth, this.cellWidth);
			image(imgBomb, this.shakeX, this.shakeY, this.cellWidth * 0.55, this.cellWidth * 0.55);
			this.shakeX = this.shakeX + random(-0.75, 0.75);
			this.shakeY = this.shakeY + random(-0.75, 0.75);
			if(this.shakeX < this.x + this.cellWidth / 7 || this.shakeX > this.x + this.cellWidth / 3) this.shakeX = this.x + (this.cellWidth * 0.225);
			if(this.shakeY < this.y + this.cellWidth / 7 || this.shakeY > this.y + this.cellWidth / 3) this.shakeY = this.y + (this.cellWidth * 0.225);
			//fill(0);
			//ellipse(this.x + (this.cellWidth / 2), this.y + (this.cellWidth / 2), this.cellWidth * 0.4, this.cellWidth * 0.4);
		} else if(this.trap) {
			image(imgTileActive, this.x, this.y, this.cellWidth, this.cellWidth);
			image(imgTrap, this.shakeX , this.shakeY, this.cellWidth * 0.55, this.cellWidth * 0.55);
			this.shakeX = this.shakeX + random(-0.75, 0.75);
			this.shakeY = this.shakeY + random(-0.75, 0.75);
			if(this.shakeX < this.x + this.cellWidth / 7 || this.shakeX > this.x + this.cellWidth / 3) this.shakeX = this.x + (this.cellWidth * 0.225);
			if(this.shakeY < this.y + this.cellWidth / 7 || this.shakeY > this.y + this.cellWidth / 3) this.shakeY = this.y + (this.cellWidth * 0.225);
				
			//fill(125);
			//ellipse(this.x + (this.cellWidth / 2), this.y + (this.cellWidth / 2), this.cellWidth * 0.4, this.cellWidth * 0.4);
		} else {
			//fill(100, 200, 150);
			//rect(this.x, this.y, this.cellWidth, this.cellWidth);
			image(imgTileActive, this.x, this.y, this.cellWidth, this.cellWidth);
			if(this.neighbor > 0) {
				image(this.neighborIcon, this.shakeX , this.shakeY, this.cellWidth * 0.6, this.cellWidth * 0.6);
				this.shakeX = this.shakeX + random(-0.75, 0.75);
				this.shakeY = this.shakeY + random(-0.75, 0.75);
				if(this.shakeX < this.x + this.cellWidth / 7 || this.shakeX > this.x + this.cellWidth / 3) this.shakeX = this.x + (this.cellWidth * 0.225);
				if(this.shakeY < this.y + this.cellWidth / 7 || this.shakeY > this.y + this.cellWidth / 3) this.shakeY = this.y + (this.cellWidth * 0.225);
				//textAlign(CENTER);
				//fill(125);
				//text(this.neighbor, this.x + this.cellWidth / 2, this.y + this.cellWidth * 0.6);
			}
		}
	}
}

Cell.prototype.neighborCount = function() {
	// irrelevant
	if(this.bomb) {
		this.neighbor = -1;
		return;
	} else if(this.trap) {
		this.neighbor = -2;
		return;
	}

	var total = 0;
	for (var i = -1; i <= 1; i++) {
		for (var j = -1; j <= 1; j++) {
			if(this.i + i >= 0 && this.i + i < cols && this.j + j >= 0 && this.j + j < rows) {
				if(grid[this.i + i][this.j + j].bomb || grid[this.i + i][this.j + j].trap) {
					total++;
				}
			}
		}
	}

	this.neighbor = total;

	if(total == 1) {
		this.neighborIcon = imgNeigh1;
	} else if(total == 2) {
		this.neighborIcon = imgNeigh2;
	} else if(total == 3) {
		this.neighborIcon = imgNeigh3;
	} else if(total == 4) {
		this.neighborIcon = imgNeigh4;
	} else if(total == 5) {
		this.neighborIcon = imgNeigh5;
	} else if(total == 6) {
		this.neighborIcon = imgNeigh6;
	} else if(total == 7) {
		this.neighborIcon = imgNeigh7;
	} else if(total == 8) {
		this.neighborIcon = imgNeigh8;
	}
}