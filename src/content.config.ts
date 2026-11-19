import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
export const collections = {
  studies: defineCollection({loader:glob({pattern:'*.md',base:'./src/content/studies'})}),
  writing: defineCollection({loader:glob({pattern:'*.md',base:'./src/content/writing'})})
};
