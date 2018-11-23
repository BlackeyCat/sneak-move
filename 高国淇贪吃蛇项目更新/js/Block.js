function Block(img) {
	/*
	关于img参数   在index.html内的初始化实例对象赋值给img ="img/block.png
	然后传递到这里 this.img = img = "img/block.png;
	然后在Game.js中game原型的renderBlock方法中渲染石头，
	然后让定位到地图中某一个块儿改变其背景图片为
	this.map.arr[row][col].style.backgroundImage = "url(" + this.block.img + ")";
	此时的this.block.img 的this指向game，然后game指向里面的实例，
	所以game.js里面的this.block.img = Block.js里面的this.img = img = "img/block.png";
	所以
	this.map.arr[row][col].style.backgroundImage = "url(" + "img/block.png" + ")";


	*/
	//数组属性
	this.arr = [
		// {row: 8, col: 8},
		// {row: 8, col: 9},
		// {row: 8, col: 10},
		// {row: 9, col: 10},
		// {row: 10, col: 10},
		// {row: 11, col: 10},
		// {row: 12, col: 10},
		// {row: 13, col: 10},
		// {row: 14, col: 10},
		// {row: 15, col: 10},
		// lol
		// L
		{row: 6, col: 2},
		{row: 7, col: 2},
		{row: 8, col: 2},
		{row: 9, col: 2},
		{row: 10, col: 2},
		{row: 11, col: 2},
		{row: 12, col: 2},
		{row: 13, col: 2},
		{row: 13, col: 3},
		{row: 13, col: 4},
		{row: 13, col: 5},
		// O
		{row: 6, col: 8},
		{row: 7, col: 8},
		{row: 8, col: 8},
		{row: 9, col: 8},
		{row: 10, col: 8},
		{row: 11, col: 8},
		{row: 12, col: 8},
		{row: 6, col: 9},
		{row: 12, col: 9},
		{row: 6, col: 11},
		{row: 12, col: 11},
		{row: 6, col: 12},
		{row: 7, col: 12},
		{row: 8, col: 12},
		{row: 9, col: 12},
		{row: 10, col: 12},
		{row: 11, col: 12},
		{row: 12, col: 12},
		// L
		{row: 6, col: 15},
		{row: 7, col: 15},
		{row: 8, col: 15},
		{row: 9, col: 15},
		{row: 10, col: 15},
		{row: 11, col: 15},
		{row: 12, col: 15},
		{row: 13, col: 15},
		{row: 13, col: 16},
		{row: 13, col: 17},
		{row: 13, col: 18},


	];
	this.img = img;
}