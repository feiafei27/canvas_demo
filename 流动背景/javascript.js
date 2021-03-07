window.onload=function () {

    var canvas=document.getElementById("canvas"),
        pen=canvas.getContext("2d"),
        btn=document.getElementById("btn"),
        img=new Image(),
        pasused=true,
        lastTime=0,
        fps=0,

        secondX=100,
        hasOffset=0,
        thisTranslateX=0;

    canvas.width=1005;
    canvas.height=722;

    function Animate(){
        if(!pasused){
            var now=+new Date;
            pen.clearRect(0,0,canvas.width,canvas.height);
            upFPS(now);
            drawImage();
            window.requestAnimationFrame(Animate);
        }
    }

    function upFPS(n){
        fps=1000/(n-lastTime);
        lastTime=n;
    }

    function drawImage(){
        thisTranslateX=secondX/fps;
        hasOffset=(hasOffset+thisTranslateX>=canvas.width)? 0:hasOffset+thisTranslateX;
        pen.save();
        pen.translate(-hasOffset,0);
        pen.drawImage(img,0,0,img.width,img.height,0,0,canvas.width,canvas.height);
        pen.drawImage(img,0,0,img.width,img.height,canvas.width-1,0,canvas.width,canvas.height);
        pen.restore();
    }

    //..........初始化...................
    img.src="./xingkong.jpg";
    img.onload=function () {
        pen.drawImage(img,0,0,img.width,img.height,0,0,canvas.width,canvas.height);
        pen.drawImage(img,0,0,img.width,img.height,canvas.width,0,canvas.width,canvas.height);
    }

    //.........控制事件................
    btn.onclick=function () {
        if(pasused){
            pasused=false;
            btn.innerText="stop"
            lastTime=+new Date;
            window.requestAnimationFrame(Animate);
        }else{
            pasused=true;
            btn.innerText="start";
        }
    }

}
