<script setup lang="ts">
import * as THREE from "three";

// Create a reference for the container
const container = ref<HTMLDivElement | null>(null);
let renderer: THREE.WebGLRenderer;
let scene: THREE.Scene;
let camera: THREE.PerspectiveCamera;

// Texture loader for the heightmap
const loader = new THREE.TextureLoader();
const heightmap = loader.load("https://i.imgur.com/dBRI8c2.jpg");

function initScene() {
  const width = container.value!.clientWidth;
  const height = container.value!.clientHeight;

  // Scene setup
  scene = new THREE.Scene();

  // Sky gradient (left-to-right)
  const skyTexture = new THREE.CanvasTexture(
    generateSkyGradient("#d8e3e1", "#526f75")
  );
  scene.background = skyTexture;

  // Camera setup
  camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
  camera.position.set(0, 3, 2);

  // Renderer setup
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(width, height);
  renderer.setPixelRatio(window.devicePixelRatio);
  container.value!.appendChild(renderer.domElement);

  const geometry = new THREE.PlaneGeometry(3.5, 3.5, 128, 128)

  const material = new THREE.MeshStandardMaterial({
    displacementMap: heightmap,
    wireframe: true,
  })

  const plane = new THREE.Mesh(geometry, material)

  plane.rotateX(180)
  plane.rotateZ(160)

  scene.add(plane)

  camera.lookAt(plane.position)

  animate();
}

function generateSkyGradient(startColor: string, endColor: string): HTMLCanvasElement {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d")!;
  canvas.width = 1;
  canvas.height = 256;

  const angle = 45 * Math.PI / 180;
  const x2 = 300 * Math.cos(angle);
  const y2 = 300 * Math.sin(angle);
  const gr = ctx.createLinearGradient(0, 0, x2, y2);
  gr.addColorStop(0, startColor);
  gr.addColorStop(1, endColor);

  ctx.fillStyle = gr;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  return canvas;
}

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

function onResize() {
  const width = container.value!.clientWidth;
  const height = container.value!.clientHeight;
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  renderer.setSize(width, height);
}

onMounted(() => {
  initScene();
  window.addEventListener("resize", onResize);
});
</script>

<template>
  <div
    ref="container"
    class="h-screen w-full relative"
  >
    <div class="absolute inset-0 flex flex-col items-center z-10 pt-20">
      <h1 class="text-4xl font-bold text-white">
        Developing for a Better Future
      </h1>
      <p class="text-white text-center mt-4 max-w-md">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum vestibulum.
      </p>
      <div class="flex gap-4 mt-6">
        <button class="bg-[#0a7588] text-white px-6 py-2 rounded hover:bg-[#095d6e]">
          Primary Button
        </button>
        <button class="bg-white text-[#0a7588] px-6 py-2 rounded hover:bg-gray-200">
          Secondary Button
        </button>
      </div>
    </div>
  </div>
</template>

<style>
body {
  margin: 0;
  overflow: hidden;
}
</style>
