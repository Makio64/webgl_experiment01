/**
 * @author david ronai - makiopolis.com
 */
 
var Plateform = function (scene, direction, x, y) 
{
	var scope = this;
	scope.life = 30;
	scope.scene = scene;
	scope.direction = (direction == undefined || direction == Direction.none)?Direction.forward:direction;
	scope.x = (x == undefined)?0:x;
	scope.y = (y == undefined)?0:y;
	scope.trees = [];
	
	scope.update = function(){
		
		for(var i=0; i < scope.trees.length; i++){
			scope.trees[i].update();
		}
		
		if( scope.life == 0)
			return;
		
		
		if( scope.life > 10)
		{
			var speed = 5;
			var geometry = scope.cube.geometry;
			geometry.verticesNeedUpdate = true;
			
			//Left
			if( scope.direction & Direction.left ){
				geometry.vertices[0].x += speed;
				geometry.vertices[1].x += speed;
				geometry.vertices[4].x += speed;
				geometry.vertices[5].x += speed;
			}
			//Right
			if( scope.direction & Direction.right ){
				geometry.vertices[2].x -= speed;
				geometry.vertices[3].x -= speed;
				geometry.vertices[6].x -= speed;
				geometry.vertices[7].x -= speed;
			}
			//Forward
			if( scope.direction & Direction.forward ){
				geometry.vertices[0].z -= speed;
				geometry.vertices[1].z -= speed;
				geometry.vertices[2].z -= speed;
				geometry.vertices[3].z -= speed;
			}
			//Backward
			if( scope.direction & Direction.backward ){
				geometry.vertices[4].z += speed;
				geometry.vertices[5].z += speed;
				geometry.vertices[6].z += speed;
				geometry.vertices[7].z += speed;
			}
		}
		
		else if(scope.life == 10){
			activatePlatform--;
			scope.expand();
			scope.cube.matrixAutoUpdate = false;
		} else if(scope.life<5){
			// if(Math.random()>.98){
			// 	scope.addBuilding();
			// } else {
				scope.addTree();
			// }
		}
		
		scope.life --;
	}
	
	scope.addTree = function(){
		var tree = new Tree( scope.x + Math.random()*80-40, 20, scope.y + Math.random()*80-40, scope.scene );
		scope.trees.push(tree);
	}
	
	scope.addBuilding = function (){
		var building = new Building( scope.x + Math.random()*80-40, 20, scope.y + Math.random()*80-40, scope.scene );
		scope.trees.push(building);
	}
	
	scope.expand = function(){
		var result = false;
		var coeff = .6;
		if( Math.random() > coeff ){
			result |= addPlatformTo( scope.x-100, scope.y, scope.x, scope.y );
		}
		if( Math.random() > coeff ){
			result |= addPlatformTo( scope.x+100, scope.y, scope.x, scope.y );
		}
		if(Math.random() > coeff){
			result |= addPlatformTo( scope.x, scope.y-100, scope.x, scope.y );
		}
		if(Math.random() > coeff){
			result |= addPlatformTo( scope.x, scope.y+100, scope.x, scope.y );
		}
		return result;
	}
	
	init();
	function init(){
		activatePlatform++;
		var width = 100;
		var geometry = new Cube( width, 20, width );
		if(scope.direction & Direction.right){
			geometry.vertices[2].x += width;
			geometry.vertices[3].x += width;
			geometry.vertices[6].x += width;
			geometry.vertices[7].x += width;
		}
		else if(scope.direction & Direction.left){
			geometry.vertices[0].x -= width;
			geometry.vertices[1].x -= width;
			geometry.vertices[4].x -= width;
			geometry.vertices[5].x -= width;
		}
		if(scope.direction & Direction.forward){
			geometry.vertices[0].z += width;
			geometry.vertices[1].z += width;
			geometry.vertices[2].z += width;
			geometry.vertices[3].z += width;
		}
		else if(scope.direction & Direction.backward){
			geometry.vertices[4].z -= width;
			geometry.vertices[5].z -= width;
			geometry.vertices[6].z -= width;
			geometry.vertices[7].z -= width;
		}

		var material = new THREE.MeshBasicMaterial( { vertexColors: THREE.FaceColors } );
		//var colors = [0x777777*Math.random(),0x888888*Math.random(),0x666666*Math.random(),0x555555*Math.random(),0xAAAAAA*Math.random(),0xAAAAAA*Math.random()];
		// var colors = [0x777777,0x888888,0x666666,0x555555,0xAAAAAA,0xAAAAAA];
		var colors = [0x777777,0x888888,0x666666,0x555555,0xAAAAAA,baseColor+0x00000FF*Math.random()];
		for ( var i = 0; i < geometry.faces.length; i ++ ) {
			geometry.faces[ i ].color.setHex( colors[i] );
		}
		scope.cube = new THREE.Mesh( geometry, material );
		scope.cube.position.x = scope.x;
		scope.cube.position.z = scope.y;
		scope.scene.add( scope.cube );	
	};
}

Plateform.prototype.constructor = Plateform;

//PARTICLE

 
var pMaterial = new THREE.ParticleBasicMaterial({
	color: 0xFFFFFF,
	size: 1,
	opacity: 1,
	//map: THREE.ImageUtils.loadTexture(
		//"img/particle.png"
	//),
	transparent: true
});

// var plateformParticle = new THREE.ParticleSystem( this.particuleGeometry, pMaterial );
// scene.add( this.particles );