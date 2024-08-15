/** @format */

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { createHtmlPlugin } from 'vite-plugin-html';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    createHtmlPlugin({
      minify: true,
      entry: '/src/main.tsx',
      template: 'public/index.html',
      inject: {
        data: { title: '系统', injectScript: `` },
        tags: [{ injectTo: 'body-prepend', tag: 'section', attrs: { id: 'root' } }],
      },
    }), // html模板
  ],
});
