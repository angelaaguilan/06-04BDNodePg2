const { Pool } = require('pg');

// Configuración del pool de conexión a PostgreSQL
const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    password: 'bd2024',
    database: 'likeme',
    allowExitOnIdle: true
});

module.exports = pool