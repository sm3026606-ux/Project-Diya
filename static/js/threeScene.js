// =========================
// Project Diya V2
// Three.js Scene
// =========================

// Scene
const scene = new THREE.Scene();

// Camera
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

camera.position.z = 8;

// Renderer
const renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

document
    .getElementById("scene-container")
    .appendChild(renderer.domElement);

// Lights
const ambientLight = new THREE.AmbientLight(0xffffff, 1.4);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xff69b4, 3);
pointLight.position.set(5, 5, 8);
scene.add(pointLight);

// Texture Loader
const loader = new THREE.TextureLoader();

// Photo Array
const photoMeshes = [];

let scrollProgress = 0;


window.addEventListener("scroll",()=>{

    scrollProgress =
    window.scrollY / window.innerHeight;

});

// Total photos
const TOTAL_PHOTOS = 9;

for (let i = 1; i <= TOTAL_PHOTOS; i++) {

    const texture = loader.load(`/static/images/photo${i}.JPG`);

    const geometry = new THREE.PlaneGeometry(2.1, 3);

    const material = new THREE.MeshBasicMaterial({
        map: texture,
        transparent: true
    });

    const photo = new THREE.Mesh(geometry, material);

    photo.position.x = (Math.random() - 0.5) * 12;
    photo.position.y = (Math.random() - 0.5) * 7;
    photo.position.z = (Math.random() - 0.5) * 5;

    photo.rotation.y = Math.random();

    scene.add(photo);

    photoMeshes.push(photo);

}

// Mouse

let mouseX = 0;
let mouseY = 0;

document.addEventListener("mousemove", (e) => {

    mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
    mouseY = (e.clientY / window.innerHeight - 0.5) * 2;

});

// Animation

function animate() {

    requestAnimationFrame(animate);


    const time = Date.now() * 0.001;


    photoMeshes.forEach((photo, index) => {


        // Faster cinematic rotation
        photo.rotation.y += 0.018;


        // Small tilt movement
        photo.rotation.x =
        mouseY * 0.35 + Math.sin(time + index) * 0.05;


        // Floating effect
        photo.position.y +=
        Math.sin(time * 2 + index) * 0.004;

        // Scroll based movement

photo.position.z =
- Math.abs(scrollProgress - index * 0.3) * 2;


photo.scale.set(

    1 + Math.max(
        0,
        1 - Math.abs(scrollProgress - index * 0.3)
    ) * 0.4,

    1 + Math.max(
        0,
        1 - Math.abs(scrollProgress - index * 0.3)
    ) * 0.4,

    1

);


        // Slight side movement
        photo.position.x +=
        Math.cos(time + index) * 0.0015;


    });



    camera.position.x +=
    (mouseX * 1.8 - camera.position.x) * 0.05;


    camera.position.y +=
    (-mouseY * 1.8 - camera.position.y) * 0.05;



    renderer.render(scene, camera);

}

animate();

// Resize

window.addEventListener("resize", () => {

    camera.aspect = window.innerWidth / window.innerHeight;

    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);

});