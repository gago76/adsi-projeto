// Cria todas as tabelas do banco de dados do ADSI
// Execute com: npm run migrate

import pool from './connection.js';

async function migrate() {
  const client = await pool.connect();

  try {
    console.log('Iniciando migrations...');

    await client.query('BEGIN');

    // ── Tabela: tutoriais ──────────────────────────────────────────
    await client.query(`
      CREATE TABLE IF NOT EXISTS tutoriais (
        id          VARCHAR(100) PRIMARY KEY,
        categoria   VARCHAR(50)  NOT NULL,
        grupo       VARCHAR(100) NOT NULL,
        titulo      VARCHAR(200) NOT NULL,
        descricao   TEXT         NOT NULL,
        passos      JSONB        NOT NULL DEFAULT '[]',
        ativo       BOOLEAN      NOT NULL DEFAULT TRUE,
        criado_em   TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
        atualizado_em TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
    `);

    // ── Tabela: feedbacks ──────────────────────────────────────────
    await client.query(`
      CREATE TABLE IF NOT EXISTS feedbacks (
        id            SERIAL       PRIMARY KEY,
        tutorial_id   VARCHAR(100) REFERENCES tutoriais(id) ON DELETE SET NULL,
        mensagem      TEXT         NOT NULL,
        resposta      TEXT,
        canal         VARCHAR(20)  NOT NULL DEFAULT 'web',
        telefone      VARCHAR(20),
        criado_em     TIMESTAMPTZ  NOT NULL DEFAULT NOW()
      );
    `);

    // ── Tabela: conversas_whatsapp ─────────────────────────────────
    await client.query(`
      CREATE TABLE IF NOT EXISTS conversas_whatsapp (
        id            SERIAL       PRIMARY KEY,
        telefone      VARCHAR(20)  NOT NULL,
        nome_usuario  VARCHAR(100),
        pergunta      TEXT         NOT NULL,
        resposta      TEXT         NOT NULL,
        criado_em     TIMESTAMPTZ  NOT NULL DEFAULT NOW()
      );
    `);

    // ── Índices para performance ───────────────────────────────────
    await client.query(`
      CREATE INDEX IF NOT EXISTS idx_tutoriais_categoria
        ON tutoriais(categoria);
    `);

    await client.query(`
      CREATE INDEX IF NOT EXISTS idx_feedbacks_tutorial
        ON feedbacks(tutorial_id);
    `);

    await client.query(`
      CREATE INDEX IF NOT EXISTS idx_conversas_telefone
        ON conversas_whatsapp(telefone);
    `);

    await client.query(`
      CREATE INDEX IF NOT EXISTS idx_conversas_data
        ON conversas_whatsapp(criado_em DESC);
    `);

    await client.query('COMMIT');
    console.log('✅ Migrations concluídas com sucesso!');

  } catch (err) {
    await client.query('ROLLBACK');
    console.error('❌ Erro na migration:', err);
    throw err;
  } finally {
    client.release();
    await pool.end();
  }
}

migrate();
