import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';


const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 500);
const controls = new OrbitControls(camera, renderer.domElement);
const loader = new GLTFLoader();

camera.position.set(0, 0, 100);
controls.update();

const scene = new THREE.Scene();

renderer.render(scene, camera);
window.addEventListener('resize', onWindowResize);

const r = 10;
const widthSegments = 30;
const heightSegments = 30;
const sphere = new THREE.SphereGeometry(r, widthSegments, heightSegments);

const object = new THREE.Mesh(sphere, new THREE.MeshNormalMaterial());
const box = new THREE.BoxHelper(object, 0xff0000);
scene.add(object);

scene.add(box);
const cage = addCage(50, 30, 30);
scene.add(cage);
animate();

function animate() {
    requestAnimationFrame(animate);
    // required if controls.enableDamping or controls.autoRotate are set to true
    controls.update();
    renderer.render(scene, camera);
}


function addCage(x, y, z) {
    var w = x * -1;
    var n = y;
    var s = y * -1
    var e = x;
    //create a blue LineBasicMaterial
    const material = new THREE.LineBasicMaterial({ color: 0xffffff });
    //begin shape
    const points = [];
    //front
    points.push(new THREE.Vector3(w, s, -z));
    points.push(new THREE.Vector3(w, n, -z));
    points.push(new THREE.Vector3(e, n, -z));
    points.push(new THREE.Vector3(e, s, -z));
    points.push(new THREE.Vector3(w, s, -z));
    //back
    points.push(new THREE.Vector3(w, s, z));
    points.push(new THREE.Vector3(w, n, z));
    points.push(new THREE.Vector3(e, n, z));
    points.push(new THREE.Vector3(e, s, z));
    points.push(new THREE.Vector3(w, s, z));
    //sides
    points.push(new THREE.Vector3(w, s, -z));
    points.push(new THREE.Vector3(w, n, -z));
    points.push(new THREE.Vector3(w, n, z));
    points.push(new THREE.Vector3(e, n, z));
    points.push(new THREE.Vector3(e, n, -z));
    points.push(new THREE.Vector3(e, s, -z));
    points.push(new THREE.Vector3(e, s, z));
    //buffer geometry
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    //object
    const cagePath = new THREE.Line(geometry, material);
    return (cagePath);
}

function onWindowResize() {
    const windowHalfX = window.innerWidth / 2;
    const windowHalfY = window.innerHeight / 2;
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);

}