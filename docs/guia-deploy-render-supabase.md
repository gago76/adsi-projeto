# Guia de Deploy — ADSI no Render com Supabase

## Visão geral

Você vai usar 3 serviços, todos com free tier:
1. **Supabase** — banco de dados PostgreSQL (sem expiração)
2. **Render** — backend (Web Service) + frontend (Static Site)

> ⚠️ O Web Service gratuito do Render "dorme" após 15 minutos sem uso. A primeira mensagem depois disso demora 30-60 segundos para responder — é normal, não é erro. Avise sobre isso na apresentação do projeto.

---

## Passo 1 — Criar o projeto no Supabase

1. Acesse **supabase.com** e crie uma conta gratuita (pode usar GitHub)
2. Clique em **New Project**
3. Preencha:
   - **Name**: `adsi`
   - **Database Password**: crie uma senha forte e **anote em local seguro**
   - **Region**: escolha `South America (São Paulo)` para menor latência
4. Clique em **Create new project** e aguarde ~2 minutos de provisionamento

---

## Passo 2 — Pegar a Connection String

1. Dentro do projeto, vá em **Project Settings** (ícone de engrenagem) → **Database**
2. Procure a seção **Connection String** → aba **URI**
3. Marque a opção **Connection pooling** (importante — usa a porta 6543, ideal para serviços serverless como o Render)
4. Copie a string, algo como:
   ```
   postgresql://postgres.xxxxxxxxxxxx:[YOUR-PASSWORD]@aws-0-sa-east-1.pooler.supabase.com:6543/postgres
   ```
5. Substitua `[YOUR-PASSWORD]` pela senha que você criou no Passo 1

Guarde essa string — é a sua `DATABASE_URL`.

---

## Passo 3 — Subir o código no GitHub

```bash
# Na pasta raiz do projeto
git init
git add .
git commit -m "primeiro commit ADSI"

# Crie um repositório em github.com e execute:
git remote add origin https://github.com/SEU_USUARIO/adsi-projeto.git
git push -u origin main
```

---

## Passo 4 — Deploy do Backend no Render

1. Acesse **render.com** e crie uma conta gratuita (pode usar GitHub)
2. Clique em **New → Web Service**
3. Conecte seu repositório `adsi-projeto`
4. Preencha:
   - **Name**: `adsi-backend`
   - **Root Directory**: `backend`
   - **Runtime**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: `Free`

### Variáveis de ambiente do backend
Antes de clicar em **Create Web Service**, role até **Environment Variables** e adicione:

| Variável | Valor |
|----------|-------|
| `DATABASE_URL` | a connection string do Supabase (Passo 2) |
| `NODE_ENV` | `production` |
| `FRONTEND_URL` | *(preencha depois do Passo 6)* |

5. Clique em **Create Web Service** e aguarde o primeiro deploy (~3 minutos)
6. Anote a URL gerada, algo como `https://adsi-backend.onrender.com`

---

## Passo 5 — Rodar as migrations no Supabase

Você pode rodar localmente, apontando para o banco do Supabase:

```bash
cd backend
cp .env.example .env
# Edite o .env e cole a DATABASE_URL do Supabase

npm install
npm run migrate
npm run seed
```

Isso cria as tabelas e popula os 15 tutoriais direto no banco do Supabase — mesmo banco que o backend em produção vai usar.

> Alternativa: rodar via **Shell** do próprio Render, em Dashboard → seu serviço → aba **Shell**.

---

## Passo 6 — Deploy do Frontend no Render

1. No Render, clique em **New → Static Site**
2. Conecte o mesmo repositório `adsi-projeto`
3. Preencha:
   - **Name**: `adsi-frontend`
   - **Root Directory**: `frontend`
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `dist`

### Variáveis de ambiente do frontend

| Variável | Valor |
|----------|-------|
| `VITE_API_URL` | URL do backend gerada no Passo 4 |
| `VITE_WHATSAPP_NUMBER` | número do WhatsApp Business sem o + |
| `VITE_WHATSAPP_MESSAGE` | `Olá! Preciso de ajuda com tecnologia.` |

### Configurar o rewrite (importante!)
Em **Redirects/Rewrites**, adicione:
- **Source**: `/*`
- **Destination**: `/index.html`
- **Action**: `Rewrite`

Sem isso, recarregar uma página interna como `/notebook` mostra erro 404 — comportamento normal de Single Page Applications em hospedagem estática.

4. Clique em **Create Static Site**
5. Anote a URL gerada, algo como `https://adsi-frontend.onrender.com`

---

## Passo 7 — Atualizar o CORS do backend

1. Volte ao serviço `adsi-backend` no Render → **Environment**
2. Atualize `FRONTEND_URL` com a URL do frontend (Passo 6)
3. Clique em **Save Changes** — o Render faz redeploy automático

---

## Verificando se está tudo funcionando

```
https://adsi-backend.onrender.com/
→ { "status": "ok", "app": "ADSI Backend", "versao": "2.0.0" }

https://adsi-backend.onrender.com/health
→ { "status": "ok", "timestamp": "..." }

https://adsi-backend.onrender.com/api/tutoriais
→ Lista com os 15 tutoriais vindos do Supabase
```

> Se o backend não responder de primeira, aguarde — ele pode estar "acordando" do modo sleep.

---

## Atualizar o fluxo n8n para produção

No fluxo `docs/n8n-chatbot-groq.json`, troque as URLs do backend de:
```
https://SEU-BACKEND.up.railway.app
```
Para:
```
https://adsi-backend.onrender.com
```

---

## Mantendo o backend "desperto" (opcional)

Para evitar o cold-start de 30-60s, você pode usar um serviço gratuito de "ping" que acessa `/health` a cada 10 minutos, como **cron-job.org** ou **UptimeRobot**. Isso mantém o Free Tier sempre ativo sem gastar nada — só fique atento ao limite de **750 horas/mês** do Render (suficiente para 1 serviço rodando o mês inteiro).

---

## Resumo de custos

| Serviço | Custo |
|---------|-------|
| Supabase (Free) | R$ 0 — banco até 500MB |
| Render Backend (Free) | R$ 0 — 750h/mês inclusas |
| Render Frontend (Static) | R$ 0 — ilimitado |
| **Total** | **R$ 0/mês** |

Nenhum cartão de crédito é necessário em nenhuma das duas plataformas.
