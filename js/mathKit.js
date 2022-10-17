/*
 * Vector Functions
 */
function zeroV(size){
    let returnVec=[];
    for(let i=0;i<size;i++){
        returnVec[i]=0;
    }
    return returnVec;
}

function timesV(c,u){
    let returnVec = [];
    for(let i=0;i<u.length;i++){
        returnVec[i]=u[i]*c;
    }
    return returnVec;
}

function sumV(u,v){
    let returnVec = [];
    for(let i=0;i<u.length;i++){
        returnVec[i]=u[i]+v[i];
    }
    return returnVec;
}

function diffV(u,v){
    let returnVec = [];
    for(let i=0;i<u.length;i++){
        returnVec[i]=u[i]-v[i];
    }
    return returnVec;
}

function dot(u,v){
    let returnVal = 0;
	if(u.length){
		for(let i=0;i<u.length;i++){
			returnVal+=u[i]*v[i];
		}
	}
	else{
		returnVal = u*v;
	}
    return returnVal;
}

function randV(){
    let ang=Math.random()*2*Math.PI;
    return [Math.cos(ang),Math.sin(ang)];
}

function randNV(size){
    let vec = []
    for(let i=0;i<size;i++){
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
    let minVec=vecs[0];
    let minLen=dot(minVec,minVec);
    for(let i in vecs){
        let v = vecs[i];
        if(dot(v,v)<minLen){
            minLen=dot(v,v);
            minVec=v;
        }
    }
    return minVec;
}

function totalV(vec){
	let total = 0;
	for(let i = 0; i < vec.length; i++){
		total+=vec[i];
	}
	return total;
}

/*
 * Matrix Functions
 */
 
 function totalM(matrix){
	let sum = 0;
	for(let i = 0;i<matrix.length;i++){
		sum+=totalV(matrix[i]);
	}
	return sum;
 }
 
 function randNM(r,c){
     let returnMatrix = [];
	 for(let i = 0;i < r;i++){
		 returnMatrix[i]=randNV(c);
	 }
	 return returnMatrix; 
 }
 
 function flattenM(matrix){
	let returnV = [];
	for(let i = 0; i<matrix.length; i++){
		for(let j = 0; j<matrix[i].length; j++){
			returnV.push(matrix[i][j]);
		}
	}
	return returnV
 }
 
 function buildM(flatV,rowLength){
	let returnMatrix = [];
	let rowCount = flatV.length/rowLength;
	for(let i = 0; i < rowCount; i++){
		returnMatrix[i]=[];
		for(let j = 0; j < rowLength; j++){
			returnMatrix[i][j]=flatV[rowLength*i+j]
		}
	}
	return returnMatrix
 }
 
 function eyeM(size){
    let returnMatrix = [];
    for(let i = 0; i < size; i++){
        returnMatrix[i]=zeroV(size);
        returnMatrix[i][i]=1;
    }
    return returnMatrix;
 }
 
 function zeroM(r,c){
	 let returnMatrix = [];
	 for(let i = 0;i < r;i++){
		 returnMatrix[i]=zeroV(c);
	 }
	 return returnMatrix;
 }
 
function cloneM(matrix){
    let returnMatrix = [];
    for(let i = 0;i<matrix.length;i++){
        returnMatrix[i]=matrix[i].slice();
    }
    return returnMatrix;
}

function transposeM(matrix){
    let returnMatrix = [];
	let colLength=1;
	if(matrix[0].length)colLength=matrix[0].length;
    for(let i = 0; i < colLength; i++){
        returnMatrix[i]=[];
        for(let j = 0; j < matrix.length; j++){
            returnMatrix[i][j]=matrix[j][i];
        }
    }
    return returnMatrix;
}

function diagM(matrix){
	let diagV = [];
	for(let i = 0; i < matrix.length; i++){
		diagV[i]=matrix[i][i];
	}
	return diagV
}

function traceM(matrix){
	let sum = 0;
	for(let i = 0; i < matrix.length; i++){
		sum+=matrix[i][i];
	}
	return sum
}

function timesM(alpha,matrix){
    let returnMatrix=[];
    for(let i=0;i<matrix.length;i++){
        returnMatrix[i]=[];
        for(let j=0;j<matrix[i].length;j++){
            returnMatrix[i][j]=alpha*matrix[i][j];
        }
    }
    return returnMatrix;
}

function multiM(matrix1,matrix2){
    let returnMatrix=[];
    for(let i=0;i<matrix1.length;i++){
        returnMatrix[i]=[];
        for(let j=0;j<matrix2[0].length;j++){
			let colLength = 1;
			if(matrix1[0].length)colLength=matrix1[0].length;
            if(colLength!==matrix2.length)return null;
            let entry = 0;
            for(let k=0;k<matrix1[0].length;k++){
                entry+=matrix1[i][k]*matrix2[k][j];
            }
            returnMatrix[i][j]=entry;
        }
    }
    return returnMatrix;
}

function multiMV(matrix,vector){
    let returnVec = [];
    for(let i=0;i<matrix.length;i++){
            if(matrix[i].length!==vector.length)return null;
            let entry = 0;
            for(let j=0;j<matrix[i].length;j++){
                entry+=matrix[i][j]*vector[j];
            }
            returnVec[i]=entry;
    }
    return returnVec;
}

function sumM(matrix1,matrix2){
    let returnMatrix=[];
    if(matrix1.length!==matrix2.length)return null;
    for(let i=0;i<matrix1.length;i++){
        returnMatrix[i]=[];
        if(matrix1[i].length!==matrix2[i].length)return null;
        for(let j=0;j<matrix1[i].length;j++){
            returnMatrix[i][j]=matrix1[i][j]+matrix2[i][j];
        }
    }
    return returnMatrix;
}

function dotM(matrix1,matrix2){
	let returnMatrix = [];
	if(matrix1.length!==matrix2.length)return null;
	if(matrix1[0].length!==matrix2[0].length)return null;
	for(let i=0;i<matrix1.length;i++){
        returnMatrix[i]=[];
        for(let j=0;j<matrix1[i].length;j++){
            returnMatrix[i][j]=matrix1[i][j]*matrix2[i][j];
        }
    }
	return returnMatrix
}

function diffM(matrix1,matrix2){
    let returnMatrix=[];
    if(matrix1.length!==matrix2.length)return null;
    for(let i=0;i<matrix1.length;i++){
        returnMatrix[i]=[];
        if(matrix1[i].length!==matrix2[i].length)return null;
        for(let j=0;j<matrix1[i].length;j++){
            returnMatrix[i][j]=matrix1[i][j]-matrix2[i][j];
        }
    }
    return returnMatrix;
}

function upperTriangularM(matrixIn){
    let matrix=cloneM(matrixIn);
    for(let i=0;i<matrix.length;i++){
        if(matrix[i][i]===0){
            for(let k = i+1;k<matrix.length;k++){
                if(matrix[k][i]!==0){
                    matrix[i]=sumV(matrix[i],matrix[k]);
                    break;
                }
            }
        }
        if(matrix[i][i]!==0){
            for(let j=i+1;j<matrix.length;j++){
                if(matrix[j][i]!==0){
                    let multi = -matrix[j][i]/matrix[i][i];
                    matrix[j] = sumV(matrix[j],timesV(multi,matrix[i]));
                }
            }
        }
    }
    return matrix
}

function detM(matrix){
    if(matrix.length===matrix[0].length){
        let uMatrix = upperTriangularM(matrix);
        let sum = 1;
        for(let i=0;i<uMatrix.length;i++){
            sum*=uMatrix[i][i];
        }
        return sum;
    }
    else{
        return null;
    }
}

function solveUpperTriM(matrix,b){
    let x = [];
    for(let i=matrix.length-1;i>=0;i--){
        x[i]=b[i];
        for(let j=i+1;j<matrix.length;j++){
            x[i] -= matrix[i][j]*x[j];
        }
        x[i] /= matrix[i][i];
    }
    return x;
}

function solveLowerTriM(matrix,b){
    let x = [];
    for(let i=0;i<matrix.length;i++){
        x[i]=b[i];
        for(let j=0;j<i;j++){
            x[i] -= matrix[i][j]*x[j];
        }
        x[i] /= matrix[i][i];
    }
    return x;
}

function decompLUM(matrixIn){
    let matrix=cloneM(matrixIn);
    let P=eyeM(matrix.length);
    let L=eyeM(matrix.length);
    for(let i=0;i<matrix.length;i++){
        if(matrix[i][i]===0){
            for(let k = i+1;k<matrix.length;k++){
                if(matrix[k][i]!==0){
                    P[i][i]=0;
                    P[k][k]=0;
                    P[i][k]=1;
                    P[k][i]=1;
                    let temp = matrix[i];
                    matrix[i]=matrix[k];
                    matrix[k]=temp;
                    break;
                }
            }
        }
        if(matrix[i][i]!==0){
            for(let j=i+1;j<matrix.length;j++){
                //if(matrix[j][i]!=0){
                    L[j][i] = matrix[j][i]/matrix[i][i];
                    matrix[j] = sumV(matrix[j],timesV(-L[j][i],matrix[i]));
                //}
            }
        }
    }
    return [L,matrix,P];
}

function choleskyM(matrix){
    let L = [];
    let n = matrix.length;
    for(let i = 0; i < n; i++){
        L[i]=zeroV(n);
        for(let j = 0; j <= i; j++){
            if(i===j){
                let sum = 0;
                for(let k = 0; k <= j-1; k++){
                    sum+=L[j][k]*L[j][k];
                }
                L[i][j]=Math.sqrt(matrix[i][j]-sum);
                
            }
            else{
                let sum = 0;
                for(let k = 0; k <= j-1; k++){
                    sum+=L[i][k]*L[j][k];
                }
                L[i][j]=(matrix[i][j]-sum)/L[j][j];
            }
        }
    }
    return L;
}

function inverseM(matrix){
    let LUP=decompLUM(matrix);
    let L = LUP[0];
    let U = LUP[1];
    let P = LUP[2];
    let n=matrix.length;
    let L_T_inv = [];
    let U_T_inv = [];
    for(let i = 0; i < n; i++){
        let b = zeroV(n);
        b[i]=1;
        L_T_inv[i] = solveLowerTriM(L,b);
    }
    let L_inv = transposeM(L_T_inv);
    for(let i = 0; i < n; i++){
        let b = zeroV(n);
        b[i]=1;
        U_T_inv[i] = solveUpperTriM(U,b);
    }
    let U_inv = transposeM(U_T_inv);
    return multiM(multiM(U_inv,L_inv),P);
}

/*
 *  Neural Net Functions
 */
function sigmoid(z){
    return 1/(1+Math.exp(-z));
}

function softmax(v){
    let expV = v.map(Math.exp);
    let sum = expV.reduce((a,b) => a+b,0);
    return expV.map((a)=>a/sum);
}

function initNeuralNet(sizes){
    let biases = [];//sizes.slice(1).map((n)=>randNV(n));
    let weights = [];
    for(let i=0;i<sizes.length-1;i++){
        biases[i]=randNV(sizes[i+1]);
        weights[i]=randNM(sizes[i+i],sizes[i]);
    }
    return [weights,biases]
}

function feedForward(weights, biases, input){
    let a = input
    for(let i =0;i<weights.length;i++){
        let z = sumV(multiMV(weights[i],a),biases[i]);
        a = z.map(sigmoid)
    }
    return a;
}
/*
 *  Gaussian Process Functions
 */
function randN(mean,std){
    let norm = (Math.random()+Math.random()+Math.random()+Math.random()+Math.random()+Math.random() + Math.random()+Math.random()+Math.random()+Math.random()+Math.random()+Math.random() - 6);
    return norm*std+mean;
}
 
 
function radialBasis(X_0, X_P, params){
	let diff;
	if(!X_0.length){
		diff = X_0-X_P
	}
	else{
		diff = diffV(X_0,X_P);
	}
    let delta = dot(diff,diff)===0?1:0;
    return params[0]*Math.exp(-params[1]*dot(diff,diff)/2)+(params[2])*delta;
}

function covarianceMatrix(X_1,X_2,params){
    let K = [];
    let X1_T=X_1;
    let X2_T=X_2;
    let n = X1_T.length;
    let m = X2_T.length;
    for(let i = 0; i < n; i++){
        K[i]=[];
        for(let j = 0; j < m; j++){
            K[i][j]=radialBasis(X1_T[i],X2_T[j],params);
        }
    }
    return K;
}

function generateGP(X,X_p,y_p,params){
    let mu, sigma;
    if(y_p.length===0){
        sigma = covarianceMatrix(X,X,params);
        mu = zeroV(X.length);
    }
    else{
        let K_p = covarianceMatrix(X_p,X_p,params);
        let K_p_inv = inverseM(K_p);
        let K = covarianceMatrix(X,X,params);
        let K_K_p = covarianceMatrix(X,X_p,params);
        let K_K_p_T = transposeM(K_K_p);
        sigma = diffM(K,multiM(K_K_p,multiM(K_p_inv,K_K_p_T)));
        mu = multiMV(multiM(K_K_p,K_p_inv),y_p);
    }
    return [mu,sigma];
}

function sampleGP(mu,sigma){
    let y;
    let L = choleskyM(sigma);
    let u = [];
    for(let i=0;i<mu.length;i++){
        u[i] = randN(0,1);
    }
    y = sumV(mu,multiMV(L,u));
    return y;
}

function rbfLikelihood(X,Y,params){
	let N = X.length;//number of "samples"
    let D = X[0].length;
	if(!X[0].length){
		D = 1;//dimension of "sample"
		let X_temp=X;
		X=[];
		X[0]=X_temp;
		X=transposeM(X)
	}
	if(!Y[0].length){
		let Y_temp=Y;
		Y=[];
		Y[0]=Y_temp;
		Y=transposeM(Y)
	}
	let Kx = covarianceMatrix(X,X,params);
	let Kxi = inverseM(Kx);
    return -(N * D / 2) * Math.log(2 * Math.PI) - (D / 2) * Math.log(detM(Kx)) - 0.5 * traceM(multiM(Kxi, multiM(Y, transposeM(Y))))
}

function rbfLikelihoodDerivative(X,Y,params){
	let N = X.length;//number of "samples"
	if(!X[0].length){
		let X_temp=X;
		X=[];
		X[0]=X_temp;
		X=transposeM(X)
	}
	if(!Y[0].length){
		let Y_temp=Y;
		Y=[];
		Y[0]=Y_temp;
		Y=transposeM(Y)
	}
	let D = X[0].length;
	
	//chil = xml-xnl
	let Kx = covarianceMatrix(X,X,params);
	let Kxi = inverseM(Kx);
	let dLdKx = diffM(timesM(1/2,multiM(Kxi,multiM(multiM(Y,transposeM(Y)),Kxi))),timesM(D/2,Kxi))
	let dLdX = []
	for(let l = 0; l<D; l++){
		let chi_l = [];
		for(let i = 0; i < N; i++){
			chi_l[i] = []
			for(let j=0; j < N; j++){
				chi_l[i][j] = X[i][l]-X[j][l]
			}
		}
		let dLdXl_matrix = dotM(dotM(dLdKx,chi_l),Kx);
		dLdX[l] = []
		for(let i = 0; i < dLdXl_matrix.length; i++){
			dLdX[l][i]=totalV(dLdXl_matrix[i]);
		}
		dLdX[l] = timesV(params[1],dLdX[l]);
	}
	
	let dKda1 = timesM(1/params[0],diffM(Kx,timesM(params[2],eyeM(N))));
	let dKda2 = dotM(timesM(-1/2,distanceMatrix(X)),Kx);
	let dKda3 = eyeM(N);
	
	let dLda1 = totalM(dotM(dLdKx,dKda1));
	let dLda2 = totalM(dotM(dLdKx,dKda2));
	let dLda3 = totalM(dotM(dLdKx,dKda3));
	
	let gradient = flattenM(dLdX)
	gradient[gradient.length] = dLda1;
	gradient[gradient.length] = dLda2;
	gradient[gradient.length] = dLda3;
	
	return gradient
	//a2sum (kxi y w w yt kxi - d/2kxi  .*  chil  .*  kx
}

function distanceMatrix(X){
	let distMat = [];
	for(let i = 0; i < X.length; i++){
		distMat[i]=[];
		for(let j = 0; j < X.length; j++){
			if(X[i].length){
				let dist = diffV(X[i],X[j])
				distMat[i][j]=dot(dist,dist);
			}
			else{
				let dist = X[i]-X[j]
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
	return Astar(edges,vertexNum,start,end,()=>0)
}

function Astar(edges,vertexNum,start,end,heuristic){
	let vertices=[];
	let unvisited=[];
	let parent=[];
	for(let i=0;i<vertexNum;i++){
		vertices[i]=Infinity;
		unvisited[i]=true;
		parent[i]=-1;
	}
	vertices[start]=0;
	unvisited[start]=false;
	let current=start;
	while(unvisited[end]){
		for(let e in edges){
			if(edges[e][0]===current){
				let newDist=edges[e][2]+vertices[current];
				if(newDist<vertices[edges[e][1]]){
					vertices[edges[e][1]]=newDist
					parent[edges[e][1]]=current;
				}
			}
			else if(edges[e][1]===current){
				let newDist=edges[e][2]+vertices[current];
				if(newDist<vertices[edges[e][0]]){
					vertices[edges[e][0]]=newDist
					parent[edges[e][0]]=current;
				}
			}
		}
		unvisited[current]=false
		let next = vertices.reduce(function(p,v,i){
			return ((vertices[p]+heuristic(p)<v+heuristic(i) || !unvisited[i]) ? p : i);
		},vertices[unvisited.indexOf(true)]);
		if(next===current)return false
		current=next
	}
	
	let path = [];
	current = end;
	while(current!==start){
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
    let d = dot(axis,polygon[0]);
    let min=d,max=d;
    for(let i in polygon){
        d=dot(axis,polygon[i])
        if(d<min)min=d;
        if(d>max)max=d;
    }
    return [min,max]
}



function polygonsOverlapAxis(axis,polygon1,polygon2){
    let interval1 = calculateInterval(axis,polygon1);
    let interval2 = calculateInterval(axis,polygon2);
    
    if(interval1[0]>interval2[1] || interval2[0]>interval1[1])return false;
    
    let overlap1 = interval1[1]-interval2[0];
    let overlap2 = interval2[1]-interval1[0];
    let depth = Math.min(overlap1,overlap2);
    
    if(depth===0)return false;
    
    return timesV(depth,normV(axis));
}

function lineToPointFunc(l1,l2,p){
    let d=diffV(p,l1);
        let v=diffV(l2,l1);
        let proj_amount=(dot(v,d)/dot(v,v));
        if(proj_amount<0){
            return d;
        }
        if(proj_amount>1){
            return diffV(p, l2);
        }
    return diffV(d, timesV(proj_amount, v));
}

function linesIntersect(p1,e1,p2,e2){
    let v1 = diffV(e1,p1);
    let v2 = diffV(e2,p2);
    let u=diffV(p1,p2);
    let t1;
    let t2;
    let v1_p=[-v1[1],v1[0]];
    let v2_p=[-v2[1],v2[0]];
    let v1_p_d_v2=dot(v1_p,v2);
    let v2_p_d_v1=dot(v2_p,v1);
    if(v1_p_d_v2===0){
        return false;
    }
    else{
        t1=-dot(u,v2_p)/v2_p_d_v1;
        t2=dot(u,v1_p)/v1_p_d_v2;
    }
    return (t1 > 0 && t1 < 1 && t2 > 0 && t2 < 1);
}

function lineIntersectPolygon(p1,e1,polygon){
	for(let i=0;i<polygon.length-1;i++){
		  if(linesIntersect(p1,e1,polygon[i], polygon[i+1]))return true
	}
	if(linesIntersect(p1,e1,polygon[polygon.length-1], polygon[0]))return true
	
	return false
}

function pointInPolygon(point,polygon){
    let smallestX = polygon[0][0];
    for(let i=1;i<polygon.length;i++){
        if(polygon[i][0]<smallestX){
            smallestX=polygon[i][0];
        }
    }
    let rayStart=[smallestX-1,point[1]];
    let rayEnd=point;
    let intersects=0;
    for(let j=0;j<polygon.length-1;j++){
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
    let sum = [0,0];
    for(let i in polygon){
        sum=sumV(sum,polygon[i]);
    }
    return timesV(1/polygon.length,sum);
}

function polygonIntersect(poly1,poly2){
    let allOverlap=[];
    for(let j=poly1.length-1, i=0; i<poly1.length; j=i, i++){
        let norm = normV(perpV(diffV(poly1[i],poly1[j])));
        let overlap = polygonsOverlapAxis(norm,poly1,poly2);
        if(overlap)allOverlap.push(overlap);
    }
    for(let j=poly2.length-1, i=0; i<poly2.length; j=i, i++){
        let norm = normV(perpV(diffV(poly2[i],poly2[j])));
        let overlap = polygonsOverlapAxis(norm,poly1,poly2);
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
    let lineStart;
    let lineEnd;
    
    let minV=lineToPointFunc(polygon[polygon.length-1],polygon[0],point);
    let minDist=dot(minV,minV);
    for(let i=1;i<polygon.length;i++){
        lineStart=polygon[i-1];
        lineEnd=polygon[i];
        let vec = lineToPointFunc(lineStart,lineEnd,point);
        let dist = dot(vec,vec);
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
    let v1 = diffV(e1,p1);
    let v2 = diffV(e2,p2);
    let u=diffV(p1,p2);
    let t1;
    let t2;
    let v1_p=[-v1[1],v1[0]];
    let v2_p=[-v2[1],v2[0]];
    let v1_p_d_v2=dot(v1_p,v2);
    let v2_p_d_v1=dot(v2_p,v1);
    if(v1_p_d_v2===0){
        return diffV(p2,p1);
    }
    else{
        t1=-dot(u,v2_p)/v2_p_d_v1;
        t2=dot(u,v1_p)/v1_p_d_v2;
    }
    if(t1>=0 && t1<=1 && t2>=0 && t2<=1){
        return [0,0];
    }
    let d=[];
    d[0] = lineToPointFunc(p1,e1,p2);
    d[1] = lineToPointFunc(p1,e1,e2);
    d[2] = timesV(-1,lineToPointFunc(p2,e2,p1));
    d[3] = timesV(-1,lineToPointFunc(p2,e2,e1));
    let min=dot(d[0],d[0]);
    let minV=d[0];
    for(let i=1;i<4;i++){
        if(dot(d[i],d[i])<min){
            min=dot(d[i],d[i]);
            minV=d[i];

        }
    }
    return minV;
}

function pointCloudConvexHull(points){
    let convexHull=[];
    let pointOnHull = points[0];
    for(let i=1;i<points.length;i++){
        if(points[i][0]<pointOnHull[0]){
            pointOnHull=points[i];
        }
    }
    let endpoint;
    let i=0;
    do{
        convexHull[i]=pointOnHull;
        endpoint=points[0];
        for(let j=1;j<points.length;j++){
            if(endpoint===pointOnHull || leftOfLine(pointOnHull,endpoint,points[j])){
                endpoint=points[j];
            }
        }
        i++;
        pointOnHull=endpoint;
    }while(endpoint!==convexHull[0])
    return convexHull;
}

function leftOfLine(l1,l2,p){
    let area = l1[0]*(l2[1]-p[1])+l2[0]*(p[1]-l1[1])+p[0]*(l1[1]-l2[1]);
    return area>0;
}



/*
 * Solver Functions
 */

function newtonsMethod(func,der,initial,error,tries){
    let newGuess=initial-func(initial)/der(initial);
    if(Math.abs(newGuess-initial)<error || tries<0){
        return newGuess;
    }
    else{
        return newtonsMethod(func,der,newGuess,error,tries-1);
    }
}

function RungeKuttaSolve(x,t,func,size){
    let x_next;
    let a=[];
    let b=[]
    let c=[]
    let d=[];
    if(x.length){
        for(let i=0;i<x.length;i++){
            a[i] = func[i](x,t);
        }
        for(let i=0;i<x.length;i++){
            b[i] = func[i](sumV(x,timesV(size/2,a)),t+size/2);
        }
        for(let i=0;i<x.length;i++){
            c[i] = func[i](sumV(x,timesV(size/2,b)),t+size/2);
        }
        for(let i=0;i<x.length;i++){
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
	let max_iter = 1000;
	let W = zeroV(varCount);
	if(guess)W=guess;
	let sigma = .01;
	let lambda = .1;
	let lambda_bar = 0;
	let p = timesV(-1,errorDerv(W));
	let r = p;
	let success = true;
    let del_k, s_k, sigma_k;
	for(let k = 1;lengthV(r) > epsilon && k < max_iter;k++){

		if(success){
			sigma_k = sigma/(lengthV(p));
			s_k = timesV(1/sigma_k,diffV(errorDerv(sumV(W,timesV(sigma_k,p))),errorDerv(W)));
            del_k = dot(p,s_k);
		}
		
		s_k = sumV(s_k,timesV((lambda-lambda_bar),p));
		del_k += (lambda-lambda_bar)*dot(p,p);

		if(del_k<=0){
			s_k += timesV((lambda-2*del_k/dot(p,p)),p);
			lambda_bar = 2*(lambda-del_k/dot(p,p));
			del_k = -del_k + lambda*dot(p,p);
			lambda = lambda_bar;
		}
		
		let mu_k = dot(p,r);
		let alpha_k = mu_k/del_k
		
		
		let delta_k = 2*del_k*(errorFunc(W)-errorFunc(sumV(W,timesV(alpha_k,p))))/(mu_k*mu_k);
		console.log(delta_k)
		if(delta_k>=0){
			W = sumV(W,timesV(alpha_k,p));
			let r_k1 = timesV(-1,errorDerv(W));
			lambda_bar = 0;
			success = true;
			if (k % varCount === 0){
				p = r_k1;
				
			}
			else{
				let beta_k = (dot(r,r)-dot(r_k1,r))/mu_k;
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
    let X = [];
    let numEl = (stop - start)/step;
    for(let i = 0; i < numEl; i++){
        X[i]=start+step*i;
    }
    return X;
}

function plot(x,y,cxt,center,scale,color){
    cxt.strokeStyle=color;
    cxt.beginPath();
    cxt.moveTo(center[0]+x[0]*scale[0],center[1]+y[0]*scale[1]);
    for(let i=0;i<x.length;i++){
        cxt.lineTo(center[0]+x[i]*scale[0],center[1]+y[i]*scale[1]);
    }
    cxt.stroke();
}

/*
 * Markov Chain Functions
 */
 
 function randomSample(weights){
	 let r = Math.random();
	 let tot = 0;
	 for(let i=0;i<weights.length;i++){
		 tot+=weights[i];
		 if(r<tot){
			 return i;
		 }
	 }
	 return -1
 }
 
 function generateStates(chain,init){
	 let states = [init];
	 let nextState = randomSample(chain[init]);
	 while(nextState!==-1){
		 states.push(nextState);
		 nextState = randomSample(chain[nextState]);
	 }
	 return states
 }
 
 function learnStates(statesList){
	 let max = 0;
	 for(let i=0;i<statesList.length;i++){
		 for(let j=0;j<statesList[i].length;j++){
			 if(statesList[i][j]>max){
				 max=statesList[i][j];
			 }
		 }
	 }
	 let chain = zeroM(max+1,max+1);
	 for(let i=0;i<statesList.length;i++){
		 for(let j=0;j<statesList[i].length-1;j++){
			 let curr = statesList[i][j];
			 let next = statesList[i][j+1];
			 chain[curr][next]+=1;
		 }
	 }
	 
	 for(let k = 0;k<chain.length;k++){
		 if(lengthV(chain[k])>0){
			chain[k]=timesV(1/totalV(chain[k]),chain[k]);
		 }
	 }
	 
	 return chain;
 }
 
 function readWords(wordList, order){
	 let possibleStates = [""];
	 let statesList = [];
     let nextState;
	 for(let i=0;i<wordList.length;i++){
		 let states = [0];
		 for(let j=0;j<wordList[i].length;j++){
			 let newState = possibleStates[states[j]]+wordList[i][j];
			 newState=newState.slice(-order);
			 nextState = possibleStates.indexOf(newState);
			 if(nextState===-1){
				 possibleStates.push(newState);
				 nextState = possibleStates.indexOf(newState);
			 }
			 states.push(nextState);
		 }
		 statesList.push(states);
	 }
	 let finalState = possibleStates.length;
	 for(let i=0;i<statesList.length;i++){
		 statesList[i].push(finalState);
	 }
	 return [statesList,possibleStates];
 }
 
 function convertStatesToWord(states,possibleStates){
	 let word = "";
	 for(let i = 0;i<states.length-1;i++){
		 word += possibleStates[states[i]].slice(-1);
	 }
	 return word
 }
 
