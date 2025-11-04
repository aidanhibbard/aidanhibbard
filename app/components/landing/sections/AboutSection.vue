<script setup lang="ts">
import { motion } from 'motion-v'
import { Button } from '~/components/shadcn/ui/button'
import { RotateCcw, Eye, Trash2 } from 'lucide-vue-next'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '~/components/shadcn/ui/table'

type SyncItem = {
  id: string
  status: 'success' | 'failed' | 'running'
  service: string
  lastSync: string
  nextSync: string
  syncedBy: 'System' | string
}

const syncs: SyncItem[] = [
  {
    id: 'sync_001',
    status: 'success',
    service: 'Stripe Billing',
    lastSync: '2025-10-31T14:15:00Z',
    nextSync: '2025-11-01T14:15:00Z',
    syncedBy: 'System',
  },
  {
    id: 'sync_002',
    status: 'running',
    service: 'GitHub Repos',
    lastSync: '2025-10-31T13:05:00Z',
    nextSync: '2025-11-01T13:05:00Z',
    syncedBy: 'ops@acme.com',
  },
  {
    id: 'sync_003',
    status: 'failed',
    service: 'Salesforce',
    lastSync: '2025-10-31T12:00:00Z',
    nextSync: '2025-11-01T12:00:00Z',
    syncedBy: 'System',
  },
  {
    id: 'sync_004',
    status: 'success',
    service: 'Google Analytics',
    lastSync: '2025-10-31T10:30:00Z',
    nextSync: '2025-11-01T10:30:00Z',
    syncedBy: 'marketing@acme.com',
  },
  {
    id: 'sync_005',
    status: 'running',
    service: 'S3 Backups',
    lastSync: '2025-10-31T09:00:00Z',
    nextSync: '2025-11-01T09:00:00Z',
    syncedBy: 'System',
  },
  {
    id: 'sync_006',
    status: 'failed',
    service: 'Mailgun Events',
    lastSync: '2025-10-30T21:45:00Z',
    nextSync: '2025-10-31T21:45:00Z',
    syncedBy: 'alerts@acme.com',
  },
  {
    id: 'sync_007',
    status: 'success',
    service: 'Postgres Replication',
    lastSync: '2025-10-31T07:20:00Z',
    nextSync: '2025-11-01T07:20:00Z',
    syncedBy: 'System',
  },
]

const statusToColor = (status: SyncItem['status']) => {
  if (status === 'success') return 'bg-green-500'
  if (status === 'failed') return 'bg-red-500'
  return 'bg-blue-500'
}

const formatDate = (iso: string) => {
  const d = new Date(iso)
  const pad = (n: number) => String(n).padStart(2, '0')
  const yyyy = d.getFullYear()
  const mm = pad(d.getMonth() + 1)
  const dd = pad(d.getDate())
  const hh = pad(d.getHours())
  const mi = pad(d.getMinutes())
  return `${yyyy}-${mm}-${dd} ${hh}:${mi}`
}

const refreshSync = (_id: string) => {}
const viewSync = (_id: string) => {}
const deleteSyncItem = (_id: string) => {}
</script>

<template>
  <section
    id="about"
    class="min-h-screen flex flex-col md:flex-row items-end md:items-center justify-center md:justify-between gap-8 md:gap-16 px-4 md:px-16 pb-32 md:pb-0 relative"
  >
    <motion.div
      :initial="{ opacity: 0, y: 30 }"
      :animate="{ opacity: 1, y: 0 }"
      :transition="{ duration: 0.8, delay: 0.2 }"
      class="hidden md:block md:w-1/2 max-w-4xl text-center md:text-left"
    >
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead class="w-[80px]">
              Status
            </TableHead>
            <TableHead>
              Service
            </TableHead>
            <TableHead>
              Last Sync
            </TableHead>
            <TableHead>
              Next Sync
            </TableHead>
            <TableHead>
              Synced by
            </TableHead>
            <TableHead class="text-right">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow
            v-for="sync in syncs"
            :key="sync.id"
          >
            <TableCell>
              <span
                class="inline-block w-2.5 h-2.5 rounded-full"
                :class="statusToColor(sync.status)"
              />
            </TableCell>
            <TableCell class="font-medium">
              {{ sync.service }}
            </TableCell>
            <TableCell>
              {{ formatDate(sync.lastSync) }}
            </TableCell>
            <TableCell>
              {{ formatDate(sync.nextSync) }}
            </TableCell>
            <TableCell>
              {{ sync.syncedBy }}
            </TableCell>
            <TableCell class="text-right">
              <div class="flex items-center justify-end gap-1.5">
                <Button
                  variant="ghost"
                  size="icon"
                  @click="refreshSync(sync.id)"
                >
                  <RotateCcw class="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  @click="viewSync(sync.id)"
                >
                  <Eye class="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  @click="deleteSyncItem(sync.id)"
                >
                  <Trash2 class="w-4 h-4" />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </motion.div>

    <motion.div
      :initial="{ opacity: 0, y: 30 }"
      :animate="{ opacity: 1, y: 0 }"
      :transition="{ duration: 0.8, delay: 0.2 }"
      class="md:w-1/2 max-w-xl text-muted-foreground text-sm md:text-base leading-relaxed"
    >
      <p class="mb-4 md:mb-5">
        <strong class="text-foreground">Scaling</strong> distributed systems is a core part of my work. I've designed and built microservices architectures with container orchestrators and Kubernetes. I deliver reliable background processing pipelines and event-driven workflows. My approach emphasizes sound systems design, observability, and graceful failure modes.
      </p>
      <p class="mb-4 md:mb-5">
        <strong class="text-foreground">Frameworks</strong> are my playground. I love building with Vite and Nitro, shipping apps in Nuxt and Next. I write React and Vue comfortably, and reach for Rails when it accelerates product delivery. Whatever the stack, I pick modern tooling that balances DX with long-term maintainability.
      </p>
      <p>
        <strong class="text-foreground">Experience</strong> spans originating greenfield repos and joining mature codebases mid-flight. I've led first commits, shaping conventions and CI from day one. I also help teams adopt web best practices, stronger type safety, and pragmatic testing. Upgrades and migrations are part of my routine to keep systems current and secure.
      </p>
    </motion.div>
  </section>
</template>
