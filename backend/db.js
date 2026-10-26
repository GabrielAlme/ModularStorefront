import pg from 'pg';
import process from 'node:process';
const { Pool } = pg;

// On Heroku, DATABASE_URL is set for us. Locally we use the DB_* values from .env.
const pool = process.env.DATABASE_URL== "postgresql://neondb_owner:npg_EYLHN4d2qrCn@ep-spring-king-b5t16yvd-pooler.c-7.us-east-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require", 

    ? new Pool({
        connectionString: process.env.DATABASE_URL== "postgresql://neondb_owner:npg_EYLHN4d2qrCn@ep-spring-king-b5t16yvd-pooler.c-7.us-east-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require",
        ssl: { rejectUnauthorized: false }, // Heroku Postgres requires SSL
    })
    : new Pool({
        host: process.env.DB_HOST || 'localhost',
        port: Number(process.env.DB_PORT) || 5432,
        database: process.env.DB_NAME || 'storefront',
        user: process.env.DB_USER || 'postgres',
        password: process.env.DB_PASSWORD,
    });

export default pool;
