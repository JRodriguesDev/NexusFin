# NexusFin - Gestão Financeira Inteligente & Copilot com IA
O **NexusFin** é uma plataforma Full Stack de controle financeiro pessoal e acompanhamento de investimentos. O sistema combina análise de métricas em tempo real, visualização gráfica, cotação de ativos e um assistente inteligente (Nexus Copilot) alimentado por IA (Google Gemini + LangChain). A IA consegue consultar os dados do banco em tempo real e realizar buscas atualizadas na web para auxiliar nas tomadas de decisão financeira.

## Funcionalidades do Sistema

### Visão Geral & Métricas (Overview)
- **Dashboard Consolidado:** Apresentação clara de receitas, despesas, salários e patrimônio investido.
- **Comparativo Mensal:** Comparação automática de desempenho financeiro em relação ao mês anterior.
- **Gráficos Interativos (Recharts):**
  - Gráfico comparativo de entradas e saídas do mês anterior.
  - Gráfico de distribuição de investimentos por categoria.
- **Resumo de Atividades:** Exibição rápida das últimas transações e carteira recente de investimentos.

### Gestão de Transações (Transactions)

- **Lançamentos Mensais:** Controle de despesas e receitas organizadas por mês/ano.
- **Gestão Completa (CRUD):** Adição, edição e exclusão de transações financeiras.
- **Otimização de Performance:** Implementação do sistema de cache do Next.js para navegação rápida entre períodos.

### Carteira de Investimentos (Investments)

- **Busca e Preview de Ativos (Brapi API):** Integração direta para busca de ações, FIIs e ativos com visualização de cotações em tempo real antes de cadastrar.
- **Acompanhamento de Aportes:** Registro e monitoramento dos investimentos do usuário.
- **Cache de Dados:** Cacheamento inteligente para consulta ágil de ativos.

### Nexus Copilot (Assistente de IA com LangChain)

- **Integração com Google Gemini:** Chat de IA responsivo para tirar dúvidas financeiras e analisar sua carteira.
- **Histórico de Conversas:** Persistência das mensagens enviadas e recebidas no banco de dados.
- **Leitura do Banco de Dados (Tool Calling):** Através do LangChain, a IA é capaz de ler e analisar com segurança as tabelas de ``transactions`` e ``investments`` do usuário no PostgreSQL.
- **Navegação na Web (Tavily Search):** A IA realiza buscas em tempo real na internet para consultar cotações, notícias e dados de mercado atualizados.

## Stack Tecnológica

### Core & UI
- **[Next.js](https://nextjs.org/):** App Router, Server Actions, Standalone Build e Caching.
- **[React](https://react.dev/):** Biblioteca para construção da interface de usuário.
- **[Tailwind CSS](https://v2.tailwindcss.com/):** Estilização utilitária de alta performance.
- **[Shadcn/UI & Radix UI](https://ui.shadcn.com/)**: Componentes acessíveis e customizáveis.
- **[React Icons](https://react-icons.github.io/react-icons/):** Iconografia.
- **[Zustand](https://zustand-demo.pmnd.rs/):** Gerenciamento de estado global leve.

### Back-End, IA & Banco de Dados
- **[Prisma ORM](https://www.prisma.io/):** Mapeamento relacional e migrações do banco.
- **PostgreSQL:** Banco de dados relacional executado via Docker.
- **[LangChain](https://www.langchain.com/):** Orquestração da IA e integração com o modelo Google Gemini.
- **[Tavily API](https://www.tavily.com/):** Ferramenta de busca web para LLMs.
- **[Brapi API](https://brapi.dev/):** Consulta de dados do mercado financeiro brasileiro.
- **[Zod](https://zod.dev/):** Validação de schemas e dados de entrada.

## Guia de Instalação e Execução via Docker

### 1. Pré-requisitos
- **Node.js**
- **Docker & Docker Compose**

### 2. Clona o repositório
```
git clone https://github.com/JRodriguesDev/NexusFin.git
cd NexusFin
```

### 3. Configuração das Variáveis de Ambiente (.env)
Crie um arquivo ``.env`` na raiz do projeto com o seguinte modelo:
```
# --- Banco de Dados (PostgreSQL via Docker) ---
POSTGRES_USER=<root>
POSTGRES_PASSWORD=<sua_senha_aqui>
POSTGRES_DB=<nexus>
DATABASE_URL=postgresql://root:<sua_senha_aqui>@nexus_db:5432/nexus?schema=public

# --- Chaves de API de Serviços de IA & Finanças ---
GOOGLE_API_KEY=<sua_chave_do_google_gemini>
BRAPI_API_KEY=<sua_chave_brapi>
TAVILY_API_KEY=<sua_chave_tavily>
```

### 4. Executando a Aplicação
Para construir as imagens e rodar os contêineres do PostgreSQL e do Next.js:
```
# Constrói as imagens e sobe os containers (aplicação + banco)
npm run compose:up

# Inicia os containers existentes (inicialização rápida)
npm run compose:start
```
Acesse a aplicação no seu navegador em ``http://localhost:3000``.
