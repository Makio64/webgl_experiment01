var mouseX = 0, mouseY = 0,
screenWidth = $(window).width(),
screenHeight = $(window).width(),
windowHalfX = $(window).width()/2,
windowHalfY = $(window).height()/2,
isWebGL = Detector.webgl,
tanFOV, windowHeight,
stats, container, camera, scene, renderer, composer,
activatePlatform = 0;


$(document).ready(function() 
{
	container = document.createElement('div');
	document.body.appendChild(container);

	//same camera for all
	camera = new THREE.PerspectiveCamera( 70, $(window).width() / $(window).height(), 1, 10000 );
	tanFOV = Math.tan( ( ( Math.PI / 180 ) * camera.fov / 2 ) );
	windowHeight =  $(window).height();
	camera.aspect = $(window).width() / Math.floor($(window).height());
    camera.fov = ( 360 / Math.PI ) * Math.atan( tanFOV * ( $(window).height() / windowHeight ) );
    camera.updateProjectionMatrix();
	camera.position.z = -500;
	camera.position.y = 500;
	camera.position.x = 0;

	scene = new THREE.Scene();
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


var totalX = 0, totalY = 0, averageX = 0, averageY = 0, cameraLookAtPosition, plateforms = [];
function init(){
	addPlatformTo(0,0,0,0);
	averageX = 0;
	averageY = 0;
	cameraLookAtPosition = scene.position;
}

function addPlatformTo(x,y,fromX,fromY){
	if( plateforms.length >= 60 || !isFree(x,y) ){
		return false;
	} 
	totalX+=x;
	totalY+=y;
	averageX = totalX/plateforms.length;
	averageY = totalY/plateforms.length;
	plateforms.push( new Plateform(scene,directionTo(x,y,fromX,fromY),x, y) );
	return true;
}

function isFree(x,y){
	var l = plateforms.length;
	for(var i = 0; i < l; i++){
		if( plateforms[i].x == x && plateforms[i].y == y ){
			return false;
		}
	}
	return true;
}

function directionTo( x,y,x2,y2){
	var direction = 0;
	if(x-x2>0)direction+=Direction.left;
	else if(x-x2<0)direction+=Direction.right;
	if(y-y2>0)direction+=Direction.backward;
	else if(y-y2<0)direction+=Direction.forward;
	return direction;
}

function animate() 
{	
	for(var i = 0; i < plateforms.length; i++){
		plateforms[i].update();
	}
	
	if(activatePlatform==0 && plateforms.length < 60){
		while(true){
			var idx = Math.floor((plateforms.length*Math.random())%plateforms.length);
			if(plateforms[idx].expand())
				break;
		}
	}
	
	camera.position.x += (Math.cos((mouseX/screenWidth)*Math.PI*.7) * 900-camera.position.x)*.05;
	camera.position.z += (Math.sin((mouseX/screenWidth)*Math.PI*.7) * 900-camera.position.z)*.05;
	camera.position.y += ((mouseY/screenHeight) *1300 +500-camera.position.y)*0.05;
	console.log( averageX );
	cameraLookAtPosition.x += (averageX-cameraLookAtPosition.x)*0.05;
	cameraLookAtPosition.y += (averageY-cameraLookAtPosition.y)*0.05;
	//cameraLookAtPosition.z += (averageX-cameraLookAtPosition.z)*0.05;
	camera.lookAt(cameraLookAtPosition);
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