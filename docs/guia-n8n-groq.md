# Guia de configuração — ADSI Chatbot com WhatsApp Business + Groq

## O que você vai precisar

- Conta no **Meta for Developers** (gratuita)
- Chave gratuita do **Groq** (console.groq.com)
- **n8n** instalado (local ou n8n.cloud)
- Backend do ADSI rodando

---

## Passo 1 — Criar o App no Meta for Developers

1. Acesse **developers.facebook.com** e faça login com sua conta do Facebook
2. Clique em **Meus Apps → Criar App**
3. Escolha o tipo **Business**
4. Dê um nome ao app, por exemplo: `ADSI Chatbot`
5. Dentro do app, clique em **Adicionar produto → WhatsApp → Configurar**

---

## Passo 2 — Configurar o número de telefone

1. No painel do WhatsApp, clique em **Começar**
2. A Meta fornece um **número de teste gratuito** — use ele para desenvolvimento
3. Adicione seu número pessoal como destinatário de teste (você vai receber um código de verificação)
4. Anote o **Phone Number ID** e o **WhatsApp Business Account ID** — você vai precisar deles

---

## Passo 3 — Gerar o token de acesso

1. No painel do app, vá em **WhatsApp → Configuração da API**
2. Clique em **Gerar token de acesso temporário** (válido por 24h para testes)
3. Para produção, crie um **token permanente** em: Configurações do sistema → Usuários do sistema → Gerar token
4. Selecione as permissões: `whatsapp_business_messaging` e `whatsapp_business_management`
5. Copie o token — começa com `EAA...`

---

## Passo 4 — Chave do Groq (gratuita)

1. Acesse **console.groq.com** e crie uma conta gratuita
2. Clique em **API Keys → Create API Key**
3. Copie a chave — começa com `gsk_...`

---

## Passo 5 — Configurar credenciais no n8n

### Credencial WhatsApp Business Cloud
1. No n8n, vá em **Credenciais → Nova credencial → WhatsApp Business Cloud**
2. Preencha:
   - **Access Token**: o token `EAA...` gerado no Meta
   - **Phone Number ID**: o ID do número copiado no Passo 2
3. Salve com o nome `ADSI WhatsApp`

### Credencial Groq
1. Crie uma nova credencial do tipo **Header Auth**
2. Name: `Authorization`
3. Value: `Bearer gsk_SUA_CHAVE_AQUI`
4. Salve com o nome `ADSI Groq`

---

## Passo 6 — Importar e ativar o fluxo

1. No n8n, clique em **Workflows → Import from file**
2. Selecione o arquivo `n8n-chatbot-groq.json`
3. Nos nós **WhatsApp Trigger**, **Envia confirmação** e **Envia resposta final**, selecione a credencial `ADSI WhatsApp`
4. No nó **Groq — LLaMA 3**, selecione a credencial `ADSI Groq`
5. Clique em **Ativar fluxo** (toggle no canto superior direito)

---

## Passo 7 — Configurar o webhook no Meta

1. Com o fluxo ativo, copie a URL do nó **WhatsApp Trigger** no n8n
2. No painel do Meta, vá em **WhatsApp → Configuração → Webhooks**
3. Cole a URL no campo **URL de callback**
4. No campo **Token de verificação**, coloque qualquer texto, ex: `adsi2026`
5. Clique em **Verificar e salvar**
6. Ative o campo **messages** em Campos do webhook

---

## Testando

Envie uma mensagem para o número de teste do Meta a partir do número pessoal que você cadastrou:

> "não consigo abrir a internet no meu notebook"

O bot deve responder em segundos com orientação clara e simples.

---

## Limites gratuitos

| Recurso | Limite gratuito |
|---------|----------------|
| Conversas WhatsApp | 1.000/mês |
| Requisições Groq | ~14.400/dia |
| n8n (cloud) | 5.000 execuções/mês |

Para um projeto acadêmico, esses limites são mais do que suficientes.

---

## Ajustando o comportamento da IA

O comportamento do bot é controlado pelo **system prompt** no nó **Monta prompt com contexto**.

Exemplos de ajuste:
- Tom mais formal: acrescente *"Use linguagem respeitosa e formal"*
- Respostas mais curtas: reduza `max_tokens` de 400 para 250
- Modelo mais potente: troque `llama-3.1-8b-instant` por `llama-3.3-70b-versatile`
