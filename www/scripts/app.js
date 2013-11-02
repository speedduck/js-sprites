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

$(function(){
	var boardInfo ={
		width:480,
		height:440,
		tunnelSize:40,
		backgroundImage:'images/test-bg.png'
	};
	var map = [
		'+-+-+-+-+-+-+-+-+-+-+-+-+',
		'|           |           ',
		'+ +-+ +-+-+ + +-+-+ +-+ +',
		'| |s| |s s| | |s s| |s| ',
		'+ +-+ +-+-+ + +-+-+ +-+ +',
		'|                       ',
		'+ +-+ + +-+-+-+-+ + +-+ +',
		'|     |     |     |     ',
		'+-+-+ +-+-+ + +-+-+ +-+-+',
		'|s s| |           | |s s',
		'+-+-+ + +-+ + +-+ + +-+-+',
		'        |g g g g|       ',
		'+-+-+ + +-+-+-+-+ + +-+-+',
		'|s s| |           | |s s',
		'+-+-+ + +-+-+-+-+ + +-+-+',
		'|           |           ',
		'+ +-+ +-+-+ + +-+-+ +-+ +',
		'|   |               |   ',
		'+-+ + + +-+-+-+-+ + + +-+',
		'|     |     |     |     ',
		'+ +-+-+-+-+ + +-+-+-+-+ +',
		'|                       '];
	var playerInfo = {
		width:32,
		height:32,
		xOffset:4,
		yOffset:4,
		frameCount:4,
		directional:true,
		spriteImage:'images/pacman-sprite.png'
	};
	var canvas = document.getElementById('myCanvas');
	var context = canvas.getContext('2d');
	var imageLoader = new ImageLoader();
	imageLoader.onComplete(imagesLoaded);
	var bufferCanvas =new BufferCanvas(imageLoader.getImage(boardInfo.backgroundImage),boardInfo.width,boardInfo.height);
	var playerSprite = new Sprite(imageLoader.getImage(playerInfo.spriteImage),bufferCanvas,playerInfo);
	var boardController = new BoardController(boardInfo);
	var playerController = new PlayerController(playerSprite,boardController);
	var boardView = new BoardView(bufferCanvas,boardInfo);
	var boardModel = new BoardModel();
	boardModel.loadMap(map);
	boardController.loadLevel(boardModel);
	imageLoader.load();
	function imagesLoaded()
	{
		bufferCanvas.refresh(0,0,boardInfo.width,boardInfo.height);
		boardView.draw(boardModel);
		bufferCanvas.clearRect(context,0,0,boardInfo.width,boardInfo.height);
		setInterval(refresh,75);
	}
	function refresh()
	{
		playerController.move(context);
	}
});
