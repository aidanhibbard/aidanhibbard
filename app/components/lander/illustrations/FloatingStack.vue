<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'

import kubernetesLogo from '~/assets/images/stack/kubernetes.png'
import postgresLogo from '~/assets/images/stack/postgresql.png'
import typescriptLogo from '~/assets/images/stack/typescript.png'
import valkeyLogo from '~/assets/images/stack/valkey.png'
import viteLogo from '~/assets/images/stack/vite.png'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()

const cx = 160
const halfWidth = 84
const halfDepth = 18
const slabHeight = 10
const layerGap = 14
const layerStep = halfDepth * 2 + slabHeight + layerGap
const bottomCy = 268
const logoSize = 22

type StackLayer = {
  name: string
  logo: string
  leftFill: string
  rightFill: string
}

const stackLayers: StackLayer[] = [
  {
    name: 'Vite',
    logo: viteLogo,
    leftFill: '#535bf2',
    rightFill: '#646cff',
  },
  {
    name: 'TypeScript',
    logo: typescriptLogo,
    leftFill: '#2568ab',
    rightFill: '#3178C6',
  },
  {
    name: 'Valkey',
    logo: valkeyLogo,
    leftFill: '#0f2d61',
    rightFill: '#123678',
  },
  {
    name: 'Postgres',
    logo: postgresLogo,
    leftFill: '#2a5675',
    rightFill: '#3d7398',
  },
  {
    name: 'Kubernetes',
    logo: kubernetesLogo,
    leftFill: '#2859bc',
    rightFill: '#326ce5',
  },
]

const layerPaths = stackLayers.map((layer, index) => {
  const cy = bottomCy - index * layerStep
  const top = cy - halfDepth
  const bottom = cy + halfDepth
  const left = cx - halfWidth
  const right = cx + halfWidth

  return {
    ...layer,
    cy,
    logoX: cx - logoSize / 2,
    logoY: cy - logoSize / 2,
    topFace: `M ${left} ${cy} L ${cx} ${top} L ${right} ${cy} L ${cx} ${bottom} Z`,
    leftFace: `M ${left} ${cy} L ${cx} ${bottom} L ${cx} ${bottom + slabHeight} L ${left} ${cy + slabHeight} Z`,
    rightFace: `M ${right} ${cy} L ${cx} ${bottom} L ${cx} ${bottom + slabHeight} L ${right} ${cy + slabHeight} Z`,
  }
})
</script>

<template>
  <svg
    viewBox="0 0 320 300"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    role="img"
    aria-label="Technology stack: Kubernetes, Postgres, Valkey, TypeScript, and Vite"
    :class="cn('h-auto w-full text-muted-foreground/45', props.class)"
  >
    <title>Technology stack</title>

    <defs>
      <pattern
        id="floating-stack-dots"
        width="12"
        height="12"
        patternUnits="userSpaceOnUse"
      >
        <circle
          cx="6"
          cy="6"
          r="1"
          fill="currentColor"
        />
      </pattern>
      <radialGradient
        id="floating-stack-dot-fade"
        cx="50%"
        cy="46%"
        r="58%"
      >
        <stop
          offset="0%"
          stop-color="white"
          stop-opacity="1"
        />
        <stop
          offset="60%"
          stop-color="white"
          stop-opacity="0.65"
        />
        <stop
          offset="100%"
          stop-color="white"
          stop-opacity="0"
        />
      </radialGradient>
      <mask id="floating-stack-dot-mask">
        <rect
          width="320"
          height="300"
          fill="url(#floating-stack-dot-fade)"
        />
      </mask>
      <filter
        id="floating-stack-shadow"
        x="-20%"
        y="-10%"
        width="140%"
        height="130%"
      >
        <feDropShadow
          dx="0"
          dy="6"
          stdDeviation="8"
          flood-color="#000000"
          flood-opacity="0.1"
        />
      </filter>
    </defs>

    <rect
      width="320"
      height="300"
      fill="url(#floating-stack-dots)"
      mask="url(#floating-stack-dot-mask)"
    />

    <g filter="url(#floating-stack-shadow)">
      <g
        v-for="(layer, index) in layerPaths"
        :key="`slice-${index}`"
      >
        <path
          :d="layer.leftFace"
          :fill="layer.leftFill"
          class="stroke-border/30"
          stroke-width="1"
          stroke-linejoin="round"
        />
        <path
          :d="layer.rightFace"
          :fill="layer.rightFill"
          class="stroke-border/30"
          stroke-width="1"
          stroke-linejoin="round"
        />
        <path
          :d="layer.topFace"
          class="fill-card stroke-border/50"
          stroke-width="1"
          stroke-linejoin="round"
        />
        <image
          :href="layer.logo"
          :x="layer.logoX"
          :y="layer.logoY"
          :width="logoSize"
          :height="logoSize"
          preserveAspectRatio="xMidYMid meet"
        >
          <title>{{ layer.name }}</title>
        </image>
      </g>
    </g>
  </svg>
</template>
