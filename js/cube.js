/**
 * @author mr.doob / http://mrdoob.com/
 */

var Cube = function (width, height, depth) {

	THREE.Geometry.call(this);
	
	var scope = this,
	width_half = width / 2,
	height_half = height / 2,
	depth_half = depth / 2;
	
	v(  width_half,  height_half, -depth_half ); // 0 
	v(  width_half, -height_half, -depth_half ); // 1
	v( -width_half, -height_half, -depth_half ); // 2 
	v( -width_half,  height_half, -depth_half ); // 3 
	v(  width_half,  height_half,  depth_half ); // 4 
	v(  width_half, -height_half,  depth_half ); // 5
	v( -width_half, -height_half,  depth_half ); // 6 
	v( -width_half,  height_half,  depth_half ); // 7
	
	f4( 0, 1, 2, 3 );
	f4( 4, 7, 6, 5 );
	f4( 0, 4, 5, 1 );
	f4( 1, 5, 6, 2 );
	f4( 2, 6, 7, 3 );
	f4( 4, 0, 3, 7 );
	
	function v(x, y, z) {
	
		scope.vertices.push( new THREE.Vector3( x, y, z ) );
	}

	function f4(a, b, c, d) {
	
		scope.faces.push( new THREE.Face4( a, b, c, d ) );
	}	
}

Cube.prototype = new THREE.Geometry();
Cube.prototype.constructor = Cube;