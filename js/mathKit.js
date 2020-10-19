/*
 * Vector Functions
 */
function zeroV(size){
    var returnVec=[];
    for(var i=0;i<size;i++){
        returnVec[i]=0;
    }
    return returnVec;
}

function timesV(c,u){
    var returnVec = [];
    for(var i=0;i<u.length;i++){
        returnVec[i]=u[i]*c;
    }
    return returnVec;
}

function sumV(u,v){
    var returnVec = [];
    for(var i=0;i<u.length;i++){
        returnVec[i]=u[i]+v[i];
    }
    return returnVec;
}

function diffV(u,v){
    var returnVec = [];
    for(var i=0;i<u.length;i++){
        returnVec[i]=u[i]-v[i];
    }
    return returnVec;
}

function dot(u,v){
    var returnVal = 0;
	if(u.length){
		for(var i=0;i<u.length;i++){
			returnVal+=u[i]*v[i];
		}
	}
	else{
		returnVal = u*v;
	}
    return returnVal;
}

function randV(){
    var ang=Math.random()*2*Math.PI;
    return [Math.cos(ang),Math.sin(ang)];
}

function randNV(size){
    var vec = []
    for(var i=0;i<size;i++){
        vec[i] = randN();
    }
    return vec;
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

function perpV(u){
    return [-u[1],u[0]];
}

function minV(vecs){
    var minVec=vecs[0];
    var minLen=dot(minVec,minVec);
    for(var i in vecs){
        var v = vecs[i];
        if(dot(v,v)<minLen){
            minLen=dot(v,v);
            minVec=v;
        }
    }
    return minVec;
}

function totalV(vec){
	total = 0;
	for(var i = 0; i < vec.length; i++){
		total+=vec[i];
	}
	return total;
}

/*
 * Matrix Functions
 */
 
 function totalM(matrix){
	sum = 0;
	for(var i = 0;i<matrix.length;i++){
		sum+=totalV(matrix[i]);
	}
	return sum;
 }
 
 function randNM(r,c){
     var returnMatrix = [];
	 for(var i = 0;i < r;i++){
		 returnMatrix[i]=randNV(c);
	 }
	 return returnMatrix; 
 }
 
 function flattenM(matrix){
	var returnV = [];
	for(var i = 0; i<matrix.length; i++){
		for(var j = 0; j<matrix[i].length; j++){
			returnV.push(matrix[i][j]);
		}
	}
	return returnV
 }
 
 function buildM(flatV,rowLength){
	var returnMatrix = [];
	var rowCount = flatV.length/rowLength;
	for(var i = 0; i < rowCount; i++){
		returnMatrix[i]=[];
		for(var j = 0; j < rowLength; j++){
			returnMatrix[i][j]=flatV[rowLength*i+j]
		}
	}
	return returnMatrix
 }
 
 function eyeM(size){
    var returnMatrix = [];
    for(var i = 0; i < size; i++){
        returnMatrix[i]=zeroV(size);
        returnMatrix[i][i]=1;
    }
    return returnMatrix;
 }
 
 function zeroM(r,c){
	 var returnMatrix = [];
	 for(var i = 0;i < r;i++){
		 returnMatrix[i]=zeroV(c);
	 }
	 return returnMatrix;
 }
 
function cloneM(matrix){
    var returnMatrix = [];
    for(var i = 0;i<matrix.length;i++){
        returnMatrix[i]=matrix[i].slice();
    }
    return returnMatrix;
}

function transposeM(matrix){
    var returnMatrix = [];
	var colLength=1;
	if(matrix[0].length)colLength=matrix[0].length;
    for(var i = 0; i < colLength; i++){
        returnMatrix[i]=[];
        for(var j = 0; j < matrix.length; j++){
            returnMatrix[i][j]=matrix[j][i];
        }
    }
    return returnMatrix;
}

function diagM(matrix){
	var diagV = [];
	for(var i = 0; i < matrix.length; i++){
		diagV[i]=matrix[i][i];
	}
	return diagV
}

function traceM(matrix){
	var sum = 0;
	for(var i = 0; i < matrix.length; i++){
		sum+=matrix[i][i];
	}
	return sum
}

function timesM(alpha,matrix){
    var returnMatrix=[];
    for(var i=0;i<matrix.length;i++){
        returnMatrix[i]=[];
        for(var j=0;j<matrix[i].length;j++){
            returnMatrix[i][j]=alpha*matrix[i][j];
        }
    }
    return returnMatrix;
}

function multiM(matrix1,matrix2){
    var returnMatrix=[];
    for(var i=0;i<matrix1.length;i++){
        returnMatrix[i]=[];
        for(var j=0;j<matrix2[0].length;j++){
			var colLength = 1;
			if(matrix1[0].length)colLength=matrix1[0].length;
            if(colLength!=matrix2.length)return null;
            var entry = 0;
            for(var k=0;k<matrix1[0].length;k++){
                entry+=matrix1[i][k]*matrix2[k][j];
            }
            returnMatrix[i][j]=entry;
        }
    }
    return returnMatrix;
}

function multiMV(matrix,vector){
    var returnVec = [];
    for(var i=0;i<matrix.length;i++){
            if(matrix[i].length!=vector.length)return null;
            var entry = 0;
            for(var j=0;j<matrix[i].length;j++){
                entry+=matrix[i][j]*vector[j];
            }
            returnVec[i]=entry;
    }
    return returnVec;
}

function sumM(matrix1,matrix2){
    var returnMatrix=[];
    if(matrix1.length!=matrix2.length)return null;
    for(var i=0;i<matrix1.length;i++){
        returnMatrix[i]=[];
        if(matrix1[i].length!=matrix2[i].length)return null;
        for(var j=0;j<matrix1[i].length;j++){
            returnMatrix[i][j]=matrix1[i][j]+matrix2[i][j];
        }
    }
    return returnMatrix;
}

function dotM(matrix1,matrix2){
	var returnMatrix = [];
	if(matrix1.length!=matrix2.length)return null;
	if(matrix1[0].length!=matrix2[0].length)return null;
	for(var i=0;i<matrix1.length;i++){
        returnMatrix[i]=[];
        for(var j=0;j<matrix1[i].length;j++){
            returnMatrix[i][j]=matrix1[i][j]*matrix2[i][j];
        }
    }
	return returnMatrix
}

function diffM(matrix1,matrix2){
    var returnMatrix=[];
    if(matrix1.length!=matrix2.length)return null;
    for(var i=0;i<matrix1.length;i++){
        returnMatrix[i]=[];
        if(matrix1[i].length!=matrix2[i].length)return null;
        for(var j=0;j<matrix1[i].length;j++){
            returnMatrix[i][j]=matrix1[i][j]-matrix2[i][j];
        }
    }
    return returnMatrix;
}

function upperTriangularM(matrixIn){
    var matrix=cloneM(matrixIn);
    for(var i=0;i<matrix.length;i++){
        if(matrix[i][i]==0){
            for(var k = i+1;k<matrix.length;k++){
                if(matrix[k][i]!=0){
                    matrix[i]=sumV(matrix[i],matrix[k]);
                    break;
                }
            }
        }
        if(matrix[i][i]!=0){
            for(var j=i+1;j<matrix.length;j++){
                if(matrix[j][i]!=0){
                    var multi = -matrix[j][i]/matrix[i][i];
                    matrix[j] = sumV(matrix[j],timesV(multi,matrix[i]));
                }
            }
        }
    }
    return matrix
}

function detM(matrix){
    if(matrix.length==matrix[0].length){
        var uMatrix = upperTriangularM(matrix);
        var sum = 1;
        for(var i=0;i<uMatrix.length;i++){
            sum*=uMatrix[i][i];
        }
        return sum;
    }
    else{
        return null;
    }
}

function solveUpperTriM(matrix,b){
    var x = [];
    for(var i=matrix.length-1;i>=0;i--){
        x[i]=b[i];
        for(var j=i+1;j<matrix.length;j++){
            x[i] -= matrix[i][j]*x[j];
        }
        x[i] /= matrix[i][i];
    }
    return x;
}

function solveLowerTriM(matrix,b){
    var x = [];
    for(var i=0;i<matrix.length;i++){
        x[i]=b[i];
        for(var j=0;j<i;j++){
            x[i] -= matrix[i][j]*x[j];
        }
        x[i] /= matrix[i][i];
    }
    return x;
}

function decompLUM(matrixIn){
    var matrix=cloneM(matrixIn);
    var P=eyeM(matrix.length);
    var L=eyeM(matrix.length);
    for(var i=0;i<matrix.length;i++){
        if(matrix[i][i]==0){
            for(var k = i+1;k<matrix.length;k++){
                if(matrix[k][i]!=0){
                    P[i][i]=0;
                    P[k][k]=0;
                    P[i][k]=1;
                    P[k][i]=1;
                    var temp = matrix[i];
                    matrix[i]=matrix[k];
                    matrix[k]=temp;
                    break;
                }
            }
        }
        if(matrix[i][i]!=0){
            for(var j=i+1;j<matrix.length;j++){
                //if(matrix[j][i]!=0){
                    L[j][i] = matrix[j][i]/matrix[i][i];
                    matrix[j] = sumV(matrix[j],timesV(-L[j][i],matrix[i]));
                //}
            }
        }
    }
    var U=matrix;
    return [L,U,P];
}

function choleskyM(matrix){
    var L = [];
    var n = matrix.length;
    for(var i = 0; i < n; i++){
        L[i]=zeroV(n);
        for(var j = 0; j <= i; j++){
            if(i==j){
                var sum = 0;
                for(var k = 0; k <= j-1; k++){
                    sum+=L[j][k]*L[j][k];
                }
                L[i][j]=Math.sqrt(matrix[i][j]-sum);
                
            }
            else{
                var sum = 0;
                for(var k = 0; k <= j-1; k++){
                    sum+=L[i][k]*L[j][k];
                }
                L[i][j]=(matrix[i][j]-sum)/L[j][j];
            }
        }
    }
    return L;
}

function inverseM(matrix){
    var LUP=decompLUM(matrix);
    var L = LUP[0];
    var U = LUP[1];
    var P = LUP[2];
    var n=matrix.length;
    var L_T_inv = [];
    var U_T_inv = [];
    for(var i = 0; i < n; i++){
        var b = zeroV(n);
        b[i]=1;
        L_T_inv[i] = solveLowerTriM(L,b);
    }
    var L_inv = transposeM(L_T_inv);
    for(var i = 0; i < n; i++){
        var b = zeroV(n);
        b[i]=1;
        U_T_inv[i] = solveUpperTriM(U,b);
    }
    var U_inv = transposeM(U_T_inv);
    return multiM(multiM(U_inv,L_inv),P);
}

/*
 *  Neural Net Functions
 */
function sigmoid(z){
    return 1/(1+Math.exp(-z));
}

function softmax(v){
    var expV = v.map(Math.exp);
    var sum = expV.reduce((a,b) => a+b,0);
    return expV.map((a)=>a/sum);
}

function initNeuralNet(sizes){
    var biases = [];//sizes.slice(1).map((n)=>randNV(n));
    var weights = [];
    for(var i=0;i<sizes.length-1;i++){
        biases[i]=randNV(sizes[i+1]);
        weights[i]=randNM(sizes[i+i],sizes[i]);
    }
    return [weights,biases]
}

function feedForward(weights, biases, input){
    var out = [];
    a = input
    for(var i =0;i<weights.length;i++){
        var z = sumV(multiMV(weights[i],a),biases[i]);
        a = z.map(sigmoid)
    }
    return a;
}
/*
 *  Gaussian Process Functions
 */
function randN(mean,std){
    var norm = (Math.random()+Math.random()+Math.random()+Math.random()+Math.random()+Math.random() + Math.random()+Math.random()+Math.random()+Math.random()+Math.random()+Math.random() - 6);
    return norm*std+mean;
}
 
 
function radialBasis(X_0, X_P, params){
	var diff;
	if(!X_0.length){
		diff = X_0-X_P
	}
	else{
		diff = diffV(X_0,X_P);
	}
    var delta = dot(diff,diff)==0?1:0;
    return params[0]*Math.exp(-params[1]*dot(diff,diff)/2)+(params[2])*delta;
}

function covarianceMatrix(X_1,X_2,params){
    var K = [];
    var X1_T=X_1;
    var X2_T=X_2;
    var n = X1_T.length;
    var m = X2_T.length;
    for(var i = 0; i < n; i++){
        K[i]=[];
        for(var j = 0; j < m; j++){
            K[i][j]=radialBasis(X1_T[i],X2_T[j],params);
        }
    }
    return K;
}

function generateGP(X,X_p,y_p,params){
    var y = [];
    if(y_p.length==0){
        var sigma = covarianceMatrix(X,X,params);
        var mu = zeroV(X.length);
    }
    else{
        var K_p = covarianceMatrix(X_p,X_p,params);
        var K_p_inv = inverseM(K_p);
        var K = covarianceMatrix(X,X,params);
        var K_K_p = covarianceMatrix(X,X_p,params);
        var K_K_p_T = transposeM(K_K_p);
        var sigma = diffM(K,multiM(K_K_p,multiM(K_p_inv,K_K_p_T)));
        var mu = multiMV(multiM(K_K_p,K_p_inv),y_p);
    }
    return [mu,sigma];
}

function sampleGP(mu,sigma){
    var y = [];
    var L = choleskyM(sigma);
    var u = [];
    for(var i=0;i<mu.length;i++){
        u[i] = randN(0,1);
    }
    y = sumV(mu,multiMV(L,u));
    return y;
}

function rbfLikelihood(X,Y,params){
	var N = X.length;//number of "samples"
	if(!X[0].length){
		D = 1;//dimension of "sample"
		X_temp=X;
		X=[];
		X[0]=X_temp;
		X=transposeM(X)
	}
	if(!Y[0].length){
		Y_temp=Y;
		Y=[];
		Y[0]=Y_temp;
		Y=transposeM(Y)
	}
	var Kx = covarianceMatrix(X,X,params);
	var Kxi = inverseM(Kx);
	var L = -(N*D/2)*Math.log(2*Math.PI) - (D/2)*Math.log(detM(Kx)) - 0.5*traceM(multiM(Kxi,multiM(Y,transposeM(Y))));
	return L
}

function rbfLikelihoodDerivative(X,Y,params){
	var N = X.length;//number of "samples"
	if(!X[0].length){
		D = 1;//dimension of "sample"
		X_temp=X;
		X=[];
		X[0]=X_temp;
		X=transposeM(X)
	}
	if(!Y[0].length){
		Y_temp=Y;
		Y=[];
		Y[0]=Y_temp;
		Y=transposeM(Y)
	}
	var D = X[0].length;
	
	//chil = xml-xnl
	var Kx = covarianceMatrix(X,X,params);
	var Kxi = inverseM(Kx);
	var dLdKx = diffM(timesM(1/2,multiM(Kxi,multiM(multiM(Y,transposeM(Y)),Kxi))),timesM(D/2,Kxi))
	var dLdX = []
	for(var l = 0; l<D; l++){
		var chi_l = [];
		for(var i = 0; i < N; i++){
			chi_l[i] = []
			for(var j=0; j < N; j++){
				chi_l[i][j] = X[i][l]-X[j][l]
			}
		}
		var dLdXl_matrix = dotM(dotM(dLdKx,chi_l),Kx);
		dLdX[l] = []
		for(var i = 0; i < dLdXl_matrix.length; i++){
			dLdX[l][i]=totalV(dLdXl_matrix[i]);
		}
		dLdX[l] = timesV(params[1],dLdX[l]);
	}
	
	dKda1 = timesM(1/params[0],diffM(Kx,timesM(params[2],eyeM(N))));
	dKda2 = dotM(timesM(-1/2,distanceMatrix(X)),Kx);
	dKda3 = eyeM(N);
	
	dLda1 = totalM(dotM(dLdKx,dKda1));
	dLda2 = totalM(dotM(dLdKx,dKda2));
	dLda3 = totalM(dotM(dLdKx,dKda3));
	
	gradient = flattenM(dLdX)
	gradient[gradient.length] = dLda1;
	gradient[gradient.length] = dLda2;
	gradient[gradient.length] = dLda3;
	
	return gradient
	//a2sum (kxi y w w yt kxi - d/2kxi  .*  chil  .*  kx
}

function distanceMatrix(X){
	var distMat = [];
	for(var i = 0; i < X.length; i++){
		distMat[i]=[];
		for(var j = 0; j < X.length; j++){
			if(X[i].length){
				var dist = diffV(X[i],X[j])
				distMat[i][j]=dot(dist,dist);
			}
			else{
				var dist = X[i]-X[j]
				distMat[i][j]=dot(dist,dist);
			}
		}
	}
	return distMat;
}


/*
 * Graph Functions
 */
 
 function dijkstra(edges,vertexNum,start,end){
	return Astar(edges,vertexNum,start,end,(i)=>0)
}

function Astar(edges,vertexNum,start,end,heuristic){
	var vertices=[];
	var unvisited=[];
	var parent=[];
	for(var i=0;i<vertexNum;i++){
		vertices[i]=Infinity;
		unvisited[i]=true;
		parent[i]=-1;
	}
	vertices[start]=0;
	unvisited[start]=false;
	var current=start;
	while(unvisited[end]){
		for(var e in edges){
			if(edges[e][0]==current){
				var newDist=edges[e][2]+vertices[current];
				if(newDist<vertices[edges[e][1]]){
					vertices[edges[e][1]]=newDist
					parent[edges[e][1]]=current;
				}
			}
			else if(edges[e][1]==current){
				var newDist=edges[e][2]+vertices[current];
				if(newDist<vertices[edges[e][0]]){
					vertices[edges[e][0]]=newDist
					parent[edges[e][0]]=current;
				}
			}
		}
		unvisited[current]=false
		var next = vertices.reduce(function(p,v,i){
			return ((vertices[p]+heuristic(p)<v+heuristic(i) || !unvisited[i]) ? p : i);
		},vertices[unvisited.indexOf(true)]);
		if(next==current)return false
		current=next
	}
	
	var path = [];
	current = end;
	while(current!=start){
		path.push(current)
		current = parent[current]
	}
	path.push(start)
	return path.reverse()
}

/*
 * Geometry Functions
 */

function calculateInterval(axis,polygon){
    var d = dot(axis,polygon[0]);
    var min,max=d;
    for(var i in polygon){
        d=dot(axis,polygon[i])
        if(d<min)min=d;
        if(d>max)max=d;
    }
    return [min,max]
}



function polygonsOverlapAxis(axis,polygon1,polygon2){
    var interval1 = calculateInterval(axis,polygon1);
    var interval2 = calculateInterval(axis,polygon2);
    
    if(interval1[0]>interval2[1] || interval2[0]>interval1[1])return false;
    
    var overlap1 = interval1[1]-interval2[0];
    var overlap2 = interval2[1]-interval1[0];
    var depth = Math.min(overlap1,overlap2);
    
    if(depth==0)return false;
    
    return timesV(depth,normV(axis));
}

function lineToPointFunc(l1,l2,p){
    var d=diffV(p,l1);
        var v=diffV(l2,l1);
        var proj_amount=(dot(v,d)/dot(v,v));
        if(proj_amount<0){
            return d;
        }
        if(proj_amount>1){
            var e=diffV(p,l2);
            return e;
        }
        var d_proj=diffV(d,timesV(proj_amount,v));
        return d_proj;
}

function linesIntersect(p1,e1,p2,e2){
    var v1 = diffV(e1,p1);
    var v2 = diffV(e2,p2);
    var u=diffV(p1,p2);
    var t1;
    var t2;
    var v1_p=[-v1[1],v1[0]];
    var v2_p=[-v2[1],v2[0]];
    var v1_p_d_v2=dot(v1_p,v2);
    var v2_p_d_v1=dot(v2_p,v1);
    if(v1_p_d_v2==0){
        t1=-1;
        t2=-1;
        return false;
    }
    else{
        t1=-dot(u,v2_p)/v2_p_d_v1;
        t2=dot(u,v1_p)/v1_p_d_v2;
    }
    if(t1>0 && t1<1 && t2>0 && t2<1){
        return true;
    }
    else{
        return false;
    }
}

function lineIntersectPolygon(p1,e1,polygon){
	for(var i=0;i<polygon.length-1;i++){
		  if(linesIntersect(p1,e1,polygon[i], polygon[i+1]))return true
	}
	if(linesIntersect(p1,e1,polygon[polygon.length-1], polygon[0]))return true
	
	return false
}

function pointInPolygon(point,polygon){
    var smallestX = polygon[0][0];
    for(var i=1;i<polygon.length;i++){
        if(polygon[i][0]<smallestX){
            smallestX=polygon[i][0];
        }
    }
    var rayStart=[smallestX-1,point[1]];
    var rayEnd=point;
    var intersects=0;
    for(var j=0;j<polygon.length-1;j++){
        if(linesIntersect(rayStart,rayEnd,polygon[j],polygon[j+1])){
            intersects++;
        }
    }
    if(linesIntersect(rayStart,rayEnd,polygon[polygon.length-1],polygon[0])){
            intersects++;
    }
    return (intersects%2);
}

function polygonCenter(polygon){
    var sum = [0,0];
    for(var i in polygon){
        sum=sumV(sum,polygon[i]);
    }
    return timesV(1/polygon.length,sum);
}

function polygonIntersect(poly1,poly2){
    var allOverlap=[];
    for(var j=poly1.length-1, i=0; i<poly1.length; j=i, i++){
        var norm = normV(perpV(diffV(poly1[i],poly1[j])));
        var overlap = polygonsOverlapAxis(norm,poly1,poly2);
        if(overlap)allOverlap.push(overlap);
    }
    for(var j=poly2.length-1, i=0; i<poly2.length; j=i, i++){
        var norm = normV(perpV(diffV(poly2[i],poly2[j])));
        var overlap = polygonsOverlapAxis(norm,poly1,poly2);
        if(overlap)allOverlap.push(overlap);
    }
    if(allOverlap.length>0){
        return minV(allOverlap);
    }
    else{
        return false;
    }
}

function polyToPointFunc(polygon,point){
    var lineStart;
    var lineEnd;
    
    var minV=lineToPointFunc(polygon[polygon.length-1],polygon[0],point);
    var minDist=dot(minV,minV);
    for(var i=1;i<polygon.length;i++){
        lineStart=polygon[i-1];
        lineEnd=polygon[i];
        var vec = lineToPointFunc(lineStart,lineEnd,point);
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
    return minV;
}

function lineToLineFunc(p1,e1,p2,e2){
    var v1 = diffV(e1,p1);
    var v2 = diffV(e2,p2);
    var u=diffV(p1,p2);
    var t1;
    var t2;
    var v1_p=[-v1[1],v1[0]];
    var v2_p=[-v2[1],v2[0]];
    var v1_p_d_v2=dot(v1_p,v2);
    var v2_p_d_v1=dot(v2_p,v1);
    if(v1_p_d_v2==0){
        t1=-1;
        t2=-1;
        return diffV(p2,p1);
    }
    else{
        t1=-dot(u,v2_p)/v2_p_d_v1;
        t2=dot(u,v1_p)/v1_p_d_v2;
    }
    if(t1>=0 && t1<=1 && t2>=0 && t2<=1){
        return [0,0];
    }
    var d=[];
    d[0] = lineToPointFunc(p1,e1,p2);
    d[1] = lineToPointFunc(p1,e1,e2);
    d[2] = timesV(-1,lineToPointFunc(p2,e2,p1));
    d[3] = timesV(-1,lineToPointFunc(p2,e2,e1));
    var min=dot(d[0],d[0]);
    var minV=d[0];
    for(var i=1;i<4;i++){
        if(dot(d[i],d[i])<min){
            min=dot(d[i],d[i]);
            minV=d[i];

        }
    }
    return minV;
}

function pointCloudConvexHull(points){
    var convexHull=[];
    var pointOnHull = points[0];
    for(var i=1;i<points.length;i++){
        if(points[i][0]<pointOnHull[0]){
            pointOnHull=points[i];
        }
    }
    var endpoint;
    var i=0;
    do{
        convexHull[i]=pointOnHull;
        endpoint=points[0];
        for(var j=1;j<points.length;j++){
            if(endpoint==pointOnHull || leftOfLine(pointOnHull,endpoint,points[j])){
                endpoint=points[j];
            }
        }
        i++;
        pointOnHull=endpoint;
    }while(endpoint!=convexHull[0])
    return convexHull;
}

function leftOfLine(l1,l2,p){
    var area = l1[0]*(l2[1]-p[1])+l2[0]*(p[1]-l1[1])+p[0]*(l1[1]-l2[1]);
    return area>0;
}



/*
 * Solver Functions
 */

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

function scg(errorFunc,errorDerv,varCount,epsilon,guess){
	var max_iter = 1000;
	var W = zeroV(varCount);
	if(guess)W=guess;
	var sigma = .01;
	var lambda = .1;
	var lambda_bar = 0;
	var p = timesV(-1,errorDerv(W));
	var r = p;
	var success = true;
	for(var k = 1;lengthV(r) > epsilon && k < max_iter;k++){

		if(success){
			var sigma_k = sigma/(lengthV(p));
			var s_k = timesV(1/sigma_k,diffV(errorDerv(sumV(W,timesV(sigma_k,p))),errorDerv(W)));
			var del_k = dot(p,s_k);
		}
		
		s_k = sumV(s_k,timesV((lambda-lambda_bar),p));
		del_k += (lambda-lambda_bar)*dot(p,p);

		if(del_k<=0){
			s_k += timesV((lambda-2*del_k/dot(p,p)),p);
			lambda_bar = 2*(lambda-del_k/dot(p,p));
			del_k = -del_k + lambda*dot(p,p);
			lambda = lambda_bar;
		}
		
		var mu_k = dot(p,r);
		var alpha_k = mu_k/del_k
		
		
		var delta_k = 2*del_k*(errorFunc(W)-errorFunc(sumV(W,timesV(alpha_k,p))))/(mu_k*mu_k);
		console.log(delta_k)
		if(delta_k>=0){
			W = sumV(W,timesV(alpha_k,p));
			var r_k1 = timesV(-1,errorDerv(W));
			lambda_bar = 0;
			success = true;
			if (k % varCount == 0){
				p = r_k1;
				
			}
			else{
				beta_k = (dot(r,r)-dot(r_k1,r))/mu_k;
				p = sumV(r_k1,timesV(beta_k,p));
				console.log(beta_k)				
			}
			if(delta_k>=0.75){
				lambda = lambda/2;
			}
			r = r_k1
		}
		else{
			lambda_bar = lambda;
			success = false;
		}

		if(delta_k<0.25){
			lambda = 4*lambda;
		}
		
	}
	return W
}

function logError(msg) {
    setTimeout(function() {
        throw new Error(msg);
    }, 0);
}

/*
 *  Plotting Functions
 */

function range(start,stop,step){
    var X = [];
    var numEl = (stop - start)/step;
    for(var i = 0; i < numEl; i++){
        X[i]=start+step*i;
    }
    return X;
}

function plot(x,y,cxt,center,scale,color){
    cxt.strokeStyle=color;
    cxt.beginPath();
    cxt.moveTo(center[0]+x[0]*scale[0],center[1]+y[0]*scale[1]);
    for(var i=0;i<x.length;i++){
        cxt.lineTo(center[0]+x[i]*scale[0],center[1]+y[i]*scale[1]);
    }
    cxt.stroke();
}

/*
 * Markov Chain Functions
 */
 
 function randomSample(weights){
	 var r = Math.random();
	 var tot = 0;
	 for(var i=0;i<weights.length;i++){
		 tot+=weights[i];
		 if(r<tot){
			 return i;
		 }
	 }
	 return -1
 }
 
 function generateStates(chain,init){
	 var states = [init];
	 var nextState = randomSample(chain[init]);
	 while(nextState!=-1){
		 states.push(nextState);
		 nextState = randomSample(chain[nextState]);
	 }
	 return states
 }
 
 function learnStates(statesList){
	 var max = 0;
	 for(var i=0;i<statesList.length;i++){
		 for(var j=0;j<statesList[i].length;j++){
			 if(statesList[i][j]>max){
				 max=statesList[i][j];
			 }
		 }
	 }
	 chain = zeroM(max+1,max+1);
	 for(var i=0;i<statesList.length;i++){
		 for(var j=0;j<statesList[i].length-1;j++){
			 var curr = statesList[i][j];
			 var next = statesList[i][j+1];
			 chain[curr][next]+=1;
		 }
	 }
	 
	 for(var k = 0;k<chain.length;k++){
		 if(lengthV(chain[k])>0){
			chain[k]=timesV(1/totalV(chain[k]),chain[k]);
		 }
	 }
	 
	 return chain;
 }
 
 function readWords(wordList, order){
	 var possibleStates = [""];
	 var statesList = [];
	 for(var i=0;i<wordList.length;i++){
		 var states = [0];
		 for(var j=0;j<wordList[i].length;j++){
			 var newState = possibleStates[states[j]]+wordList[i][j];
			 newState=newState.slice(-order);
			 nextState = possibleStates.indexOf(newState);
			 if(nextState==-1){
				 possibleStates.push(newState);
				 nextState = possibleStates.indexOf(newState);
			 }
			 states.push(nextState);
		 }
		 statesList.push(states);
	 }
	 var finalState = possibleStates.length;
	 for(var i=0;i<statesList.length;i++){
		 statesList[i].push(finalState);
	 }
	 return [statesList,possibleStates];
 }
 
 function convertStatesToWord(states,possibleStates){
	 var word = "";
	 for(var i = 0;i<states.length-1;i++){
		 word += possibleStates[states[i]].slice(-1);
	 }
	 return word
 }
 
