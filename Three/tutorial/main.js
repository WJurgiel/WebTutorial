import './style.css'
import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';

//the following code is a huge mess - sorry, not gonna refactor it ;P
const aspectRatio = window.innerHeight / window.innerHeight;
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, aspectRatio,0.1, 1000);
const renderer = new THREE.WebGL1Renderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);
renderer.render(scene,camera);

const geometry = new THREE.TorusGeometry(10,3,16,100);
const material = new THREE.MeshStandardMaterial({color: 0xFF6347});
const torus = new THREE.Mesh(geometry,material);

scene.add(torus);

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5,5,5);
const ambientLight = new THREE.AmbientLight(0xffffff);


const lightHelper = new THREE.PointLightHelper(pointLight);
const gridHelper = new THREE.GridHelper(400,100);
scene.add(ambientLight,pointLight,lightHelper,gridHelper);

const controls = new OrbitControls(camera, renderer.domElement);

function animate(){
  requestAnimationFrame(animate);

  torus.rotation.x += 0.005;
  torus.rotation.y += 0.005;
  cat2.rotation.x  += 0.001;
  controls.update();
  renderer.render(scene, camera);
}
function addStar(){
  const geometry = new THREE.SphereGeometry(0.25,24,24);
  const material = new THREE.MeshStandardMaterial({color:0xffffff});
  const star = new THREE.Mesh(geometry, material);

  const [x,y,z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));
  star.position.set(x,y,z);
  scene.add(star);
}

Array(200).fill().forEach(addStar);
const spaceTexture = new THREE.TextureLoader().load('space.jpg');
scene.background = spaceTexture;

//cube
const catTexture = new THREE.TextureLoader().load('cat.jpg');
const cat = new THREE.Mesh(
  new THREE.BoxGeometry(3,3,3,3),
  new THREE.MeshBasicMaterial({map: catTexture})
)

//sillyMoon
const cat2Texture = new THREE.TextureLoader().load('moon.jpg');
const normal = new THREE.TextureLoader().load('normal.jpg');
const cat2 = new THREE.Mesh(
  new THREE.SphereGeometry(3),
  new THREE.MeshStandardMaterial({
    map: cat2Texture, 
    normalMap: normal
  })
);

scene.add(cat,cat2);
cat2.position.setX(30);
animate()