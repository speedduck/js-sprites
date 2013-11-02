/*
 * Copyright (C) 2013 Jon Hulka (jon.hulka@gmail.com) and Sean Hulka (sean.hulka@gmail.com)
 * 
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 * 
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 * 
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

//To do - fix the boardWidth,boardHeight hack - the boardController should manage positions past the edge
function PlayerController(sprite,boardController,boardWidth,boardHeight)
{
//======================================================================
//To do - fix the boardWidth,boardHeight hack - the boardController should manage positions past the edge
this.boardWidth=boardWidth;
this.boardHeight=boardHeight;
//======================================================================
	var that = this;
	this.sprite = sprite;
	this.boardController = boardController;
	this.speed = 10;
	this.nextDirection = 0;
	this.direction = 0;
	this.dx = this.speed;
	this.dy = 0;
	this.x=200;
	this.y=200;
	$( document ).keydown(function(event){
		switch(event.which)
		{
			case 37:
				that.nextDirection=2;
				break;
			case 38:
				that.nextDirection=3;
				break;
			case 39:
				that.nextDirection=0;
				break;
			case 40:
				that.nextDirection=1;
				break;
		}
	});
}

PlayerController.prototype.move = function(context)
{
	//Find out if there is a queued direction change
	if(this.nextDirection!==this.direction)
	{
		if(this.boardController.canTurn(this.x,this.y,this.nextDirection))
		{
			this.direction = this.nextDirection;
			this.sprite.setDirection(this.direction);
			switch(this.direction)
			{
				case 0:
					this.dx = this.speed;
					this.dy = 0;
					break;
				case 1:
					this.dx = 0;
					this.dy = this.speed;
					break;
				case 2:
					this.dx = -this.speed;
					this.dy = 0;
					break;
				case 3:
					this.dx = 0;
					this.dy = -this.speed;
					break;
			}
		}
	}
	this.sprite.clear(context);
	this.sprite.advanceFrame();
	var nextX = this.x+this.dx;
	var nextY = this.y+this.dy;
//To do - fix this hack - the boardController should manage positions past the edge
if(nextX<0) nextX+=this.boardWidth;
if(nextX>=this.boardWidth) nextX-=this.boardWidth;
if(nextY<0) nextY+=this.boardHeight;
if(nextY>=this.boardHeight) nextY-=this.boardHeight;
	if(this.boardController.canMove(this.x,this.y,nextX,nextY))
	{
		this.x = nextX;
		this.y = nextY;
	}
	this.sprite.setPosition(this.x,this.y);
	this.sprite.draw(context);
};
