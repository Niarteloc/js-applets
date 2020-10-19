Ragdoll.prototype = new Nject({pos:[0,0],size:1});
function Ragdoll(properties){
    this.setProps(properties);
    this.f=0;
    this.points=[[[50,50],[50,50]],
                [[50,65],[50,65]],
                [[55,60],[55,60]],
                [[55,65],[55,65]],
                [[45,60],[45,60]],
                [[45,65],[45,65]],
                [[55,70],[55,70]],
                [[45,70],[45,70]],
                [[55,75],[55,70]],
                [[45,75],[45,75]]];
    this.constraints=[[0,1,15],
                      [0,2,7],[0,4,7],[2,3,7],[4,5,7],
                      [1,6,10],[6,7,10],[1,8,10],[8,9,10]];
    this.checkCollision = function(nject){
        var minDist=-1;
        for(var i in this.constraints){
            var c = this.constraints[i];
            var dist = nject.distTo([this.points[c[0]],this.points[c[1]]]);
            if(minDist<0){
                minDist = dist;
            }
            else if(minDist>dist){
                minDist = dist;
            }
        }
        if(minDist<=(this.size*this.size+nject.getSize()*nject.getSize())){
            this.collisionFunc(nject);
        }
    }
    this.distTo=function(pos){
        if(!pos[0].length){
            var minDist=-1;
            for(var i in this.constraints){
                var c = this.constraints[i];
                var dist = lineToPointFunc(this.points[c[0]],this.points[c[1]],pos);
                dist = dot(dist,dist);
                if(minDist<0){
                    minDist = dist;
                }
                else if(minDist>dist){
                    minDist = dist;
                }
            }
            return minDist;
        }
        else{
            var minDist=-1;
            for(var i in this.constraints){
                var c = this.constraints[i];
                var dist = lineToLineFunc(this.points[c[0]],this.points[c[1]],pos[0],pos[1]);
                dist = dot(dist,dist);
                if(minDist<0){
                    minDist = dist;
                }
                else if(minDist>dist){
                    minDist = dist;
                }
            }
            return minDist;
        }
    }
    this.collisionFunc=function(nject){
        for(var i in this.constraints){
            var c = this.constraints[i];
            var normal = nject.getNormal([this.points[c[0]],this.points[c[1]]]);
            var dist = nject.getDist([this.points[c[0]],this.points[c[1]]]);
            if(dist<=(this.size*this.size+nject.getSize()*nject.getSize())){
                //Leaving here for tonight:
                //Currently wrong, need to change to point-by-point collision
                //line checks for collision with points; if detected, line moves back
                //and pushes point back. This guarantees that the collision affects
                //both objects.
            }
        }
    }
    this.getNormal=function(pos){
        if(!pos[0].length){
            var minDist=-1;
            var minV=[0,0];
            for(var i in this.constraints){
                var c = this.constraints[i];
                var vec = lineToPointFunc(this.points[c[0]],this.points[c[1]],pos);
                var dist = dot(vec,vec);
                if(minDist<0){
                    minDist = dist;
                    minV = vec;
                }
                else if(minDist>dist){
                    minDist = dist;
                    minV = vec;
                }
            }
            return normV(minV);
        }
        else{
            var minDist=-1;
            var minV=[0,0];
            for(var i in this.constraints){
                var c = this.constraints[i];
                var vec = lineToLineFunc(this.points[c[0]],this.points[c[1]],pos[0],pos[1]);
                var dist = dot(vec,vec);
                if(minDist<0){
                    minDist = dist;
                    minV = vec;
                }
                else if(minDist>dist){
                    minDist = dist;
                    minV = vec;
                }
            }
            return normV(minV);
        }
    }
    this.step = function(){
        for(var i in this.points){
            var p = this.points[i];
            var newP;
            newP = sumV(diffV(timesV(2-this.f,p[0]),timesV(1-this.f,p[1])),[0,.05]);
            if(p[0][1]>this.getWorld().height){
                newP[1]=200;
            }
            if(p[0][1]<0){
                newP[1]=0;
            }
            if(p[0][0]>this.getWorld().width){
                newP[0]=200;
            }
            if(p[0][0]<0){
                newP[0]=0;
            }
            p[1]=p[0];
            p[0]=newP;
        }
        for(var j in this.constraints){
            var c = this.constraints[j];
            var p1 = (this.points[c[0]])[0];
            var p2 = (this.points[c[1]])[0];
            var d1 = diffV(p2,p1);
            var d2 = lengthV(d1);
            var d3 = (d2 - c[2])/d2;
            var newP1 = sumV(p1,timesV(.5*d3,d1));
            var newP2 = diffV(p2,timesV(.5*d3,d1));
            this.points[c[0]][0]=newP1;
            this.points[c[1]][0]=newP2;
        }
    }
    this.draw = function(cxt){
        cxt.lineWidth=2.5
        for(var i in this.constraints){
            var con = this.constraints[i];
            var p1 = this.points[con[0]][0];
            var p2 = this.points[con[1]][0];
            cxt.beginPath();
            cxt.moveTo(p1[0],p1[1]);
            cxt.lineTo(p2[0],p2[1]);
            cxt.stroke();
        }
    }
}


