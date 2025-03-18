import * as THREE from 'https://cdn.jsdelivr.net/npm/three@latest/build/three.module.js';
import { GLTFLoader } from 'https://cdn.jsdelivr.net/npm/three@latest/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@latest/examples/jsm/controls/OrbitControls.js';

// Scene, Camera & Renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambientLight);
const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
directionalLight.position.set(5, 5, 5);
scene.add(directionalLight);

// Load GLB Model
const loader = new GLTFLoader();
loader.load('absractskullmotif.blender.glb', function (gltf) {
    const model = gltf.scene;
    model.position.set(0, -1, 0); // Adjust position if needed
    scene.add(model);

    // Rotate model continuously on Z-axis
    function rotateModel() {
        requestAnimationFrame(rotateModel);
        model.rotation.z += 0.005; // Adjust speed if needed
        renderer.render(scene, camera);
    }
    rotateModel();
}, undefined, function (error) {
    console.error('Error loading the model:', error);
});

// Orbit Controls for Mouse Interaction
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; 
controls.dampingFactor = 0.05; 
controls.screenSpacePanning = false; 
controls.minDistance = 1;
controls.maxDistance = 10;
controls.maxPolarAngle = Math.PI;

// Set Camera Position
camera.position.set(0, 0, 3);

// Animation Loop
function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}
animate();

// Resize Event Listener
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
