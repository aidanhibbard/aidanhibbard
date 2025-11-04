<script setup lang="ts">
import { Table } from '~/components/shadcn/ui/table'
import { motion } from 'motion-v'
</script>

<template>
  <motion.div
    :initial="{ opacity: 0 }"
    :while-in-view="{ opacity: 1 }"
    :transition="{ duration: 0.25 }"
    :viewport="{ once: true, margin: '-10% 0px' }"
  >
    <Table>
      <slot />
    </Table>
  </motion.div>
</template>
