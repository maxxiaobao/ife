documentWidth = window.screen.availWidth;
gridcontainerWidth = 0.92 * documentWidth;
cellSideLength = 0.18 * documentWidth;
cellSpace = 0.04 * documentWidth;

function getTop(i,j){
	return cellSpace + i*(cellSpace + cellSideLength);
}

function getLeft(i,j){
	return cellSpace + j*(cellSpace + cellSideLength);
}

function nospace(board){
	for(var i = 0 ; i < 4 ; i ++)
		for(var j = 0;j < 4 ; j++)
			if(board[i][j] == 0)
			return false;
			
	return true;
}

function getBackgroundColor(num){
	switch(num){
		case 2:return "#eee4da";break;
        case 4:return "#ede0c8";break;
        case 8:return "#f2b179";break;
        case 16:return "#f59563";break;
        case 32:return "#f67c5f";break;
        case 64:return "#f65e3b";break;
        case 128:return "#edcf72";break;
        case 256:return "#edcc61";break;
        case 512:return "#9c0";break;
        case 1024:return "#33b5e5";break;
        case 2048:return "#09c";break;
        case 4096:return "#a6c";break;
        case 8192:return "#93c";break;
	}
	
	return "black";
}

function getColor(num){
	if(num <= 4)
		return "#776e65";
	
	 return "white";
}


function canmoveLeft(board){
	for(var i=0;i<4;i++)
		for(var j=1;j<4;j++){
			if(board[i][j-1] == 0 || board[i][j] == board[i][j-1])
				return true;
		}
		
    return false;
}

function canmoveUp(board){
	for(var i=1;i<4;i++)
		for(var j=0;j<4;j++)
			if(board[i-1][j] == 0 || board[i-1][j] == board[i][j])
			return true;
	
	return false;
}

function canmoveRight(board){
	for(var i=0;i<4;i++)
		for(var j=0;j<3;j++)
			if(board[i][j+1] == 0 || board[i][j] == board[i][j+1])
			return true;
    return false;
}

function canmoveDown(board){
	for(var i=0;i<3;i++)
		for(var j=0;j<4;j++)
			if(board[i+1][j] == 0 || board[i][j] == board[i+1][j])
			return true;
	return false;
}

function noBlockRow(row,col1,col2,board){
	for(var i=col1+1;i<col2;i++)
		if(board[row][i]!=0)
		return false;
    return true;
}

function noBlockRank(rank,col1,col2,board){
	for(var i=col1+1;i<col2;i++)
		if(board[i][rank]!=0)
		return false;
	return true;
}

function noMove(){
	if(canmoveUp(board) ||
	   canmoveDown(board) ||
	   canmoveLeft(board) ||
	    canmoveRight(board))
	return false;
	
	return true;
}


















