/**
* A Tree
*/
var Tree = function(x, y, z, scene) 
{
	
	var scope = this;
	scope.scene = scene;
	scope.life = 0;
	
	scope.update = function(){
		if(scope.life<=0){
			return;
		}
		var speed = 1;
		var geometry = scope.cube.geometry;
		geometry.verticesNeedUpdate = true;
		geometry.vertices[0].y += speed;
		geometry.vertices[3].y += speed;
		geometry.vertices[4].y += speed;
		geometry.vertices[7].y += speed;
		scope.life -= speed;
		if(scope.life<=0){
			scope.cube.matrixAutoUpdate = false;
		}
	}
	
	var init = function()
	{
		var r = scope.life = 20+Math.random()*5;
		var geometry = new Cube(10,r,10);
		
		geometry.vertices[0].y -= r;
		geometry.vertices[3].y -= r;
		geometry.vertices[4].y -= r;
		geometry.vertices[7].y -= r;
		geometry.vertices[0].z = 0;
		geometry.vertices[3].z = 0;
		geometry.vertices[4].z = 0;
		geometry.vertices[7].z = 0;
		geometry.vertices[0].x = 0;
		geometry.vertices[3].x = 0;
		geometry.vertices[4].x = 0;
		geometry.vertices[7].x = 0;
		
		var material = new THREE.MeshBasicMaterial( { vertexColors: THREE.FaceColors } );
		//var colors = [0x777777*Math.random(),0x888888*Math.random(),0x666666*Math.random(),0x555555*Math.random(),0xAAAAAA*Math.random(),0xAAAAAA*Math.random()];
		var colors = [0x000000,0x333333,0x222222,0x111111,0x131313,0x000000];
		for ( var i = 0; i < geometry.faces.length; i ++ ) {
			geometry.faces[ i ].color.setHex( colors[i] );
		}
		
		scope.cube = new THREE.Mesh( geometry, material );
		scope.cube.position.x = x;
		scope.cube.position.z = z;
		scope.cube.position.y = y;
		
		scope.scene.add( scope.cube );
	}
	init();
}

Tree.prototype.constructor = Tree;