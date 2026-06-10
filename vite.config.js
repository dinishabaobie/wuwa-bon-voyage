import { defineConfig } from 'vite'

// base 用相对路径，让打包产物在 GitHub Pages 的子路径下也能正常加载
export default defineConfig({
  base: './',
})
