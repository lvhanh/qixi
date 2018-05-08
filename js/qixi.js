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
///////////////////////////////////
//---------动画处理--------------//
//////////////////////////////////
var $boy = $("#boy");
// 页面可视区域宽高
var visualWidth = $("#content").width();
var visualHeight = $("#content").height();

// 慢走
function slowWalk(){
	$boy.addClass("slowWalk");
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
		function(){}
		);
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