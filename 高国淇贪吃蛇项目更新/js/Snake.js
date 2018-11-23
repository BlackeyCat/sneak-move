function Snake(pic_obj) {
	// 看一下pic_obj怎么传递************************
	//数组属性 ,用于存放蛇的每一节身体
	this.arr = [
		{row: 4, col: 4},
		{row: 4, col: 5},
		{row: 4, col: 6},
		{row: 4, col: 7},
		{row: 4, col: 8},
	];
	//方向属性
	this.direction = 39;  //left 37 top 38 
	// 定义锁
	this.lock = true;
	// 定义蛇的头部属性
	this.head_pic = pic_obj.head_pic;
	// 定义蛇的身体属性
	this.body_pic = pic_obj.body_pic;
	// 定义蛇尾部属性
	this.tail_pic = pic_obj.tail_pic;
	// 定义头部图片索引
	// 默认是2方向
	this.head_idx = 2;
	// 定义尾部图片索引
	this.tail_idx = 0;

}

Snake.prototype.move = function() {
	// 创建新的头部
	var newHead = {
		row : this.arr[this.arr.length - 1].row,
		col: this.arr[this.arr.length -1].col,
	}
	// 判断蛇的方向
	if (this.direction === 37) {
		// 新头在老头左边 行不变，列--
		newHead.col --;
	}else if (this.direction === 38) {
		// 新头在老头上边  列不变 行--
		newHead.row --;
	}else if (this.direction === 39) {
		// 新头在老头右边  行不变  列 ++
		newHead.col ++;
	}else if (this.direction === 40) {
		// 心头在老头下面  列不变  行 ++
		newHead.row ++;
	}
	// 将新的头部添加到数组最后一项，添加蛇头
	this.arr.push(newHead);
	// 去掉数组的第一项，也就是蛇屁股
	this.arr.shift();


	// 开锁
	this.lock = true;


	// 在移动的时候改变尾部图片
	// 获取蛇的尾部
	var tail = this.arr[0];
	// 获取蛇尾部的上一个元素
	var pg = this.arr[1];

	if (tail.row === pg.row) {
		// 说明在同一行，比较tail、pg列的关系
		this.tail_idx = tail.col > pg.col ? 2 : 0;
	}else {
		// 说明在同一列 ，比较tail、pg行的关系
		this.tail_idx = tail.row > pg.row ? 3 : 1;
	}
}



// 蛇转向
Snake.prototype.change = function(direction) {
	// 函数节流
	if (!this.lock) {
		return;
	}
	// 关闭锁
	this.lock = false;
	// 用户按下的按键 - 蛇当前的方向 
	console.log(direction);
	console.log(this);
	var result = Math.abs(direction - this.direction);
	if (result === 2 || result === 0) {
		// 2 和 0 说明用户按下的方向和蛇现在的方向是相同或者相反，蛇不可以动
		return;
	} else {
		//说明用户传递的方向是合理的
		// 此时让蛇的方向变为用户按下的方向
		// this.direction 是蛇的方向
		// direction 是用户按下的方向键
		this.direction = direction; 
	}

	// 在change的时候改变头部图片
	if (direction === 37) {
		this.head_idx = 0;
	} else if (direction === 38) {
		this.head_idx = 1;
	} else if (direction === 39) {
		this.head_idx = 2;
	} else if (direction === 40) {
		this.head_idx = 3;
	}
}

// 蛇生长
Snake.prototype.growUp = function() {
	// 获取蛇的尾部
	var tail = this.arr[0];
	// 添加到数组的头部
	this.arr.unshift(tail);
}