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

function BufferCanvas(bg,w,h)
{
	var that = this;
	this.canvas = document.createElement('canvas');
	this.width = w;
	this.height = h;
	this.canvas.width = w;
	this.canvas.height = h;
	this.context=this.canvas.getContext('2d');
	this.bgImage = bg;
}

BufferCanvas.prototype.getCanvas = function()
{
	return this.canvas;
}

BufferCanvas.prototype.getContext = function()
{
	return this.context;
}

/**
 * Draws the background image onto an area of the buffer context
 */
BufferCanvas.prototype.refresh = function(x,y,w,h)
{
	if(x<0)
	{
		w=w+x;
		x=0;
	}
	if(y<0)
	{
		h=h+y;
		y=0;
	}
	if(h>0&&w>0)
	{
		this.context.drawImage(this.bgImage,x,y,w,h,x,y,w,h);
	}
}
/**
 * Draws the buffer context on to an area of another context
 */
BufferCanvas.prototype.clearRect = function(context,x,y,w,h)
{
	if(x<0)
	{
		w=w+x;
		x=0;
	}
	if(y<0)
	{
		h=h+y;
		y=0;
	}
	if(h>0&&w>0)
	{
		context.drawImage(this.canvas,x,y,w,h,x,y,w,h);
	}
}

BufferCanvas.prototype.getWidth = function()
{
	return this.width;
}

BufferCanvas.prototype.getHeight = function()
{
	return this.height;
}
