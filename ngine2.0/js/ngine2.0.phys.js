
Line.prototype=new Nject({pos:[0,0],size:1});
function Line(properties){
    this.endPos=properties.endPos;
    this.setProps(properties);
    this.setProps=function(props){
        this.endPos=props.endPos;
        this.setProps(props);
    };
    this.distTo=function(point){
        var d=diffV(point,this.getPos());
        var v=diffV(this.endPos,this.getPos());
        var proj_amount=(dot(v,d)/dot(v,v));
        if(proj_amount<0){
            return dot(d,d);
        }
        if(proj_amount>1){
            var e=diffV(point,this.endPos);
            return dot(e,e);
        }
        var d_proj=diffV(d,timesV(proj_amount,v));
        return dot(d_proj,d_proj);
    }
    this.getDist=function(nject){
        return this.distTo(nject.pos);
    }
    this.getNormal=function(point){
        var d=diffV(point,this.getPos());
        var v=diffV(this.endPos,this.getPos());
        var proj_amount=(dot(v,d)/dot(v,v));
        if(proj_amount<0){
            return normV(d);
        }
        if(proj_amount>1){
            var e=diffV(point,this.endPos);
            return normV(e);
        }
        var d_proj=diffV(d,timesV(proj_amount,v));
        return normV(d_proj);
    }
    this.draw=function(cxt){
        //cxt.fillStyle="#FF0000";
        cxt.beginPath();
        cxt.moveTo(this.getPos()[0],this.getPos()[1]);
        cxt.lineTo(this.endPos[0],this.endPos[1]);
        cxt.stroke();
    };
}

Pject.prototype=new Nject({pos: [0,0],size: 5});
function Pject(properties){
    this.vel=properties.vel;
    this.mass=properties.mass;
    this.force_func=function(x,y,vx,vy){return [0,.1]}
    //this.setPos(properties.posx,properties.posy);
    this.collide=false;
    this.setProps(properties);
    this.setProps=function(props){
        this.vel=props.vel;
        this.mass=props.mass;
        this.setProps(properties);
    };
    this.collisionFunc=function(nject){
        if(nject instanceof Pject){
            if(!this.collide && !nject.collide){
                this.collide=true;
                nject.collide=true;
                var u1=this.vel;
                var u2=nject.vel;
                var norm=normV(this.getNormal(nject.pos));
                var u1_perp=projectV(u1,norm);
                var u2_perp=projectV(u2,norm);
                var u1_tan=diffV(u1,u1_perp);
                var u2_tan=diffV(u2,u2_perp);
                u1_perp=lengthV(u1_perp);
                u2_perp=lengthV(u2_perp);
                var v1 = (u1_perp*(this.mass-nject.mass) + 2*nject.mass*u2_perp)/(this.mass+nject.mass);
                var v2 = (u2_perp*(nject.mass-this.mass) + 2*this.mass*u1_perp)/(this.mass+nject.mass);
                this.vel=sumV(timesV(v1,norm),u1_tan);
                nject.vel=sumV(timesV(v2,norm),u2_tan);
            }
        }
        else{
            var p=this.getPos();
            var v=[this.vel[0],this.vel[1]-.05];
            var u=nject.getNormal(p[0],p[1]);//[(p[0]-nject.getPos()[0]),(p[1]-nject.getPos()[1])];
            var proj_amount=((dot(v,u))/(dot(u,u)));
            var vf;
            if(proj_amount>0){
                vf=v;
            }
            else{
                vf=[
                    v[0]-2*proj_amount*u[0],
                    v[1]-2*proj_amount*u[1]
                ];
            }
            this.vel[0]=vf[0];
            this.vel[1]=vf[1]+.05;
            //p[0]=nject.getPos()[0]-(this.getSize()+nject.getSize())*u[0]/Math.sqrt(dot(u,u));
            //p[1]=nject.getPos()[1]-(this.getSize()+nject.getSize())*u[1]/Math.sqrt(dot(u,u));        
        }
    }
    this.setForces=function(forceFunc){
        this.force_func=forceFunc;
    };
    this.applyForcesHalf=function(){
        var pos=this.getPos();
        alert(pos);
        var forces=this.force_func(pos[0],pos[1],this.vel[0],this.vel[1]);
        this.vel[0]+=forces[0]/2;
        this.vel[1]+=forces[1]/2;
    }
    this.getEnergy=function(){
        return .5*(dot(this.vel,this.vel))+.1*(this.getWorld().height - this.getPos()[1]);
    }
    this.step=function(){
        this.collide=false;
        var pos=this.getPos();
        var world=this.getWorld();
        this.applyForcesHalf();
        this.setPos(sumV(pos,this.vel));
        pos=this.getPos();
        if(pos[0]>world.width||pos[0]<0){
            this.vel[0]=-this.vel[0];
            if(pos[0]<0){pos[0]=-pos[0]}
            else{pos[0]=2*world.width-pos[0]}

        }
        if(pos[1]>world.height||pos[1]<0){
            this.vel[1]=-this.vel[1];
            if(pos[1]<0){pos[1]=-pos[1]}
            else{pos[1]=world.height-(pos[1]-world.height)}

        }
        this.setPos(pos);
        
        this.applyForcesHalf();
        //alert(world.width);
        //alert(this.getSize());
    };
    this.setVel=function(vx,vy){
        this.vel[0]=vx;
        this.vel[1]=vy;
    };
    this.getVel=function(){
        return this.vel;
    }
}

