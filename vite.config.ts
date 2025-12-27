import { defineConfig } from 'vite'
import { resolve } from 'path'
import preact from '@preact/preset-vite'
import dts from 'vite-plugin-dts'

export default defineConfig(({ command }) => ({
  publicDir: command === 'build' ? false : 'public',
  build: {
    minify: false,
    lib: {
      entry: resolve(__dirname, 'src/main.tsx'),
      name: 'yugioh-card-react',
      fileName: 'yugioh-card'
    },
    rollupOptions: {
      external: [
        /(src\/test\..*)/,
        "preact",
        "preact/compat",
        "react",
        "react-dom",
        "react/jsx-runtime"
      ],
    },
  },
  plugins: [preact(), dts({
    rollupTypes: true,
    tsconfigPath: "./tsconfig.app.json",
  })]
}))
