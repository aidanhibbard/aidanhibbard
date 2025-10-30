<script setup lang="ts">
import { onMounted, onBeforeUnmount, reactive } from 'vue'
import { Vector2 } from 'three'

const uniforms = reactive<{ u_time: { value: number }, u_resolution: { value: Vector2 } }>({
  u_time: { value: 0 },
  u_resolution: { value: new Vector2(1, 1) },
})

const vertexShader = /* glsl */ `
varying vec2 vUv;
void main() {
  vUv = uv;
  // Fullscreen quad (PlaneGeometry 2x2 in clip space)
  gl_Position = vec4(position, 1.0);
}
`

const fragmentShader = /* glsl */ `
precision highp float;

uniform float u_time;
uniform vec2 u_resolution;
varying vec2 vUv;

// Simple layered trigonometric pattern for a flowy gradient look
float wave(vec2 p, float freq, float speed, float phase) {
  return sin(p.x * freq + u_time * speed + phase) * 0.5 + 0.5;
}

void main() {
  // Centered UV for subtle radial modulation
  vec2 uv = vUv;
  vec2 cuv = uv - 0.5;

  // Aspect-corrected distance from center for gentle vignette
  float aspect = u_resolution.x / max(1.0, u_resolution.y);
  vec2 ac = vec2(cuv.x * aspect, cuv.y);
  float radial = smoothstep(0.9, 0.1, length(ac));

  // Layered waves to simulate flowing noise-like field
  float w1 = wave(uv * 2.2 + vec2(0.0, cuv.y * 0.5), 3.5, 0.6, 0.0);
  float w2 = wave(uv.yx * 3.0 + vec2(cuv.x * 0.4, 0.0), 4.0, -0.4, 1.57);
  float w3 = wave(uv * 1.4 + vec2(cuv.yx * 0.6), 2.2, 0.25, 3.14);

  float field = (w1 + w2 + w3) / 3.0;

  // Palette: soft purple → blue → warm highlight
  vec3 c1 = vec3(0.76, 0.62, 0.98);
  vec3 c2 = vec3(0.53, 0.74, 0.98);
  vec3 c3 = vec3(0.98, 0.90, 0.78);

  // Animate blend weight slowly for living feel
  float t = 0.5 + 0.5 * sin(u_time * 0.15);
  vec3 base = mix(c1, c2, field);
  vec3 mixed = mix(base, c3, smoothstep(0.35, 0.85, field) * t);

  // Apply subtle radial vignette
  vec3 col = mixed * (0.85 + 0.15 * radial);

  // Gentle saturation boost
  col = mix(col, normalize(col + 1e-5), 0.05);

  gl_FragColor = vec4(col, 1.0);
}
`

function setResolution() {
  if (!import.meta.client) return
  uniforms.u_resolution.value.set(window.innerWidth, window.innerHeight)
}

let rafId: number | null = null
let startAtMs: number | null = null

function frame(nowMs: number) {
  if (startAtMs === null) startAtMs = nowMs
  const elapsed = (nowMs - startAtMs) / 1000
  uniforms.u_time.value = elapsed
  rafId = requestAnimationFrame(frame)
}

onMounted(() => {
  setResolution()
  window.addEventListener('resize', setResolution, { passive: true })
  rafId = requestAnimationFrame(frame)
})

onBeforeUnmount(() => {
  if (!import.meta.client) return
  window.removeEventListener('resize', setResolution)
  if (rafId !== null) cancelAnimationFrame(rafId)
})
</script>

<template>
  <div class="relative">
    <div class="absolute inset-0 -z-10 pointer-events-none">
      <TresCanvas
        :alpha="true"
        :antialias="true"
      >
        <TresOrthographicCamera :position="[0, 0, 1]" />
        <TresMesh>
          <TresPlaneGeometry :args="[2, 2]" />
          <TresShaderMaterial
            :vertex-shader="vertexShader"
            :fragment-shader="fragmentShader"
            :uniforms="uniforms"
            :transparent="true"
            :depth-test="false"
            :depth-write="false"
          />
        </TresMesh>
      </TresCanvas>
    </div>
    <slot />
  </div>
</template>
