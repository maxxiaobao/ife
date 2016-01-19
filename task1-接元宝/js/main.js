var isHere = new Array();
var Myscore = 0;
for(var x=0;x<18;x++){
	isHere[x] = false;
}
var mytime = 0;
var dis = 0;

$(document).ready(function(){
	$("#begin").bind('click',function(){
		$(this).hide();
		begin();
	});
});


function begin(){
	//准备一切
	prepare();
	//元宝降落
	ingotsDown();
	//移动招财猫
	moveCat();
}

function prepare(){
	setInterval(function(){
		mytime++;
		$("#time").text(mytime);
	},1000);
}

function moveCat(){
	var obj = $("#cat");
	var to_x;
	obj.mousedown(function(event){	
	     $(document).mousemove(function(event){
	     	    var mar_left = parseInt( $("#smallbox").css('margin-left') );
	     	    var sma_width = parseInt( $("#smallbox").css('width') );
				to_x = event.pageX;
			   // $("#score").text(to_x);
			    if(to_x < mar_left){
			    	 obj.css("left","0px");
			    }else if(to_x > mar_left+sma_width-80){
			    	 obj.css("left",sma_width-80 + "px");
			    }else{
			    	obj.css("left",to_x - mar_left + "px");
			    }
			    
		});
		//释放鼠标
		$(document).mouseup(function(event){
			$(this).unbind('mousemove');
		});
	});
	
	$(document).keydown(function(event){
	var obj = $("#cat");
		switch(event.keyCode){
			case 37://left
				if(canmoveleft()){
					moveleft();
				}
				break;
			case 39://right
				if(canmoveright()){
					moveright();
				}
				break;
			default:
				break;
		}
	});
	
}



function ingotsDown(){
	var timer = setInterval(function(){
		var i = Math.floor(Math.random()*17);
		while(isHere[i]){
			i = Math.floor(Math.random()*17);
		}
		$("#smallbox").append('<div id="ingots-'+i+'" style="position:absolute"><img src="img/ingots.png" /></div>');
		setingots(i);	
	},300);
}


function setingots(i){
	j = i%8;
	isHere[i] = true;
	var newingots = $("#ingots-"+i);
	newingots.css("left",60*j+"px");
	newingots.css("top",40+40*j+"px");
	newingots.animate({
		top:540
	},4000,function(){
		if(isgetScore(i)){
			Myscore++;
			$("#score").text(Myscore);
		}
		newingots.remove();
		isHere[i] = false;
	});	
}

function isgetScore(i){
	var catleft = parseInt( $("#cat").position().left);
	var isgotsleft = parseInt( $("#ingots-"+i).position().left );
	if(Math.abs(catleft - isgotsleft) < 20){
		return true;
	}else{
		dis++;
		end();
		return false;
	}
}

function end(){
	if(dis>50){
		$("#begin").show();
		$("#begin").text("GAME OVER!分数为" + Myscore);
		$("#begin").css("font-size","25px");
		$("#begin").css("line-height","30px");
		setTimeout(timer);
	}
}

function canmoveleft(){
	var catleft = parseInt( $("#cat").position().left);
	if(catleft == 0)
		return false;
	return true;
}

function moveleft(){
	var catleft = parseInt( $("#cat").position().left);
	obj.css("left",catleft-5 + "px");
}

function canmoveright(){
	var catleft = parseInt( $("#cat").position().left);
	if(catleft > 480)
		return false;
	return true;
}

function moveright(){
	var catleft = parseInt( $("#cat").position().left);
	obj.css("left",catleft + 5 + "px");
}











