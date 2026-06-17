import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import tutoriaisRouter from './routes/tutoriais.js';
import feedbackRouter from './routes/feedback.js';
import conversasRouter from './routes/conversas.js';

const app = express();
const PORT = process.env.PORT || 3001;

// ── CORS ──────────────────────────────────────────────────────────
// Em produção, permite apenas o domínio do frontend no Render
const allowedOrigins = process.env.FRONTEND_URL
  ? [process.env.FRONTEND_URL]
  : ['http://localhost:5173', 'http://localhost:3000'];

app.use(cors({
  origin: allowedOrigins,
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
}));

app.use(express.json());

// ── ROTAS ─────────────────────────────────────────────────────────
app.get('/', (req, res) => {
  res.json({
    status: 'ok',
    app: 'ADSI Backend',
    versao: '2.0.0',
    ambiente: process.env.NODE_ENV || 'development',
  });
});

app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.use('/api/tutoriais', tutoriaisRouter);
app.use('/api/feedback', feedbackRouter);
app.use('/api/conversas', conversasRouter);

// ── HANDLER DE ERROS ──────────────────────────────────────────────
app.use((err, req, res, next) => {
  console.error('Erro não tratado:', err);
  res.status(500).json({ erro: 'Erro interno do servidor' });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 ADSI Backend rodando na porta ${PORT}`);
  console.log(`   Ambiente: ${process.env.NODE_ENV || 'development'}`);
});
