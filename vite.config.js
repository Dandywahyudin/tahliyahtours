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
        // Optimizations for production
        minify: 'terser',
        terserOptions: {
            compress: {
                drop_console: true,
                drop_debugger: true,
            },
        },
        rollupOptions: {
            output: {
                manualChunks: (id) => {
                    if (id.includes('node_modules')) {
                        if (id.includes('react')) return 'react-vendor';
                        if (id.includes('motion')) return 'motion-vendor';
                        if (id.includes('@inertiajs')) return 'inertia-vendor';
                        if (id.includes('framer-motion')) return 'motion-vendor';
                        return 'vendor';
                    }
                },
            },
        },
        // Enable source maps for debugging but optimize for size
        sourcemap: false,
        // Reduce chunk size warnings
        chunkSizeWarningLimit: 1000,
        // Better compression
        cssCodeSplit: true,
        cssMinify: 'lightningcss',
    },
    server: {
        compress: true,
    },
    optimizeDeps: {
        include: ['react', 'react-dom', 'framer-motion', '@inertiajs/react'],
    },
});
