/////////
//页面切换
/////////
function Swip(a){
	var container = a.find(":first");
	var num_li = container.find("li");
	// ul下的所有子节点，即一个li的组
	var swip = {};
	var width_div = a.width(); 
	var height_div = a.height();
	container.css({ 
	// ul的实际宽高
		width : num_li.length * width_div + 'px',
		height : height_div + 'px'
	});
	// 设置每个li的宽高和div一致
	$.each(num_li,function(index){
		var Li = num_li.eq(index);
		Li.css({
			width : width_div + 'px',
			height : height_div + 'px'
		});
	});
	swip.scrollTo = function(x,speed){
		container.css({
			'transition-timing-function':'linear',
			'transition-duration':speed + 'ms',
			'transform':'translate3d(-' + x +'px,0px,0px)'
		});
		return this;
	};
	return swip;
}