let n = 4
let nn = n*n
let start = nn-1
let goal = 0

let Grafo = new Array(nn)
for (let i = 0; i < nn; i++){
    Grafo[i] = new Array()
}
for (let v = 0; v < nn; v++){
    if (v >= n) {
        let u = v - n;
        Grafo[v].push(u);
        Grafo[u].push(v);
    }
    if (v % n != 0) {
        let u = v - 1;
        Grafo[v].push(u)
        Grafo[u].push(v)
    }
}

function remove_edge(G, v){
	v_up = v - n
	v_down = v + n
	v_left = v - 1
	v_right = v + 1

	if (v_up >= 0){		
		G[v].splice(G[v].indexOf(v_up), 1);
		G[v_up].splice(G[v_up].indexOf(v), 1);	
	}
	if (v_down < nn){		
		G[v].splice(G[v].indexOf(v_down), 1);
		G[v_down].splice(G[v_down].indexOf(v), 1);	
	}
	if (v_left % n != n - 1){		
		G[v].splice(G[v].indexOf(v_left), 1);
		G[v_left].splice(G[v_left].indexOf(v), 1);	
	}
	if (v_right % n != 0){		
		G[v].splice(G[v].indexOf(v_right), 1);
		G[v_right].splice(G[v_right].indexOf(v), 1);	
	}
}

function add_edge(G, v){
	v_up = v - n
	v_down = v + n
	v_left = v - 1
	v_right = v + 1

	if (v_up >= 0){		
		Grafo[v].push(v_up);
		Grafo[v_up].push(v);
	}
	if (v_down < nn){		
		Grafo[v].push(v_down);
		Grafo[v_down].push(v);
	}
	if (v_left % n != n - 1){		
		Grafo[v].push(v_left);
		Grafo[v_left].push(v);
	}
	if (v_right % n != 0){		
		Grafo[v].push(v_right);
		Grafo[v_right].push(v);
	}
}

let graph = [[0,1,1,1],[0,0,0,0],[0,0,1,1],[0,0,0,0]]

for(i = 0;i<graph.length;i++){
	for(j = 0;j<graph[i].length;j++){
  	if (graph[i][j]){
    	remove_edge(Grafo, i*n+j)
      }
		}
	}

function a_star(g,s,w=0){
	var nn = g.length
  var n = Number(Math.sqrt(nn))
  var fin = -1
  
  var parent = new Array(nn)
  var f_cost = new Array(nn)
  var g_cost = new Array(nn)
  var h_cost = new Array(nn)
  
  parent.fill(null)
  g_cost.fill(999)
  
  for (var v = 0; v < nn; v++) {
			h_cost[v] = Math.floor(v / n) + (v % n)      
		}
    
	var open = new Array()
  var closed = new Array()

  open.push(s)
  g_cost[s] = 0
  f_cost[s] = g_cost[s] + h_cost[s]
    
    
  function lowestf() {
  	var minf = f_cost[open[0]]
    var mini = open[0]
    for (var x = 0; x < open.length; x++) {
    	if (f_cost[open[x]] < minf) {
      	minf = f_cost[open[x]]
        mini = open[x]
        }
			}
		
    return mini
    }
    
	function comp_vecino(veci, current0) {  
	if ((g_cost[current0] + 1 < g_cost[veci]) || (!open.includes(veci))) {
		g_cost[veci] = g_cost[current0] + 1
		f_cost[veci] = g_cost[veci] + h_cost[veci]    
		parent[veci] = current0
		if (!open.includes(veci)) {
			open.push(veci)
    	}
    }
  }
  
  while(true){
  	if (!open.length){
    	return new Array()
    }
    
    var current = lowestf()       
    
    open.splice(open.indexOf(current), 1)
    closed.push(current)
    if(current == w){
    	fin = current
      break
    }
    
    for (var x = 0; x < g[current].length; x++) {
    	var vecino = g[current][x]
      if (closed.includes(vecino)){
      	continue
      }
      comp_vecino(vecino, current)
    }
  }
    
  
  var camino = new Array()
  var aux = fin
  
  while (aux != null) {
  	camino.push(aux)
    aux = parent[aux]
    }
  
	camino.reverse()
	return camino
}


let = trayectoX = []
let = trayectoY = []

trayectoX.push(Math.floor(start / n))
trayectoY.push((start % n))

let camino0 = a_star(Grafo,start)
if(!camino0.length){
	console.log("No hay camino")
}else{
	for (var x = 1; x < camino0.length; x++){      
    trayectoX.push(Math.floor(camino0[x] / n))
    trayectoY.push((camino0[x] % n))
  }
  console.log(trayectoX)
  console.log(trayectoY)
}
