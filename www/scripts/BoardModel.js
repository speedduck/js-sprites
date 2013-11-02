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

function BoardModel ()
{
	this.hWalls = null;
	this.vWalls = null;
	this.ghostSpawn = null;
	this.solidSpaces = null;
}
BoardModel.prototype.loadMap = function(map)
{
	this.hWalls = [];
	this.vWalls = [];
	this.ghostSpawn = [];
	this.solidSpaces = [];
	var hIndex=0;
	var vIndex=0;
	for(var i=0;i<map.length;i++)
	{
		var chars=map[i].split('');
		var row = [];
		var k=0;
		if(i%2==0)
		{
			//Even line
			for(var j=1; j<chars.length; j+=2)
			{
				row[k]=(chars[j]!=' ');
				k++;
			}
			this.hWalls[hIndex]=row;
			hIndex++;
		}
		else
		{
			//Odd line
			for(var j=0; j<chars.length; j+=2)
			{
				row[k]=(chars[j]!=' ');
				k++;
			}
			this.vWalls[vIndex]=row;
			gsRow=[];
			ssRow=[];
			k=0;
			for(var j=1; j<chars.length; j+=2)
			{
				gsRow[k]=(chars[j]=='g');
				ssRow[k]=(chars[j]=='s');
				k++;
			}
			this.ghostSpawn[vIndex]=gsRow;
			this.solidSpaces[vIndex]=ssRow;
			vIndex++;
		}
	}
};

BoardModel.prototype.getVerticalWalls = function()
{
	return this.vWalls;
};

BoardModel.prototype.getHorizontalWalls = function()
{
	return this.hWalls;
};

BoardModel.prototype.getGhostSpawn = function()
{
	return this.ghostSpawn;
};

BoardModel.prototype.getSolidSpaces = function()
{
	return this.solidSpaces;
};
