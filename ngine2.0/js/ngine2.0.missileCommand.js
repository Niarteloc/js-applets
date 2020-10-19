Missile.prototype=new Nject({pos:[0,0],size:1});
function Missile(properties){
    this.setProps(properties);
    this.target=properties.target;
    var dirVec=(diffV(properties.target,this.getPos()));
    this.vel=timesV(properties.speed,normV(dirVec));
    var smoke=[];
    this.setProps=function(properties){
        this.setProps(properties);
        this.target=properties.target;
        var dirVec=(diffV(properties.target,this.getPos()));
        this.vel=timesV(properties.speed,normV(dirVec));
    }
    this.collisionFunc=function(nject){
        if(nject instanceof Explosion){
            if((nject.startTime-nject.time) <= 30 ){
                this.world.removeNject(this);
                this.world.addNject(new Explosion({pos:this.pos,size:this.getSize()*6.67,debSize:this.getSize()*2,numDebris:10,numParts:40,numSmoke:1,time:100,dir:timesV(.5,this.vel),force:[0,.1]}));
            }
        }
    }
    this.step=function(){
        if(this.distTo(this.target)<=dot(this.vel,this.vel)){
            this.world.addNject(new Explosion({pos:this.pos,size:this.getSize()*6.67,debSize:this.getSize()*2,numDebris:10,numParts:40,numSmoke:1,time:100,dir:timesV(.5,this.vel),force:[0,.1]}));
            this.world.removeNject(this);
        }
        else if(this.pos[1]>this.world.height){
            this.world.addNject(new Explosion({pos:this.pos,size:20,debSize:this.getSize()*2,numDebris:3,numParts:40,numSmoke:1,time:60,dir:[this.vel[0],-this.vel[1]],force:[0,.1]}));
            this.world.removeNject(this);
        }
        else{
            this.pos=sumV(this.pos,this.vel);
            smoke.push(new Smoke(this.pos,this.getSize()*2/3,10,.5));
            for(var i=smoke.length-1;i>=0;i--){
                if(smoke[i].step()){
                    smoke.splice(i,1);
                }
            }
        }
    }
    this.draw=function(cxt){
        for(var i=0;i<smoke.length;i++){
            smoke[i].draw(cxt,1);
        }
        cxt.fillStyle="rgb(63,63,63)";
        cxt.beginPath();
        cxt.arc(this.pos[0],this.pos[1],this.size,0,2*Math.PI,true);
        cxt.closePath();
        cxt.fill();
    }
}



function initializeMissileCommand(cxt,cvs){
    var world=new Ngine(cxt,400,400,"#222222");
    var UI=new Interface(cvs);
    UI.mouseMove=function(e){
        var xy=UI.getMouseXY(e);
    }
    var side=1;
    UI.click=function(e){
        var xy=UI.getMouseXY(e);
        var missile = new Missile({pos:[200+side*200,380],size:3,target:xy,speed:7});
        missile.setWorld(world);
        world.addNject(missile);
        side*=-1;
    }
    var time=0;
    var missileTime=30;
    world.step=function(){
        world.defaultStep();
        time++;
        if(time>=missileTime){
            time=0;
            world.addNject(new Missile({pos:[400*Math.random(),0],size:3,target:[400*Math.random(),425],speed:3}));
        }
    }
    return world;
}