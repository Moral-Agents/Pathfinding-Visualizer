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
// Numero de nodos en el Grafo
const nn = ROWS*ROWS
// Auxiliar para calculo de nodos adyacentes
const n = ROWS
// Nodo de la Posicion Inicial
const start = nn-1
// Nodo de la Posicion Destino
const goal = 0

// Grafo definido como lista de adyacencia
let Grafo = new Array(nn)
for (let i = 0; i < nn; i++){
    Grafo[i] = new Array()
}
// Asignacion de nodos adyacentes en la lista o "Creacion de Aristas"
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

// Funcion para eliminar nodos adyacentes al nodo v o  para "eliminar aristas"
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

// Implementacion de A*
// Parametros: g: lista de adyacencia del grafo, s: posicion inicial, w: posicion destino
function a_star(g,s,w=0){	
  // Numero de nodos en el grafo
  var nn = g.length
  // Auxiliar para calculo de la heuristica
  var n = Number(Math.sqrt(nn))
  // Auxiliar para defnir el recorrido por el que se llego al destino
  var fin = -1
  
  // Arreglo de padres (nodo por el que se llego) de los nodos 
  var parent = new Array(nn)  
  // Arreglo de costo para llegar a un nodo desde la posicion inicial
  var g_cost = new Array(nn)
  // Arreglo de costo heuristico para llegar a la posicion destino desde un nodo
  var h_cost = new Array(nn)
  // Arreglo de la suma de los costos
  var f_cost = new Array(nn)
  
  // Los padres se inicializan en vacio 
  parent.fill(null)
  // g_cost se inicializan en un valor muy grande (que sabemos no se va a alcanzar) o infinito
  g_cost.fill(999999)
  
  // Calculo de la heuristica
  for (var v = 0; v < nn; v++) {
			h_cost[v] = Math.floor(v / n) + (v % n)      
		}
  
  // Arreglo de nodos para evaluar
  var open = new Array()
  // Arreglo de nodos ya evaluados
  var closed = new Array()

  // Se agrega el nodo inicial a los abiertos y se define su costo g y costo f
  open.push(s)
  g_cost[s] = 0
  f_cost[s] = g_cost[s] + h_cost[s]
    
  // Funcion para hallar el nodo con menor costo f entre la lista de abiertos  
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
  
  // Funcion para comparar y actualizar el costo de los nodos vecinos con el nodo actual
  function comp_vecino(veci, current0) {  
	  // Si el costo del nodo vecino es mayor al costo del nodo actual + 1 o el nodo vecino no esta en la lista de abiertos: 
	  // se asigna el nuevo costo g y el costo f, se asigna el nodo actual como el padre del nodo vecino y si no esta en la lista de abiertos se añade
	if ((g_cost[current0] + 1 < g_cost[veci]) || (!open.includes(veci))) {
		g_cost[veci] = g_cost[current0] + 1
		f_cost[veci] = g_cost[veci] + h_cost[veci]    
		parent[veci] = current0
		if (!open.includes(veci)) {
			open.push(veci)
    	}
    }
  }
  
// Itera hasta hallar la solucion o hallar que no hay solucion
  while(true){
  	if (!open.length){
	// Respuesta si no hay solucion
    	return new Array()
    }
    
    // hallar el nodo con menor costo f entre la lista de abiertos  
    var current = lowestf()       
    
    // eliminar el nodo de los abiertos
    open.splice(open.indexOf(current), 1)
    // añadir a los cerrados
    closed.push(current)
	  
    // si la posicion actual es la posicion destino se marca y termina de iterar
    if(current == w){
    	fin = current
      break
    }
    
    // Se compara los nodos adyacentes/vecinos al nodo actual si no estan cerrados
    for (var x = 0; x < g[current].length; x++) {
    	var vecino = g[current][x]
      if (closed.includes(vecino)){
      	continue
      }
      comp_vecino(vecino, current)
    }
  }
    
  //Usando los padres de los nodos se define el camino mas corto hallado
  var camino = new Array()
  var aux = fin
  
  while (aux != null) {
  	camino.push(aux)
    aux = parent[aux]
    }
  
	camino.reverse()
	// Retorna el camino
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

	//Crear inicio
	if(i == 899){
		let div_player = document.createElement("div")
		div_player.classList.add("player")
		div.appendChild(div_player)
	}

	//Crear meta
	if(i == 0){
		let div_target = document.createElement("div")
		div_target.classList.add("target")
		div_target.innerHTML = "X"
		div.appendChild(div_target)
	}
}

function create_array(){
	for(i = 0;i<graph.length;i++){
		for(j = 0;j<graph[i].length;j++){
			if ( document.getElementById(((i*ROWS)+j).toString()).classList.contains('cell-filled') ){
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
	if(!camino0.length){
		alert("No hay camino")
	}else{		
  		console.log(camino0)
	  	for(i = 0;i<camino0.length;i++){
	  		let ab = document.getElementById(camino0[i].toString())
	  		ab.classList.add("road")
	  	}
	}
})

