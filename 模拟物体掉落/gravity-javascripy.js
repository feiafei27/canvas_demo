var canvas=document.getElementById("canvas"),
    pen=canvas.getContext("2d"),
    gravity=9.81,
    platform_height=10,
    pixelsPerMeter=(canvas.height-canvas.height*0.2)/platform_height,
    dropStopWatch=new Stopwatch(),
    button=document.getElementById("btn"),
    lastTime=undefined,
    fps;

//.............初始化...................
canvas.width=window.innerWidth;
canvas.height=window.innerHeight;
pen.fillRect(canvas.width*0.8,canvas.height*0.2,200,40);

//.............创建Sprite初始化时使用的Painter........
var painter={
    paint:function (sprite,pen) {
        pen.beginPath();
        pen.save();
        pen.fillStyle="red";
        pen.arc(sprite.left+sprite.width/2,sprite.top+sprite.height/2,sprite.width/2,0,Math.PI*2,false);
        pen.fill();
        pen.restore();
    }
}

//............创建Sprite初始化时使用的behaviors..........
var dropBehavior={
    execute:function (sprite,pen,time) {
        fps=1000/(time-lastTime);
        if(lastTime==undefined){
            fps=60;
        }
        lastTime=time;
        sprite.velocityY=gravity*(dropStopWatch.getElapsedTime()/1000)*pixelsPerMeter;
        sprite.top+=sprite.velocityY/fps;
        sprite.left-=sprite.velocityX/fps;
        if(sprite.top>canvas.height){
            restore();
        }
    }
}

//..............恢复到初始状态...................
function restore() {
    dropSprite.left=canvas.width*0.8-dropSprite.width/2;
    dropSprite.top=canvas.height*0.2-dropSprite.width;
    dropSprite.velocityY=0;
    dropStopWatch.stop();
    lastTime=undefined;

    pen.clearRect(0,0,canvas.width,canvas.height);
    pen.fillRect(canvas.width*0.8,canvas.height*0.2,200,40);
    dropSprite.paint(pen);
}

//.............生成Sprite对象................
var dropSprite=new Sprite('dropBall',painter,[dropBehavior]);
dropSprite.width=50;
dropSprite.height=50;
dropSprite.left=canvas.width*0.8-dropSprite.width/2;
dropSprite.top=canvas.height*0.2-dropSprite.width;
dropSprite.velocityX=200;
dropSprite.velocityY=0;
dropSprite.paint(pen);

function Animate(){
    if(dropStopWatch.isRunning()){
        var nowTime=+new Date();
        pen.clearRect(0,0,canvas.width,canvas.height);
        pen.fillRect(canvas.width*0.8,canvas.height*0.2,200,40);
        //............绘制.................
        dropSprite.paint(pen);
        //............更新.................
        dropSprite.update(pen,nowTime);
        window.requestAnimationFrame(Animate);
    }
}
//............start按钮................
button.onclick=function () {
    if(!dropStopWatch.isRunning()){
        dropStopWatch.start();
        window.requestAnimationFrame(Animate);
    }
}