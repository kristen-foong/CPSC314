/*
 * UBC CPSC 314
 * Assignment 3 Template
 */

// Setup the renderer
// You should look into js/setup.js to see what exactly is done here.
const { renderer, canvas } = setup();

/////////////////////////////////
//   YOUR WORK STARTS BELOW    //
/////////////////////////////////

// Load floor textures
const floorColorTexture = new THREE.TextureLoader().load('texture/pacman.jpg');
floorColorTexture.minFilter = THREE.LinearFilter;
floorColorTexture.anisotropy = renderer.capabilities.getMaxAnisotropy();

const floorNormalTexture = new THREE.TextureLoader().load('texture/normal.png');
floorNormalTexture.minFilter = THREE.LinearFilter;
floorNormalTexture.anisotropy = renderer.capabilities.getMaxAnisotropy();

// Uniforms - Pass these into the appropriate vertex and fragment shader files
const spherePosition = { type: 'v3', value: new THREE.Vector3(0.0, 0.0, 0.0) };
const tangentDirection = { type: 'v3', value: new THREE.Vector3(0.5, 0.0, 1.0) };

const ambientColor = { type: 'c', value: new THREE.Color(0.0, 0.0, 1.0) };
const diffuseColor = { type: 'c', value: new THREE.Color(0.0, 1.0, 1.0) };
const specularColor = { type: 'c', value: new THREE.Color(1.0, 1.0, 1.0) };
const lightColor = { type: 'c', value: new THREE.Color(1.0, 1.0, 1.0) };
const toonColor = { type: 'c', value: new THREE.Color(0.88, 1.0, 1.0) };
const toonColor2 = { type: 'c', value: new THREE.Color(0.0, 1.0, 1.0) };
const outlineColor = { type: 'c', value: new THREE.Color(0.0, 0.0, 1.0) };

const kAmbient = { type: "f", value: 0.3 };
const kDiffuse = { type: "f", value: 0.6 };
const kSpecular = { type: "f", value: 1.0 };
const shininess = { type: "f", value: 10.0 };
const ticks = { type: "f", value: 0.0 };

const sphereLight = new THREE.PointLight(0xffffff, 1, 300);

const squareColor = { type: 'c', value: new THREE.Color(0.0, 0.0, 1.0) };
const squareColor2 = { type: 'c', value: new THREE.Color(1.0, 0.0, 0.0) };


// Shader materials
const sphereMaterial = new THREE.ShaderMaterial({
  uniforms: {
    spherePosition: spherePosition
  }
});

// 1a) send constants to shader, referenced from helloWorld2 example
const floorMaterial = new THREE.ShaderMaterial({ 
  uniforms: {
    colorMap: { type: "t", value: floorColorTexture },
    side: THREE.DoubleSide
  }
});

const phongMaterial = new THREE.ShaderMaterial({
  uniforms: {
    spherePosition: spherePosition,
    ambientColor: ambientColor,
    diffuseColor: diffuseColor,
    specularColor: specularColor,
    kAmbient: kAmbient,
    kDiffuse: kDiffuse,
    kSpecular: kSpecular,
    shininess: shininess
  }
});

const anisotropicMaterial = new THREE.ShaderMaterial({
  uniforms: {
    spherePosition: spherePosition,
    ambientColor: ambientColor,
    diffuseColor: diffuseColor,
    specularColor: specularColor,
    kAmbient: kAmbient,
    kDiffuse: kDiffuse,
    kSpecular: kSpecular,
    shininess: shininess,
    lightColor: lightColor,
    tangentDirection: tangentDirection
  }
});

const toonMaterial = new THREE.ShaderMaterial({
  uniforms: {
    spherePosition: spherePosition,
    toonColor: toonColor,
    toonColor2: toonColor2,
    outlineColor: outlineColor
  }
});

const squaresMaterial = new THREE.ShaderMaterial({
  uniforms: {
    spherePosition: spherePosition,
    ticks: ticks,
    squareColor: squareColor,
    squareColor2: squareColor2
  }
});

// Load shaders
const shaderFiles = [
  'glsl/sphere.vs.glsl',
  'glsl/sphere.fs.glsl',
  'glsl/phong.vs.glsl',
  'glsl/phong.fs.glsl',
  'glsl/toon.vs.glsl',
  'glsl/toon.fs.glsl',
  'glsl/squares.vs.glsl',
  'glsl/squares.fs.glsl',
  'glsl/floor.vs.glsl',
  'glsl/floor.fs.glsl',
];

new THREE.SourceLoader().load(shaderFiles, function (shaders) {
  sphereMaterial.vertexShader = shaders['glsl/sphere.vs.glsl'];
  sphereMaterial.fragmentShader = shaders['glsl/sphere.fs.glsl'];

  phongMaterial.vertexShader = shaders['glsl/phong.vs.glsl'];
  phongMaterial.fragmentShader = shaders['glsl/phong.fs.glsl'];

  toonMaterial.vertexShader = shaders['glsl/toon.vs.glsl'];
  toonMaterial.fragmentShader = shaders['glsl/toon.fs.glsl'];

  squaresMaterial.vertexShader = shaders['glsl/squares.vs.glsl'];
  squaresMaterial.fragmentShader = shaders['glsl/squares.fs.glsl'];

  floorMaterial.vertexShader = shaders['glsl/floor.vs.glsl'];
  floorMaterial.fragmentShader = shaders['glsl/floor.fs.glsl'];
});

// Define the shader modes
const shaders = {
  PHONG: { key: 0, material: phongMaterial },
  TOON: { key: 1, material: toonMaterial },
  SQUARES: { key: 2, material: squaresMaterial }
};

let mode = shaders.SQUARES.key; // Default

const loader = new THREE.CubeTextureLoader();

// make skybox, code taken from https://threejs.org/manual/?q=skybox#en/backgrounds
const texture = loader.load([
  'texture/bkg/blue/bkg1_right.png',
  'texture/bkg/blue/bkg1_left.png',
  'texture/bkg/blue/bkg1_top.png',
  'texture/bkg/blue/bkg1_bot.png',
  'texture/bkg/blue/bkg1_front.png',
  'texture/bkg/blue/bkg1_back.png'
]);

// Set up scenes
let scenes = [];
for (let shader of Object.values(shaders)) {
  // Create the scene
  const { scene, camera, worldFrame } = createScene(canvas);
  scene.background = texture;

  // Create the main sphere geometry (light source)
  // https://threejs.org/docs/#api/en/geometries/SphereGeometry
  const sphereGeometry = new THREE.SphereGeometry(1.0, 32.0, 32.0);
  const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
  sphere.position.set(0.0, 1.5, 0.0);
  sphere.parent = worldFrame;
  scene.add(sphere);

  // Look at the definition of loadOBJ to familiarize yourself with
  // how each parameter affects the loaded object.
  loadAndPlaceOBJ('obj/armadillo.obj', shader.material, function (armadillo) {
    armadillo.position.set(0.0, 0.0, -10.0);
    armadillo.rotation.y = Math.PI;
    armadillo.scale.set(10, 10, 10);
    armadillo.parent = worldFrame;
    scene.add(armadillo);
  });

  // 1a) set terrain texture 
  // -- this was done w js, not with vs/fs, ignore
  // var terrainTexture = new THREE.TextureLoader().load('texture/color.jpg');
  // terrainTexture.wrapS = THREE.RepeatWrapping;
  // terrainTexture.wrapT = THREE.RepeatWrapping;
  // terrainTexture.repeat.set(1,1);
  // var terrainTexture = new THREE.MeshBasicMaterial({ 
  //   map: terrainTexture, 
  //   side: THREE.DoubleSide 
  // });

  const terrainGeometry = new THREE.BoxGeometry(50, 50, 5);
  const terrain = new THREE.Mesh(terrainGeometry, floorMaterial);
  // const terrain = new THREE.Mesh(terrainGeometry, terrainTexture);
  terrain.position.y = -10.4;
  terrain.rotation.set(- Math.PI / 2, 0, 0);
  scene.add(terrain);
  
  // scene.add(sphereLight);
  scenes.push({ scene, camera });
}


// Listen to keyboard events.
const keyboard = new THREEx.KeyboardState();
function checkKeyboard() {
  if (keyboard.pressed("1"))
    mode = shaders.PHONG.key;
  else if (keyboard.pressed("2"))
    mode = shaders.TOON.key;
  else if (keyboard.pressed("3"))
    mode = shaders.SQUARES.key;

  if (keyboard.pressed("W"))
    spherePosition.value.z -= 0.3;
  else if (keyboard.pressed("S"))
    spherePosition.value.z += 0.3;

  if (keyboard.pressed("A"))
    spherePosition.value.x -= 0.3;
  else if (keyboard.pressed("D"))
    spherePosition.value.x += 0.3;

  if (keyboard.pressed("E"))
    spherePosition.value.y -= 0.3;
  else if (keyboard.pressed("Q"))
    spherePosition.value.y += 0.3;

    
  sphereLight.position.set(spherePosition.value.x, spherePosition.value.y, spherePosition.value.z);

  // The following tells three.js that some uniforms might have changed
  sphereMaterial.needsUpdate = true;
  phongMaterial.needsUpdate = true;
  toonMaterial.needsUpdate = true;
  squaresMaterial.needsUpdate = true;
  floorMaterial.needsUpdate = true;
}

// clock = THREE.Clock;

// Setup update callback
function update() {
  checkKeyboard();
  ticks.value += 1 / 100.0;

  // Requests the next update call, this creates a loop
  requestAnimationFrame(update);
  const { scene, camera } = scenes[mode];
  renderer.render(scene, camera);
}

// Start the animation loop.
update();
