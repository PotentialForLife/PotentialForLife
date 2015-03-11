//CONSTS
var TILE_COLORS = [ '#CC5200', '#E65C00', '#FF6600', '#FF7519', '#FF8533', '#FF9900', '#80FFFF', '#FFC299', '#FF0000'];
var rocksimg = document.createElement("img");
rocksimg.src = "barren_space_icon copy.png";
/*var VIEW_WIDTH = 1000;
var VIEW_HEIGHT = 1000;
var VIEW_TILE_WIDTH = Math.floor ( VIEW_WIDTH / TILE_SIZE );
var VIEW_TILE_HEIGHT = Math.floor ( VIEW_HEIGHT / TILE_SIZE );
*/
//INITIALIZATION
function seed(base, next, seeds, map){
	console.log(seeds);
	var height;
	if(next != 8){
		for(x = 0; x < seeds; x++){
			var row = Math.floor ((Math.random() * map.length));
			var col = Math.floor ((Math.random() * map[0].length));
			if(base == -1){
				height = true;
			}
			else
			{
				height = (map[row][col].color == TILE_COLORS[base]);
			}
			if(height){
				var h = map[row][col].h;
				if (next == 5 || next == 6){	
					map[row][col].h = h;
					if (next == 5){map[row][col].type = "mineral";map[row][col].image = hexmineralsimg;map[row][col].resource = 50;}else{map[row][col].type = "water"; map[row][col].image = hexiceimg;}
				} else{
					map[row][col].color = TILE_COLORS[next];
					map[row][col].realcolor = TILE_COLORS[next];
					map[row][col].h = next;
				}
			}
		}
	}
}

function sqrSeed(base, next, seeds, distance, map){
	if(next != 8){
		for(x = 0; x < seeds; x++){
			var row = Math.floor ((Math.random() * map.length));
			var col = Math.floor ((Math.random() * map[0].length));
			var height;
			if(base == -1){
				height = true;
			}
			else
			{
				height = (map[row][col].color == TILE_COLORS[base]);
			}
			if( height && (row < map.length*distance || row > map.length-map.length*distance || col < map[0].length*distance || col > map[0].length-map[0].length*distance)){
				var h = map[row][col].h;
				
				if (next == 5 || next == 6){
					map[row][col].h = h;
					if (next == 5){map[row][col].type = "mineral";map[row][col].image = hexmineralsimg;map[row][col].resource = 50;}else{map[row][col].type = "water"; map[row][col].image = hexiceimg;}
				} else{
					map[row][col].color = TILE_COLORS[next];
					map[row][col].realcolor = TILE_COLORS[next];
					map[row][col].h = next;
				}
			}
		}
	}
	else{
		var row = Math.floor ((Math.random() * map.length));
		var col = Math.floor ((Math.random() * map[0].length));
		if(base == -1){
			height = true;
		}
		else{
			height = (map[row][col].color == TILE_COLORS[base]);
		}
		while(!(height && (row < map.length*distance || row > map.length-map.length*distance || col < map[0].length*distance || col > map[0].length-map[0].length*distance))){
			row = Math.floor ((Math.random() * map.length));
			col = Math.floor ((Math.random() * map[0].length));
		}
		var h = map[row][col].h; 
		map[row][col].color = TILE_COLORS[next];
		map[row][col].realcolor = TILE_COLORS[next];
		map[row][col].h = h;
		map[row][col].image = hexllamagod;
	}
}

function reverseSqrSeed(base, next, seeds, distance, map){
	if(next != 8){
		for(x = 0; x < seeds; x++){
			var row = Math.floor ((Math.random() * map.length));
			var col = Math.floor ((Math.random() * map[0].length));
			var height;
			if(base == -1){
				height = true;
			}
			else
			{
				height = (map[row][col].color == TILE_COLORS[base]);
			}
			if( height && !(row < map.length*distance || row > map.length-map.length*distance || col < map[0].length*distance || col > map[0].length-map[0].length*distance)){
				var h = map[row][col].h;
				if (next == 5 || next == 6){
					map[row][col].h = h;
					if (next == 5){map[row][col].type = "mineral";map[row][col].image = hexmineralsimg;map[row][col].resource = 50;}else{map[row][col].type = "water"; map[row][col].image = hexiceimg;}
				} else{
					map[row][col].color = TILE_COLORS[next];
					map[row][col].realcolor = TILE_COLORS[next];
					map[row][col].h = next;
				}
			}
		}
	}
	else{
		var row = Math.floor ((Math.random() * map.length));
		var col = Math.floor ((Math.random() * map[0].length));
		if(base == -1){
			height = true;
		}
		else{
			height = (map[row][col].color == TILE_COLORS[base]);
		}
		while(!(height && !(row < map.length*distance || row > map.length-map.length*distance || col < map[0].length*distance || col > map[0].length-map[0].length*distance))){
			row = Math.floor ((Math.random() * map.length));
			col = Math.floor ((Math.random() * map[0].length));
		}
		var h = map[row][col].h; 
		map[row][col].color = TILE_COLORS[next];
		map[row][col].realcolor = TILE_COLORS[next];
		map[row][col].h = h;
		map[row][col].image = hexllamagod;
	}
}


function build(base, next, chance, seeds, map){
	seed(base, next, seeds, map);
	//var next = next;
	var savecolor = next;
	var height;
	var h;
	//if (next == 5 || next == 6){next = base;}
	for (x = 0; x < map.length; x++ ) {
		for ( y = 1; y < map[x].length-2; y++ ) {
     		var num = Math.floor ( Math.random() * 100);
     		if(savecolor < 5){
     			if (1>(Math.random()*500))
     				map[x][y].image = rocksimg;
     		}
     		if(base == -1){height = true;}
     		else{height = map[x][y].color == TILE_COLORS[next];}
        	if(height){
        		 if(chance > 0 && num <= chance){
        		 	if(!(next == 5 || next == 6)){
	        	 		map[x][y-1].color = TILE_COLORS[next];
	        	 		map[x][y-1].h = next;
	        	 		map[x][y-1].realcolor = TILE_COLORS[next];
	        	 		map[x][y+1].color = TILE_COLORS[next];
	        	 		map[x][y+1].h = next;
	        	 		map[x][y+1].realcolor = TILE_COLORS[next];
        	 		}
        	 		else if((map[x][y].type == "mineral" && next == 5) || (map[x][y].type == "water" && next == 6)){
	        	 		if (next == 5){map[x][y-1].type = "mineral"; map[x][y-1].image = hexmineralsimg;}
	        	 		if (next == 6){map[x][y-1].type = "water"; map[x][y-1].image = hexiceimg;}
	        	 		if (next == 5){map[x][y+1].type = "mineral"; map[x][y+1].image = hexmineralsimg;}
	        	 		if (next == 6){map[x][y+1].type = "water"; map[x][y+1].image = hexiceimg;}
        	 		}
        	 		if(x > 0){
        	 			if(!(next == 5 || next == 6)){
	        	 			map[x-1][y].color = TILE_COLORS[next];
	        	 			map[x-1][y].h = next;
	        	 			map[x-1][y].realcolor = TILE_COLORS[next];
        	 			}
        	 			else if((map[x][y].type == "mineral" && next == 5) || (map[x][y].type == "water" && next == 6)){
	        	 			if (next == 5){map[x-1][y].type = "mineral"; map[x-1][y].image = hexmineralsimg;}
	        	 			if (next == 6){map[x-1][y].type = "water"; map[x-1][y].image = hexiceimg;}
        	 			}
        	 		}
        	 		if(x != map.length-1){
        	 			if(!(next == 5 || next == 6)){
	        	 			map[x+1][y].color = TILE_COLORS[next];
	        	 			map[x+1][y].h = next;
	        	 			map[x+1][y].realcolor = TILE_COLORS[next];
        	 			}
        	 			else if((map[x][y].type == "mineral" && next == 5) || (map[x][y].type == "water" && next == 6)){
	        	 			if (next == 5){map[x+1][y].type = "mineral"; map[x+1][y].image = hexmineralsimg;}
	        	 			if (next == 6){map[x+1][y].type = "water"; map[x+1][y].image = hexiceimg;}
        	 			}
        	 		}
        	 	}
         	}
     	}
	}

	for (x = map.length-1; x > 0; x-- ) {
    	 for ( y = map[x].length-2; y > 0; y-- ) {
     		var num = Math.floor ( Math.random() * 100);
     		if(base == -1){height = true;}
     		else{height = map[x][y].color == TILE_COLORS[next];}
        	if(height){
        		 if(chance > 0 && num <= chance){
        		 	if(!(next == 5 || next == 6)){
	        	 		map[x][y-1].color = TILE_COLORS[next];
	        	 		map[x][y-1].h = next;
	        	 		map[x][y-1].realcolor = TILE_COLORS[next];
	        	 		map[x][y+1].color = TILE_COLORS[next];
	        	 		map[x][y+1].h = next;
	        	 		map[x][y+1].realcolor = TILE_COLORS[next];
        	 		}
        	 		else if((map[x][y].type == "mineral" && next == 5) || (map[x][y].type == "water" && next == 6)){
	        	 		if (next == 5){map[x][y-1].type = "mineral"; map[x][y-1].image = hexmineralsimg;}
	        	 		if (next == 6){map[x][y-1].type = "water"; map[x][y-1].image = hexiceimg;}
	        	 		if (next == 5){map[x][y+1].type = "mineral"; map[x][y+1].image = hexmineralsimg;}
	        	 		if (next == 6){map[x][y+1].type = "water"; map[x][y+1].image = hexiceimg;}
        	 		}
        	 		if(x > 0){
        	 			if(!(next == 5 || next == 6)){
	        	 			map[x-1][y].color = TILE_COLORS[next];
	        	 			map[x-1][y].h = next;
	        	 			map[x-1][y].realcolor = TILE_COLORS[next];
        	 			}
        	 			else if((map[x][y].type == "mineral" && next == 5) || (map[x][y].type == "water" && next == 6)){
	        	 			if (next == 5){map[x-1][y].type = "mineral"; map[x-1][y].image = hexmineralsimg;}
	        	 			if (next == 6){map[x-1][y].type = "water"; map[x-1][y].image = hexiceimg;}
        	 			}
        	 		}
        	 		if(x != map.length-1){
        	 			if(!(next == 5 || next == 6)){
	        	 			map[x+1][y].color = TILE_COLORS[next];
	        	 			map[x+1][y].h = next;
	        	 			map[x+1][y].realcolor = TILE_COLORS[next];
        	 			}
        	 			else if((map[x][y].type == "mineral" && next == 5) || (map[x][y].type == "water" && next == 6)){
	        	 			if (next == 5){map[x+1][y].type = "mineral"; map[x+1][y].image = hexmineralsimg;}
	        	 			if (next == 6){map[x+1][y].type = "water"; map[x+1][y].image = hexiceimg;}
        	 			}
        	 		}	
        		 }
        	 }
    	 }
	}

	for (x = 0; x < map.length; x++ ) {
    	 for ( y = map[x].length-2; y > 0; y-- ) {
     		var num = Math.floor ( Math.random() * 100);
     		if(base == -1){height = true;}
     		else{height = map[x][y].color == TILE_COLORS[next];}
        	if(height){
        		if(chance > 0 && num <= chance){
        			if(!(next == 5 || next == 6)){
		        	 	map[x][y-1].color = TILE_COLORS[next];
		        	 	map[x][y-1].h = next;
		        		map[x][y-1].realcolor = TILE_COLORS[next];
		        	 	map[x][y+1].color = TILE_COLORS[next];
		        	 	map[x][y+1].h = next;
		        	 	map[x][y+1].realcolor = TILE_COLORS[next];
        	 		}
        	 		else if((map[x][y].type == "mineral" && next == 5) || (map[x][y].type == "water" && next == 6)){
	        	 		if (next == 5){map[x][y-1].type = "mineral"; map[x][y-1].image = hexmineralsimg;}
	        	 		if (next == 6){map[x][y-1].type = "water"; map[x][y-1].image = hexiceimg;}
	        	 		if (next == 5){map[x][y+1].type = "mineral"; map[x][y+1].image = hexmineralsimg;}
	        	 		if (next == 6){map[x][y+1].type = "water"; map[x][y+1].image = hexiceimg;}
        	 		}
        	 		if(x > 0){
        	 			if(!(next == 5 || next == 6)){
	        	 			map[x-1][y].color = TILE_COLORS[next];
	        	 			map[x-1][y].h = next;
	        	 			map[x-1][y].realcolor = TILE_COLORS[next];
        	 			}
        	 			else if((map[x][y].type == "mineral" && next == 5) || (map[x][y].type == "water" && next == 6)){
	        	 			if (next == 5){map[x-1][y].type = "mineral"; map[x-1][y].image = hexmineralsimg;}
	        	 			if (next == 6){map[x-1][y].type = "water"; map[x-1][y].image = hexiceimg;}
        	 			}
        	 		}
        	 		if(x != map.length-1){
        	 			if(!(next == 5 || next == 6)){
	        	 			map[x+1][y].color = TILE_COLORS[next];
	        	 			map[x+1][y].h = next;
	        	 			map[x+1][y].realcolor = TILE_COLORS[next];
        	 			}
        	 			else if((map[x][y].type == "mineral" && next == 5) || (map[x][y].type == "water" && next == 6)){
	        	 			if (next == 5){map[x+1][y].type = "mineral"; map[x+1][y].image = hexmineralsimg;}
	        	 			if (next == 6){map[x+1][y].type = "water"; map[x+1][y].image = hexiceimg;}
        	 			}
        	 		}
        	 	}
         	}
     	}
	}

	for (x = map.length-1; x > 0; x-- ) {
    	 for ( y = 2; y < map[x].length-1; y++ ) {
     		var num = Math.floor ( Math.random() * 100);
     		if(base == -1){height = true;}
     		else{height = map[x][y].color == TILE_COLORS[next];}
        	if(height){
        		 if(chance > 0 && num <= chance){
        		 	if(!(next == 5 || next == 6)){
	        	 		map[x][y-1].color = TILE_COLORS[next];
	        	 		map[x][y-1].h = next;
	        	 		map[x][y-1].realcolor = TILE_COLORS[next];
	        	 		map[x][y+1].color = TILE_COLORS[next];
	        	 		map[x][y+1].h = next;
	        	 		map[x][y+1].realcolor = TILE_COLORS[next];
        	 		}
        	 		else if((map[x][y].type == "mineral" && next == 5) || (map[x][y].type == "water" && next == 6)){
	        	 		if (next == 5){map[x][y-1].type = "mineral"; map[x][y-1].image = hexmineralsimg;}
	        	 		if (next == 6){map[x][y-1].type = "water"; map[x][y-1].image = hexiceimg;}
	        	 		if (next == 5){map[x][y+1].type = "mineral"; map[x][y+1].image = hexmineralsimg;}
	        	 		if (next == 6){map[x][y+1].type = "water"; map[x][y+1].image = hexiceimg;}
        	 		}
        	 		if(x > 0){
        	 			if(!(next == 5 || next == 6)){
	        	 			map[x-1][y].color = TILE_COLORS[next];
	        	 			map[x-1][y].h = next;
	        	 			map[x-1][y].realcolor = TILE_COLORS[next];
        	 			}
        	 			else if((map[x][y].type == "mineral" && next == 5) || (map[x][y].type == "water" && next == 6)){
	        	 			if (next == 5){map[x-1][y].type = "mineral"; map[x-1][y].image = hexmineralsimg;}
	        	 			if (next == 6){map[x-1][y].type = "water"; map[x-1][y].image = hexiceimg;}
        	 			}
        	 		}
        	 		if(x != map.length-1){
        	 			if(!(next == 5 || next == 6)){
	        	 			map[x+1][y].color = TILE_COLORS[next];
	        	 			map[x+1][y].h = next;
	        	 			map[x+1][y].realcolor = TILE_COLORS[next];
        	 			}
        	 			else if((map[x][y].type == "mineral" && next == 5) || (map[x][y].type == "water" && next == 6)){
	        	 			if (next == 5){map[x+1][y].type = "mineral"; map[x+1][y].image = hexmineralsimg;}
	        	 			if (next == 6){map[x+1][y].type = "water"; map[x+1][y].image = hexiceimg;}
        	 			}
        	 		}
        	 	}
         	}
     	}
	}
}
	
function sinSeed(base, next, y, a, b, map){
	var z = 0;
	var height = false; 
	for(x = 0; x < map.length-1; x++){
		z = Math.round(a*Math.sin(b*x) + y);
		if(z < 0 || z >= map[0].length)
		{
			console.log("out of bounds");
		}
		else{
			if(base == -1){
				height = true;
			}
			else{
				height = (map[x][z].color == TILE_COLORS[base]);
			}
			if(height){
				map[x][z].h = next;
				map[x][z].color = TILE_COLORS[next];
				map[x][z].realcolor = TILE_COLORS[next]; 
			}
		}
	}
}

function cosSeed(base, next, y, a, b){
	var z = 0;
	var height = false; 
	for(x = 0; x < map.length-1; x++){
		z = Math.round(a*Math.cos(b*x) + y);
		if(z < 0 || z >= map[0].length)
		{
			console.log("out of bounds");
		}
		else{
			if(base == -1){
				height = true;
			}
			else{
				height = (map[x][z].color == TILE_COLORS[base]);
			}
			if(height){
				map[x][z].h = next;
				map[x][z].color = TILE_COLORS[next];
				map[x][z].realcolor = TILE_COLORS[next]; 
			}
		}
	}
}

function tanSeed(base, next, y, a, b){
	var z = 0;
	var height = false; 
	for(x = 0; x < map.length-1; x++){
		z = Math.round(a*Math.tan(b*x) + y);
		if(z < 0 || z >= map[0].length)
		{
			console.log("out of bounds");
		}
		else{
			if(base == -1){
				height = true;
			}
			else{
				height = (map[x][z].color == TILE_COLORS[base]);
			}
			if(height){
				map[x][z].h = next;
				map[x][z].color = TILE_COLORS[next];
				map[x][z].realcolor = TILE_COLORS[next]; 
			}
		}
	}
}

function cscSeed(base, next, y, a, b){
	var z = 0;
	var height = false; 
	for(x = 0; x < map.length-1; x++){
		z = Math.round(a*(1/Math.sin(b*x)) + y);
		if(z < 0 || z >= map[0].length)
		{
			console.log("out of bounds");
		}
		else{
			if(base == -1){
				height = true;
			}
			else{
				height = (map[x][z].color == TILE_COLORS[base]);
			}
			if(height){
				map[x][z].h = next;
				map[x][z].color = TILE_COLORS[next];
				map[x][z].realcolor = TILE_COLORS[next]; 
			}
		}
	}
}

function secSeed(base, next, y, a, b){
	var z = 0;
	var height = false; 
	for(x = 0; x < map.length-1; x++){
		z = Math.round(a*(1/Math.cos(b*x)) + y);
		if(z < 0 || z >= map[0].length)
		{
			console.log("out of bounds");
		}
		else{
			if(base == -1){
				height = true;
			}
			else{
				height = (map[x][z].color == TILE_COLORS[base]);
			}
			if(height){
				map[x][z].h = next;
				map[x][z].color = TILE_COLORS[next];
				map[x][z].realcolor = TILE_COLORS[next]; 
			}
		}
	}
}

function ctanSeed(base, next, y, a, b){
	var z = 0;
	var height = false; 
	for(x = 0; x < map.length-1; x++){
		z = Math.round(a*(1/Math.tan(b*x)) + y);
		if(z < 0 || z >= map[0].length)
		{
			console.log("out of bounds");
		}
		else{
			if(base == -1){
				height = true;
			}
			else{
				height = (map[x][z].color == TILE_COLORS[base]);
			}
			if(height){
				map[x][z].h = next;
				map[x][z].color = TILE_COLORS[next];
				map[x][z].realcolor = TILE_COLORS[next]; 
			}
		}
	}
}