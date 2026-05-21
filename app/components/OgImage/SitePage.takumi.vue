<script setup lang="ts">
defineProps({
  title: { type: String, required: true },
  description: { type: String, required: false },
  siteLabel: { type: String, required: false },
  siteUrl: { type: String, required: false, default: 'aidanhibbard.dev' },
  colorMode: { type: String, required: false, default: 'dark' },
})
</script>

<template>
  <div
    class="relative flex h-full w-full flex-col justify-between bg-[#09090b] p-12 text-[#fafafa] lg:p-16"
  >
    <div
      class="pointer-events-none absolute inset-0 opacity-40"
      style="background-image: radial-gradient(ellipse 80% 60% at 100% 0%, rgba(250, 250, 250, 0.08) 0%, transparent 60%);"
    />

    <div class="relative flex flex-1 flex-col justify-center gap-8">
      <h1
        class="m-0 max-w-[980px] text-[56px] leading-[1.05] font-semibold tracking-tight text-balance lg:text-[76px]"
      >
        {{ title }}
      </h1>

      <p
        v-if="description"
        class="m-0 max-w-[920px] text-[28px] leading-[1.45] text-balance text-[#a1a1aa] lg:text-[34px]"
      >
        {{ description }}
      </p>
    </div>

    <div
      class="relative mt-10 flex items-center justify-between border border-[#27272a] bg-[#111113] px-6 py-5 lg:px-8 lg:py-6"
    >
      <span class="font-mono text-[18px] tracking-[0.08em] text-[#a1a1aa] uppercase lg:text-[22px]">
        github.com/aidanhibbard
      </span>
      <span class="font-mono text-[18px] tracking-[0.08em] text-[#a1a1aa] uppercase lg:text-[22px]">
        linkedin.com/in/aidan-hibbard
      </span>
    </div>
  </div>
</template>
