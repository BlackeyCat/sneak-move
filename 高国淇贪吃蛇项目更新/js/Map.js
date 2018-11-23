/**
*Map地图类
*@row 行属性
*@col 列属性
*@width  宽度属性
*@height 高度属性
*/
function Map(row, col, width, height) {
	this.arr = [];
	this.row = row;
	this.col = col;
	this.width = width;
	this.height = height;
	//渲染到页面需要一个dom元素
	this.dom = document.createElement("div");
}

//填充地图
Map.prototype.fill = function() {
	for (var j = 0; j < this.row; j ++) {
		//要把行元素一行一行创建到大的dom（div）上，所以要创建一个行容器
		var row_dom = document.createElement("div");
		//创建一个行数组
		var row_arr = [];
		//添加类名以书写样式
		row_dom.className = "row";
		//循环填充每行，创建小方格元素
		for (var i = 0; i < this.col; i ++) {
			//创建每一个小方格元素
			var col_dom = document.createElement("span");
			//给每一个小方格元素添加类名
			col_dom.className = "grid";
			// 追加到行容器内
			row_dom.appendChild(col_dom);
			//列填充到每一个行数组中
			row_arr.push(col_dom);
		}
		//每创建一个行都要追加到大的dom中
		this.dom.appendChild(row_dom);
		//每填充好的一个行数组都放入到一个总数组中保存
		this.arr.push(row_arr);
		//设置dom元素的类名以设置样式
		this.dom.className = "box";
	}
	// 都创建好以后，将dom元素上树追加到body
	document.body.appendChild(this.dom);
}



// 清屏
Map.prototype.clear = function() {
	for (var i = 0; i < this.arr.length; i ++) {
		for (var j = 0; j < this.arr[i].length; j ++) {
			// this.arr[i][j].style.backgroundColor = "#fff";
			this.arr[i][j].style.backgroundImage = "none";
		}
	}
}