import express from 'express';
import pool from '../db/connection.js';

const router = express.Router();

// POST /api/feedback — recebe feedback do site ou do chatbot
router.post('/', async (req, res) => {
  try {
    const { tutorialId, mensagem, resposta, canal, telefone } = req.body;

    if (!mensagem || !mensagem.trim()) {
      return res.status(400).json({ erro: 'A mensagem é obrigatória' });
    }

    const result = await pool.query(`
      INSERT INTO feedbacks (tutorial_id, mensagem, resposta, canal, telefone)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *
    `, [
      tutorialId || null,
      mensagem.trim(),
      resposta || null,
      canal || 'web',
      telefone || null,
    ]);

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Erro ao salvar feedback:', err);
    res.status(500).json({ erro: 'Erro ao salvar feedback' });
  }
});

// GET /api/feedback — lista feedbacks (útil para análise)
router.get('/', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT
        f.*,
        t.titulo AS tutorial_titulo
      FROM feedbacks f
      LEFT JOIN tutoriais t ON f.tutorial_id = t.id
      ORDER BY f.criado_em DESC
      LIMIT 100
    `);

    res.json(result.rows);
  } catch (err) {
    console.error('Erro ao listar feedbacks:', err);
    res.status(500).json({ erro: 'Erro ao listar feedbacks' });
  }
});

export default router;
