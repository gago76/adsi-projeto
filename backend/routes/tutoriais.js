import express from 'express';
import pool from '../db/connection.js';

const router = express.Router();

// GET /api/tutoriais?categoria=notebook
router.get('/', async (req, res) => {
  try {
    const { categoria } = req.query;

    const query = categoria
      ? `SELECT * FROM tutoriais WHERE categoria = $1 AND ativo = TRUE ORDER BY grupo, titulo`
      : `SELECT * FROM tutoriais WHERE ativo = TRUE ORDER BY grupo, titulo`;

    const params = categoria ? [categoria] : [];
    const result = await pool.query(query, params);

    // Normaliza o campo passos (vem como JSONB do Postgres)
    const tutoriais = result.rows.map((t) => ({
      ...t,
      passos: Array.isArray(t.passos) ? t.passos : JSON.parse(t.passos),
    }));

    res.json(tutoriais);
  } catch (err) {
    console.error('Erro ao buscar tutoriais:', err);
    res.status(500).json({ erro: 'Erro ao buscar tutoriais' });
  }
});

// GET /api/tutoriais/:id
router.get('/:id', async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT * FROM tutoriais WHERE id = $1 AND ativo = TRUE`,
      [req.params.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ erro: 'Tutorial não encontrado' });
    }

    const tutorial = result.rows[0];
    tutorial.passos = Array.isArray(tutorial.passos)
      ? tutorial.passos
      : JSON.parse(tutorial.passos);

    res.json(tutorial);
  } catch (err) {
    console.error('Erro ao buscar tutorial:', err);
    res.status(500).json({ erro: 'Erro ao buscar tutorial' });
  }
});

export default router;
