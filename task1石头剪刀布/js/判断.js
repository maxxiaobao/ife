window.onload = function(){
	var jiandao = document.getElementById('jiandao'),
	     shitou = document.getElementById('shitou'),
	     bu     = document.getElementById('bu'),
	     me     = document.getElementById('me'),
	   computer = document.getElementById('computer'),
	   yes = document.getElementById('button'),
	   newgame = document.getElementById('newgame');
	mynum = 0;
	k=0;
	jiandao.onclick = function(){
		mynum = 2;
		me.setAttribute("src","img/剪刀.png");
	}
	shitou.onclick = function(){
		mynum = 10;
		me.setAttribute("src","img/石头.png");
	}
	bu.onclick = function(){
		mynum = 5;
		me.setAttribute("src","img/布.png");
	}
    yes.onclick = function(){
    	if(mynum == 0){
    		alert("你还没有选择呢！");
    	}
    	else{
    		last();
    	}
    }

     newgame.onclick = function(){
         window.location.href = window.location.href;
     }

}

var mynum,k;


function last(){
    var lastnumber = document.getElementById('lastnumber');
	var computer = document.getElementById('computer');
	var sign,computernum;
	sign = Math.floor(Math.random()*9);
	if(sign<3){
		computer.setAttribute("src","img/剪刀.png");
		computernum = 2;
	}else if(sign<6){
		computer.setAttribute("src","img/石头.png");
		computernum = 10;
	}else{
		computer.setAttribute("src","img/布.png");
		computernum = 5;
	}
	
	if(mynum == computernum){
		alert("************"+'\n'+"    平局           "+'\n'+"************");
	}else if(mynum == 2){
		if(computernum == 5){
			alert("你赢啦！");
			k++;
		}
		else{
			alert("你输了~");
		}
	}
    else if(mynum == 5){
    	if(computernum == 10){
    		alert("你赢啦！");
    		k++;
    	}else{
    		alert("你输了~");
    	}
    }
    else if(mynum == 10){
    	if(computernum == 2){
    		alert("你赢啦！");
    		k++;
    	}
    	else{
    		alert("你输了~");
    	}
    }
   lastnumber.setAttribute("value",k);
}
