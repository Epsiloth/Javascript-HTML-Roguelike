import {Roguelike} from './roguelike.js';

//Print level on screen
function printLevel(Game, body, endgame){
	body.innerHTML = "";

	let style = document.createElement("style");
	style.innerHTML = "table{width:50%;} td, th{height:50;} table, th, td{border:3px solid black;} "+
	".wall{background-color: black;} .exit{background-color:green;} .item{background-color:yellow;} .player{background-color:blue;} "+
	".enemy{background-color:red;}";
	document.head.appendChild(style);

	let instructions = document.createElement("p");
	instructions.innerHTML = "<b>Use the WASD keys to move! Avoid the red Enemies and make your way to the green Exit! "+
	"<br>You can also try to get the yellow Bonus for extra points!</b>";
	body.appendChild(instructions);

	let table = document.createElement("table");
	body.appendChild(table);
	for(let i=0;i<Game.currentlevel.length;i++){
		let row = document.createElement("tr");
		table.appendChild(row);
		for(let j=0;j<Game.currentlevel[i].length;j++){
			if(Game.currentlevel[i][j] === "5"){
				let cell = document.createElement("td");
				cell.setAttribute("class", "wall");
				row.appendChild(cell);
			}else if(Game.currentlevel[i][j] === "_"){
				let cell = document.createElement("td");
				cell.setAttribute("class", "floor");
				row.appendChild(cell);
			}else if(Game.currentlevel[i][j] === "2"){
				let cell = document.createElement("td");
				cell.setAttribute("class", "enemy");
				row.appendChild(cell);
			}else if(Game.currentlevel[i][j] === "*"){
				let cell = document.createElement("td");
				cell.setAttribute("class", "item");
				row.appendChild(cell);
			}else if(Game.currentlevel[i][j] === "6"){
				let cell = document.createElement("td");
				cell.setAttribute("class", "exit");
				row.appendChild(cell);
			}else if(Game.currentlevel[i][j] === "0"){
				let cell = document.createElement("td");
				cell.setAttribute("class", "player");
				row.appendChild(cell);
			}
		}
	}
	if(!endgame){
		let score = document.createElement("div");
		score.innerHTML = "<br/><b>Score:</b> " + Game.score;
		body.appendChild(score);
	}
	else{
		let score = document.createElement("div");
		score.innerHTML = "<br/><b>Score:</b> " + "<font color=\"red\"><b>" + Game.score + "</b></font> &emsp; <i>GAME OVER!!</i>";
		body.appendChild(score);
	}
}

let direction;

//Listen for player input
window.addEventListener("keydown", function (event) {
  if (event.defaultPrevented) {
    return; // Do nothing if the event was already processed
  }
  direction=event.key;
  event.preventDefault();
}, true);

//Initialize the game
let Game = new Roguelike(20, 10);
let endgame = false;

let body = document.body;

//Generate level
Game.createLevel(endgame);
printLevel(Game, body, endgame);

//Start the game
if(!endgame){
	let myInterval = window.setInterval(
	function(){
		if(endgame){
			window.clearInterval(myInterval);
			printLevel(Game, body, endgame);
		}else{
			if(direction != ""){
				endgame = Game.Move(direction);
				printLevel(Game, body, endgame);
				direction = "";
			}
		}
	},
	500);
}
