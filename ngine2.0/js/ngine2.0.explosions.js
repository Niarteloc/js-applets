var fireGrad=[[255,255,255,1],[255,191,0,1],[255,95,0,1],[63,63,63,0]];
var fireSmokeGrad=[[255,255,255,1],[255,191,0,1],[255,95,0,1],[63,63,63,.5],[63,63,63,0]];

function colorFromGradient(curTime,totTime,gradPoints){
    var percent=curTime/totTime;
    var r,g,b,a;
    for(var i=0;i<gradPoints.length-1;i++){
        var interval=1-(i+1)/gradPoints.length;
        if(percent>=interval){
            var c1=gradPoints.length*(percent-interval);
            var c2=1-c1;
            r=c1*gradPoints[i][0]+c2*gradPoints[i+1][0];
            g=c1*gradPoints[i][1]+c2*gradPoints[i+1][1];
            b=c1*gradPoints[i][2]+c2*gradPoints[i+1][2];
            a=c1*gradPoints[i][3]+c2*gradPoints[i+1][3];
            return [Math.floor(r),Math.floor(g),Math.floor(b),a];
        }
    }
    return gradPoints[gradPoints.length-1];
}

function Smoke(pos,size,time,growth){
    this.size=size;
    this.pos=pos;
    this.time=time;
    this.step=function(){
        this.size=this.size+growth;
        this.time--;
        if(this.time<=0){
            return 1;
        }
        else{
            return 0;
        }
    }
    this.draw=function(cxt,alpha){
            var rgba=colorFromGradient(this.time, time, fireSmokeGrad);
            
            cxt.fillStyle="rgba("+rgba[0]+","+rgba[1]+","+rgba[2]+","+rgba[3]*alpha+")";
            cxt.beginPath();
            cxt.arc(pos[0],pos[1],this.size/2,0,Math.PI*2,true);
            cxt.closePath();
            cxt.fill();

            //cxt.fillRect(this.pos[0]-this.size/2,this.pos[1]-this.size/2,this.size,this.size);
    }
}

function Parts(pos,vel,force){
    this.pos=pos;
    this.vel=vel;
    this.step=function(){
        this.pos=sumV(this.pos,this.vel);
        this.vel=sumV(this.vel,force);
    }
    this.draw=function(cxt){
        cxt.fillRect(this.pos[0],this.pos[1],2,2);
    }
}

function Debris(pos,vel,size,rotation,angSpeed,force){
    this.pos=pos;
    this.vel=vel;
    this.size=size;
    this.rotation=rotation;
    this.angSpeed=angSpeed;
    var bounds=[];
    var smokes=[];
    var lifetime=0;
    for(var i = 0;i<12;i++){
        var pointpos=[this.size*Math.cos(i*2*Math.PI/12)*Math.random()/2,this.size*Math.sin(i*2*Math.PI/12)*Math.random()/2];
        bounds.push(pointpos);
    }
    this.step=function(){
        lifetime++;
        this.pos=sumV(this.pos,this.vel);
        this.vel=sumV(this.vel,force);
        this.rotation=this.rotation+this.angSpeed;
        if(this.rotation>2*Math.PI){
            this.rotation=this.rotation-(2*Math.PI);
        }
        else if(this.rotation<0){
            this.rotation=this.rotation+(2*Math.PI);
        }
        if(lifetime%1==0){
            smokes.push(new Smoke(this.pos,this.size/4,10,.5));
        }
        for(var i=smokes.length-1;i>=0;i--){
            if(smokes[i].step()){
                smokes.splice(i,1);
            }
        }
    }
    this.draw=function(cxt,a){
        cxt.save();
        for(var i=0;i<smokes.length;i++){
            smokes[i].draw(cxt,a);
        }
        cxt.restore();
        cxt.beginPath();
        var x_rot=Math.cos(this.rotation);
        var y_rot=Math.sin(this.rotation);
        cxt.moveTo(this.pos[0]+x_rot*bounds[bounds.length-1][0]-y_rot*bounds[bounds.length-1][1]
                  ,this.pos[1]+x_rot*bounds[bounds.length-1][1]+y_rot*bounds[bounds.length-1][0]);
        for(var i=0;i<bounds.length;i++){
            cxt.lineTo(this.pos[0]+x_rot*bounds[i][0]-y_rot*bounds[i][1],
                       this.pos[1]+x_rot*bounds[i][1]+y_rot*bounds[i][0]);      
        }
        cxt.fill();
        
    }
}

Explosion.prototype = new Nject({pos:[0,0],size:1});
function Explosion(properties){
    this.time=properties.time;
    this.numParts=properties.numParts;
    this.numDebris=properties.numDebris;
    this.numSmoke=properties.numSmoke;
    this.explosionDirection=properties.dir;
    this.startTime=properties.time;
    this.force=properties.force;
    this.debSize=properties.debSize;
    var debris=[];
    var parts=[];
    var smoke=[];
    this.setProps(properties);
    for(var i=0;i<this.numDebris;i++){
        var randAng=Math.random();
        debris.push(new Debris(this.getPos(),sumV(this.explosionDirection,[Math.cos(randAng*2*Math.PI),Math.sin(randAng*2*Math.PI)]),
            1.25*this.debSize,0,Math.random()/5,this.force));
    }
    for(var i=0;i<this.numParts;i++){
        var randAng=Math.random();
        parts.push(new Parts(this.getPos(),sumV(this.explosionDirection,timesV(Math.random()+.5,[2*Math.cos(randAng*2*Math.PI),2*Math.sin(randAng*2*Math.PI)])),this.force));
    }
    this.step=function(){
        if(this.startTime-this.time<10){
            for(var i=0;i<this.numSmoke;i++){
                smoke.push(new Smoke(sumV(this.getPos(),timesV(Math.random()*this.getSize(),randV())),this.getSize()/4,20,this.getSize()/8));
            }
        }
        for(var i=0;i<debris.length;i++){
            debris[i].step();
        }
        for(var i=0;i<parts.length;i++){
            parts[i].step();
        }
        for(var i=smoke.length-1;i>=0;i--){
            if(smoke[i].step()){
                smoke.splice(i,1);
            }
        }
        this.time--;
        if(this.time<0){
            this.getWorld().removeNject(this);
        }
    }
    this.draw=function(cxt){
        for(var i=0;i<smoke.length;i++){
            smoke[i].draw(cxt,1);
        }

        var r,g,b,a;
        r=Math.floor(.5*255);
        g=Math.floor(.5*255);
        b=Math.floor(.5*255);
        var color;
        if(this.time<10){
            a=this.time/10;
        }
        else{
            a=1;
        }
        cxt.fillStyle="rgba("+r+","+g+","+b+","+a+")";
        for(var i=0;i<debris.length;i++){
            debris[i].draw(cxt,a);
        }
        
        if(this.time/this.startTime>=.667){
            var c1=3*((this.startTime-this.time)/this.startTime);
            var c2=1-c1;
            r=Math.floor(c1*255 + c2*255);
            g=Math.floor(c1*191 + c2*255);
            b=Math.floor(c1*0   + c2*255);
        }
        else if(this.time/this.startTime>=.333){
            var c1=3*((this.startTime-this.time)/this.startTime - .333);
            var c2=1-c1;
            r=Math.floor(c1*255 + c2*255);
            g=Math.floor(c1*95 + c2*191);
            b=Math.floor(c1*0   + c2*0);
        }
        else{
            var c2=3*this.time/this.startTime;
            var c1=1-c2;
            r=Math.floor(c1*63 + c2*255);
            g=Math.floor(c1*63 + c2*95);
            b=Math.floor(c1*63   + c2*0);

        }
        var rgba=colorFromGradient(this.time, this.startTime, [[255,255,255,1],[255,191,0,1],[255,95,0,1],[63,63,63,0]]);
        r=Math.floor(rgba[0]);
        g=Math.floor(rgba[1]);
        b=Math.floor(rgba[2]);
        //r=Math.floor(rgba[3]);

        cxt.fillStyle="rgba("+r+","+g+","+b+","+a+")";
        for(var i=0;i<parts.length;i++){
            parts[i].draw(cxt);
        }
    }
}