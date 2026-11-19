import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://vishvendratomar.github.io',
  redirects: { '/work/ai-developer-tooling': '/about/' },
  build: {
    format: 'directory',
  },
  compressHTML: true,
});
