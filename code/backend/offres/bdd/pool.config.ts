import { Pool } from 'pg';

const poolConfig = new Pool({

    host: 'localhost',
    user: 'postgres',
    password: 'root',
    database: 'user',
    port: 5432,
});

export default poolConfig;
