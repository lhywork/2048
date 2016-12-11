/**
 * Created by MEMEME on 2016/12/10.
 */
var score = 0;
var board = [];
var combined = [];

$(function(){
   start();
});

function start() {
    mobileDevice();
    //初始化棋盘格
    init();
    //随机生成两个数字
    generateNum();
    generateNum();
    upDataView();
}
function mobileDevice() {
    if( documentWidth > 500 ){
        gridWidth = 500;
        cellWidth = 100;
        cellSpace = 20;
    }
    $('.grid_container').css({'width':gridWidth-2*cellSpace,'height':gridWidth-2*cellSpace,'padding':cellSpace});
    $('.grid_cell').css({'width':cellWidth,'height':cellWidth});
}
//初始化函数
function init() {
    score = 0;
    //初始化单元格的位置
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            var grid_cell = $("#grid_cell-" + i + "-" + j);
            grid_cell.css('top', getTop(i, j));
            grid_cell.css('left', getLeft(i, j));
        }
    }
    //初始化每个单元格的值为0，每个单元格都没有发生合并
    for (i = 0; i < 4; i++) {
        board[i] = [];
        combined[i] = [];
        for (j = 0; j < 4; j++) {
            board[i][j] = 0;
            combined[i][j] = false;
        }
    }
}
//重新渲染棋盘格
function upDataView() {
    $('.num_cell').remove();
    for( var i = 0; i < 4; i++ ){
        for( var j = 0; j < 4; j++ ){
            $('.grid_container').append('<div class="num_cell" id="num_cell-'+i+'-'+j+'"></div>');
            var numCell = $('#num_cell-'+ i + '-' + j);

            if(board[i][j] == 0){
                numCell.css('width','0');
                numCell.css('height','0');
                numCell.css('top',getTop(i,j)+cellWidth/2);
                numCell.css('left',getLeft(i,j)+cellWidth/2);
            }else{
                numCell.css('width',cellWidth);
                numCell.css('height',cellWidth);
                numCell.css('top',getTop(i,j));
                numCell.css('left',getLeft(i,j));
                numCell.text(board[i][j]);
                numCell.css('background-color',getNumBgc(board[i][j]));
                numCell.css('color',getNumColor(board[i][j]));
            }
            combined[i][j] = false;
        }
    }
    $('.num_cell').css({'font-size':0.6*cellWidth+'px','line-height':cellWidth+'px'});
    $('.score > span').text(score);
}
//随机生成一个位置和数字
function generateNum (){
    if(noSpace()){
        return false;
    }else {
        //生成一个随机位置
        var noNumSpace = [];
        for( var i = 0; i < 4; i++ ){
            for( var j = 0; j < 4; j++ ){
                if( board[i][j] == 0 )
                noNumSpace.push([i,j]);
            }
        }
        var randSpace = Math.floor(Math.random() * (noNumSpace.length));
        var randX = parseInt(noNumSpace[randSpace][0]);
        var randY = parseInt(noNumSpace[randSpace][1]);
        //生成一个随机数
        var randNum = Math.random() > 0.5 ? 2 : 4;

        board[randX][randY] = randNum;
        showNumAnimate(randX, randY, randNum);
        return true;
    }
}
//按下键盘事件
$(document).on('keydown',function(e){
    switch(e.keyCode){
        case 37:
            e.preventDefault();
            if(moveLeft())
                setTimeout(generateNum,200);
            isGameOver(board);
            break;
        case 38:
            e.preventDefault();
            if(moveTop())
                setTimeout(generateNum,200);
            isGameOver(board);
            break;
        case 39:
            e.preventDefault();
            if(moveRight())
                setTimeout(generateNum, 200);
            isGameOver(board);
            break;
        case 40:
            e.preventDefault();
            if(moveDown())
                setTimeout(generateNum,200);
            isGameOver(board);
            break;
        default:
            break;
    }
});
$(document).addEventListener('touchstart',function(e){
    
});
$(document).addEventListener('touchend',function(e){

});
//向左移动
function moveLeft(){
    if(canMoveLeft(board)){
        for( var i = 0; i < 4; i++ ){
            for( var j = 1; j < 4; j++ ){
                if(board[i][j]!=0) {
                    for (var k = 0; k < j; k++) {
                        if( board[i][k]==board[i][j] && noBlockRow(i,k,j) && !combined[i][k] ){
                            board[i][k] += board[i][j];
                            score += (board[i][j]) * 2;
                            board[i][j] = 0;
                            combined[i][k] = true;
                            showMoveAnimate(i,j,i,k);
                        }else if ( board[i][k] == 0 && noBlockRow(i,k,j) ){
                            board[i][k] = board[i][j];
                            board[i][j] = 0;
                            showMoveAnimate(i,j,i,k);
                        }
                    }
                }
            }
        }
        setTimeout(upDataView,200);
        return true;
    }
    return false;
}
//向右移动
function moveRight(){
    if(canMoveRight(board)){
        for( var i = 0; i < 4; i++ ){
            for( var j = 2; j >= 0; j-- ){
                if(board[i][j]!=0) {
                    for (var k = 3; k > j; k--) {
                        if( board[i][k]==board[i][j] && noBlockRow(i,j,k) && !combined[i][k] ){
                            board[i][k] += board[i][j];
                            score += (board[i][j]) * 2;
                            board[i][j] = 0;
                            combined[i][k] = true;
                            showMoveAnimate(i,j,i,k);
                        }else if ( board[i][k] == 0 && noBlockRow(i,j,k) ){
                            board[i][k] = board[i][j];
                            board[i][j] = 0;
                            showMoveAnimate(i,j,i,k);
                        }
                    }
                }
            }
        }
        setTimeout(upDataView,200);
        return true;
    }
    return false;
}
//向上移动
function moveTop(){
    if(canMoveTop(board)){
        for( var i = 1; i < 4; i++ ){
            for( var j = 0; j < 4; j++ ){
                if(board[i][j]!=0) {
                    for (var k = 0; k < i; k++) {
                        if( board[k][j]==board[i][j] && noBlockCol(j,k,i) && !combined[k][j] ){
                            board[k][j] += board[i][j];
                            score += (board[i][j]) * 2;
                            board[i][j] = 0;
                            combined[k][j] = true;
                            showMoveAnimate(i,j,k,j);
                        }else if ( board[k][j] == 0 && noBlockCol(j,k,i) ){
                            board[k][j] = board[i][j];
                            board[i][j] = 0;
                            showMoveAnimate(i,j,k,j);
                        }
                    }
                }
            }
        }
        setTimeout(upDataView,200);
        return true;
    }
    return false;
}
//向下移动
function moveDown(){
    if(canMoveDown(board)){
        for( var i = 2; i >= 0; i-- ){
            for( var j = 0; j < 4; j++ ){
                if(board[i][j]!=0) {
                    for (var k = 3; k > i; k--) {
                        if( board[k][j]==board[i][j] && noBlockCol(j,i,k) && !combined[k][j] ){
                            board[k][j] += board[i][j];
                            score += (board[i][j]) * 2;
                            board[i][j] = 0;
                            combined[k][j] = true;
                            showMoveAnimate(i,j,k,j);
                        }else if ( board[k][j] == 0 && noBlockCol(j,i,k) ){
                            board[k][j] = board[i][j];
                            board[i][j] = 0;
                            showMoveAnimate(i,j,k,j);
                        }
                    }
                }
            }
        }
        setTimeout(upDataView,200);
        return true;
    }
    return false;
}



















