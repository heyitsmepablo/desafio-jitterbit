# Desafio Jitterbit - API de Gerenciamento de Pedidos 🚀

[![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)](https://expressjs.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Docker](https://img.shields.io/badge/Docker-2CA5E0?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com/)
[![Swagger](https://img.shields.io/badge/Swagger-85EA2D?style=for-the-badge&logo=Swagger&logoColor=black)](https://swagger.io/)

Solução desenvolvida para o desafio prático do processo seletivo da Jitterbit para a vaga de **Analista de Sistemas JR**. O projeto consiste em uma API RESTful em Node.js capaz de receber, transformar e armazenar dados de pedidos em um banco de dados relacional.

## 📌 Funcionalidades Implementadas

- **Mapeamento de Dados (Data Mapping):** Transformação do payload de entrada em português para o schema em inglês do banco de dados relacional (Tabelas `Order` e `Items`).
- **Transações SQL:** Garantia de consistência no banco; se um item falhar ao ser salvo, todo o pedido sofre rollback.
- **Autenticação JWT:** Proteção de rotas utilizando JSON Web Tokens (Requisito Bônus).
- **Documentação Interativa:** API totalmente documentada utilizando Swagger Autogen (Requisito Bônus).
- **Ambiente Dockerizado:** Banco de dados PostgreSQL configurado e inicializado via `docker-compose`.

## ⚙️ Pré-requisitos

Antes de começar, você vai precisar ter as seguintes ferramentas instaladas em sua máquina:

- [Git](https://git-scm.com)
- [Node.js](https://nodejs.org/en/) (v16 ou superior)
- [Docker](https://www.docker.com/) e [Docker Compose](https://docs.docker.com/compose/)

## 🚀 Como Executar o Projeto

**1. Clone o repositório:**

```bash
git clone [https://github.com/SEU_USUARIO/desafio-jitterbit.git](https://github.com/SEU_USUARIO/desafio-jitterbit.git)
cd desafio-jitterbit
```

**2. Configure as variáveis de ambiente:**
Crie um arquivo .env na raiz do projeto com base no arquivo de exemplo:

```bash
cp .env.example .env
```

**3. Suba o Banco de Dados (Docker):**
O comando abaixo irá baixar a imagem do PostgreSQL e criar as tabelas necessárias automaticamente.

```bash
docker-compose up -d
```

**4. Entre na pasta API eInstale as dependências e inicie :**

```bash
npm install
npm run dev
```

O servidor iniciará na porta 3000 e a documentação será gerada automaticamente.

## 📄 Documentação (Swagger)

A API possui uma interface gráfica do Swagger para facilitar os testes das rotas. Com o servidor rodando, acesse no seu navegador:

http://localhost:3000/api-docs

## 🔐 Como Autenticar no Swagger:

- Acesse a rota POST /login.

- Utilize as credenciais padrão já injetadas no banco:

```JSON
{
username: "admin"
password: "admin"
}
```

- Copie o token retornado.

- Suba a página, clique no botão verde "Authorize" (Cadeado) e cole o token. Pronto!

## 🛣️ Endpoints Principais

- POST /login - Autenticação e geração de token.
- POST /order - Cria um novo pedido (Transforma o JSON pt-BR para o banco en-US).
- GET /order/:orderId - Retorna os dados completos de um pedido salvo.

## 👨‍💻 Autor

Feito por [Pablo Eduardo - Engenheiro de Software](https://www.linkedin.com/in/pabloeduardoss/).
