import * as THREE from 'https://cdn.jsdelivr.net/npm/three@latest/build/three.module.js';
import { GLTFLoader } from 'https://cdn.jsdelivr.net/npm/three@latest/examples/jsm/loaders/GLTFLoader.js';

// Scene setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Load GLTF model
const loader = new GLTFLoader();
loader.load(
    'https://lord0f5li3s.github.io/metamorph2/absractskullmotif.blender.glb',
    function (gltf) {
        let model = gltf.scene;
        model.scale.set(1, 1, 1); // Adjust scale if needed
        model.position.set(0, 0, 0);
        scene.add(model);

        // Animate rotation
        function animate() {
            requestAnimationFrame(animate);
            model.rotation.y += 0.01; // Rotates continuously
            renderer.render(scene, camera);
        }
        animate();
    },
    undefined,
    function (error) {
        console.error('Error loading model:', error);
    }
);

// Lighting
const light = new THREE.AmbientLight(0xffffff, 1);
scene.add(light);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(1, 1, 1).normalize();
scene.add(directionalLight);

// Camera position
camera.position.z = 5;

// Handle window resizing
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});
