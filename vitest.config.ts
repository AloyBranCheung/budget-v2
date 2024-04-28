import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
    plugins: [react()],
    test: {
        environment: 'jsdom',
        include: [
            "src/__tests__/unit/**/*.{test,spec}.?(c|m)[jt]s?(x)'"
        ]
    },

})