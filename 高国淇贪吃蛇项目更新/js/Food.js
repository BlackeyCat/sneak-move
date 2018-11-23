function Food(x, y,img) {
	this.row = x;
	this.col = y;
	// 看一下为什么img参数****************************
	this.img = img;
}
// 重置食物
Food.prototype.reset = function(x, y) {
	this.row = x;
	this.col = y;
}