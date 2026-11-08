import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://vishvendratomar.github.io',
  build: {
    format: 'directory',
  },
  compressHTML: true,
});
