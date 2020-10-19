function hat3(omega){
    return [[0,-omega],
            [omega,0]];
}

function hat(chi){
    return [[0,-chi[2],chi[0]],
            [chi[2],0,chi[1]],
            [0,0,1]];
}

function wedge3(omegaHat){
    return omegaHat[1][0];
}

function wedge(chiHat){
    var ohm = wedge3(chiHat);
    return [chiHat[0][2],chiHat[1][2],ohm];
}

function expm3(omega,theta){
    //var matrix = Matrix.I(2).add(omega.x(Math.sin(theta))).add(omega.x(omega).x(1-Math.cos(theta)));
    var matrix = sumM(sumM(eyeM(2),timesM(Math.sin(theta),omega)),timesM(1-Math.cos(theta),multiM(omega,omega)));
	return matrix;
}

function expm(chiHat,theta){
    chiHatMinor = [[chiHat[0][0],chiHat[0][1]],
                   [chiHat[1][0],chiHat[1][1]]];
    var e_ohm = expm3(chiHatMinor,theta);
    var chi = wedge(chiHat);
    var omega = hat3(chi[2]);
    var vec = [chi[0],chi[1]];
    //var e_vec = Matrix.I(2).subtract(e_ohm).multiply(omega.x(vec));//.add(omega.x(omega.transpose()).multiply(vec).multiply(theta));
    var e_vec = multiMV(multiM(diffM(eyeM(2),e_ohm),omega),vec)
    var matrix = [[e_ohm[0][0],e_ohm[0][1],e_vec[0]],
                  [e_ohm[1][0],e_ohm[1][1],e_vec[1]],
                  [0,0,1]];
	return matrix;
}

function logm(matrix){
    var R = [[matrix[0][0],matrix[0][1]],
             [matrix[1][0],matrix[1][1]]];
    var theta = Math.atan2(R[1][0],R[0][0]);
    var w,v;
    if (Math.abs(theta) < 1e-8){
        w = 0;
        v = [matrix[0][2],matrix[1][2]];
    }
    else{
        w = 1;//(1/(2*Math.sin(theta)))*(R.e(2, 1) - R.e(1, 2))
        var p = [matrix[0][2],matrix[1][2]];
        //var A = Matrix.I(2).subtract(R).multiply(hat3(w));//.add(hat3(w).x(hat3(w)).multiply(theta));
        var A = multiM(diffM(eyeM(2),R),hat3(w));
        v = multiMV(inverseM(A),p);
        w = w*(theta);
        v = timesV(theta,v);
    }
    var chi = [v[0],v[1],w];

    return chi
}

function adjoint(transform){
    var R = [[transform[0][0],transform[0][1]],
             [transform[1][0],transform[1][1]]];
    var p = [transform[0][2],transform[1][2]];
    var adj2 = multiM(hat3(p),R);
    return [
        [R[0][0],R[0][1],p[1]],
        [R[1][0],R[1][1],-p[0]],
        [0,0,1]
    ];
}

function distanceToLine(p,lineStart,lineEnd){
    var d=diffV(p,lineStart);
    var v=diffV(lineEnd,lineStart);
    if(dot(v,v)==0){
        return dot(d,d);
    }
    var proj_amount=(dot(v,d)/dot(v,v));
    if(proj_amount<0){
        return dot(d,d);
    }
    if(proj_amount>1){
        var e=diffV(p,lineEnd);
        return dot(e,e);
    }
    var d_proj=diffV(d,timesV(proj_amount,v));
    return dot(d_proj,d_proj);
}

function normalFromLine(p,lineStart,lineEnd){
    var d=diffV(p,lineStart);
    var v=diffV(lineEnd,lineStart);
    if(dot(v,v)==0){
        return normV(d)
    }
    var proj_amount=(dot(v,d)/dot(v,v));
    if(proj_amount<0){
        return normV(d);
    }
    if(proj_amount>1){
        var e=diffV(p,lineEnd);
        return normV(e);
    }
    var d_proj=diffV(d,timesV(proj_amount,v));
    return normV(d_proj);
}

RobotArm.prototype=new Nject({pos:[0,0],size:1});
function RobotArm(properties){
    this.setProps(properties);
    this.links = properties.links;
    
    this.initializeLinks=function(){
        this.theta = [];
        this.gst0 = [
            [1,0,0],
            [0,1,0],
            [0,0,1]
        ];
        this.gst=this.gst0;
	for(var i=0;i<this.links.length;i++){
	    var curLink = this.links[i];
            curLink.baseTransform=this.gst0;
            this.gst0 = sumM(this.gst0,[
                [0,0,curLink.linkLength],
                [0,0,0],
                [0,0,0]
            ]);
            var q = [curLink.baseTransform[0][2],0,0];
            var v = [0,-q[0],0];//q.cross(Vector.k);
            curLink.twist = [v[0],v[1],1];
            this.theta.push(0);
	}
    }
    
    this.setTheta=function(theta){
        this.gst=eyeM(3);
        for(var i=0;i<this.links.length;i++){
            this.theta[i]=theta[i];
            var curLink=this.links[i];
            this.gst = multiM(this.gst,expm(hat(curLink.twist),this.theta[i]));
            var curLinkTransform = multiM(this.gst,curLink.baseTransform);
            curLink.curPos=[curLinkTransform[0][2],curLinkTransform[1][2]];
        }
        this.gst= multiM(this.gst, this.gst0);
    }
    
    this.getTransform=function(){
        this.gst=eyeM(3);
        for(var i=0;i<this.links.length;i++){
            var curLink=this.links[i];
            this.gst= multiM(this.gst,expm(hat(curLink.twist),this.theta[i]));
        }
        this.gst= multiM(this.gst, this.gst0);
        return this.gst;
    }
    
    this.getTheta=function(){
        return this.theta;
    }
    
    this.getJacobian=function(){
        var trans = eyeM(3);
        var chi = this.links[0].twist;
        this.jacobian = [[chi[0]],[chi[1]],[chi[2]]];
        for(var i=1;i<this.links.length;i++){
            var prevChi = this.links[i-1].twist;
            chi = this.links[i].twist;
            trans = multiM(trans, expm(hat(prevChi),this.theta[i-1]));
            chi = multiMV(adjoint(trans), chi);
            //chi = $M([[chi.e(1)],[chi.e(2)],[chi.e(3)]]);
            this.jacobian[0].push(chi[0]);// = this.jacobian.augment(chi);
            this.jacobian[1].push(chi[1]);
            this.jacobian[2].push(chi[2]);
        }
        this.jacobian = multiM(inverseM(adjoint(this.gst)),this.jacobian);
        var R = this.gst;

        this.jacobian = multiM([
            [R[0][0],R[0][1],0],
            [R[1][0],R[1][1],0],
            [0,0,1]
        ],this.jacobian);
        return this.jacobian
    }
    
    this.resRateStep=function(target){
        var g = this.getTransform();
        var R = this.gst;
        var R_large = [
            [R[0][0],R[0][1],0],
            [R[1][0],R[1][1],0],
            [0,0,1]
        ];
        var J = this.getJacobian();//.minor(1,1,3,this.links.length);
        var J_pinv = multiM(transposeM(J), inverseM(sumM(multiM(J,transposeM(J)),timesM(0.00001,eyeM(3)))));
        var error = multiMV(R_large,logm(multiM(inverseM(g),target)));
        //error = $V([error.e(1),error.e(2)]);
        
        //alert(g.inspect());
        //alert(target.inspect());
        //alert(logm(g.inv().x(target)).inspect());
        //error = $V([target.e(1,3)-g.e(1,3),target.e(2,3)-g.e(2,3),]);
        var curTheta = this.theta.slice(0);
        curTheta[0]=0;
        var thetaDot = sumV(multiMV(J_pinv,error),multiMV(diffM(eyeM(this.links.length),multiM(J_pinv,J)),timesV(-1,curTheta)));
        return thetaDot;
    }
    
    this.distTo=function(point){
        //var gst=Matrix.I(3);
        var curStart=this.pos;
        var curEnd = [];
        var distMin = -1;
        for(var i=0;i<this.links.length;i++){
            var curLink=this.links[i];
            //gst=gst.x(expm(hat(curLink.twist),this.theta[i]));
            //var curTransform = gst.x(curLink.baseTransform);
            curEnd = sumV(curLink.curPos,this.pos);//[this.pos[0]+curTransform.e(1,3),this.pos[1]+curTransform.e(2,3)];
            var curDistance = distanceToLine(point,curStart,curEnd);
            if(curDistance<distMin || distMin<0){
                distMin = curDistance;
            }
            curStart = curEnd;
        }
        return distMin;
    }
    this.getDist=function(nject){
        return this.distTo(nject.pos);
    }
    this.getNormal=function(point){
        //var gst=Matrix.I(3);
        var curStart=this.pos;
        var curEnd = [];
        var distMin = -1;
        var normVec = [0,0];
        for(var i=0;i<this.links.length;i++){
            var curLink=this.links[i];
            //gst=gst.x(expm(hat(curLink.twist),this.theta[i]));
            //var curTransform = gst.x(curLink.baseTransform);
            curEnd = sumV(curLink.curPos,this.pos);//[this.pos[0]+curTransform.e(1,3),this.pos[1]+curTransform.e(2,3)];
            var curDistance = distanceToLine(point,curStart,curEnd);
            if(curDistance<distMin || distMin<0){
                distMin = curDistance;
                normVec = normalFromLine(point,curStart,curEnd);
            }
            curStart = curEnd;
        }
        return normVec;
    }
    
    this.draw = function(context){
        context.lineWidth=3;
        context.beginPath();
        context.moveTo(this.pos[0],this.pos[1]);
        var gst=eyeM(3);
        
        for(var i=0;i<this.links.length;i++){
            var curLink=this.links[i];
            gst=multiM(gst,expm(hat(curLink.twist),this.theta[i]));
            var curTransform = multiM(gst,curLink.baseTransform);
            //alert(curTransform.inspect());
            context.lineTo(this.pos[0]+curTransform[0][2],this.pos[1]+curTransform[1][2]);
        }
        gst=multiM(gst,this.gst0);
        context.lineTo(this.pos[0]+gst[0][2],this.pos[1]+gst[1][2]);
        context.stroke();
    }
}

function RobotLink(type,length){
    this.type=type;
	this.linkLength=length;
	this.jointCoordinate=0;
	
	this.baseTransform;
	this.curPos=[0,0];
	this.twist;
}