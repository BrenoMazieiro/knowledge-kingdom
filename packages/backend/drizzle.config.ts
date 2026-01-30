import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  dialect: 'postgresql',
  schema: './src/infra/database/schema/*.ts',
  out: './src/infra/database/migrations',
  dbCredentials: {
    host: process.env.DATABASE_HOST ?? 'localhost',
    port: Number(process.env.DATABASE_PORT ?? 5432),
    user: process.env.DATABASE_USER ?? 'kk',
    password: process.env.DATABASE_PASSWORD ?? 'kk_dev_password',
    database: process.env.DATABASE_NAME ?? 'the_knowledge_kingdom',
    ssl: false,
  },
});
