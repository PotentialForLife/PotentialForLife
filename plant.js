/**
 * @author Joseph
 */

/**
 * @class: A tree structure of nodes, each with properties denoting location, type, and children
 * @property: {PlantNode} stem: "root" node of the tree
 * @property: {number} lvl: current level reached by the plant; increases on 'exp' reaching 'expLimit'
 * @property: {number} exp: amount of experience acquired for current level; initially returns to 0 on increase in 'lvl'
 * @property: {number} expMax: amount of 'exp' required to increase 'lvl' by 1; increases upon increase in 'lvl'
 * @property: {number} growthPoints: how many times player may "grow" plant by stretching Plant by its roots
 */

/* Plant control
 * Grow: If you have a growth point, allow growth
 * Split: if you have enzyme, allow split
 * Take in water: Input number
 * Take in minerals: Input number
 * Upgrade: With enough resources, upgrade
 * Level: With enough EXP, level
 * Sell: Get back water, not minerals
 * Player Control
 * Picking up things: space
 * Dropping things off: space
 * General interaction: space
 * Basically,bring up a menu and interact that way
 */
var plantEnum = {SEEDLING: "seedling", SAPLING: "sapling", TREE: "tree", ROOT: "root"};
var hextreeimg = document.createElement("img");
hextreeimg.src = "plant_final_stage_icon copy.png";
var hexsproutimg = document.createElement("img");
hexsproutimg.src = "plant_first_stage_icon copy.png";

function Plant(startingTile){
	//this.stem = new PlantNode(startingTile, plantEnum.SEEDLING);
	this.stem = new PlantNode(startingTile, plantEnum.TREE,1);
};

Plant.prototype.stem;
Plant.prototype.lvl = 0;
Plant.prototype.exp = 0;
Plant.prototype.expMax = 100;
Plant.prototype.growthPoints = 0;
Plant.prototype.numRoots = 0;
Plant.prototype.numPlants = 1;

function PlantNode(nodeTile, nodeType,distset){
	console.log("making PlantNode");
	this.tile = nodeTile;//hex
	this.type = nodeType;
	this.tile.plant = this;
	this.tile.type = "plant";
	if(this.type == plantEnum.TREE){
		this.tile.color = "green";
		this.tile.image = hextreeimg;
	}else{
		this.tile.color = "darkgreen";
		this.tile.image = hexsproutimg;
	}
	this.tile.atmosphere = true;
	globalatmosphere.push(this.tile);
	this.distance = distset;
	this.tile.displaying = 0;
};

PlantNode.prototype.tile = null;
PlantNode.prototype.type = plantEnum.ROOT;
PlantNode.prototype.parent = null;
PlantNode.prototype.children = new Array(); //could reference neighboring tiles instead of just children (change name if so)


/**
 * Grow plant in particular direction
 * 
 * @param {Object} parent: branch or root to be grown; if branch, root is created; if root, turns to branch and root is created
 * @param {Object} tile: tile on which new root is created
 */
Plant.prototype.grow = function(parentNode, tile){
	rootGrowing.play();
	if(parentNode.type == plantEnum.ROOT){
		this.growthPoints-=Math.floor(parentNode.distance);
		parentNode.type = plantEnum.TREE;
		parentNode.tile.color = 'green';
		parentNode.tile.image = hextreeimg;
		newRoot = new PlantNode(tile, plantEnum.ROOT,parentNode.distance+.05);
		newRoot.parent = parentNode;
		parentNode.children.push(newRoot);
		tile.plant = newRoot;
		++this.numPlants;
	}
	else if(parentNode.type == plantEnum.TREE){
		--control.Enzyme;
		++control.TotalEnzymes;
		newRoot = new PlantNode(tile, plantEnum.ROOT,parentNode.distance+.05);
		newRoot.parent = parentNode;
		parentNode.children.push(newRoot);
		tile.plant = newRoot;
		++this.numRoots;
		++this.numPlants;
	}
	if(this.numPlants == Math.floor(xlength*ylength*.00001)){
		console.log(true);
		//win
	}
};

/**
 * Increases 'lvl' by 1, increases 'expMax,' and wraps extra 'exp' around
 */
Plant.prototype.lvlUp = function(){
	var globalbuffer = new Array();
	switch(this.stem.type){
		case plantEnum.SEEDLING:
			this.stem.type = plantEnum.SAPLING;
			break;
		case plantEnum.SAPLING:
			this.stem.type = plantEnum.TREE;
		default:
			this.growthPoints += this.numRoots;
	}
	var check = globalatmosphere.length;
	for(var i = 0; i < check;++i){
		globalatmosphere[i].spreadair(Math.floor((globalatmosphere[i].x)/3),(globalatmosphere[i].y)-1,(Math.floor(control.TotalEnzymes/50))+1,globalbuffer);
	}
	globalatmosphere = globalbuffer.slice(0);
	console.log(1);
	globalbuffer.splice(0,globalbuffer.length);
	console.log(1);
	console.log(globalwin);
	var extraExp = this.exp - this.expMax;
	this.expMax = Math.floor(this.expMax * 1.05);
	this.exp = extraExp;
	player.capacityMax += 10;
	++this.lvl;
	lvlUpSound.play();
};
/**
 * calls 'lvlUp' if 'expMax' has been reached
 */
Plant.prototype.update = function(){
	if(this.exp >= this.expMax){
		this.lvlUp();
	}	
};

/**
* Check whether a given tile can contain a new plantNode
* 
* @param {hex} tile: hex tile checked for ability to contain new plantNode
*/
function checkTileGrowable(tile){
	if(tile.type == 0){
		tile.color = 'greenyellow';
		growTiles.push(tile);
		tile.displaying = growSourceTile.plant.distance;
	}
}
	
/**
* Grows a new plantNode and separates the corresponding tile from the array of non-chosen tiles
*/
function growPlant(){
	plant.grow(growSourceTile.plant, map[X_FLAG][Y_FLAG]);
	for(var numTile = 0; numTile < growTiles.length; ++numTile){
		if(map[X_FLAG][Y_FLAG].x == growTiles[numTile].x && map[X_FLAG][Y_FLAG].y == growTiles[numTile].y)
			growTiles.splice(numTile, 1);
	}
}



