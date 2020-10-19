Boid.prototype=new Nject({pos: [0,0],size: 5});
function Boid(properties){
    this.vel=properties.vel;
    this.setProps(properties);
    
    this.flockWeight=5;
    this.avoidWeight=1;
    this.alignWeight=1;
    this.goalWeight=5;
    this.randWeight=0;
    
    this.goalList=[];
    
    this.setProps=function(props){
        this.vel=props.vel;
        this.setProps(properties);
    };
    this.step=function(){
        var njectList=this.getWorld().getNjectsAt(this.pos,10*this.size);
        var velNew=[0,0];
        velNew=sumV(velNew,timesV(this.flockWeight,this.flockRule(njectList)));
        velNew=sumV(velNew,timesV(this.avoidWeight,this.avoidRule(njectList)));
        velNew=sumV(velNew,timesV(this.alignWeight,this.alignRule(njectList)));
        velNew=sumV(velNew,this.boundRule(njectList));
        velNew=sumV(velNew,timesV(this.goalWeight,this.goalRule(njectList)));
        velNew=sumV(velNew,timesV(this.randWeight,this.randRule(njectList)));
        this.vel=this.limitVel(sumV(this.vel,velNew));
        this.pos=sumV(this.vel,this.pos);
    }
    this.limitVel=function(vel){
        if(lengthV(vel)>3){
            return (timesV(3,timesV(1/lengthV(vel),vel)));
        }
        else{
            return vel;
        }
    }
    this.flockRule=function(njects){
        var totalBoids=0;
        var netVel=[0,0];
        for(var i=0;i<njects.length;i++){
            if((njects[i] instanceof Boid)&&(njects[i]!=this)){
                netVel=sumV(netVel,njects[i].pos);
                totalBoids++;
            }
        }
        if(totalBoids>0){
            netVel=timesV(1/totalBoids,netVel);
            return (timesV(.01,diffV(netVel,this.pos)));
        }
        else{
            return [0,0];
        }
    }
    this.avoidRule=function(njects){
        var netDisp=[0,0];
        for(var i=0;i<njects.length;i++){
            if((njects[i]!=this)){
                var dist = Math.sqrt(njects[i].getDist(this));
                if(dist<(2*this.size+njects[i].size)){
                    var magAcc=2*this.size+njects[i].size - dist;
                    netDisp = sumV(netDisp,timesV(magAcc,njects[i].getNormal(this.pos)));
                }
            }
        }
        return netDisp;
    }
    this.alignRule=function(njects){
        var totalBoids=0;
        var netVel=[0,0];
        for(var i=0;i<njects.length;i++){
            if((njects[i] instanceof Boid)&&(njects[i]!=this)){
                netVel=sumV(netVel,njects[i].vel);
                totalBoids++;
            }
        }
        if(totalBoids>0){
            netVel=timesV(1/totalBoids,netVel);
            return (timesV(1/8,diffV(netVel,this.vel)));
        }
        else{
            return [0,0];
        }
    }
    this.boundRule=function(njects){
        var retVel = [0,0];
        if(this.pos[0]<0){
            retVel[0]=10;
        }
        else if(this.pos[0]>this.getWorld().width){
            retVel[0]=-10;
        }
        if(this.pos[0]<10){
            retVel[0]=10;
        }
        else if(this.pos[0]>(this.getWorld().width-10)){
            retVel[0]=-10;
        }
        if(this.pos[1]<10){
            retVel[1]=10;
        }
        else if(this.pos[1]>(this.getWorld().width-10)){
            retVel[1]=-10;
        }
        return retVel;
    }
    this.goalRule=function(njects){
        if(this.goalList.length>0){
            var goalVec = diffV(this.goalList[0],this.pos);
            if(lengthV(goalVec)<2*this.size){
                this.goalList.shift();
            }
            return (timesV(.1,normV(goalVec)));
        }
        else{
            return [0,0];
        }
    }
    this.randRule=function(njects){
        return randV();
    }
    this.addGoal=function(newGoal){
        this.goalList.push(newGoal);
        
    }
    this.setGoal=function(newGoal){
        this.goalList=[newGoal];
    }
}

