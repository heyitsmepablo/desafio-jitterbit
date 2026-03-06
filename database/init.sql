-- Tabela de Usuários para Autenticação
CREATE TABLE IF NOT EXISTS "Users" (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
);

-- Inserindo um usuário padrão (admin / admin)
INSERT INTO "Users" (username, password) VALUES ('admin', 'admin') ON CONFLICT DO NOTHING;

-- Tabelas do Desafio
CREATE TABLE IF NOT EXISTS "Order" (
    orderId VARCHAR(255) PRIMARY KEY,
    value NUMERIC NOT NULL,
    creationDate TIMESTAMP NOT NULL
);

CREATE TABLE IF NOT EXISTS "Items" (
    id SERIAL PRIMARY KEY,
    orderId VARCHAR(255) REFERENCES "Order"(orderId) ON DELETE CASCADE,
    productId INTEGER NOT NULL,
    quantity INTEGER NOT NULL,
    price NUMERIC NOT NULL
);