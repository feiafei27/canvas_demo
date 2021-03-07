//.........位置转换工具函数..............
function windowToCanvas(x,y){
    var canvasBounds=canvas.getBoundingClientRect();
    return {
        x:x-canvasBounds.left,
        y:y-canvasBounds.top
    }
}