import { defineConfig } from 'vite'

// base 用相对路径，让打包产物在 GitHub Pages 的子路径下也能正常加载
export default defineConfig({
  base: './',
  build: {
    rollupOptions: {
      // 多页面：首页 + 三个模块子页面
      input: {
        main: 'index.html',
        observation: 'observation.html',
        tide: 'tide.html',
        relation: 'relation.html',
      },
    },
  },
})
