import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
    plugins: [
        react(),
        VitePWA({
            registerType: 'autoUpdate',
            includeAssets: ['favicon2.png'],
            manifest: {
                short_name: 'Cloudgram',
                name: 'Cloudgram',
                icons: [
                    {
                        src: 'favicon2.png',
                        sizes: '64x64',
                        type: 'image/png',
                    },
                    {
                        src: 'favicon2.png',
                        sizes: '192x192',
                        type: 'image/png',
                        purpose: 'any maskable',
                    },
                    {
                        src: 'favicon2.png',
                        sizes: '512x512',
                        type: 'image/png',
                    },
                ],
                start_url: '/',
                display: 'standalone',
                theme_color: '#000000',
                background_color: '#ffffff',
            },
        }),
    ],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src'),
            '@app': path.resolve(__dirname, 'src/app'),
            '@pages': path.resolve(__dirname, 'src/pages'),
            '@widgets': path.resolve(__dirname, 'src/widgets'),
            '@features': path.resolve(__dirname, 'src/features'),
            '@entities': path.resolve(__dirname, 'src/entities'),
            '@shared': path.resolve(__dirname, 'src/shared'),
        },
    },
    css: {
        modules: {
            localsConvention: 'camelCase',
        },
    },
});
