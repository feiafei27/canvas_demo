window.onload=function(){

	var canvas=document.getElementById("canvas"),
		pen=canvas.getContext("2d"),
        offCanvas=document.createElement("canvas"),
        offPen=offCanvas.getContext("2d"),
        range1=document.getElementById("bei"),
        range2=document.getElementById("daxiao"),
        range1Number=1,
        range2Number=1,
        p1=document.getElementById("beiNum"),
        p2=document.getElementById("size"),
        tishi=document.getElementById("tishi"),
        button=document.getElementById("btn"),
        canvasData=null,
        data,
        length,
        rectangle={
	        x:0,
            y:0,
            width:200,
            height:200
        },
        rectangleCanZhao={
            x:0,
            y:0,
            width:200,
            height:200
        },
        bigRectangle={
            x:(rectangle.width-140)/2,
            y:(rectangle.height-140)/2,
            width:140,
            height:140
        },
        circle={
	        x:rectangle.x+rectangle.width/2,
            y:rectangle.y+rectangle.height/2,
            radius:rectangle.width/2
        },
        isDragging=false;

    //......初始化canvas的长和宽....................
	canvas.width=window.innerWidth;
	canvas.height=window.innerHeight*0.94;
	offCanvas.width=canvas.width;
	offCanvas.height=canvas.height;
	drawGrid("rgba(0,0,0,0.2)",10,10);
	tishi.style.left=(window.innerWidth-500)/2+"px";
	tishi.style.top=(window.innerHeight-300)/2+"px";

	//........function............
    function drawGrid(lineColor,stepX,stepY){
        pen.save();
        pen.strokeStyle=lineColor;
        pen.lineWidth=0.5;

        pen.beginPath();
        for(var i=0.5+stepX;i<canvas.width;i+=stepX){
            pen.moveTo(i,0);
            pen.lineTo(i,canvas.height);
        }
        for(var i=0.5+stepY;i<canvas.height;i+=stepY){
            pen.moveTo(0,i);
            pen.lineTo(canvas.width,i);
        }
        pen.stroke();
        pen.restore();
    }

    function windowToCanvas(x,y){
        var canvasBounds=canvas.getBoundingClientRect();
        return {
            x:x-canvasBounds.left,
            y:y-canvasBounds.top
        }
    }

    function upRectangle(loc){
        rectangle.x=loc.x-rectangle.width/2;
        rectangle.y=loc.y-rectangle.height/2;
        circle.x=rectangle.x+rectangle.width/2;
        circle.y=rectangle.y+rectangle.height/2;
        circle.radius=rectangle.width/2;
    }

    function upOffCanvas(){
        canvasData=pen.getImageData(rectangle.x,rectangle.y,rectangle.width,rectangle.height);
        offPen.putImageData(canvasData,0,0);
    }

    function drawOffCanvasToCanvas(){
        pen.beginPath();
        pen.save();
        pen.arc(circle.x,circle.y,circle.radius,0,Math.PI*2,false);
        pen.clip();
        pen.clearRect(0,0,canvas.width,canvas.height);
        pen.drawImage(offCanvas,bigRectangle.x,bigRectangle.y,bigRectangle.width,bigRectangle.height,rectangle.x,rectangle.y,rectangle.width,rectangle.height);
        pen.restore();
    }

    function drawGlasses(){
        pen.beginPath();
        pen.arc(circle.x,circle.y,circle.radius,0,Math.PI*2,true);
        pen.arc(circle.x,circle.y,circle.radius-10,0,Math.PI*2,false);
        pen.fillStyle="black";
        pen.fill();
    }

    function canvasResume(){
        pen.clearRect(rectangle.x,rectangle.y,rectangle.width,rectangle.height);
        pen.drawImage(offCanvas,0,0,rectangle.width,rectangle.height,rectangle.x,rectangle.y,rectangle.width,rectangle.height);
    }

    //........鼠标事件..............
    canvas.onmousedown=function (e) {
        var canvasLoc=windowToCanvas(e.clientX,e.clientY);

        upRectangle(canvasLoc);
        upOffCanvas();
        drawOffCanvasToCanvas();
        drawGlasses();

        isDragging=true;
    }

    canvas.onmousemove=function (e) {
        if(isDragging){
            var canvasLoc=windowToCanvas(e.clientX,e.clientY);
            canvasResume();
            upRectangle(canvasLoc);
            upOffCanvas();
            drawOffCanvasToCanvas();
            drawGlasses();
        }
    }

    canvas.onmouseup=function (e) {
        isDragging=false;
        canvasResume();
    }

    //........控制面板点击.............
    range1.onchange=function (e) {
        p1.innerText=range1.value;
        range1Number=range1.value;

        bigRectangle.x=(rectangle.width-140*(1/range1Number))/2;
        bigRectangle.y=(rectangle.height-140*(1/range1Number))/2;
        bigRectangle.width=140*(1/range1Number);
        bigRectangle.height=140*(1/range1Number);
    }

    range2.onchange=function (e) {
        range2Number=range2.value;

        rectangle.width=rectangleCanZhao.width*range2Number;
        rectangle.height=rectangleCanZhao.height*range2Number;
        circle.radius=rectangle.width/2;

    }

    button.onclick=function () {
        tishi.style.display="none";
    }

}