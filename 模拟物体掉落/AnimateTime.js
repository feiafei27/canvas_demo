Stopwatch=function () {
    this.startTime=0;
    this.running=false;
    this.elapsed=undefined;
}
Stopwatch.prototype={

    start:function () {
        this.startTime=+new Date();
        this.elapsed=undefined;
        this.running=true;
    },
    stop:function () {
        this.elapsed=(+new Date())-this.startTime;
        this.running=false;
    },
    getElapsedTime:function () {
        if(this.running){
            return (+new Date())-this.startTime;
        }else{
            return this.elapsed;
        }
    },
    isRunning:function () {
        return this.running;
    },
    reset:function () {
        this.elapsed=0;
    }
}

AnimationTimer=function (duration) {
    this.duration=duration;
    this.stopwatch=new Stopwatch();
}
AnimationTimer.prototype={
    start:function () {
        this.stopwatch.start();
    },
    stop:function () {
        this.stopwatch.stop();
    },
    getElapsedTime:function () {
        var elapsedTime=this.stopwatch.getElapsedTime();

        if(!this.stopwatch.running){
            return undefined;
        }else{
            return elapsedTime;
        }
    },
    isRunning:function () {
        return this.stopwatch.isRunning();
    },
    isOver:function () {
        return this.stopwatch.getElapsedTime()>this.duration;
    }
}