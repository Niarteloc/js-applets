var GLOBAL_ID=0;

function fullscreenify(canvas) {
    
    window.addEventListener('resize', function () {resize(canvas);}, false);
 
    resize(canvas);
 
    function resize(cxt) {
        var width = (window.innerWidth);
        var height = (window.innerHeight);
        cxt.canvas.width = width;
        cxt.canvas.height = height;
        
    }
}

Bubble.prototype=new Nject({pos:[0,0],size:1});
function Bubble(properties){
    if(!properties.hasOwnProperty('id')){
        this.id=GLOBAL_ID+1;
        GLOBAL_ID++;
    }
    else{
        this.id=properties.id;
        GLOBAL_ID=Math.max(properties.id,GLOBAL_ID);
    }
    this.concept=properties.concept;
    this.data=properties.data;
    if('color' in properties){
        this.color=properties.color;
    }
    else{
        this.color='#00AA77';
    }
    this.setProps(properties);
    this.setProps=function(props){
        this.endPos=props.endPos;
        this.setProps(props);
    };
    this.saveProps=function(){
        return {id:this.id,
            color:this.color,
            concept:this.concept,
            data:this.data,
            pos:this.pos,
            size:this.size};
    }
    this.draw=function(cxt){
        cxt.shadowOffsetX=3;
        cxt.shadowOffsetY=3;
        cxt.shadowBlur=5;
        cxt.shadowColor="#333333";
        cxt.fillStyle=this.color;
        cxt.beginPath();
        cxt.arc(this.pos[0],this.pos[1],this.size,0,Math.PI*2,true);
        cxt.closePath();
        cxt.fill();
        cxt.fillStyle="#000000"
        cxt.font=(this.size/3)+"px Arial";
        cxt.shadowOffsetX=0;
        cxt.shadowOffsetY=0;
        cxt.shadowBlur=0;
        var i=0;
        for(var word in this.concept.split(" ")){
            i++;
            var wordData=this.concept.split(" ")[word]
            cxt.fillText(wordData,this.pos[0]-cxt.measureText(wordData).width/2,this.pos[1]+(i-1)*10);
        }
    }
}

Relation.prototype=new Nject({pos:[0,0],size:5});
function Relation(properties){
    this.relationship=properties.relationship;
    this.bubble1=properties.bubble1;
    this.bubbleAngle1=Math.PI/3 - Math.random()*2*Math.PI/3;
    this.bubble2=properties.bubble2;
    this.bubbleAngle2=Math.PI/3 - Math.random()*2*Math.PI/3;
    this.selected=false;
    if('color' in properties){
        this.color="#000000";
    }
    else{
        this.color=properties.color;
    }
    this.setProps(properties);
    this.saveProps=function(){
        return {color:this.color,
            relationship:this.relationship,
            bubble1:this.bubble1,
            bubble2:this.bubble2,
            pos:this.pos,
            size:this.size};
    }
    this.draw=function(cxt){
        if(this.bubble1>=0){
            cxt.shadowOffsetX=3;
            cxt.shadowOffsetY=3;
            cxt.shadowBlur=5;
            cxt.shadowColor="#333333";

            var listOfBubbles=this.getWorld().getNjects();
            var bubble1;
            var bubble2;
            for(var i=0;i<listOfBubbles.length;i++){
                var curNject=listOfBubbles[i];
                if(curNject instanceof Bubble){
                    if(curNject.id == this.bubble1){
                        bubble1=curNject;
                    }
                    if(curNject.id == this.bubble2){
                        bubble2=curNject;
                    }
                }
            }
            var bpos1=bubble1.pos;
            var b2size;
            var bpos2;
            if(this.bubble2<0){bpos2=this.pos;b2size=10}
            else{bpos2=bubble2.pos;b2size=bubble2.size}
            var angle1=Math.atan2(bpos2[1]-bpos1[1], bpos2[0]-bpos1[0])+this.bubbleAngle1;
            var angle2=Math.atan2(bpos1[1]-bpos2[1], bpos1[0]-bpos2[0])+this.bubbleAngle2;
            var cp1x=bpos1[0]+bubble1.size*2*Math.cos(angle1);
            var cp1y=bpos1[1]+bubble1.size*2*Math.sin(angle1);
            var cp2x=bpos2[0]+b2size*2*Math.cos(angle2);
            var cp2y=bpos2[1]+b2size*2*Math.sin(angle2);

            cxt.lineWidth=3
            cxt.beginPath();
            cxt.moveTo(bpos1[0],bpos1[1]);
            cxt.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, bpos2[0], bpos2[1]);
            cxt.stroke();
        }
    }
    this.distTo=function(pos){
        if(this.bubble1>=0){
            var listOfBubbles=this.getWorld().getNjects();
            var bubble1;
            var bubble2;
            for(var i=0;i<listOfBubbles.length;i++){
                var curNject=listOfBubbles[i];
                if(curNject instanceof Bubble){
                    if(curNject.id == this.bubble1){
                        bubble1=curNject;
                    }
                    if(curNject.id == this.bubble2){
                        bubble2=curNject;
                    }
                }
            }
            var bpos1=bubble1.pos;
            var b2size;
            var bpos2;
            if(this.bubble2<0){bpos2=this.pos;b2size=10}
            else{bpos2=bubble2.pos;b2size=bubble2.size}
            var angle1=Math.atan2(bpos2[1]-bpos1[1], bpos2[0]-bpos1[0])+this.bubbleAngle1;
            var angle2=Math.atan2(bpos1[1]-bpos2[1], bpos1[0]-bpos2[0])+this.bubbleAngle2;
            var cp1x=bpos1[0]+bubble1.size*2*Math.cos(angle1);
            var cp1y=bpos1[1]+bubble1.size*2*Math.sin(angle1);
            var cp2x=bpos2[0]+b2size*2*Math.cos(angle2);
            var cp2y=bpos2[1]+b2size*2*Math.sin(angle2);

            var P0=diffV(bpos1,pos);
            var P1=diffV([cp1x,cp1y],pos);
            var P2=diffV([cp2x,cp2y],pos);
            var P3=diffV(bpos2,pos);
            var A=sumV(diffV(P3,timesV(3,P2)),diffV(timesV(3,P1),P0));
            var B=sumV(diffV(timesV(3,P2),timesV(6,P1)),timesV(3,P0));
            var C=timesV(3,diffV(P1,P0));
            var Q5=3*dot(A,A);
            var Q4=5*dot(A,B);
            var Q3=4*dot(A,C)+2*dot(B,B);
            var Q2=3*dot(B,C)+3*dot(A,P0);
            var Q1=dot(C,C)+2*dot(B,P0);
            var Q0=dot(C,P0);
            function poly(x){
                return Q5*(x*x*x*x*x)+Q4*(x*x*x*x)+Q3*(x*x*x)+Q2*(x*x)+Q1*x+Q0;
            }
            function polyder(x){
                return 5*Q5*(x*x*x*x)+4*Q4*(x*x*x)+3*Q3*(x*x)+2*Q2*x+Q1;
            }
            var t=newtonsMethod(poly,polyder,.5,.01,100);
            var distVec;
            if(t<0){
                distVec=P0;
            }
            else if(t>1){
                distVec=P3;
            }
            else{
                distVec=sumV(sumV(timesV((1-t)*(1-t)*(1-t),P0),timesV(3*(1-t)*(1-t)*t,P1)),
                sumV(timesV((t*t*t),P3),timesV(3*(1-t)*t*t,P2)));
            }
            return dot(distVec,distVec);
        }
        else{
            var dVec=diffV(pos,this.pos);
            return dot(dVec,dVec);
        }
    }
}


function loadNote(id,world){
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange=function()
    {
        if (xmlhttp.readyState==4 && xmlhttp.status==200)
        {
            var objList=eval(xmlhttp.responseText);
            world.setNjects([]);
            for(var obj in objList){
                if('relationship' in objList[obj]){
                    world.addNject(new Relation(objList[obj]));
                }
                else{
                    world.addNject(new Bubble(objList[obj]));
                }
            }
        }
    }
    xmlhttp.open("POST","http://legitwebguys.com/bubblenote/loadNotes/"+id,true);
    xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    xmlhttp.send();
}

function saveNote(id,noteData){
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange=function()
    {    
        if (xmlhttp.readyState==4 && xmlhttp.status==200)
        {
            alert("saved");
        }
    }
    xmlhttp.open("POST","http://legitwebguys.com/bubblenote/saveNotes/"+id,true);
    xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    xmlhttp.send("data="+noteData);
    
}