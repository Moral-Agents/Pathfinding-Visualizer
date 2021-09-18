const GRID = document.getElementById("grid")
const ROWS = 30;
const COLS = 50;
for(i = 0;i<ROWS * COLS;i++){
	let div = document.createElement("div")
	div.classList.add("cell")
	GRID.appendChild(div)
}