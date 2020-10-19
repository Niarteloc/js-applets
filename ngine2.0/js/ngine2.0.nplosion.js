MAX_SPEED=4;

Nframes={
    stand:{
        body:[[0,-8],[0,0]],
        head:[[2,-8],[0,-10],[-3,-10]],
        legR:[3,6],
        legL:[-3,6],
        footR:[[4,11],[2,11]],
        footL:[[-4,11],[-2,11]],
        armR:[2,-4],
        armL:[-2,-4],
        handR:[[3,-7],[1,-7]],
        handL:[[-3,-7],[-1,-7]],
    },
    walk1:[[]]
};

N.prototype=new Nject({pos:[0,0],size:1});
function N(properties){
    this.setProps(properties);
    var dir=0;
    var width=10;
    var height=22;
    var rightcolli,leftcolli,botcolli,topcolli=false;
    this.up=false;
    this.down=false;
    this.left=false;
    this.right=false;
    this.vel=[0,0];
    this.curFrame=Nframes.stand
    var accel=[0,.125];
    this.jump_timer=-1;
    
    this.step=function(){
        
        if(this.pos[0]-width/2<=0){this.pos[0]=width/2;leftcolli=true}
        if(this.pos[0]+width/2>=this.getWorld().width){this.pos[0]=this.getWorld().width-width/2;rightcolli=true}
        if(this.pos[1]-height/2<0){this.pos[1]=height/2;topcolli=true}
        if(this.pos[1]+height/2>this.getWorld().height){this.pos[1]=this.getWorld().height-height/2;botcolli=true}
        
        accel=[0,.125];
        
        if(topcolli){
            this.vel[1]=0;
        }
        if(rightcolli){
            if(this.jump_timer!=-1)this.jump_timer=0;
            this.vel[0]=0;
            if(this.vel[1]>.5){
                this.vel[1]=.5
            }
        }
        if(leftcolli){
            if(this.jump_timer!=-1)this.jump_timer=0;
            this.vel[0]=0;
            if(this.vel[1]>.5){
                this.vel[1]=.5
            }
        }
        if(botcolli){
            if(this.jump_timer!=-1)this.jump_timer=0;
            this.vel[1]=0;
            var fric=.3;
            if(this.left){accel=sumV(accel,[-.25,0]);fric=.05}
            if(this.right){accel=sumV(accel,[.25,0]);fric=.05}
            if(Math.abs(this.vel[0])<fric){this.vel[0]=0;}
            else if(this.vel[0]>0){accel=sumV(accel,[-fric,0])}
            else if(this.vel[0]<0){accel=sumV(accel,[fric,0])}
        }
        else{
            if(this.left){accel=sumV(accel,[-.075,0]);}
            if(this.right){accel=sumV(accel,[.075,0]);}
        }
        if(this.up){
            if(this.jump_timer>=1){
                this.jump_timer-=1;
                accel=sumV(accel,[0,-.1]);
            }
            else if(this.jump_timer==-1){
                if(botcolli){
                    this.jump_timer=25;
                    this.vel[1]-=3;
                    this.pos[1]-=1;
                }
                else if(rightcolli){
                    this.jump_timer=25;
                    this.vel[1]-=3;
                    this.vel[0]=-1.5;
                }
                else if(leftcolli){
                    this.jump_timer=25;
                    this.vel[1]-=3;
                    this.vel[0]=1.5;
                    
                }
            }
        }
        this.vel=sumV(this.vel,accel);
        this.pos=sumV(this.pos,this.vel);
        if(this.vel[0]>MAX_SPEED)this.vel[0]=MAX_SPEED;
        if(this.vel[0]<-MAX_SPEED)this.vel[0]=-MAX_SPEED;
        botcolli=false;
        topcolli=false;
        rightcolli=false;
        leftcolli=false;
    }
    this.draw=function(cxt){
        cxt.fillStyle="#000000";
        cxt.lineWidth=2
        var frame = this.curFrame;
        var px=0//this.pos[0];
        var py=0//this.pos[1];
        cxt.translate(this.pos[0],this.pos[1])
        cxt.beginPath();
            cxt.moveTo(frame.body[0][0],frame.body[0][1]);
            cxt.lineTo(frame.body[1][0],frame.body[1][1]);
        cxt.stroke();
        cxt.beginPath();
            cxt.moveTo(frame.head[0][0],frame.head[0][1]);
            cxt.lineTo(frame.head[1][0],frame.head[1][1]);
            cxt.lineTo(frame.head[2][0],frame.head[2][1]);
            cxt.closePath()
        cxt.stroke();
        cxt.beginPath();
            cxt.moveTo(frame.body[1][0],frame.body[1][1]);
            cxt.lineTo(frame.legR[0],frame.legR[1]);
        cxt.stroke();
        cxt.beginPath();
            cxt.moveTo(frame.body[1][0],frame.body[1][1]);
            cxt.lineTo(frame.legL[0],frame.legL[1]);
        cxt.stroke();
        cxt.beginPath();
            cxt.moveTo(frame.legR[0],frame.legR[1]);
            cxt.lineTo(frame.footR[0][0],frame.footR[0][1]);
            cxt.lineTo(frame.footR[1][0],frame.footR[1][1]);
            cxt.closePath();
        cxt.stroke();
        cxt.beginPath();
            cxt.moveTo(frame.legL[0],frame.legL[1]);
            cxt.lineTo(frame.footL[0][0],frame.footL[0][1]);
            cxt.lineTo(frame.footL[1][0],frame.footL[1][1]);
            cxt.closePath();
        cxt.stroke();
        cxt.translate(-this.pos[0],-this.pos[1])
    }
}