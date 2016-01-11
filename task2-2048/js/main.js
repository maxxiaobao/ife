var board = new Array();
var score = 0;
var hasadd = new Array();
var doit = false;

var startx = 0;
var starty = 0;
var endx = 0;
var endy = 0;

$(document).ready(function(){
	prepareForMobile();
	newgame();
});

function prepareForMobile(){
	if(documentWidth > 500){
		gridcontainerWidth = 500;
		cellSideLength = 100;
		cellSpace = 20;
	}
	$("#grid-container").css('width',gridcontainerWidth - 2 * cellSpace);
	$("#grid-container").css('height',gridcontainerWidth - 2 * cellSpace);
	$("#grid-container").css('padding',cellSpace);
	$("#grid-container").css('border-radius',0.02 * gridcontainerWidth);
	
	$(".grid-cell").css('width',cellSideLength);
	$(".grid-cell").css('height',cellSideLength);
	$(".grid-cell").css('border-radius',0.04*cellSideLength);
}

function newgame(){
	//初始化小格子
	init();
	//初始化值
	generateOneNumber();
	generateOneNumber();
}

function init(){
	for(var i = 0 ; i < 4 ;  i++ )
		for(var j = 0 ; j < 4 ;j++){
			var gridcell = $("#grid-cell-" + i + "-" + j);
			gridcell.css("top",getTop( i,j ) );
			gridcell.css("left",getLeft( i,j ));
		}
	
	for(var i =0 ;i < 4 ;i++){
		board[i] = new Array();
		hasadd[i] = new Array();
		for(var j =0 ;j < 4 ; j++){
			board[i][j] = 0 ;
			hasadd[i][j] = false;
		}
	}
	score = 0;
	updateboardview();
}

function updateboardview(){
	$(".number-cell").remove();
	doit = false;
	for(var i = 0; i < 4 ; i++)
		for(var j = 0; j < 4 ; j++){
			
			/*$("#grid-container").append('<div class="number-cell" id="number-cell-'+i+'-'+j+'"></div>');*/
			$("#grid-container").append("<div class='number-cell' id='number-cell-"+i+"-"+j+"'></div>");
			var theNumberCell = $("#number-cell-"+i+"-"+j);
			if(board[i][j] == 0){
				theNumberCell.css("width" , "0px");
				theNumberCell.css("height" , "0px");
				theNumberCell.css("top" , getTop(i,j)+cellSideLength/2);
				theNumberCell.css("left" , getLeft(i,j)+cellSideLength/2);
			}else{
				theNumberCell.css("width", cellSideLength);
				theNumberCell.css("height", cellSideLength);
				theNumberCell.css("top", getTop(i,j));
				theNumberCell.css("left", getLeft(i,j));
				theNumberCell.css("background-color" , getBackgroundColor(board[i][j]));
				theNumberCell.css("color" , getColor(board[i][j]));
				theNumberCell.text(board[i][j]);
			}
			
			hasadd[i][j] = false;
		}
		$(".number-cell").css("font-size",0.6*cellSideLength);
		$(".number-cell").css("border-radius",0.04*cellSideLength); 
	    
}

function generateOneNumber(){
	if(nospace(board))
		return false;
		
	//随即一个位置
	var randx = parseInt(Math.floor( Math.random()*4 ));
	var randy = parseInt( Math.floor(Math.random()*4));
	var times = 0;
	while(times < 50){
		if(board[randx][randy] == 0)
			break;
			
		randx = parseInt(Math.floor( Math.random()*4 ));
		randy = parseInt( Math.floor(Math.random()*4));
		times++;
	}
	if(times == 50){
		for(var i=0;i<4;i++)
			for(var j=0;j<4;j++)
				if(board[i][j] == 0){
					randx = i;
					randy = j;
				}
	}
	//随机一个数字
	var NewNumber = Math.random() < 0.5 ? 2: 4 ;
	//将随机数字放在随机位置
	board[randx][randy] = NewNumber;
	showNumberWithAnimation(randx , randy , NewNumber);
	return true;
}


$(document).keydown(function(event){
	switch(event.keyCode){
	case 37:   // Left
		if( moveLeft() ){
			if(doit)
			setTimeout("generateOneNumber()",210);
			setTimeout("isGameOver()",300);
		}
		break;
	case 38:   // Up
		if( moveUp() ){
			if(doit)
			setTimeout("generateOneNumber()",210);
			setTimeout("isGameOver()",300);
		}
		break;
	case 39:    // Right
		if( moveRight() ){
			if(doit)
			setTimeout("generateOneNumber()",210);
			setTimeout("isGameOver()",300);
		}
	    break;
	case 40:    // Down
		if( moveDown() ){
			if(doit)
			setTimeout("generateOneNumber()",210);
			setTimeout("isGameOver()",300);
		}
		break;
	default:     // default
	  	break;
	}
});

document.addEventListener('touchstart',function(event){
	startx = event.touches[0].pageX;
	starty = event.touches[0].pageY;
});

document.addEventListener('touchend',function(event){
	endx = event.changedTouches[0].pageX;
	endy = event.changedTouches[0].pageY;
	
	var deltax = endx - startx;
	var deltay = endy - starty;
	
	if(Math.abs(deltax)<0.2*documentWidth && Math.abs(deltay)<0.2*documentWidth)
		return;
	if(Math.abs(deltax) > Math.abs(deltay)){
		// X
		if(deltax>0){
			//MoveRight
			if( moveRight() ){
				if(doit)
			      setTimeout("generateOneNumber()",210);
			setTimeout("isGameOver()",300);
		}
		}else{
			//MoveLeft
			if( moveLeft() ){
				if(doit)
			setTimeout("generateOneNumber()",210);
			setTimeout("isGameOver()",300);
		}
		}
	}else{
		//Y
		if(deltay>0){
			//MoveDown
			if( moveDown() ){
				if(doit)
			setTimeout("generateOneNumber()",210);
			setTimeout("isGameOver()",300);
		}
		}else{
			//moveUp
			if( moveUp() ){
				if(doit)
			setTimeout("generateOneNumber()",210);
			setTimeout("isGameOver()",300);
		}
		}
	}
});

function moveLeft(){
	if( !canmoveLeft(board) )
		return false;
		
	// moveLeft	
	for(var i=0;i<4;i++)
		for(var j=1;j<4;j++){
			if(board[i][j]!=0){
				for(var k=0;k<j;k++){
					if(board[i][k] == 0 && noBlockRow(i,k,j,board)){
						showmoveAnimation(i,j,i,k);
						board[i][k] = board[i][j];
						board[i][j] = 0;
						doit = true;
						continue;
					}else if(board[i][k] == board[i][j] && noBlockRow(i,k,j,board) && !hasadd[i][k]){
						showmoveAnimation(i,j,i,k);
						board[i][k] += board[i][j];
						board[i][j] = 0;
						score += board[i][k];
						updatescore(score);
						hasadd[i][k] = true;
						doit = true;
						continue;
					}
				}
			}
		}
	
	setTimeout("updateboardview()",200);
	return true;
}

function moveUp(){
	if( !canmoveUp(board) )
		return false;
	
	// move
	for(var i=1;i<4;i++)
		for(var j=0;j<4;j++)
		if(board[i][j] != 0){
			for(var k=0;k<i;k++)
				if(board[k][j] == 0 && noBlockRank(j,k,i,board)){
					showmoveAnimation(i,j,k,j);
					board[k][j] = board[i][j];
					board[i][j] = 0;
					doit = true;
					continue;
				}else if(board[k][j] == board[i][j] && noBlockRank(j,k,i,board) && !hasadd[k][j]){
					showmoveAnimation(i,j,k,j);
					board[k][j] += board[i][j];
					board[i][j] = 0;
					score += board[k][j];
					updatescore(score);
					hasadd[k][j] = true;
					doit = true;
					continue;
				}
		}
	
	setTimeout("updateboardview()",200);
	return true;
}

function moveRight(){
	if(!canmoveRight(board))
		return false;
	
	for(var i=0;i<4;i++)
		for(var j=2;j>=0;j--)
		if(board[i][j]!=0){
			for(var k=3;k>j;k--)
			if(board[i][k] == 0 && noBlockRow(i,j,k,board)){
				showmoveAnimation(i,j,i,k);
				board[i][k] = board[i][j];
				board[i][j] = 0;
				doit = true;
				continue;
			}else if(board[i][j] == board[i][k] && noBlockRow(i,j,k,board) && !hasadd[i][k]){
				showmoveAnimation(i,j,i,k);
				board[i][k] += board[i][j];
				board[i][j] = 0;
				score += board[i][k];
				updatescore(score);
				hasadd[i][k] = true;
				doit = true;
				continue;
			}
		}
	
	setTimeout("updateboardview()",200);
	return true;
}

function moveDown(){
	if(!canmoveDown(board))
		return false;
    
    for(var i=2;i>=0;i--)
    	for(var j=0;j<4;j++)
    		if(board[i][j]!=0){
    			for(var k=3;k>i;k--){
    			if(board[k][j] == 0 && noBlockRank(j,i,k,board) ){
    				showmoveAnimation(i,j,k,j);
    				board[k][j] = board[i][j];
    				board[i][j] = 0;
    				doit = true;
    				continue;
    			}else if(board[i][j] == board[k][j] && noBlockRank(j,i,k,board) && !hasadd[k][j]){
    				showmoveAnimation(i,j,k,j);
    				board[k][j] += board[i][j];
    				board[i][j] = 0;
    				score += board[k][j];
					updatescore(score);
					hasadd[k][j] = true;
					doit = true;
    				continue;
    			}
    		}
    		}
    			 
  setTimeout("updateboardview()",200);
    return true;
}

function isGameOver(){
	if(nospace(board) && noMove()){
		gameOver();
	}
	if(iswin()){
		youwin();
	}
}

function gameOver(){
	alert('Game Over!');
}

function updatescore(score){
	$("#score").text(score);
}

function iswin(){
	for(var i=0;i<4;i++)
		for(var j=0;j<4;j++)
		if(board[i][j] == 2048)
		return true;
	return false;
}

function youwin(){
	showWinAnimation();
}

















