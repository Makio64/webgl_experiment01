/**
 * @author david ronai - makiopolis.com
 */
 
var Plateform = function (scene) 
{
	var scope = this;
	var life = 100;
	
	scope.update = function(){
		life --;
		var geometry = scope.cube.geometry;
		geometry.verticesNeedUpdate = true;
		//Left
		geometry.vertices[0].x += 1;
		geometry.vertices[1].x += 1;
		geometry.vertices[4].x += 1;
		geometry.vertices[5].x += 1;
		//Right
		geometry.vertices[2].x -= 1;
		geometry.vertices[3].x -= 1;
		geometry.vertices[6].x -= 1;
		geometry.vertices[7].x -= 1;
		//Top
		geometry.vertices[0].z -= 1;
		geometry.vertices[1].z -= 1;
		geometry.vertices[2].z -= 1;
		geometry.vertices[3].z -= 1;
		//Bottom
		geometry.vertices[4].z += 1;
		geometry.vertices[5].z += 1;
		geometry.vertices[6].z += 1;
		geometry.vertices[7].z += 1;

	};
	
	init();
	function init(){
		var geometry = new Cube( 100, 20, 100 );
		var material = new THREE.MeshBasicMaterial( { vertexColors: THREE.FaceColors } );
		var colors = [0x777777,0x888888,0x666666,0x555555,0xAAAAAA,0xAAAAAA];
		for ( var i = 0; i < geometry.faces.length; i ++ ) {
			geometry.faces[ i ].color.setHex( colors[i] );
		}
		scope.cube = new THREE.Mesh( geometry, material );
		scene.add( scope.cube );	
	};
}

Plateform.prototype.constructor = Plateform;