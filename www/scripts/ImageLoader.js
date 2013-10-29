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

function ImageLoader()
{
	var that = this;
	this.images = [];
	this.onCompleteHandlers = [];
	this.loadedCount = 0;
	this.onImageLoad = function()
	{
		that.loadedCount++;
		if(that.loadedCount == that.images.length)
		{
			for(var i = 0;i<that.onCompleteHandlers.length;i++)that.onCompleteHandlers[i]();
		}
	}
}

ImageLoader.prototype.getImage = function(src)
{
	img = new Image();
	img.onload=this.onImageLoad;
	this.images[this.images.length] = {image:img,source:src};
	return img;
};

ImageLoader.prototype.load = function()
{
	for(var i=0; i<this.images.length; i++)
		this.images[i].image.src=this.images[i].source;
};

ImageLoader.prototype.onComplete = function(handler)
{
	this.onCompleteHandlers[this.onCompleteHandlers.length] = handler;
};
