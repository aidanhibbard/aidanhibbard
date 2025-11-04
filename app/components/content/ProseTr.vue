<script setup lang="ts">
import {
  TableRow,
} from '~/components/shadcn/ui/table'
import { motion } from 'motion-v'
</script>

<template>
  <motion.div
    :initial="{ opacity: 0, y: 8 }"
    :while-in-view="{ opacity: 1, y: 0 }"
    :transition="{ duration: 0.25 }"
    :viewport="{ once: true, margin: '-10% 0px' }"
  >
    <TableRow>
      <slot />
    </TableRow>
  </motion.div>
</template>
