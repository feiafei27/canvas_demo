window.onload=function () {

    var canvas=document.getElementById("canvas"),
        pen=canvas.getContext("2d"),
        spritesheet=new Image(),
        runnerCells=[
            {left:0,top:0,width:44,height:44},
            {left:44,top:0,width:44,height:44},
            {left:88,top:0,width:44,height:44},
            {left:0,top:44,width:44,height:44},
            {left:44,top:44,width:44,height:44},
            {left:88,top:44,width:44,height:44},
            {left:0,top:88,width:44,height:44},
            {left:44,top:88,width:44,height:44},
            {left:88,top:88,width:44,height:44},
            {left:0,top:132,width:44,height:44}
        ],
        btn=document.getElementById("btn"),
        isPasued=true,
        lastTimeForRun=+new Date;

    //.........初始化...............
    spritesheet.src="./luokerun.png";
    spritesheet.onload=function () {
        pen.drawImage(spritesheet,0,0,spritesheet.width,spritesheet.height,0,0,spritesheet.width,spritesheet.height);
    }
    canvas.width=window.innerWidth;
    canvas.height=window.innerHeight*0.94;

    var Sprite=function (name,painter,behaviors) {

        this.name=name;
        this.painter=painter;
        this.behaviors=behaviors || [];

        this.top=0;
        this.left=0;
        this.width=0;
        this.height=0;
        this.velocityX=0;
        this.velocityY=0;

        this.visible=true;
        this.animating=false;

    }

    Sprite.prototype={
        paint:function(pen){
            if(this.visible==true){
                this.painter.paint(this,pen);
            }
        },
        update:function (pen,now) {
            for(var i=0;i<this.behaviors.length;i++){
                this.behaviors[i].execute(this,pen,now);
            }
        }
    }

    SpriteSheetPainter=function (cells) {
        this.cells=cells || [];
        this.cellIndex=0;
    }

    SpriteSheetPainter.prototype={
        advance:function () {
            if(this.cellIndex==this.cells.length-1){
                this.cellIndex=0;
            }else{
                this.cellIndex++;
            }
        },
        paint:function (sprite,pen) {
            var cell=this.cells[this.cellIndex];
            pen.drawImage(spritesheet,cell.left,cell.top,cell.width,cell.height,sprite.left,sprite.top,sprite.width,sprite.height);
        }
    }

    var leftToRight={
        execute:function (sprite,pen,now) {
            var thisRunX=sprite.velocityX/(1000/(now-lastTimeForRun));
            sprite.left+=thisRunX;
            if(sprite.left>=canvas.width){
                sprite.left=0;
            }
        }
    }

    var runInPlace={
        execute:function (sprite,pen,now) {
            if((now-lastTimeForRun)>80){
                sprite.painter.advance();
                lastTimeForRun=now;
            }
        }
    }

    obj=new Sprite("luoke",new SpriteSheetPainter(runnerCells),[runInPlace,leftToRight]);
    obj.top=canvas.height/2-100;
    obj.width=spritesheet.width/3;
    obj.height=spritesheet.height/4;
    obj.velocityX=50;

    function Animate(){
        if(!isPasued){
            var now=+new Date;
            pen.clearRect(0,0,canvas.width,canvas.height);
            pen.drawImage(spritesheet,0,0,spritesheet.width,spritesheet.height,0,0,spritesheet.width,spritesheet.height);
            obj.paint(pen);
            obj.update(pen,now);
            window.requestAnimationFrame(Animate);
        }
    }

    window.requestAnimationFrame(Animate);

    btn.onclick=function(){
        if(isPasued==true){
            isPasued=false;
            btn.innerText="stop";
            window.requestAnimationFrame(Animate);
        }else{
            isPasued=true;
            btn.innerText="start";
        }
    }

}
