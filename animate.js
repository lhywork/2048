/**
 * Created by MEMEME on 2016/12/10.
 */
function showNumAnimate(i,j,randNum) {
    var numCell = $('#num_cell-'+i+'-'+j);
    numCell.css('background-color',getNumBgc(randNum));
    numCell.css('color',getNumColor(randNum));
    numCell.text(randNum);

    numCell.animate({
        'width' : cellWidth + 'px',
        'height' : cellWidth + 'px',
        'top' : getTop(i,j),
        'left' : getLeft(i,j)
    },50);
}

function showMoveAnimate(fromX,fromY,toX,toY) {
    var numcell = $('#num_cell-'+fromX+'-'+fromY);

    numcell.animate({
        'left' : getLeft(toX,toY),
        "top" : getTop(toX,toY)
    },200);
}