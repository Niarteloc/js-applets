
DoublePendulum.prototype=new Nject({pos:[0,0],size:1});
function DoublePendulum(properties){
    this.setProps(properties);
    this.angle1=properties.angle1;
    this.angle2=properties.angle2;
    this.angv1=0;
    this.angv2=0;
    this.pause=false;
    var g = 9.81
    var len1=properties.len1;
    var len2=properties.len2;
    var m1=properties.m1;
    var m2=properties.m2;
    function omega1(x,t){
        return (-g*(2*m1+m2)*Math.sin(x[0]) - g*m2*Math.sin(x[0] - 2*x[1]) 
            - 2*Math.sin(x[0]-x[1])*m2*(x[3]*x[3]*len2 + x[2]*x[2]*len1*Math.cos(x[0] - x[1])))/
            (len1*(2*m1+m2 - m2*Math.cos(2*x[0]- 2*x[1])));

    }
    function omega2(x,t){
        return (2*Math.sin(x[0]-x[1])*(x[2]*x[2]*len1*(m1+m2) + g*(m1+m2)*Math.cos(x[0])
            + x[3]*x[3]*len2*m2*Math.cos(x[0] - x[1])))/
            (len2*(2*m1+m2 - m2*Math.cos(2*x[0]- 2*x[1])));
    }
    function theta1(x,t){
        return x[2]
    }
    function theta2(x,t){
        return x[3]
    }
    this.step=function(){
        if(!this.pause){
            var x = [this.angle1,this.angle2,this.angv1,this.angv2];
            //alert(x);
            var func = [theta1,theta2,omega1,omega2];
            var x_next = RungeKuttaSolve(x,0,func,.075);

            this.angle1=x_next[0];
            this.angle2=x_next[1];
            this.angv1=x_next[2];
            this.angv2=x_next[3];
        }
    }
    this.setM1=function(mass){
        m1=mass;
    }
    this.setM2=function(mass){
        m2=mass;
    }
    this.setL1=function(length){
        len1=length;
    }
    this.setL2=function(length){
        len2=length;
    }
    this.getL1=function(){
        return len1;
    }
    this.getL2=function(){
        return len2;
    }
    this.getP1=function(){
        return [this.pos[0]+len1*Math.sin(this.angle1),
                  this.pos[1]+len1*Math.cos(this.angle1)];
    }
    this.getP2=function(){
        return [this.pos[0]+len1*Math.sin(this.angle1)+len2*Math.sin(this.angle2),
                  this.pos[1]+len1*Math.cos(this.angle1)+len2*Math.cos(this.angle2)];

    }
    this.draw=function(cxt){
        var s1 = Math.sin(this.angle1);
        var s2 = Math.sin(this.angle2);
        var c1 = Math.cos(this.angle1);
        var c2 = Math.cos(this.angle2);
        
        var p1 = [this.pos[0]+len1*s1,
                  this.pos[1]+len1*c1];
        var p2 = [this.pos[0]+len1*s1+len2*s2,
                  this.pos[1]+len1*c1+len2*c2];
        cxt.strokeStyle="#000000";
        cxt.beginPath();
            cxt.moveTo(this.pos[0],this.pos[1]);
            cxt.lineTo(p1[0],p1[1]);
            cxt.lineTo(p2[0],p2[1]);
        cxt.stroke();
        cxt.fillStyle="#FF0000";
        cxt.beginPath();
            cxt.arc(p1[0],p1[1],Math.sqrt(m1)*2,0,Math.PI*2,true);
            cxt.closePath();
        cxt.fill();
        cxt.beginPath();
            cxt.arc(p2[0],p2[1],Math.sqrt(m2)*2,0,Math.PI*2,true);
            cxt.closePath();
        cxt.fill();

    }
}