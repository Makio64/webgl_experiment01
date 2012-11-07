/**
 * @author david ronai - makiopolis.com
 */
 
var Plateform = function (scene) 
{
	var scope = this;
	var life = 100;
	
	scope.update = function(){
		life --;
		console.log("bouboup");
	};
	
	init();
	function init(){
		var geometry = new Cube( 100, 10, 100 );
		var material = new THREE.MeshBasicMaterial( { vertexColors: THREE.FaceColors } );
		for ( var i = 0; i < geometry.faces.length; i ++ ) {
			geometry.faces[ i ].color.setHex( Math.random() * 0xffffff );
		}

		scope.cube = new THREE.Mesh( geometry, material );
		scene.add( scope.cube );	
	};
}

Plateform.prototype.constructor = Plateform;