var mouseX = 0, mouseY = 0;

var screenWidth = $(window).width(),
screenHeight = $(window).width(),
windowHalfX = $(window).width()/2,
windowHalfY = $(window).height()/2;	

var isWebGL = Detector.webgl,
tanFOV, windowHeight,
stats, container, camera, scene, renderer, composer;


$(document).ready(function() 
{
	container = document.createElement('div');
	document.body.appendChild(container);

	//same camera for all
	camera = new THREE.PerspectiveCamera( 70, $(window).width() / $(window).height(), 1, 1000 );
	tanFOV = Math.tan( ( ( Math.PI / 180 ) * camera.fov / 2 ) );
	windowHeight =  $(window).height();
	camera.aspect = $(window).width() / Math.floor($(window).height());
    camera.fov = ( 360 / Math.PI ) * Math.atan( tanFOV * ( $(window).height() / windowHeight ) );
    camera.updateProjectionMatrix();
	camera.position.z = 150;
	camera.position.y = 150;
	camera.position.x = 0;

	scene = new THREE.Scene();
	scene.fog = new THREE.Fog( 0xFFFFFF, 0.0005 );
	scene.add(camera);
	
	renderer = new THREE.WebGLRenderer();
	renderer.setSize( $(window).width(), $(window).height());
	renderer.autoclear=false;
	container.appendChild( renderer.domElement );
	
	document.addEventListener( 'mousemove', onDocumentMouseMove, false );
	document.addEventListener( 'touchstart', onDocumentTouchStart, false );
	document.addEventListener( 'touchmove', onDocumentTouchMove, false );
	
	stats = new Stats();
	stats.domElement.style.position = 'absolute';
	stats.domElement.style.top = '0px';
	container.appendChild( stats.domElement );
	
	$(window).resize(function() {
		renderer.setSize( $(window).width(), $(window).height());
		$(container).height( Math.floor($(window).height()) );
		camera.aspect = $(window).width() / Math.floor($(window).height());
		// adjust the FOV
		camera.fov = ( 360 / Math.PI ) * Math.atan( tanFOV * ( $(window).height() / windowHeight ) );
		camera.updateProjectionMatrix();
	});
	
	init();
	animate();	
});


var plateforms = [];
function init(){
	var plateform = new Plateform(scene);
	plateforms.push( plateform );
}

function animate() {
	for(var i = 0; i < plateforms.length; i++){
		if( plateforms[i].life >= 0)
			plateforms[i].update();
	}
	camera.lookAt(scene.position);
	requestAnimationFrame( animate );
	stats.update();
	TWEEN.update();
	renderer.render(scene, camera);
}

function onDocumentMouseMove(event) {
	mouseX = event.clientX - windowHalfX;
	mouseY = event.clientY - windowHalfY;
}

function onDocumentTouchStart( event ) {
	if ( event.touches.length > 1 ) {
		event.preventDefault();
		mouseX = event.touches[ 0 ].pageX - windowHalfX;
		mouseY = event.touches[ 0 ].pageY - windowHalfY;
	}
}

function onDocumentTouchMove( event ) {
	if ( event.touches.length == 1 ) {
		event.preventDefault();
		mouseX = event.touches[ 0 ].pageX - windowHalfX;
		mouseY = event.touches[ 0 ].pageY - windowHalfY;
	}
}