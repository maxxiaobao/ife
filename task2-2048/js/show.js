function showNumberWithAnimation(i,j,num){
	var theNumberCell = $('#number-cell-'+i+'-'+j);
	
	theNumberCell.css("background-color",getBackgroundColor(num));
	theNumberCell.css("color",getColor(num));
	theNumberCell.text(num);
	
	theNumberCell.animate({
		width:cellSideLength,
		height:cellSideLength,
		top:getTop(i,j),
		left:getLeft(i,j)
	},50);
}

function showmoveAnimation(fromx,fromy,tox,toy){
	var numberCell = $('#number-cell-'+fromx+'-'+fromy);
	numberCell.animate({
		top:getTop(tox,toy),
		left:getLeft(tox,toy)
	},200);
}

function showWinAnimation(){
	var winner = $("#win");
	winner.css('font-size',cellSideLength);
	winner.animate({
		top:getTop(0,1)/2+cellSpace,
		left:getLeft(0,1)/2+cellSpace,
		width:2*cellSideLength,
		height:6*cellSideLength,
		padding:cellSpace,
		display:block
	},200);
}
