function timesV(c,u){
    var returnVec = [];
    for(var i=0;i<u.length;i++){
        returnVec[i]=u[i]*c;
    }
    return returnVec;
}

function newtonsMethod(func,der,initial,error,tries){
    var newGuess=initial-func(initial)/der(initial);
    if(Math.abs(newGuess-initial)<error || tries<0){
        return newGuess;
    }
    else{
        return newtonsMethod(func,der,newGuess,error,tries-1);
    }
}

function RungeKuttaSolve(x,t,func,size){
    var x_next=[];
    var a=[];
    var b=[]
    var c=[]
    var d=[];
    if(x.length){
        for(var i=0;i<x.length;i++){
            a[i] = func[i](x,t);
        }
        for(var i=0;i<x.length;i++){
            b[i] = func[i](sumV(x,timesV(size/2,a)),t+size/2);
        }
        for(var i=0;i<x.length;i++){
            c[i] = func[i](sumV(x,timesV(size/2,b)),t+size/2);
        }
        for(var i=0;i<x.length;i++){
            d[i] = func[i](sumV(x,timesV(size,c)),t+size);
        }
        x_next=sumV(x,timesV(size/6,sumV(a,sumV(timesV(2,b),sumV(timesV(2,c),d)))));
    }
    else{
        a = func(x,t);
        b = func(x+a*size/2,t+size/2);
        c = func(x+b*size/2,t+size/2);
        d = func(x+c*size,t+size);
        x_next=x+size*(a+2*b+2*c+d)/6;
    }
    return x_next;
}

function log(msg) {
    setTimeout(function() {
        throw new Error(msg);
    }, 0);
}

function sumV(u,v){
    var returnVec = [];
    for(var i=0;i<u.length;i++){
        returnVec[i]=u[i]+v[i];
    }
    return returnVec;
}

function diffV(u,v){
    return [u[0]-v[0],u[1]-v[1]];
}

function dot(u,v){
    return u[0]*v[0]+u[1]*v[1];
}

function randV(){
    var ang=Math.random()*2*Math.PI;
    return [Math.cos(ang),Math.sin(ang)];
}

function projectV(u,v){
    return timesV(dot(u,v)/dot(v,v),v)
}

function lengthV(u){
    return Math.sqrt(dot(u,u));
}

function normV(u){
    return timesV(1/lengthV(u),u);
}

function Ngine(context,w,h,background){
    var cxt=context;
    this.collisions=true;
    this.width=w;
    this.height=h;
    this.background=background;
    this.centerPos=[0,0];
    this.scale=1.0;
    var njects=[];
    this.checkCollisions=function(){
        var colliNjects=njects.slice();
        for(var i=0; i<colliNjects.length;i++){
            var nject=colliNjects[i];
            for(var j=0;j<colliNjects.length;j++){
                if(j!=i){
                    nject.checkCollision(colliNjects[j]);
                }
            }
        }
    };
    this.getNjects=function(){
        return njects;
    }
    this.defaultStep=function(){
        for(var i=0; i<njects.length;i++){
            var nject = njects[i]
            nject.step();
        }
        if(this.collisions){
            this.checkCollisions();
        }
        this.redraw();
    }
    this.step=function(){
        this.defaultStep();
    };
    this.redraw=function(){
        cxt.scale(1/this.scale, 1/this.scale);
        cxt.translate(-this.centerPos[0],-this.centerPos[1])
        cxt.clearRect(0,0,this.width,this.height);
        cxt.fillStyle=this.background;
        cxt.fillRect(0,0,this.width,this.height);
        for(var i=0; i<njects.length;i++){
            var nject = njects[i]
            nject.draw(cxt);
        }
        cxt.translate(this.centerPos[0],this.centerPos[1])
        cxt.scale(this.scale,this.scale);

        //cxt.drawStyle="#000000";
        //cxt.drawLine(1,1,width,1);
    }
    this.addNject=function(n){
        njects.push(n);
        n.setWorld(this);
        
    }
    this.getNjectsAt=function(pos,radius){
        var njectsAt=[];
        pos=sumV(timesV(this.scale,pos),this.centerPos);
        for(var i=0; i<njects.length;i++){
            var nject = njects[i]
            if(nject.distTo(pos)<=(nject.getSize()*nject.getSize()+radius*radius)){
                    njectsAt.push(nject);
            }
        }
        return njectsAt;
    }
    this.getNjectsByClass=function(pos,njectClass){
        var njectsAt=[];
        for(var i=0; i<njects.length;i++){
            var nject = njects[i]
            if(nject.distTo(pos)<=(nject.getSize()*nject.getSize())){
                if(nject instanceof njectClass){
                    njectsAt.push(nject);
                }
            }
        }
        return njectsAt;
    }
    this.removeNject=function(nject){
        for(var i=njects.length-1; i>=0;i--){
            if(nject==njects[i]){
                njects.splice(i,1);
                break;
            }
        }
    }
    this.setNjects = function(newNjects){
        njects=newNjects;
    }
}
function Nject(properties){
    this.pos=properties.pos;
    this.size=properties.size;
    this.world=null;
    this.checkCollision=function(nject){
        var dist=nject.getDist(this);
        if(dist<=Math.pow(this.size+nject.getSize(),2)){
            this.collisionFunc(nject);
        }
    };
    this.getDist=function(nject){
        return this.distTo(nject.getPos());
    }
    this.distTo=function(pos){
        var vecTo = diffV(this.pos,pos);
        return dot(vecTo,vecTo);
    }
    this.collisionFunc=function(nject){
        
    };
    this.getBound=function(size){
        var x=this.pos[0];
        var y=this.pos[1];
        var total_s=size+this.getSize();
        var length=total_s*1.0823922;
        var angle=0.707106781;
        return [[x-length,y],[x-length*angle,y-length*angle],
                [x,y-length],[x+length*angle,y-length*angle],
                [x+length,y],[x+length*angle,y+length*angle],
                [x,y+length],[x-length*angle,y+length*angle]];
    }
    this.setProps=function(props){
        this.pos=props.pos;
        this.size=props.size;
    };
    this.step=function(){
        //alert("x:"+x+"y:"+y);
    };
    this.setPos=function(newPos){
        this.pos=newPos;
    };
    this.getPos=function(){
        return this.pos;
    };
    this.getSize=function(){
        return this.size;
    };
    this.draw=function(cxt){
        cxt.fillStyle="#FF0000";
        cxt.beginPath();
        cxt.arc(this.pos[0],this.pos[1],this.size,0,Math.PI*2,true);
        cxt.closePath();
        cxt.fill();
    };
    this.setWorld=function(w){
        this.world=w;
    }
    this.getWorld=function(){
        return this.world;
    }
    this.getNormal=function(pos){
        return normV(diffV(pos,this.pos));
    }
}

function Interface(host){
    //alert(host.toString());
    var entity=this;
    var mouseXY;
    host.addEventListener('mousedown', mouseDown, false);
    host.addEventListener('mouseup', mouseUp, false);
    window.addEventListener('mousemove', mouseMove, false);
    host.addEventListener('click', click, false);
    window.addEventListener('keydown',keyDown,false);
    window.addEventListener('keyup',keyUp,false);
    window.addEventListener((/Firefox/i.test(navigator.userAgent))? "DOMMouseScroll" : "mousewheel",wheel,false);
    function click(e){
        entity.click(e);
    }
    function wheel(event){
        var delta = 0;
        if (!event) /* For IE. */
                event = window.event;
        if (event.wheelDelta) { /* IE/Opera. */
                delta = event.wheelDelta/120;
        } else if (event.detail) { /** Mozilla case. */
                /** In Mozilla, sign of delta is different than in IE.
                 * Also, delta is multiple of 3.
                 */
                delta = -event.detail/3;
        }
        /** If delta is nonzero, handle it.
         * Basically, delta is now positive if wheel was scrolled up,
         * and negative, if wheel was scrolled down.
         */
        if (delta)
                entity.wheel(event,delta);
    }
    function mouseDown(e){
        entity.mouseDown(e);
    }
    function mouseUp(e){
        entity.mouseUp(e);
    }
    function mouseMove(e){
        entity.mouseMove(e);
    }
    function keyDown(e){
        entity.keyDown(e);
    }
    function keyUp(e){
        entity.keyUp(e);
    }
    this.keyDown=function(e){}
    this.keyUp=function(e){}
    this.mouseDown=function(e){}
    this.mouseUp=function(e){}
    this.mouseMove=function(e){}
    this.click=function(e){}
    this.wheel=function(e,d){}
    this.getMouseXY=function(e){
        if(!e){
            return mouseXY;
        }
        var tempXY=getMouseXY(e);
        if(dot(tempXY,tempXY)==0){
            return mouseXY;
        }
        else{
            var hostXY=findPos(host);
            var realXY=[
                tempXY[0]-hostXY[0],
                tempXY[1]-hostXY[1]
            ];
            mouseXY=realXY;
            return realXY;
        }
    };
}

// Set-up to use getMouseXY function onMouseMove
document.onmousemove = getMouseXY;

// Temporary variables to hold mouse x-y pos.s

// Main function to retrieve mouse x-y pos.s

function getMouseXY(e) {
// Detect if the browser is IE or not.
// If it is not IE, we assume that the browser is NS.
var IE = document.all?true:false
  var tempX = 0
  var tempY = 0

  if (IE) { // grab the x-y pos.s if browser is IE
    tempX = event.clientX + document.body.scrollLeft
    tempY = event.clientY + document.body.scrollTop
  } else {  // grab the x-y pos.s if browser is NS
    tempX = e.pageX
    tempY = e.pageY
  }  
  // catch possible negative values in NS4
  if (tempX < 0){tempX = 0}
  if (tempY < 0){tempY = 0}  
  // show the position values in the form named Show
  // in the text fields named MouseX and MouseY
  //document.Show.MouseX.value = tempX
  //document.Show.MouseY.value = tempY
  return [tempX, tempY];
}

function findPos(obj) {
	var curleft = 0;
        var curtop = 0;
        if (obj.offsetParent) {
            do {
			curleft += obj.offsetLeft;
			curtop += obj.offsetTop;
            } while (obj = obj.offsetParent);
        }
      	return [curleft,curtop];
}