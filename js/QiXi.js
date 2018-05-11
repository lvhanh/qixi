/*
*开灯效果
*/
var lamp = {
	ele : $(".b_background"),
	bright : function(){
		this.ele.addClass("lamp-bright");
	},
	dark : function(){
		this.ele.removeClass("lamp-bright");
	}
};
//开灯
var bright = function(){
	return lamp.bright();
}
//关灯
var dark = function(){
	return lamp.dark();
}
/*
*开门效果
*/
function doorAction(time,left,right){
	var dtd = $.Deferred();
	var count = 2;
	// 等待动作完成
	var complete = function(){
		if(count == 1){
			dtd.resolve();
			return;
		}
		count--;
	};
	$(".door_left").transition({
		'left' : left
	},time,complete());
	$(".door_right").transition({
		'left' : right
	},time,complete());
	return dtd;
}
//开门
var openDoor = function(){
	return doorAction(2000,'-50%','100%');
}
//关门
var closeDoor = function () {
	return doorAction(2000,'0%','50%');
}

/*
*小孩走路
*/
var boyTOdoor;
function boyWalk(){
	var swip = Swip($("#content"));
	/*var backgroundCss = function(className){
		var ele = $(''+className+'');
		return {
			height:ele.height(),
			top:ele.position().top
		};
	};*/
	var middleCss = $(".a_background_middle");
	var pathY = middleCss.offset().top + middleCss.height()/2; //获取路中间点的Y轴坐标
	var boyHeight = $("#boy").height();
	$("#boy").css({
		top : pathY - boyHeight +25 //将人物置于路中间
	});
	
	var $boy = $("#boy");
	// 页面可视区域宽高
	var visualWidth = $("#content").width();
	var visualHeight = $("#content").height();


	// 慢走
	function slowWalk(){
		$boy.addClass("slowWalk");
	}

	// 暂停走路
	function pauseWalk(){
		$boy.addClass("pauseWalk");
	}

	// 恢复走路
	function restoreWalk(){
		$boy.removeClass("pauseWalk");
	}

	//计算距离
	function Dist(direction,proportion){
		return (direction ==='x' ? visualWidth:visualHeight)*proportion;
	}

	// 用transition控制走路变化
	function startRun(coord,runtime){
		var dtd = $.Deferred();
		restoreWalk();
		$boy.transition(
			coord,
			runtime,
			'linear',
			function(){
				dtd.resolve(); //动画完成
			});
		return dtd;
	}

	// 走路
	function Walk(time,DistX,DistY){
		var time = time;
		slowWalk();
		var dl = startRun({
			'left' : DistX,
			'top' : DistY ? DistY : undefined
		},time);
		return dl;
	}

	//走进商店
	function walkToShop(time){
		var offsetDoor = $(".door").offset();
		var offsetDoorLeft = offsetDoor.left;
		var offsetBoy = $boy.offset();
		var offsetBoyLeft = offsetBoy.left;
		boyTOdoor = (offsetDoorLeft + $(".door").width()/2) - (offsetBoyLeft + $boy.width()/2);
		var defer = $.Deferred();
		var walkPlay = startRun({
			transform : 'translateX('+boyTOdoor+'px),scale(0.3,0.3)',
			opacity : 0.1
		},time);
		walkPlay.done(function(){
			$boy.css({
				opacity : 0
			});
			defer.resolve();
		});
		return defer;
	}

	//走出商店
	function walkOutShop(time){
		var defer = $.Deferred(); 
		var walkPlay = startRun({
			transform : 'translateX('+boyTOdoor+'px),scale(1,1)',
			opacity : 1
		},time);
		walkPlay.done(function(){
			defer.resolve();
		});
		return defer;
	}

	//取花
	function takeFlower(){
		var defer = $.Deferred();
		//设置延时
		setTimeout(function(){
			$boy.addClass("takeFlower");
			defer.resolve();
		},1000);
		return defer;
	}

	return {
		// 开始走路
		walkTo : function(time,proportionX,proportionY){
			var distX = Dist('x',proportionX);
			var distY = Dist('y',proportionY);
			return Walk(time,distX,distY);
		},
		//停止走路
		stopWalk : function(){
			pauseWalk();
		},
		//走进商店
		walktoShop : function(time){
			return walkToShop(time);
		},
		//走出商店
		walkoutShop : function(time){
			return walkOutShop(time);
		},
		//改变颜色
		setColor : function(val){
			$boy.css('background-color',val);
		}
		//取花
		takeFlower : function(){
			return takeFlower();
		}
	};
}