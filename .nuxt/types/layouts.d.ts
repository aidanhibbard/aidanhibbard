import { ComputedRef, Ref } from 'vue'
export type LayoutKey = "default" | "error"
declare module "/home/aidanhibbard/Desktop/Projects/aidanhibbard/node_modules/nuxt3/dist/pages/runtime/composables" {
  interface PageMeta {
    layout?: false | LayoutKey | Ref<LayoutKey> | ComputedRef<LayoutKey>
  }
}