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
//console.log(Grafo)

function remove_edge(G, a, b){
	G[a].splice(G[a].indexOf(b), 1);
  G[b].splice(G[b].indexOf(a), 1);
}

function add_edge(G, v, u){	
	Grafo[v].push(u);
  Grafo[u].push(v);
}


function a_star(g,s,w){
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
      comp_vecino(vecino)
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

let posicion = start
console.log("Posicion inicial: ", posicion)

while(posicion != goal){
	let camino0 = a_star(Grafo,posicion, goal)
  if(!camino0.length){
  	console.log("No hay camino")
    break
  }
  posicion = camino0[1]
  console.log("Moverse a posicion: ", posicion)
}

if(posicion == goal){
	console.log("llegaste")
}