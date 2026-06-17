# Guia de Deploy — ADSI no Railway com PostgreSQL

## Visão geral

Você vai criar 3 serviços no Railway dentro de um mesmo projeto:
1. **PostgreSQL** — banco de dados
2. **Backend** — API Node.js
3. **Frontend** — React

---

## Passo 1 — Criar conta e projeto no Railway

1. Acesse **railway.app** e crie uma conta (pode usar GitHub)
2. Clique em **New Project**
3. Dê o nome `adsi`

---

## Passo 2 — Subir o código no GitHub

O Railway faz deploy direto do GitHub. Você precisa ter o projeto num repositório.

```bash
# Na pasta raiz do projeto
git init
git add .
git commit -m "primeiro commit ADSI"

# Crie um repositório no github.com e execute:
git remote add origin https://github.com/SEU_USUARIO/adsi-projeto.git
git push -u origin main
```

---

## Passo 3 — Adicionar o PostgreSQL

1. No projeto Railway, clique em **New Service → Database → PostgreSQL**
2. O Railway cria o banco automaticamente e já injeta a variável `DATABASE_URL`
3. Anote a `DATABASE_URL` — você vai precisar dela para rodar as migrations

---

## Passo 4 — Deploy do Backend

1. No projeto Railway, clique em **New Service → GitHub Repo**
2. Selecione seu repositório `adsi-projeto`
3. Em **Root Directory**, coloque: `backend`
4. O Railway detecta o Node.js automaticamente pelo `package.json`

### Variáveis de ambiente do backend
Clique no serviço do backend → **Variables** e adicione:

| Variável | Valor |
|----------|-------|
| `NODE_ENV` | `production` |
| `FRONTEND_URL` | *(preencha após o deploy do frontend)* |

> A variável `DATABASE_URL` já é injetada automaticamente pelo Railway quando há um banco PostgreSQL no mesmo projeto.

---

## Passo 5 — Rodar as migrations

Após o backend fazer deploy pela primeira vez:

1. No serviço do backend, clique em **Settings → Deploy → Run Command**
2. Execute uma vez: `npm run migrate`
3. Em seguida execute: `npm run seed`

Ou pela Railway CLI:
```bash
npm install -g @railway/cli
railway login
railway run npm run migrate
railway run npm run seed
```

---

## Passo 6 — Deploy do Frontend

1. Clique em **New Service → GitHub Repo** novamente
2. Selecione o mesmo repositório
3. Em **Root Directory**, coloque: `frontend`

### Variáveis de ambiente do frontend
Clique no serviço do frontend → **Variables** e adicione:

| Variável | Valor |
|----------|-------|
| `VITE_API_URL` | URL gerada pelo Railway para o backend (ex: `https://adsi-backend-production.up.railway.app`) |
| `VITE_WHATSAPP_NUMBER` | Número do WhatsApp Business sem o + (ex: `5511999999999`) |
| `VITE_WHATSAPP_MESSAGE` | `Olá! Preciso de ajuda com tecnologia.` |

---

## Passo 7 — Atualizar o CORS do backend

Após o frontend fazer deploy e gerar a URL:

1. Volte ao serviço do backend → **Variables**
2. Adicione `FRONTEND_URL` com a URL do frontend (ex: `https://adsi-frontend-production.up.railway.app`)
3. O Railway faz redeploy automático

---

## Verificando se está tudo funcionando

Acesse a URL do backend e confira:
```
https://SEU-BACKEND.up.railway.app/
→ { "status": "ok", "app": "ADSI Backend", "versao": "2.0.0" }

https://SEU-BACKEND.up.railway.app/health
→ { "status": "ok", "timestamp": "..." }

https://SEU-BACKEND.up.railway.app/api/tutoriais
→ Lista com todos os tutoriais do banco
```

---

## Atualizar o fluxo n8n para produção

No nó **Busca tutoriais do ADSI** e **Salva conversa no ADSI**, atualize a URL de:
```
http://localhost:3001/api/...
```
Para:
```
https://SEU-BACKEND.up.railway.app/api/...
```

---

## Custos estimados no Railway

| Serviço | Plano Hobby (US$5/mês) |
|---------|----------------------|
| PostgreSQL | Incluso |
| Backend Node.js | Incluso |
| Frontend | Incluso |
| **Total** | **~US$5/mês** |

O plano gratuito do Railway tem limite de US$5 em créditos por mês — suficiente para um projeto acadêmico.
