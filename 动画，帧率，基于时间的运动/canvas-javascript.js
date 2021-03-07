window.onload=function () {

    var canvas=document.getElementById("canvas"),
        pen=canvas.getContext("2d"),
        Circles={
            number:250,
            CirclesArray:[]
        },
        lastTime=(+new Date),
        now,
        fps,
        lastUpTime=0,
        xianshiFps,
        timeDiffer;

    //..........初始化....................
    canvas.width=window.innerWidth;
    canvas.height=window.innerHeight;

    var Circle=function () {
        this.x=Math.random()*canvas.width;
        this.y=Math.random()*canvas.height;
        this.randius=Math.random()*10;
        this.fillColor=new Color();
        this.strokeColor=new Color();
        this.secondX=(Math.random()-0.5)*150;
        this.secondY=(Math.random()-0.5)*150;
    }

    var Color=function () {
        this.r=Math.floor(Math.random()*255);
        this.g=Math.floor(Math.random()*255);
        this.b=Math.floor(Math.random()*255);
        this.rgba="rgba("+this.r+","+this.g+","+this.b+",0.6)";
    }

    for(var i=0;i<Circles.number;i++){
        Circles.CirclesArray.push(new Circle());
    }

    function getFPS() {
        now=(+new Date);
        fps=Math.floor(1000/(now-lastTime));
        timeDiffer=(now-lastTime)/1000;
        console.log(timeDiffer);
        lastTime=now;
    }

    function drawCircles() {
        var circle,
            Array=Circles.CirclesArray,
            length=Array.length;
        getFPS();
        if((now-lastUpTime)>500){
            xianshiFps=fps;
            lastUpTime=now;
        }
        for(var i=0;i<length;i++){
            circle=Array[i];
            pen.beginPath();
            pen.save();
            pen.fillStyle=circle.fillColor.rgba;
            pen.strokeStyle=circle.strokeColor.rgba;
            pen.arc(circle.x,circle.y,circle.randius,0,Math.PI*2,false);
            pen.fill();
            pen.stroke();
            pen.restore();

            var distanceX=timeDiffer*circle.secondX;
            var distanceY=timeDiffer*circle.secondY;
            if(circle.x+distanceX+circle.randius/2>canvas.width || circle.x+distanceX-circle.randius/2<0){
                circle.secondX=-circle.secondX;
                distanceX=-distanceX;
            }
            if(circle.y+distanceY+circle.randius/2>canvas.height || circle.y+distanceY-circle.randius/2<0){
                circle.secondY=-circle.secondY;
                distanceY=-distanceY;
            }
            circle.x+=distanceX;
            circle.y+=distanceY;
        }
        pen.save();
        pen.fillStyle="white";
        pen.font="30px a";
        pen.fillText(xianshiFps+"FPS",40,40);
        pen.restore();
    }

    function Animate() {
        pen.clearRect(0,0,canvas.width,canvas.height);
        drawCircles();
        window.requestAnimationFrame(Animate);
    }
    window.requestAnimationFrame(Animate);

}





