import * as THREE from 'https://cdn.jsdelivr.net/npm/three@latest/build/three.module.js';
import { GLTFLoader } from 'https://cdn.jsdelivr.net/npm/three@latest/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@latest/examples/jsm/controls/OrbitControls.js';

// Scene, Camera, Renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Load GLB Model
const loader = new GLTFLoader();
const modelUrl = 'https://drive.google.com/uc?export=download&id=1VBEvH0ekQ9SSqxaW0KNCAXNOrGb-sVDc';

let model;
loader.load(modelUrl, function (gltf) {
    model = gltf.scene;
    scene.add(model);
    model.position.set(0, -1, 0);  // Adjust position if needed
    model.scale.set(1, 1, 1);      // Adjust scale if too big/small
}, undefined, function (error) {
    console.error('Error loading the model:', error);
});

// Lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(5, 10, 5);
scene.add(directionalLight);

// Camera & Controls
camera.position.set(0, 1, 3);  // Adjust distance if needed
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; // Smooth movement
controls.dampingFactor = 0.05;
controls.rotateSpeed = 0.5;
controls.zoomSpeed = 1.2;
controls.enablePan = false;  // Disable moving around
controls.autoRotate = true;  // Auto-rotate on load
controls.autoRotateSpeed = 1.0;

// Animation Loop
function animate() {
    requestAnimationFrame(animate);
    controls.update();  // Enable rotation & zoom
    renderer.render(scene, camera);
}
animate();

// Resize listener
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
