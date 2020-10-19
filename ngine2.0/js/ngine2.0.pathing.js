function perp(v){
    return [-v[1],v[0]];
}

function pointOnBoundary(p,poly){
    for(var i=0;i<poly.length;i++){
        if(p[0]==poly[i][0]&&p[1]==poly[i][1]){
            return i;
        }
    }
    return -1;
}

function dist(p1,p2){
    var v=diffV(p2,p1);
    return dot(v,v);
}

function intersectLines(p1,v1,p2,v2){
    var u=sumV(p1,timesV(-1,p2));
    var t1;
    var t2;
    var v1_p=perp(v1);
    var v2_p=perp(v2);
    var v1_p_d_v2=dot(v1_p,v2);
    var v2_p_d_v1=dot(v2_p,v1);
    if(v1_p_d_v2==0){
        t1=-1;
        t2=-1;
    }
    else{
        t1=-dot(u,v2_p)/v2_p_d_v1;
        t2=dot(u,v1_p)/v1_p_d_v2;
    }
    return [t1,t2];
}

function xProduct(u,v){
    return u[0]*v[1]-u[1]*v[0];
}

function pointInPolygon(p,poly){
    var len=poly.length;
    var i=0;
    var j=len-1;
    var result=false;
    for(i=0;i<len;i++){
        
        if (poly[i][1]<p[1] && poly[j][1]>=p[1]
    ||  poly[j][1]<p[1] && poly[i][1]>=p[1]) {
      if (poly[i][0]+(p[1]-poly[i][1])/(poly[j][1]-poly[i][1])*(poly[j][0]-poly[i][0])<p[0]) {
        result=!result;}}
    j=i;
    }
    return result;
}

/*function pointInPolygon(p,poly){
    var len=poly.length;
    var sign=0;
    for(var i=0; i<len;i++){
        var vPoint=diffV(p,poly[i]);
        var vSeg=diffV(poly[i],poly[(i+1)%len]);
        var k=xProduct(vPoint,vSeg);
        if(k==0){
            k=sign;
        }
        else{
            k=Math.round(k/Math.abs(k));
        }
        if(sign==0){
            sign=k;
        }
        else if(sign!=k){
            return false;
        }
    }
    return true;
}*/

function drawPolygon(cxt,polygon){
    cxt.beginPath();
    var len = polygon.length;
    cxt.moveTo(polygon[len-1][0],polygon[len-1][1]);
    for(var i=0;i<len;i++){
        cxt.lineTo(polygon[i][0],polygon[i][1]);
    }
    cxt.stroke();
}

function lineIntersectPolygon(p,v,poly){
    var len=poly.length;
    var p_array=[];
    var i_array=[];
    var last_t=0;
    var last_p=[0,0];
    for(var i=0;i<len;i++){
        var p_p=poly[i];
        var v_p=diffV(poly[(i+1)%len],p_p);
        var t=intersectLines(p,v,p_p,v_p);
        //alert("point:"+i+", "+t+", "+v_p);
        if(t[0]>=0 &&t[0]<=1 && t[1]>=0 && t[1]<=1){
            var i_p=sumV(p,timesV(t[0],v))
            
            if(i_p[0]!=last_p[0] || i_p[1]!=last_p[1]){
                //alert("yup");
                if(t[0]>last_t){
                    p_array.push(i_p);
                    i_array.push(i);
                }
                else{
                    p_array.unshift(i_p);
                    i_array.unshift(i);
                    //last_t=t[0];
                }
                last_t=t[0];
                last_p=i_p;
            }
            //alert((i+1)%len);
        }
        else if(t[0]==1 && t[1]==0){
            p_array.unshift(p_p);
            i_array.unshift(i);
                    
        }
    }
    return [p_array,i_array];
}

function joinPolygons(poly1,poly2){
    var finalGon=[]
    var i_1=0;
    var i_start=0;
    var startingGon=0;
    var curGon=poly1;
    var otherGon=poly2;
    var len1=poly1.length;
    var iterations=0;
    //var i_from=0;
    //var second_half=[];
    //var i_to=0;
    var curlen=curGon.length;
    while(pointInPolygon(curGon[i_1],poly2)||
            pointOnBoundary(curGon[i_1],poly2)!=-1){
        i_start++;
        i_1++;
        if(i_1%len1==0){
            return -1;
        }
        //alert("skip");
    }
    var overlap=false;
    var other_index=0;
    var other_i=0;
    do{
        //alert(curGon);
        //if(startingGon>10){
        //    alert("WHOA THERE!")
            //return -1;
        //}
        iterations++;
        if(iterations>(poly1.length+poly2.length)){
            log("Problem!");
            return -2;
        }
        if(!overlap){
            finalGon.push(curGon[i_1]);
        }
        other_index=pointOnBoundary(curGon[i_1],otherGon);
        if(overlap){
            if(other_index==other_i){
                finalGon.push(curGon[i_1]);
            }
            else if(other_index==-1){
                overlap=false;
                if(!pointInPolygon(otherGon[other_i],curGon)){
                    //alert("not overlapped");
                    i_1=other_i;
                    var tempGon=otherGon;
                    otherGon=curGon;
                    curGon=tempGon;
                    curlen=curGon.length;
                    startingGon++;
                    finalGon.push(curGon[i_1]);
                }
                else{
                    finalGon.push(curGon[i_1]);
                }
            }
            else{    
                if(!pointInPolygon(otherGon[i_1],curGon)){//[other_i],curGon)){
                    //alert("not overlapped");
                    i_1=other_i;
                    var tempGon=otherGon;
                    otherGon=curGon;
                    curGon=tempGon;
                    curlen=curGon.length;
                    startingGon++;
                    finalGon.push(curGon[i_1]);
                }
                else{
                    finalGon.push(curGon[i_1]);
                }
            }
        }
        else if(other_index!=-1){
            overlap=true;
        }
        else{
            var intersect=lineIntersectPolygon(curGon[i_1%curlen],diffV(curGon[(i_1+1)%curlen],curGon[i_1%curlen]),otherGon);
            var p_array=intersect[0];
            var i_array=intersect[1];
            if(i_array.length>0){
                finalGon.push(p_array[0]);
                i_1=i_array[0];
                var tempGon=otherGon;
                otherGon=curGon;
                curGon=tempGon;
                curlen=curGon.length;
                startingGon++;
                //alert("wtf");
                //alert("switch to "+startingGon%2)
            }
        }
        other_i=(other_index+1)%otherGon.length;
                
        i_1=(i_1+1)%curlen;
            //alert(i_1);
            //alert(i_1%len1);
    }
    while(i_1%len1!=i_start || startingGon%2==1);
    
    //alert(finalGon);
    if(startingGon>0){
        return finalGon;
    }
    else{
        //alert(startingGon);
        return -2;
    }
}

function getConvexPoints(polygon){
    var resultingGon=[];
    var len=polygon.length;
    while(polygon.length!=resultingGon.length){
        if(resultingGon.length>0){
            polygon=resultingGon;
            resultingGon=[];
            len=polygon.length;
        }
        for(var i=1;i<len+1;i++){
            var v1=diffV(polygon[(i-1)%len],polygon[(i)%len]);
            var v2=diffV(polygon[(i+1)%len],polygon[(i)%len]);
            if(xProduct(v2,v1)>0){
                //alert(xProduct(v2,v1));
                resultingGon.push(polygon[(i%len)]);
            }
        }
    }
    return resultingGon;
}

function formConvexPolygon(polypointlist){
    polypointlist.sort(function(u,v){
        if(u[0]>v[0])
            return 1;
        if(u[0]<v[0])
            return -1;
        if(u[0]==v[0]){
            if(u[1]>v[1])
                return 1;
            if(u[1]<v[1])
                return -1;
        }
        return 0;
    });
    
    //get endpoints
    var minmin=0;
    var maxmax=polypointlist.length-1;
    var minmax=0;
    var maxmin=polypointlist.length-1;
    while(polypointlist[minmin][0]==polypointlist[minmax][0]){
        minmax++;
    }
    while(polypointlist[maxmax][0]==polypointlist[maxmin][0]){
        maxmin--;
    }
    
    var L_min=diffV(polypointlist[maxmin],polypointlist[minmin]);
    var L_bound=[polypointlist[minmin]];
//    var finalPoly=[];
//    for(var i=minmax+1;i<maxmin-1;i++){
//        var L_p=diffV(polypointlist[minmin])
        
/*        var curGon=polylist[i];
        var plen=curGon.length;
        for(var j=0;j<plen;j++){
            var p=curGon[j];
            for(var k=0;k<len;k++){
                if(k!=i){
                    if(!pointInPolygon(p,polylist[k])){
                        finalPoly.push(p);
                    }
                }
            }
        }
    }
    return finalPoly;*/
}

PathLine.prototype=new Nject({posx:0,posy:0,size:1});
function PathLine(properties){
    this.waypoints=[[properties.posx,properties.posy],[properties.endx,properties.endy]];
    this.setProps(properties);
    this.setProps=function(props){
        this.waypoints=[[props.posx,props.posy],[props.endx,props.endy]];
        this.setProps(props);
    };
    this.makePolygons=function(njects,size){
        var len=njects.length
        var finalGons=[];
        njects=njects.slice(0);
        njects=njects.sort(function(a,b){
            return b.s-a.s;
        });
        //alert(njects[0].s);
        var first=njects[0];
        njects=njects.sort(function(a,b){
            return a.getDist(first)-b.getDist(first);
        });
        while(njects.length>0){
            var nject=njects.shift();
            if(nject!=this){

                var bound=nject.getBound(size);
                var merged=false;
                //alert(finalGons);
                for(var i=0;i<finalGons.length;i++){
                    //alert("Size:"+nject.getSize())
                    var newBound=joinPolygons(bound,finalGons[i]);
                    //alert(newBound);
                    if(newBound==-1){
                        merged=true;
                    }
                    else if(newBound==-2){

                    }
                    else{
                        merged=true;
                        finalGons[i]=newBound;
                    }
                    //alert(nject.getSize()+","+nject.getPos());
                }
                if(merged==false){
                    finalGons.push(bound);
                }
            }
        }
        
        //var i=0;
        var reGons=finalGons.slice(0);
        finalGons=[];
        while(reGons.length>1){
            var testGon = reGons.shift();
            var flag=false;
            for(var i=0;i<reGons.length;i++){
                var unionGon=joinPolygons(testGon,reGons[i]);
                if(unionGon==-1){
                    flag=true;
                }
                else if(unionGon==-2){
                    //alert("srsly?");
                }
                else{
                    flag=true;
                    //alert(reGons[i].length+" wtf "+unionGon.length);
                    reGons[i]=unionGon;
                }
            }
            if(flag==false){
                //alert("wtfpwn");
                finalGons.push(testGon);
            }
        }
        finalGons.push(reGons[0]);
        return finalGons;
    }
    this.buildDistances=function(p_start,p_end,boundaries){
        var dist_graph=[];
        var point_distances=[];
    }
    this.draw=function(cxt){
        cxt.fillStyle="#FF0000";
        var poly1=[[100,50],[90,40],[110,30],[130,40],[110,40]];
        var poly2=[[130,60],[105,60],[105,40],[130,40]]
        
        if(pointInPolygon([100,50],poly1)){
            alert(pointOnBoundary([100,50],poly1))
        }
        
        var poly=this.makePolygons(this.getWorld().getNjects(),this.s);
        
        
        for(var i=0;i<poly.length;i++){
            //alert(poly[i]);
            drawPolygon(cxt,poly[i]);
            //alert(poly[i].length);
            //alert(getConvexPoints(poly[i]).length);
            drawPolygon(cxt,getConvexPoints(poly[i]));
        }//joinPolygons(poly1,poly2));
        //drawPolygon(cxt,poly2);
        //drawPolygon(cxt,poly1);
        //drawPolygon(cxt,poly2);
    };
}



//Old Polygon Method
/* OLD METHOD--HANDLES ALL BUT ONE CASE (FOR CONVEX GONS)
         * /if(pointInPolygon(poly1[i_1],poly2)){
            //alert("this one");
        //}
        //else{
            if(i_from==0){
                finalGon.push(poly1[i_1]);
            }
            else{//} if(single_counts%2==0){
                second_half.push(poly1[i_1]);
            }
            var intersect=lineIntersectPolygon(poly1[i_1],diffV(poly1[(i_1+1)%len1],poly1[i_1]),poly2);
            var p_array=intersect[0];
            var i_array=intersect[1];
            //alert("point:"+i_1+", "+p_array.length);
            //alert(p_array[0]);
            if(p_array.length==2){
                if(i_from==0){
                    //alert(2);
                    finalGon.push(p_array[0]);
                    //if(i_array[1]<i_array[0]){
                    //    var temp=i_array[1];
                    //    i_array[1]=i_array[0];
                    //    i_array[0]=temp;
                    //}
                    var i=i_array[0]
                    while(i!=i_array[1]){
                        i=(i+1)%poly2.length;
                        finalGon.push(poly2[i]);
                    }
                    finalGon.push(p_array[1]);
                }
                else{
                    i_to=[p_array[1],i_array[1]];
                    second_half=[];
                }
            }
            if(p_array.length==1){
                single_counts++;
                second_half=[];
                if(i_from==0){
                    i_from=[p_array[0],i_array[0]];
                    //i_to=[i_1,i_array[0]];
                }
                i_to=[p_array[0],i_array[0]];
            }
        //}*/
        //i_1++;
    /*if(i_from!=0){
//        alert(i_from[1]);
//        alert(i_to[1]);
//        alert(single_counts);
        finalGon.push(i_from[0]);
        var i=i_from[1]
        do{
            i=(i+1)%poly2.length;
            finalGon.push(poly2[i]);
        }while(i!=i_to[1]);
        finalGon.push(i_to[0]);
        finalGon=finalGon.concat(second_half);
    }*/