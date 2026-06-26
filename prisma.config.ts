import { defineConfig } from '@prisma/config';
import 'dotenv/config'; 

export default defineConfig({
  datasource: {
    url: process.env.DATABASE_URL,
  },
  migrations: {
    // Le indicamos a Prisma 7.8 cómo ejecutar nuestro archivo seed
    seed: 'ts-node ./prisma/seed.ts',
  },
});