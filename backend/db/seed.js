// Popula o banco com todos os tutoriais do ADSI
// Execute com: npm run seed

import pool from './connection.js';
import { tutoriais } from '../data/tutoriais.js';

async function seed() {
  const client = await pool.connect();

  try {
    console.log('Iniciando seed dos tutoriais...');
    await client.query('BEGIN');

    for (const t of tutoriais) {
      await client.query(`
        INSERT INTO tutoriais (id, categoria, grupo, titulo, descricao, passos)
        VALUES ($1, $2, $3, $4, $5, $6)
        ON CONFLICT (id) DO UPDATE SET
          categoria     = EXCLUDED.categoria,
          grupo         = EXCLUDED.grupo,
          titulo        = EXCLUDED.titulo,
          descricao     = EXCLUDED.descricao,
          passos        = EXCLUDED.passos,
          atualizado_em = NOW()
      `, [t.id, t.categoria, t.grupo, t.titulo, t.descricao, JSON.stringify(t.passos)]);

      console.log(`  ✔ ${t.titulo}`);
    }

    await client.query('COMMIT');
    console.log(`\n✅ Seed concluído — ${tutoriais.length} tutoriais inseridos/atualizados.`);

  } catch (err) {
    await client.query('ROLLBACK');
    console.error('❌ Erro no seed:', err);
    throw err;
  } finally {
    client.release();
    await pool.end();
  }
}

seed();
