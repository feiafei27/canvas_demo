var Sprite=function (name,painter,behaviors) {
    if(name!==undefined){
        this.name=name;
    }
    if(painter!==undefined){
        this.painter=painter;
    }
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
    paint:function (pen) {
        if(this.visible){
            this.painter.paint(this,pen);
        }
    },
    update:function (pen,time) {
        for(var i=0;i<this.behaviors.length;i++){
            this.behaviors[i].execute(this,pen,time);
        }
    }
};
