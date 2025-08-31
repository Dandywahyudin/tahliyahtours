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
    // build: {
    //     // Optimizations for production
    //     minify: 'terser',
    //     terserOptions: {
    //         compress: {
    //             drop_console: true,
    //             drop_debugger: true,
    //         },
    //     },
    //     rollupOptions: {
    //         output: {
    //             manualChunks: {
    //                 vendor: ['react', 'react-dom'],
    //                 motion: ['motion/react'],
    //                 inertia: ['@inertiajs/react'],
    //             },
    //         },
    //     },
    //     // Enable source maps for debugging but optimize for size
    //     sourcemap: false,
    //     // Reduce chunk size warnings
    //     chunkSizeWarningLimit: 1000,
    // },
    // Enable gzip compression

    build: {
    outDir: 'public/build',
    manifest: true,
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
    // Optimize dependencies
    optimizeDeps: {
        include: ['react', 'react-dom', 'motion/react', '@inertiajs/react'],
    },
});
