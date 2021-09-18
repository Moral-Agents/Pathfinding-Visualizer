const GRID = document.getElementById("grid")
const ROWS = 30;
const COLS = 50;
let canPaint = false
let run_btn = document.getElementById("run")
let graph = new Array(ROWS)
for (var i = 0; i < graph.length; i++) {
  	graph[i] = new Array(COLS)
}	

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
			if ( document.getElementById(((i*graph[i].length)+j).toString()).classList.contains('cell-filled') ){
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
})

