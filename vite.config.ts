import { defineConfig } from 'vite'
import { resolve } from 'path'
import dts from 'vite-plugin-dts'

export default defineConfig(({ command }) => ({
  publicDir: command === 'build' ? false : 'public',
  resolve: command === 'serve' ? {
    alias: {
      'react': 'preact/compat',
      'react-dom': 'preact/compat',
      'react/jsx-runtime': 'preact/jsx-runtime',
    }
  } : undefined,
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
        /^react(\/.*)?$/,
        /^react-dom(\/.*)?$/,
      ],
    },
  },
  plugins: [dts({
    rollupTypes: true,
    tsconfigPath: "./tsconfig.app.json",
  })]
}))
