# NeuroClinic CRM - Sistema para Neuropsicopedagogos

Plataforma completa SaaS para gestão de clínicas neuropsicopedagógicas, baseada no DSM-5 com foco em eficiência clínica.

## 🚀 Deploy na Vercel

### Passo 1: Preparar o Repositório

1. **Commit e push do código para o GitHub:**
```bash
git add .
git commit -m "feat: sistema completo de CRM neuropsicopedagógico"
git push origin main
```

### Passo 2: Deploy na Vercel

1. **Acesse [vercel.com](https://vercel.com) e faça login**

2. **Clique em "New Project"**

3. **Importe seu repositório do GitHub**

4. **Configure as variáveis de ambiente:**
   - `NEXT_PUBLIC_SUPABASE_URL`: URL do seu projeto Supabase
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Chave anônima do Supabase

5. **Clique em "Deploy"**

### Passo 3: Configurar Variáveis de Ambiente

No painel da Vercel:
1. Vá em **Settings** → **Environment Variables**
2. Adicione as variáveis:
   ```
   NEXT_PUBLIC_SUPABASE_URL = https://seu-projeto.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY = sua-chave-anonima-aqui
   ```

### Passo 4: Configurar Supabase

1. **No Supabase Dashboard, vá em Authentication → URL Configuration**
2. **Adicione a URL da Vercel em "Site URL":**
   ```
   https://seu-projeto.vercel.app
   ```
3. **Adicione também em "Redirect URLs":**
   ```
   https://seu-projeto.vercel.app/auth/callback
   ```

## 🛠️ Desenvolvimento Local

### Pré-requisitos

- Node.js 18+
- npm ou pnpm
- Conta no Supabase

### Instalação

1. **Clone o repositório:**
```bash
git clone https://github.com/seu-usuario/neuroclinic-crm.git
cd neuroclinic-crm
```

2. **Instale as dependências:**
```bash
npm install
```

3. **Configure as variáveis de ambiente:**
```bash
cp .env.example .env.local
```

4. **Execute o servidor de desenvolvimento:**
```bash
npm run dev
```

5. **Acesse http://localhost:3000**

## 📋 Funcionalidades Implementadas

### ✅ Módulos Funcionais

- **🔐 Autenticação**: Login, registro e proteção de rotas
- **👥 Gestão de Pacientes**: CRUD completo com busca
- **📅 Agenda**: Sistema completo de consultas com calendário
- **📊 Dashboard**: Estatísticas e visão geral

### 🚧 Módulos em Desenvolvimento

- **🧪 Testes Neuropsicopedagógicos**: Baseados no DSM-5
- **📋 Prontuários**: Evolução clínica digital
- **💰 Financeiro**: Integração com Mercado Pago
- **🎥 Teleconsulta**: Plataforma de vídeo integrada
- **📝 Anamnese**: Gerador inteligente por faixa etária
- **⚙️ Configurações**: Gestão de perfil e planos

## 🏗️ Arquitetura

- **Frontend**: Next.js 15 + TypeScript
- **UI**: Shadcn/UI + Tailwind CSS
- **Backend**: Supabase (PostgreSQL + Auth)
- **Deploy**: Vercel
- **Autenticação**: Supabase Auth
- **Banco de Dados**: PostgreSQL com RLS

## 📱 Planos SaaS

- **Básico**: 1 profissional
- **Intermediário**: Até 3 usuários
- **Ouro**: Equipe completa (até 10 usuários + recursos avançados)

## 🔒 Segurança

- Row Level Security (RLS) no Supabase
- Autenticação JWT
- Isolamento de dados por usuário
- Validação de formulários com Zod

## 📞 Suporte

Para dúvidas ou suporte, entre em contato através do sistema.

---

**Desenvolvido com ❤️ para neuropsicopedagogos**