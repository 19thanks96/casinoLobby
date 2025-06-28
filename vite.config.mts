import { defineConfig } from 'vite';
import * as path from 'path';
import styleInject from 'vite-plugin-style-inject';
import {createHtmlPlugin} from "vite-plugin-html";
import { writeFileSync } from 'fs';
import { resolve, join } from 'path';
import { visualizer } from "rollup-plugin-visualizer";
import { createProxyMiddleware } from 'http-proxy-middleware';


export default defineConfig(() => {
    const isDev = process.env.NODE_ENV === 'dev';

    return {

    plugins: [
        isDev &&
        visualizer({
            open: true,
            gzipSize: true,
            brotliSize: true,
        }),
        styleInject(),
        createHtmlPlugin({
            inject: {
                data: {
                    title: 'My App',
                },
            },
            minify: true,
        }),

        {
            name: 'generate-html-after-build',
            generateBundle() {
                const distDir = resolve(__dirname, 'dist');

                // Контент будущего HTML-файла
                const htmlContent = `
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <script type="module" src="./bundle.js"></script>

    <title>Social Slot</title>
</head>
<body>
<div id="place-to-integrate">

</div>
</body>
</html>
                `;
                writeFileSync(join(distDir, 'index.html'), htmlContent, 'utf-8');
                console.log('Custom HTML file created after build!');
            },
        },
    ],
    base: './',
    server: {
        port: 777,
        proxy: {
            '/resources': {
                target: 'https://p2w-object-store.fra1.cdn.digitaloceanspaces.com',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/resources/, ''),
            },
        },
    },

        build: {
        lib: {
            entry: path.resolve(__dirname, 'src/main.ts'),
            name: 'MyBundle',
            formats: ['iife'],
            fileName: () => `bundle.js`,
        },
        cssCodeSplit: false,
        sourcemap: false,
        minify: "esbuild",
        rollupOptions: {
            output: {
                inlineDynamicImports: true,
                manualChunks: undefined,
            },
        },
        target: 'esnext',
        outDir: 'dist',
        emptyOutDir: true,
    },

}});