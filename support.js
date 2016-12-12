/**
 * Created by MEMEME on 2016/12/10.
 */
var documentWidth = window.screen.availWidth;
var gridWidth = 0.92 * documentWidth;
var cellWidth = 0.18 * documentWidth;
var cellSpace = 0.04 * documentWidth;
function getTop(i,j) {
    return cellSpace+(cellSpace + cellWidth)*i;
}
function getLeft(i,j) {
    return cellSpace+(cellSpace + cellWidth)*j;
}
function getNumBgc(num) {
    switch(num){
        case 2: return '#eee4da'; break;
        case 4: return '#ede0c8'; break;
        case 8: return '#f3b27a'; break;
        case 16: return '#f59563'; break;
        case 32: return '#f87f64'; break;
        case 64: return '#f55c3c'; break;
        case 128: return '#edce73'; break;
        case 256: return '#ecca5f'; break;
        case 512: return '#efc851'; break;
        case 1024: return '#ecc440'; break;
        case 2048: return '#eec130'; break;
        case 4096: return '#ff3e3f'; break;
        case 8192: return '#ff1f1f'; break;
    }
    return '#ff1f1f';
}
function getNumColor(num) {
    if( num <= 4 ) return '#776e65';
    return '#fff';
}
function getFontSize(i,j){
    var $numcell = $('#num_cell-'+i+'-'+j);
    if(board[i][j] > 999){
        $numcell.css('font-size',0.4*cellWidth).removeClass('font_set');
    }else if(board[i][j] > 99){
        $numcell.css('font-size',0.45*cellWidth).removeClass('font_set');
    }
}
function noSpace() {
    for( var i = 0; i < 4; i++ ){
        for(var j = 0; j < 4; j++ ){
            if( board[i][j] == 0 ) return false;
        }
    }
    return true;
}
function canMoveLeft(arr) {
    for( var i = 0; i < 4; i++ ){
        for( var j = 1; j < 4; j++ ){
            if(arr[i][j]!=0) {
                if (arr[i][j - 1] == 0 || arr[i][j] == arr[i][j - 1])
                    return true;
            }
        }
    }
    return false;
}
function canMoveRight(arr) {
    for( var i = 0; i < 4; i++ ){
        for( var j = 2; j >= 0; j-- ){
            if(arr[i][j]!=0) {
                if (arr[i][j + 1] == 0 || arr[i][j] == arr[i][j + 1])
                    return true;
            }
        }
    }
    return false;
}
function canMoveTop(arr) {
    for( var i = 1; i < 4; i++ ){
        for( var j = 0; j < 4; j++ ){
            if(arr[i][j]!=0) {
                if (arr[i - 1][j] == 0 || arr[i][j] == arr[i - 1][j])
                    return true;
            }
        }
    }
    return false;
}
function canMoveDown(arr) {
    for( var i = 2; i >= 0; i-- ){
        for( var j = 0; j < 4; j++ ){
            if(arr[i][j]!=0) {
                if (arr[i + 1][j] == 0 || arr[i][j] == arr[i + 1][j])
                    return true;
            }
        }
    }
    return false;
}
function noBlockRow(row,small,big) {
    for( var i=small+1; i < big; i++ ){
        if(board[row][i] != 0){
            return false;
        }
    }
    return true;
}
function noBlockCol(col,small,big) {
    for( var i=small+1; i < big; i++ ){
        if(board[i][col] != 0){
            return false;
        }
    }
    return true;
}
function isGameOver(arr){
    if((canMoveLeft(arr)||canMoveRight(arr)||canMoveTop(arr)||canMoveDown(arr)) == false){
        alert('GAMEOVER!请点击START按钮重新开始')
    }
}