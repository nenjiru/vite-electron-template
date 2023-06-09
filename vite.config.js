import { join } from 'path'
import { defineConfig } from 'vite'
import electron from 'vite-plugin-electron'

export default defineConfig({
    plugins: [
        electron([
            {
                entry: 'electron/main.ts',
            },
            {
                entry: 'electron/preload.ts',
                onstart(options) { options.reload() },
            },
        ]),
    ],
    root: './src',
    publicDir: './public',
    resolve: {
        alias: { '@': join(__dirname, 'src') }
    },
    build: {
        outDir: '../dist',
        emptyOutDir: true
    }
})