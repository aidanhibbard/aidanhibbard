<script setup lang="ts">
import { onMounted, onBeforeUnmount, reactive, ref, watch } from 'vue'
import { Vector2, Vector3 } from 'three'
import useTheme from '~/composables/use-theme'

const rafId = ref<number | null>(null)
const startAtMs = ref<number | null>(null)
type ShaderUniforms = {
  u_time: { value: number }
  u_resolution: { value: Vector2 }
  u_cBase1: { value: Vector3 }
  u_cBase2: { value: Vector3 }
  u_cAccent: { value: Vector3 }
}

const uniforms = reactive<ShaderUniforms>({
  u_time: { value: 0 },
  u_resolution: { value: new Vector2(1, 1) },
  u_cBase1: { value: new Vector3(1, 1, 1) },
  u_cBase2: { value: new Vector3(1, 1, 1) },
  u_cAccent: { value: new Vector3(1, 1, 1) },
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
uniform vec3 u_cBase1;
uniform vec3 u_cBase2;
uniform vec3 u_cAccent;
varying vec2 vUv;

// Simple layered trigonometric pattern for a flowy gradient look
float wave(vec2 p, float freq, float speed, float phase) {
  return sin(p.x * freq + (u_time * 0.5) * speed + phase) * 0.5 + 0.5;
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

  // Palette dynamics: subtly time-lerp the palette for a living feel
  float shiftA = 0.12 * (sin(u_time * 0.05) * 0.5 + 0.5); // 0..0.12
  float shiftB = 0.10 * (cos(u_time * 0.04) * 0.5 + 0.5); // 0..0.10
  vec3 base1Animated = mix(u_cBase1, u_cAccent, shiftA);
  vec3 base2Animated = mix(u_cBase2, u_cAccent, shiftB);

  // Spatial gradient then accent infusion that also oscillates slowly
  float t = 0.5 + 0.5 * sin(u_time * 0.08);
  vec3 base = mix(base1Animated, base2Animated, field);
  vec3 mixed = mix(base, u_cAccent, smoothstep(0.35, 0.85, field) * t * 0.8);

  // Apply subtle radial vignette
  vec3 col = mixed * (0.85 + 0.15 * radial);

  // Gentle saturation boost
  col = mix(col, normalize(col + 1e-5), 0.05);

  gl_FragColor = vec4(col, 1.0);
}
`

function hexToVec3(hex: string): Vector3 {
  const h = hex.replace('#', '')
  const bigint = parseInt(h, 16)
  const r = ((bigint >> 16) & 255) / 255
  const g = ((bigint >> 8) & 255) / 255
  const b = (bigint & 255) / 255
  return new Vector3(r, g, b)
}

const { theme } = useTheme()

function applyIcePalette(current: 'light' | 'dark') {
  // Accessible palettes tuned for foreground contrast
  // Dark theme: keep background very dark; accent remains dark to avoid bright patches
  const dark1 = hexToVec3('#0B0F14') // very dark blue-gray ~ #0b0f14
  const dark2 = hexToVec3('#111827') // slate-900
  const accent = hexToVec3('#0E1F2B') // deep cyan/teal-950
  // Light theme: keep background very light; accent is pastel to avoid mid-tones
  const light1 = hexToVec3('#F9FAFB') // gray-50
  const light2 = hexToVec3('#EEF2FF') // indigo-50
  const lightAccent = hexToVec3('#E0F2FE') // sky-100

  if (current === 'dark') {
    uniforms.u_cBase1.value = dark1
    uniforms.u_cBase2.value = dark2
    uniforms.u_cAccent.value = accent
  }
  else {
    // Light mode: very light base with soft pastel accent; avoid introducing dark bands
    uniforms.u_cBase1.value = light1
    uniforms.u_cBase2.value = light2
    uniforms.u_cAccent.value = lightAccent
  }
}

const setResolution = () => {
  if (!import.meta.client) return
  uniforms.u_resolution.value.set(window.innerWidth, window.innerHeight)
}

const frame = (nowMs: number) => {
  if (startAtMs.value === null) startAtMs.value = nowMs
  const elapsed = (nowMs - startAtMs.value) / 1000
  uniforms.u_time.value = elapsed
  rafId.value = requestAnimationFrame(frame)
}

onMounted(() => {
  setResolution()
  window.addEventListener('resize', setResolution, { passive: true })
  rafId.value = requestAnimationFrame(frame)
  applyIcePalette(theme.value)
})

onBeforeUnmount(() => {
  if (!import.meta.client) return
  window.removeEventListener('resize', setResolution)
  if (rafId.value !== null) cancelAnimationFrame(rafId.value)
})

watch(theme, (next) => {
  applyIcePalette(next)
})
</script>

<template>
  <div class="relative">
    <svg
      class="absolute inset-0 w-0 h-0"
      aria-hidden="true"
    >
      <defs>
        <filter
          id="glass-effect"
          x="-50%"
          y="-50%"
          width="200%"
          height="200%"
        >
          <feTurbulence
            baseFrequency="0.005"
            numOctaves="1"
            result="noise"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="noise"
            scale="0.3"
          />
          <feColorMatrix
            type="matrix"
            values="1 0 0 0 0.02
                    0 1 0 0 0.02
                    0 0 1 0 0.05
                    0 0 0 0.9 0"
            result="tint"
          />
        </filter>
        <filter
          id="gooey-filter"
          x="-50%"
          y="-50%"
          width="200%"
          height="200%"
        >
          <feGaussianBlur
            in="SourceGraphic"
            stdDeviation="4"
            result="blur"
          />
          <feColorMatrix
            in="blur"
            type="matrix"
            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9"
            result="gooey"
          />
          <feComposite
            in="SourceGraphic"
            in2="gooey"
            operator="atop"
          />
        </filter>
      </defs>
    </svg>
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
