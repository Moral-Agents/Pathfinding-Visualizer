const GRID = document.getElementById("grid")
const ROWS = 30;
const COLS = ROWS;
let canPaint = false
let run_btn = document.getElementById("run")
let graph = new Array(ROWS)
for (var i = 0; i < graph.length; i++) {
  	graph[i] = new Array(COLS)
}	

//-----
const n = ROWS
const nn = n*n
const start = nn-1
const goal = 0

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

//--------

GRID.addEventListener("mousedown", function(){
	canPaint = true	
})

GRID.addEventListener("mouseup", function(){
	canPaint = false
})

for(i = 0;i<ROWS * COLS;i++){
	//Crear grid
	let div = document.createElement("div")
	div.classList.add("cell")
	div.setAttribute('id',i.toString())
	GRID.appendChild(div)

	//Añadir evento para que las celdas se pinten
	let current_div = document.getElementById(i.toString())
	current_div.addEventListener("mouseover", function(){
		if(canPaint){
			current_div.classList.add("cell-filled")	
		}
	})

}

function create_array(){
	for(i = 0;i<graph.length;i++){
		for(j = 0;j<graph[i].length;j++){
			if ( document.getElementById(((i*ROWS)+j).toString()).classList.contains('cell-filled') ){
				console.log(((i*ROWS)+j))
				graph[i][j] = 1
			} else{
				graph[i][j] = 0
			}
		}
	}
}
run_btn.addEventListener("click",function(){
	create_array();
	console.log(graph)
	
	for(i = 0;i<graph.length;i++){
		for(j = 0;j<graph[i].length;j++){
  			if (graph[i][j]){
				remove_edge(Grafo, i*n+j)
			}
		}
	}	
	let camino0 = a_star(Grafo,start)
	let = trayectoX = []
	let = trayectoY = []
	if(!camino0.length){
		console.log("No hay camino")
	}else{		
		for (var x = 0; x < camino0.length; x++){      
    			trayectoX.push(Math.floor(camino0[x] / n))
    			trayectoY.push((camino0[x] % n))
  		}
  	console.log(camino0)
  		for(i = 0;i<camino0.length;i++){
  			let ab = document.getElementById(camino0[i].toString())
  			ab.classList.add("player")
  		}
	}
})

