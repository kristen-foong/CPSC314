/*
 * UBC CPSC 314, Vjan2022
 * Assignment 1 Template
 */

// Setup and return the scene and related objects.
// You should look into js/setup.js to see what exactly is done here.
const {
  renderer,
  scene,
  camera,
  worldFrame,
} = setup();

/////////////////////////////////
//   YOUR WORK STARTS BELOW    //
/////////////////////////////////
const time = {type: 'float', value: 0}
const armadilloFrame = new THREE.Object3D();
armadilloFrame.position.set(0, 0, -8);
scene.add(armadilloFrame);

// Initialize uniform
const orbPosition = { type: 'v3', value: new THREE.Vector3(0.0, 8.0, 0.0) };

// Materials: specifying uniforms and shaders
const armadilloMaterial = new THREE.ShaderMaterial({
  uniforms: {
    orbPosition: orbPosition
  }
});
const sphereMaterial = new THREE.ShaderMaterial({
  uniforms: {
    orbPosition: orbPosition
  }
});

// Load shaders.
const shaderFiles = [
  'glsl/armadillo.vs.glsl',
  'glsl/armadillo.fs.glsl',
  'glsl/sphere.vs.glsl',
  'glsl/sphere.fs.glsl'
];

new THREE.SourceLoader().load(shaderFiles, function (shaders) {
  armadilloMaterial.vertexShader = shaders['glsl/armadillo.vs.glsl'];
  armadilloMaterial.fragmentShader = shaders['glsl/armadillo.fs.glsl'];

  sphereMaterial.vertexShader = shaders['glsl/sphere.vs.glsl'];
  sphereMaterial.fragmentShader = shaders['glsl/sphere.fs.glsl'];
})

// Load and place the Armadillo geometry
// Look at the definition of loadOBJ to familiarize yourself with how each parameter
// affects the loaded object.
loadAndPlaceOBJ('obj/armadillo.obj', armadilloMaterial, armadilloFrame, function (armadillo) {
  armadillo.rotation.y = Math.PI;
  armadillo.position.y = 5.3;
  armadillo.scale.set(0.1, 0.1, 0.1);
});


// Create the main covid sphere geometry
// https://threejs.org/docs/#api/en/geometries/SphereGeometry
const sphereGeometry = new THREE.SphereGeometry(1.0, 32.0, 32.0);
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
sphere.position.set(0.0, 1.0, 0.0);
sphere.parent = worldFrame;
scene.add(sphere);

const sphereLight = new THREE.PointLight(0xffffff, 1, 100);
// Place the light at the location of the orb
  sphereLight.position.set(orbPosition.value.x, orbPosition.value.y, orbPosition.value.z);
scene.add(sphereLight);

// Listen to keyboard events.
const keyboard = new THREEx.KeyboardState();
function checkKeyboard() {
  // HINT: Q1a use this template to add the required keyboard functionality
  // HINT: we suggest you map "WASD" keys to translate the armadillo and "QE" keys to 
  //       rotate
  if (keyboard.pressed("space"))
    console.log("spacebar pressed")

  // slides armadillo away from user
  if (keyboard.pressed("W")) {
    armadilloFrame.position.z--;
  }
  // slides armadillo left
  if (keyboard.pressed("A")) {
    armadilloFrame.position.x--;
  }
  // slides armadillo towards user
  if (keyboard.pressed("S")) {
    armadilloFrame.position.z++;
  }
  // slides armadillo right
  if (keyboard.pressed("D")) {
    armadilloFrame.position.x++;
  }
  // rotation for armadillo: either left (q) or right (e)
  if (keyboard.pressed("Q")) {
    armadilloFrame.rotation.y -= Math.PI/90;  
  }
  if (keyboard.pressed("E")) {
    armadilloFrame.rotation.y += Math.PI/90; 
  }

  // part 2 use keys to rotate armadillo even more
  if (keyboard.pressed("I")) {
    armadilloFrame.rotation.x -= Math.PI/90;
  }
  if (keyboard.pressed("K")) {
    armadilloFrame.rotation.x += Math.PI/90;
  }
  if (keyboard.pressed("J")) {
    armadilloFrame.rotation.z += Math.PI/90;
  }
  if (keyboard.pressed("L")) {
    armadilloFrame.rotation.z -= Math.PI/90;
  }

  // The following tells three.js that some uniforms might have changed
  armadilloMaterial.needsUpdate = true;
  sphereMaterial.needsUpdate = true;

}

// Setup update callback
function update() {
  checkKeyboard();

  // Requests the next update call, this creates a loop
  requestAnimationFrame(update);
  renderer.render(scene, camera);
}

// Start the animation loop.
update();
