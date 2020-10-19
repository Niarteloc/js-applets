ColorTrail.prototype=new Nject({pos:[0,0],size:1});
function ColorTrail(properties){
    this.setProps(properties);
    this.color=properties.color;
    this.maxLength=properties.maxLength;
    this.fade=properties.fade;
    this.points=[]
    this.step=function(){
        if(this.points.length>this.maxLength){
            this.points.splice(0,this.points.length-this.maxLength);
        }
    }
    this.addPoint=function(point){
        this.points.push(point);
    }
    this.draw=function(cxt){
        cxt.strokeStyle=this.color;
        var rgb = hexToRgb(this.color);
        if(this.points.length>5){
        cxt.beginPath();
            cxt.moveTo(this.points[0][0],this.points[0][1]);
            for(var i=1;i<this.points.length;i++){
                //cxt.globalAlpha=Math.min(1,(i)/this.points.length)
                if(this.fade){
                cxt.strokeStyle = "rgba(" + rgb["r"] + "," +rgb["g"] + "," + rgb["b"] + ","+(i)/this.points.length+")";
                cxt.lineTo(this.points[i][0],this.points[i][1]);
                cxt.stroke();
                cxt.closePath();
                cxt.beginPath();
                cxt.moveTo(this.points[i][0],this.points[i][1]);
                }
                else{
                    cxt.lineTo(this.points[i][0],this.points[i][1]);
                }
            }
            cxt.stroke();
            cxt.closePath();
            //cxt.globalAlpha=1;
        }
    }
}

function hexToRgb(hex) {
    // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
    var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, function(m, r, g, b) {
        return r + r + g + g + b + b;
    });

    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}