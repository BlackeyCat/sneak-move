/**
*Game  整个游戏类
*@map 地图的实例
*@snake 蛇的实例
*@food 食物的实例
*@block 障碍物的实例
*****/
function Game(map, snake, food, block) {
	this.map = map;
	this.snake = snake;
	this.food = food;
	this.block = block;
	this.timer = null;
	this.flag = null;


	this.init();
}

//定义初始化方法
Game.prototype.init = function() {
	this.renderMap();
	this.renderFood();
	this.renderSnake();
	this.renderBlock();
	this.bindEvent();
	this.start();
}

//渲染地图
Game.prototype.renderMap = function() {
	this.map.fill();
}

//渲染食物
Game.prototype.renderFood = function() {
	var row = this.food.row;
	var col = this.food.col;

	// 地图中的数组作用就是简化代码的书写
	// 渲染食物就是在地图中渲染食物坐标元素的背景图案
	// this.map.arr[row][col].style.backgroundColor = "#f66";
	this.map.arr[row][col].style.backgroundImage = "url(" + this.food.img + ")";
	this.map.arr[row][col].style.backgroundSize = "cover";
}

//渲染蛇
Game.prototype.renderSnake = function() {
	// 获取蛇的头部
	// 试着用if去写
	var head = this.snake.arr[this.snake.arr.length -1];
	this.map.arr[head.row][head.col].style.backgroundImage = "url(" + this.snake.head_pic[this.snake.head_idx] + ")";
	this.map.arr[head.row][head.col].style.backgroundSize = "cover";

	//渲染蛇就是在地图中渲染蛇的坐标元素的背景图案
	// 循环渲染蛇的每一节身体
	for (var i = 1; i < this.snake.arr.length - 1; i ++) {
		// 定义变量简化书写
		var row = this.snake.arr[i].row;
		var col = this.snake.arr[i].col;
		// this.map.arr[row][col].style.backgroundColor = "#af7";
		this.map.arr[row][col].style.backgroundImage = "url(" + this.snake.body_pic[0] + ")";
		this.map.arr[row][col].style.backgroundSize = "cover";

	}

	//获取蛇的尾部
	var tail = this.snake.arr[0];
	this.map.arr[tail.row][tail.col].style.backgroundImage = "url(" + this.snake.tail_pic[this.snake.tail_idx] + ")";
	this.map.arr[tail.row][tail.col].style.backgroundSize = "cover";

}



// 游戏开始
Game.prototype.start = function() {
	// 这个flag的值 不会重新start复制给true 因为执行checkMap撞墙时会直接执行gameOver
	// 此时gameOver给this.flag重新复制了false，所以无法继续运行if，并且直接关闭定时器
	this.flag = true;
	// 缓存this
	var me = this;
	// 赋值timer
	this.timer = setInterval(function() {
		// 移动
		me.snake.move();
		//检测是否撞墙
		me.checkMap();
		//检测是否吃到食物
		me.checkFood();
		// 检测蛇是否吃到自己
		me.checkSnake();
		// 检测蛇是否撞到障碍物
		me.checkBlock();
		if (me.flag) {
			// 清屏
			me.map.clear();
				
			// 渲染
			// 渲染食物
			me.renderFood();
			// 渲染蛇
			me.renderSnake();
			//渲染障碍物
			me.renderBlock();
		}
	}, 200);
}

// 添加键盘事件
Game.prototype.bindEvent = function() {
	// 在一个类的原型方法中，不要使用除了window。document的其他全局自定义变量
	// 现在全局中有：map， snake， food， block ， g

	// 缓存this
	var me = this;
	// var left = null;
	// var top = null;
	// var leftend = null;
	// var topend = null;
	// 添加触摸事件
	// document.addEventListener("touchstart", function(e) {

	// 		// if (!lock) {
	// 		// 	return;
	// 		// }

	// 		// 取消过渡
	// 		// carousel.style.transition = "none";
	// 		left = e.touches[0].clientX;
	// 		top = e.touches[0].clientY;
	// 		// console.log(left);

	// 	});
	// document.addEventListener("touchend", function(e) {

	// 		// if (!lock) {
	// 		// 	return;
	// 		// }

	// 		// 取消过渡
	// 		// carousel.style.transition = "none";
	// 		leftend = e.changedTouches[0].clientX;
	// 		topend = e.changedTouches[0].clientY;
	// 		console.log(leftend - left);
	// 		console.log(topend - top);

	// 	});
	$("#btn1").click(function() {
			// 蛇可以转向了
			me.snake.change(38);
	})
	$("#btn2").click(function() {
			// 蛇可以转向了
			me.snake.change(37);
	})
	$("#btn3").click(function() {
			// 蛇可以转向了
			me.snake.change(39);
	})
	$("#btn4").click(function() {
			// 蛇可以转向了
			me.snake.change(40);
	})
	$("#control").swipeLeft(function() {
		me.snake.change(37);
		console.log("swipeLeft");
	})

	$("#control").swipeRight(function() {
		me.snake.change(39);
		console.log("swipeRight");
	})

	// swipeUp
	$("#control").swipeUp(function() {
		me.snake.change(38);
		console.log("swipeUp");
	})

	// swipeDown
	$("#control").swipeDown(function() {
		me.snake.change(40);
		console.log("swipeDown");
	})

		
		
	document.onkeydown = function(e) {
		// console.log(e.keyCode);
		// 获取用户按下的方向键
		var code = e.keyCode;
		// 判断用户按下的方向键
		if (code === 37 || code === 38 || code === 39 || code === 40) {
			// 蛇可以转向了
			me.snake.change(code);
		}

	} 

}


// 游戏结束方法

Game.prototype.gameOver = function() {
	this.flag = false;
	//清除定时器
	clearInterval(this.timer);
}


// 检测蛇是否撞墙
// 试着改写为穿墙**************************
Game.prototype.checkMap = function() {
	// 获取蛇的头部
	var head = this.snake.arr[this.snake.arr.length - 1];
	// 判断蛇头与地图的row  col 关系
	// map.row值是20  head.row最大值只能是19（0~19）
	if (head.row < 0 || head.row >= this.map.row || head.col < 0 || head.col >= this.map.col) {
		console.log("蛇撞墙了");
		this.gameOver();
	}
}


// 检测是否吃到食物
Game.prototype.checkFood = function() {
	// 获取蛇的头部
	var head = this.snake.arr[this.snake.arr.length - 1];
	// 获取食物
	var food = this.food;

	// 判断是否与食物的坐标重合，重合就表示吃到食物
	if (head.row === food.row && head.col === food.col) {
		console.log("吃到食物了");
		// 调用蛇生长的方法
		this.snake.growUp();
		// 重置食物
		this.resetFood();
	}
}

// 重置食物的方法
// 试着改写为食物不会出现在蛇身上。*********************
Game.prototype.resetFood = function() {
	// 随机生成 row ,col 
	var row = parseInt(Math.random() * this.map.row);
	var col = parseInt(Math.random() * this.map.col);

	// 检测食物的合法性
	for (var i = 0; i < this.snake.arr.length; i ++) {
		// 获取蛇的一节身体
		var one = this.snake.arr[i];
		// 检测食物与蛇身体的每一节进行比对
		if (one.row === row && one.col === col) {
			alert("食物和身体重合了");
			this.resetFood();
			// return;
		}
	}
	// 检测食物是否刷新到了障碍物下面
	for (var i = 0; i < this.block.arr.length; i ++) {
		// 获取障碍物的某一节
		var one = this.block.arr[i];
		// 检测食物与障碍物的关系
		if (one.row === row && one.col === col) {
			// 说明食物出现在了障碍物的身上
			alert("重合到障碍物上了");
			this.resetFood();
			// return需要写吗？？
			// 如果不写return的话，就无法重新刷新食物
			return;
		}
	}

	this.food.reset(row,col);
}





// 检测蛇是否吃到自己
Game.prototype.checkSnake = function() {
	// 获取蛇的头部
	var head = this.snake.arr[this.snake.arr.length - 1];
	// 拿着蛇的头部与蛇的每一节身体进行比对
	for (var i = 0; i < this.snake.arr.length - 1; i ++) {
		// 获取蛇的一节身体
		var one = this.snake.arr[i];
		if (head.row === one.row && head.col === one.col) {
			console.log("蛇吃到自己了");
			// 游戏结束
			this.gameOver();
		}
	}
}



// 渲染障碍物
Game.prototype.renderBlock = function() {
	// 循环渲染障碍物
	// 渲染障碍物可以理解为渲染一条不会动的蛇
	for (var i = 0; i < this.block.arr.length; i ++) {
		// 定义变量用于简化书写
		var row = this.block.arr[i].row;
		var col = this.block.arr[i].col;

		// 在地图中渲染障碍物的图片
		this.map.arr[row][col].style.backgroundImage = "url(" + this.block.img + ")";
		this.map.arr[row][col].style.backgroundSize = "cover";
	}
}


// 渲染蛇与障碍物的关系
Game.prototype.checkBlock = function() {
	// 获取蛇的头部
	var head = this.snake.arr[this.snake.arr.length - 1];
	// 循环与障碍物比较
	for (var i = 0; i < this.block.arr.length; i ++) {
		var one = this.block.arr[i];
		if (head.row === one.row && head.col === one.col) {
			console.log("撞到障碍物了");
			this.gameOver();
		}
	}
}