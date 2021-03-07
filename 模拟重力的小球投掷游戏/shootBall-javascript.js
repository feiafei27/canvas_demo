/*
    程序逻辑:数理模型--->
    sprite.velocityX,sprite.velocityY,--->
    本帧要移动的像素数--->
    更新sprite.top,sprite.left.
 */

var canvas=document.getElementById("canvas"),
    pen=canvas.getContext("2d"),
    lastTime=undefined,
    fps,
    isDragging=false,
    shootBallStopWatch=new Stopwatch(),
    gamePlatformWidth=20,
    pixelsPerMeter=canvas.width/gamePlatformWidth,//用于米到像素的转换.   一米对应多少像素。
    meterPerPixels=gamePlatformWidth/canvas.width,//用于像素到米的转换。  一像素对应多少米。
    gravity=9.81,
    thisStepX,
    thisStepY,
    mouseLocation,
    ballStartCenter,
    velocityOut=document.getElementById("velocityOut"),
    angleOut=document.getElementById("angleOut"),
    score=0,
    boxLoc={
        left:window.innerWidth*(Math.random()/2+0.5-0.1),
        top:window.innerHeight*0.88,
        width:150,
        height:100,
    },
    introduce=document.getElementById("introduce"),
    btn=document.getElementById("qbtn"),
    timeNumber=5,
    end=document.getElementById("end"),
    end_btn=document.getElementById("end-btn");

//.............初始化..............
canvas.width=window.innerWidth;
canvas.height=window.innerHeight;
introduce.style.left=canvas.width/2-200+"px";
pen.save();
pen.beginPath();
pen.fillStyle="rgba(0,0,255,0.6)";
pen.fillRect(canvas.width*0.1,canvas.height*0.9,150,30);
pen.fillRect(boxLoc.left,boxLoc.top,150,100);
pen.restore();
pen.font="30px a";
pen.fillText("剩余次数:"+timeNumber,20,170);
pen.fillText("当前的成绩为:"+score,20,220);

//............生成Painter对象............
var painter={
    paint:function (sprite,pen) {
        pen.beginPath();
        pen.arc(sprite.left+sprite.width/2,sprite.top+sprite.height/2,sprite.width/2,0,Math.PI*2,false);
        pen.fill();
    }
}

//...........生成behaviors对象..........
var shootBallBehavior={
    execute:function (sprite,pen,nowTime) {
        //........得出每一帧时相应的帧率..............
        fps=lastTime==undefined? 60:1000/(nowTime-lastTime);
        lastTime=nowTime;
        //.......利用v=v0+at,计算出速度..........
        sprite.velocityY+=gravity*(shootBallStopWatch.getElapsedTime()/1000)*pixelsPerMeter;
        //.......计算出这一帧要移动的像素数.............
        thisStepX=sprite.velocityX/fps;
        thisStepY=sprite.velocityY/fps;
        //.......更新坐标.............
        sprite.left+=thisStepX;
        sprite.top+=thisStepY;
    }
}

//...........工具函数...................
function upInfoAndSprite(ballCenterLoc,mouseLoc) {
    //...........先计算出线的长度和表示角度的二个向量..............
    var lineLength=Math.sqrt(Math.pow(mouseLoc.x-ballCenterLoc.x,2)+Math.pow(mouseLoc.y-ballCenterLoc.y,2));
    var vectorA={
        x:mouseLoc.x-ballCenterLoc.x,
        y:mouseLoc.y-ballCenterLoc.y
    };
    var vectorB={
        x:100,
        y:0
    };
    var cosAngle=(vectorA.x*vectorB.x+vectorA.y*vectorB.y)/(100*Math.sqrt(Math.pow(vectorA.x,2)+Math.pow(vectorA.y,2)));
    //.........相应的弧度值...............
    var radian=Math.acos(cosAngle);
    //.........upInfo...................
    angleOut.innerText=Math.floor(radian*(180/Math.PI)*100)/100;
    velocityOut.innerText=Math.floor(lineLength*meterPerPixels);
    //.........upSprite.................
    shootBallSprite.velocityX=Math.cos(radian)*lineLength*2;
    shootBallSprite.velocityY=-(Math.sin(radian)*lineLength)*2;
}

function restore() {
    pen.clearRect(0,0,canvas.width,canvas.height);
    pen.fillText("剩余次数:"+timeNumber,20,170);
    pen.fillText("当前的成绩为:"+score,20,220);
    //.........刷新盒子的位置...................
    boxLoc.left=window.innerWidth*(Math.random()/2+0.5-0.1);
    pen.save();
    pen.beginPath();
    pen.fillStyle="rgba(0,0,255,0.6)";
    pen.fillRect(canvas.width*0.1,canvas.height*0.9,150,30);
    pen.fillRect(boxLoc.left,boxLoc.top,150,100);
    pen.restore();

    shootBallSprite.left=canvas.width*0.1+75-shootBallSprite.width/2;
    shootBallSprite.top=canvas.height*0.9-shootBallSprite.height;
    shootBallSprite.paint(pen);

    shootBallSprite.velocityX=0;
    shootBallSprite.velocityY=0;
    //.......下一步很关键..............
    lastTime=undefined;

    if(timeNumber==0){
        end.style.display="flex";
    }
}

//...........生成精灵..................
var shootBallSprite=new Sprite('shootBallSprite',painter,[shootBallBehavior]);
shootBallSprite.width=40;
shootBallSprite.height=shootBallSprite.width;
shootBallSprite.left=canvas.width*0.1+75-shootBallSprite.width/2;
shootBallSprite.top=canvas.height*0.9-shootBallSprite.height;
shootBallSprite.paint(pen);

ballStartCenter={
    x:shootBallSprite.left+shootBallSprite.width/2,
    y:shootBallSprite.top+shootBallSprite.height/2
}

function Animate(){
    if(shootBallStopWatch.isRunning()){
        var nowTime=+new Date();
        //..........清屏...............
        pen.clearRect(0,0,canvas.width,canvas.height);
        //..........绘制平台和盒子..........
        pen.fillText("剩余次数:"+timeNumber,20,170);
        pen.fillText("当前的成绩为:"+score,20,220);
        pen.save();
        pen.beginPath();
        pen.fillStyle="rgba(0,0,255,0.6)";
        pen.fillRect(canvas.width*0.1,canvas.height*0.9,150,30);
        pen.fillRect(boxLoc.left,boxLoc.top,150,100);
        pen.restore();
        shootBallSprite.update(pen,nowTime);
        shootBallSprite.paint(pen);
        if (shootBallSprite.left>canvas.width || shootBallSprite.top>canvas.height){
            shootBallStopWatch.stop();
            restore();
        }else if(shootBallSprite.velocityY>0 && shootBallSprite.top>boxLoc.top && (shootBallSprite.left>boxLoc.left+30  && shootBallSprite.left<boxLoc.left+110)){
            shootBallStopWatch.stop();
            score+=2;
            restore();
        }else{
            window.requestAnimationFrame(Animate);
        }
    }
}

//...........鼠标事件..................
canvas.onmousedown=function (e) {
    if(!shootBallStopWatch.isRunning()){
        isDragging=true;
        mouseLocation=windowToCanvas(e.clientX,e.clientY);
        pen.beginPath();
        pen.save();
        pen.strokeStyle="rgba(0,0,0,0.6)";
        pen.moveTo(ballStartCenter.x,ballStartCenter.y);
        pen.lineTo(mouseLocation.x,mouseLocation.y);
        pen.stroke();
        pen.restore();
        //..........维护信息窗口和Sprite对象的属性............
        upInfoAndSprite(ballStartCenter,mouseLocation);
    }
}

canvas.onmousemove=function (e) {
    if (isDragging){
        mouseLocation=windowToCanvas(e.clientX,e.clientY);
        //..........清屏...............
        pen.clearRect(0,0,canvas.width,canvas.height);
        //..........绘制平台和盒子..........
        pen.save();
        pen.beginPath();
        pen.fillStyle="rgba(0,0,255,0.6)";
        pen.fillRect(canvas.width*0.1,canvas.height*0.9,150,30);
        pen.fillRect(boxLoc.left,boxLoc.top,150,100);
        pen.restore();
        //.........绘制小球精灵...............
        shootBallSprite.paint(pen);
        //.........画线.................
        pen.beginPath();
        pen.save();
        pen.strokeStyle="rgba(0,0,0,0.6)";
        pen.moveTo(ballStartCenter.x,ballStartCenter.y);
        pen.lineTo(mouseLocation.x,mouseLocation.y);
        pen.stroke();
        pen.restore();

        upInfoAndSprite(ballStartCenter,mouseLocation);
        pen.fillText("剩余次数:"+timeNumber,20,170);
        pen.fillText("当前的成绩为:"+score,20,220);
    }
}

canvas.onmouseup=function () {
    isDragging=false;
    //........松开鼠标的同时，开始计时并进入模拟物理的动画循环之中...............
    shootBallStopWatch.start();
    window.requestAnimationFrame(Animate);
    if(timeNumber>0){
        timeNumber--;
    }
    pen.fillText("剩余次数:"+timeNumber,20,170);
    pen.fillText("当前的成绩为:"+score,20,220);
}

btn.onclick=function () {
    introduce.style.display="none";
}

end_btn.onclick=function () {
    end.style.display="none";
    timeNumber=5;
    score=0;
    pen.clearRect(0,0,canvas.width,canvas.height);
    //..........绘制平台和盒子..........
    pen.save();
    pen.beginPath();
    pen.fillStyle="rgba(0,0,255,0.6)";
    pen.fillRect(canvas.width*0.1,canvas.height*0.9,150,30);
    pen.fillRect(boxLoc.left,boxLoc.top,150,100);
    pen.restore();
    //.........绘制小球精灵...............
    shootBallSprite.paint(pen);
    pen.fillText("剩余次数:"+timeNumber,20,170);
    pen.fillText("当前的成绩为:"+score,20,220);
}