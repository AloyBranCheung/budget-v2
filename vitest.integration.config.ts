import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
    plugins: [react()],
    test: {
        environment: 'jsdom',
        include: [
            "src/__tests__/integration/**/*.{test,spec}.?(c|m)[jt]s?(x)'"
        ],
        setupFiles: [
            'src/__tests__/integration/setups/setup.ts'
        ]
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src')
        }
    }
})