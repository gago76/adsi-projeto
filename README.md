# ADSI — Assistente Digital Simplificado

Projeto acadêmico de inclusão digital com duas interfaces:

- **Notebook / Computador:** interface web com tutoriais passo a passo.
- **Celular:** direcionamento para atendimento via WhatsApp/chatbot.
- **Os dois:** permite escolher entre ajuda para notebook ou celular.

## Tecnologias

- Frontend: React + Vite
- Backend: Node.js + Express
- Integração WhatsApp: link direto para WhatsApp ou futura integração com n8n/Evolution API/WhatsApp Business API

## Como executar

### Backend

```bash
cd backend
npm install
npm run dev
```

O backend ficará em:

```text
http://localhost:3001
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

O frontend ficará em:

```text
http://localhost:5173
```

## Funcionalidades do MVP

1. Tela inicial com escolha do dispositivo.
2. Interface de tutoriais para notebook/computador.
3. Área de celular com botão para abrir atendimento no WhatsApp.
4. Tutoriais com passo a passo e botão de áudio.
5. Envio de feedback para o backend.

## Observação

No arquivo `frontend/src/config.js`, altere o número do WhatsApp para o número oficial do projeto.
