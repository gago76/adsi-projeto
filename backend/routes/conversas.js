import express from 'express';
import pool from '../db/connection.js';

const router = express.Router();

// POST /api/conversas — salva conversa do chatbot WhatsApp
router.post('/', async (req, res) => {
  try {
    const { telefone, nomeUsuario, pergunta, resposta } = req.body;

    if (!telefone || !pergunta || !resposta) {
      return res.status(400).json({ erro: 'telefone, pergunta e resposta são obrigatórios' });
    }

    const result = await pool.query(`
      INSERT INTO conversas_whatsapp (telefone, nome_usuario, pergunta, resposta)
      VALUES ($1, $2, $3, $4)
      RETURNING *
    `, [telefone, nomeUsuario || null, pergunta, resposta]);

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Erro ao salvar conversa:', err);
    res.status(500).json({ erro: 'Erro ao salvar conversa' });
  }
});

// GET /api/conversas — lista conversas por telefone ou todas
router.get('/', async (req, res) => {
  try {
    const { telefone } = req.query;

    const query = telefone
      ? `SELECT * FROM conversas_whatsapp WHERE telefone = $1 ORDER BY criado_em DESC LIMIT 50`
      : `SELECT * FROM conversas_whatsapp ORDER BY criado_em DESC LIMIT 100`;

    const params = telefone ? [telefone] : [];
    const result = await pool.query(query, params);

    res.json(result.rows);
  } catch (err) {
    console.error('Erro ao listar conversas:', err);
    res.status(500).json({ erro: 'Erro ao listar conversas' });
  }
});

export default router;
