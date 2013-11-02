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

function BoardController(properties)
{
	this.width = properties.width;
	this.height = properties.height;
	this.tunnelSize = properties.tunnelSize;
	this.tunnelsAcross=this.width/this.tunnelSize;
	this.tunnelsDown=this.height/this.tunnelSize;
	this.hWalls = null;
	this.vWalls = null;
	this.ghostSpawn = null;
}

BoardController.prototype.loadLevel = function(model)
{
	this.hWalls = model.getHorizontalWalls();
	this.vWalls = model.getVerticalWalls();
	this.ghostSpawn = model.getGhostSpawn();
}

BoardController.prototype.canTurn = function(x,y,direction)
{
	var result=false;
	if(direction%2==0) //horizontal
	{
		if(y%this.tunnelSize==0) //on a horizontal line
		{
			//1-2*Math.floor(direction/2) converts direction into +1 or -1
			//Character can turn here if she can move at least one pixel in the desired direction
			result=this.canMove(x,y,(x+(1-2*Math.floor(direction/2))+this.width)%this.width,y);
		}
	}
	else //vertical
	{
		if(x%this.tunnelSize==0) //on a vertical line
		{
			//1-2*Math.floor(direction/2) converts direction into +1 or -1
			//Character can turn here if he can move at least one pixel in the desired direction
			result=this.canMove(x,y,x,(y+(1-2*Math.floor(direction/2))+this.height)%this.height);
		}
	}
	return result;
}

//Assume that all coordinates passed to this function are within the board's bounds
BoardController.prototype.canMove = function(fromX,fromY,toX,toY)
{
	var result = false;
	var xIndex;
	var yIndex;
	var fromYSquare;
	var fromXSquare;
	var toXSquare;
	var toYSquare;
	var walls=false;
	var direction;
	if(fromX==toX) //vertical movement
	{
		direction=(toY>fromY && toY-fromY<=this.tunnelSize || fromY-toY>this.tunnelSize)?1:-1;
		xIndex=Math.floor(fromX/this.tunnelSize);
		fromXSquare=xIndex;
		toXSquare=xIndex;
		walls=this.hWalls;
		if(direction>0)
		{
			fromYSquare=Math.floor(fromY/this.tunnelSize);
			toYSquare=(fromYSquare+1)%this.tunnelsDown;
			yIndex=toYSquare;
		}
		else
		{
			toYSquare=Math.floor(toY/this.tunnelSize);
			fromYSquare=(toYSquare+1)%this.tunnelsDown;
			yIndex=fromYSquare;
		}
	}
	else if(fromY==toY) //horizontal movement
	{
		direction=(toX>fromX && toX-fromX<=this.tunnelSize || fromX-toX>this.tunnelSize)?1:-1;
		yIndex=Math.floor(fromY/this.tunnelSize);
		fromYSquare=yIndex;
		toYSquare=yIndex;
		walls=this.vWalls;
		if(direction>0)
		{
			fromXSquare=Math.floor(fromX/this.tunnelSize);
			toXSquare=(fromXSquare+1)%this.tunnelsAcross;
			xIndex=toXSquare;
		}
		else
		{
			toXSquare=Math.floor(toX/this.tunnelSize);
			fromXSquare=(toXSquare+1)%this.tunnelsAcross;
			xIndex=fromXSquare;
		}
	}
	if(walls && !walls[yIndex][xIndex])
	{
		//no wall in the way
		//not going to a ghost spawn area, or coming from a ghost spawn area (only freshly spawned ghosts allowed)
		result = !this.ghostSpawn[toYSquare][toXSquare] || this.ghostSpawn[fromYSquare][fromXSquare];
	}
	return result;
}
