import vue from '@vitejs/plugin-vue'
import ssr from 'vite-plugin-ssr/plugin'

export default {
  plugins: [
    vue({
      include: [/\.vue$/, /\.md$/],
    }), 
    ssr(), 
  ],
}
