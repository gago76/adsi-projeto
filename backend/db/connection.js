import pg from 'pg';
import 'dotenv/config';

const { Pool } = pg;

// Supabase exige SSL sempre — local e produção
// DATABASE_URL vem do painel do Supabase (Connection String > Connection pooling)
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
  max: 10, // Supabase free tier tem limite de conexões simultâneas
});

pool.on('connect', () => {
  console.log('PostgreSQL conectado com sucesso');
});

pool.on('error', (err) => {
  console.error('Erro na conexão com o PostgreSQL:', err);
  process.exit(1);
});

export default pool;
