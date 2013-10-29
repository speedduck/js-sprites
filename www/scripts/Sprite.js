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

function Sprite(img,bufferCanvas,properties)
{
	var that = this;
	this.bufferCanvas = bufferCanvas;
	this.width = properties.width;
	this.height = properties.height;
	this.boardWidth = bufferCanvas.getWidth();
	this.boardHeight = bufferCanvas.getHeight();
	this.frameCount = properties.frameCount;
	this.directional = properties.directional;
	this.x = 0;
	this.y = 0;
	this.xOffset = properties.xOffset;
	this.yOffset = properties.yOffset;
	this.img = img;
	this.frame = 0;
	this.direction = 0;
	this.drawHelper = function(context,x)
	{
		var ySrc = 0;
		if(that.directional)ySrc = that.direction*that.height;
		context.drawImage(that.img,that.frame*that.width,ySrc,that.width,that.height,x,that.y+that.yOffset,that.width,that.height);
		if(that.y+that.yOffset+that.height>=that.boardHeight)
		{
			context.drawImage(that.img,that.frame*that.width,ySrc,that.width,that.height,x,that.y+that.yOffset-that.boardHeight,that.width,that.height);
		}
	}
	this.clearHelper = function(context,x)
	{
		that.bufferCanvas.clearRect(context,x,that.y+that.yOffset,that.width,that.height);
		if(that.y+that.yOffset+that.height>=that.boardHeight)
		{
			that.bufferCanvas.clearRect(context,x,that.y+that.yOffset-that.boardHeight,that.width,that.height);
		}
	}
}
Sprite.prototype.advanceFrame = function ()
{
	this.frame = (this.frame+1)%4;
};
Sprite.prototype.clear = function (context)
{
	this.clearHelper(context,this.x+this.xOffset);
	if(this.width+this.xOffset+this.x>=this.boardWidth) this.clearHelper(context,this.x+this.xOffset-this.boardWidth);
};
Sprite.prototype.draw = function (context)
{
	this.drawHelper(context,this.x+this.xOffset);
	if(this.width+this.xOffset+this.x>=this.boardWidth) this.drawHelper(context,this.x+this.xOffset-this.boardWidth);
};
Sprite.prototype.setDirection = function (direction)
{
	this.direction = direction;
};
Sprite.prototype.setPosition = function (x,y)
{
	this.x = x;
	this.y = y;
};
