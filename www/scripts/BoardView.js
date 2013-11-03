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
function BoardView (bufferCanvas,properties)
{
	this.bufferCanvas = bufferCanvas;
	this.width = properties.width;
	this.height = properties.height;
	this.tunnelSize = properties.tunnelSize;
	this.ghostSpawnColor='#00c030';
	this.wallColor='#008020';
	this.wallHighlight='#20ff40';
	this.solidColor='#008020';

	this.drawSolid = function(context, data, color)
	{
		context.fillStyle=color;
		for(var j=0; j<data.length; j++)
		{
			var row=data[j];
			for(var i=0; i<row.length; i++)
			{
				if(row[i])
				{
					context.fillRect(i*this.tunnelSize,j*this.tunnelSize,this.tunnelSize,this.tunnelSize);
				}
			}
		}
	};
	this.drawWallsHelper = function(context, walls, horizontal, color, width, xOffset, yOffset)
	{
		xOffset=xOffset || 0;
		yOffset=yOffset || 0;
		context.lineCap = 'round';
		context.lineWidth=width;
		context.strokeStyle=color;
		var iOffset=0;
		var jOffset=0;
		if(horizontal)
		{
			iOffset=this.tunnelSize;
		}
		else
		{
			jOffset=this.tunnelSize;
		}
		for(var j=0;j<=walls.length;j++)
		{
			//The 0th wall is drawn at the beginning and end
			var row=walls[j%walls.length];
			for(var i=0; i<=row.length; i++)
			{
				if(row[i%row.length])
				{
					context.beginPath();
					context.moveTo(i*this.tunnelSize+xOffset,j*this.tunnelSize+yOffset);
					context.lineTo(i*this.tunnelSize+iOffset+xOffset,j*this.tunnelSize+jOffset+yOffset);
					context.stroke();
				}
			}
		}
	};
}

BoardView.prototype.draw = function(model)
{
	var vWalls = model.getVerticalWalls();
	var hWalls = model.getHorizontalWalls();
	var ghostSpawn = model.getGhostSpawn();
	var solidSpaces = model.getSolidSpaces();
	var context = this.bufferCanvas.getContext();
	this.drawSolid(context,ghostSpawn,this.ghostSpawnColor);
	this.drawSolid(context,solidSpaces,this.solidColor);
	this.drawWallsHelper(context,hWalls,true,this.wallColor,4);
	this.drawWallsHelper(context,vWalls,false,this.wallColor,4);
	this.drawWallsHelper(context,hWalls,true,this.wallHighlight,1.5,-1.25,-1.25);
	this.drawWallsHelper(context,vWalls,false,this.wallHighlight,1.5,-1.25,-1.25);
};
