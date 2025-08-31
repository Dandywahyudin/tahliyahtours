import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
    plugins: [
        laravel({
            input: 'resources/js/app.jsx',
            refresh: true,
        }),
        react(),
    ],
    resolve: {
        alias: {
            '@': resolve(__dirname, 'resources/js'),
        },
    },
    build: {
        manifest: true,
        rollupOptions: {
            output: {
                manualChunks: {
                    vendor: ['react', 'react-dom'],
                    motion: ['motion/react'],
                    inertia: ['@inertiajs/react'],
                },
            },
        },
        sourcemap: false,
        chunkSizeWarningLimit: 1000,
    },
    server: {
        compress: true,
    },
    optimizeDeps: {
        include: ['react', 'react-dom', 'motion/react', '@inertiajs/react'],
    },
});
