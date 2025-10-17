import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/css/app.css', 'resources/js/app.jsx'],
            refresh: true,
        }),
        react(),
    ],
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
                manualChunks: {
                    'react-vendor': ['react', 'react-dom'],
                    'inertia-vendor': ['@inertiajs/react'],
                    'motion-vendor': ['framer-motion']
                }
            }
        },
        sourcemap: false,
        chunkSizeWarningLimit: 1000,
        cssCodeSplit: true,
        cssMinify: 'lightningcss',
    },
    resolve: {
        dedupe: ['react', 'react-dom'] // Penting: deduplicate React untuk prevent error
    },
    server: {
        compress: true,
    },
    optimizeDeps: {
        include: ['react', 'react-dom', 'framer-motion', '@inertiajs/react'],
    },
});
