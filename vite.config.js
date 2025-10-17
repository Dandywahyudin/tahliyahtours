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
        // Aggressive optimizations for production
        minify: 'terser',
        terserOptions: {
            compress: {
                drop_console: true,
                drop_debugger: true,
                pure_funcs: ['console.log', 'console.info', 'console.debug'], // Remove console calls
                passes: 2, // Multiple passes untuk better compression
            },
            mangle: {
                safari10: true, // Safari compatibility
            },
        },
        rollupOptions: {
            output: {
                manualChunks: {
                    'react-vendor': ['react', 'react-dom'],
                    'inertia-vendor': ['@inertiajs/react'],
                    'motion-vendor': ['framer-motion']
                },
                // Optimize chunk names untuk better caching
                chunkFileNames: 'assets/[name]-[hash].js',
                entryFileNames: 'assets/[name]-[hash].js',
                assetFileNames: 'assets/[name]-[hash].[ext]'
            }
        },
        sourcemap: false,
        chunkSizeWarningLimit: 1000,
        cssCodeSplit: true,
        cssMinify: 'lightningcss',
        // Enable module preload untuk faster loading
        modulePreload: {
            polyfill: true
        },
        // Target modern browsers untuk smaller bundle
        target: 'es2020',
        // Enable compression hints
        reportCompressedSize: true,
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
