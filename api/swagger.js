const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "API de Pedidos Jitterbit",
    description:
      "Teste Teórico Professional Services - Gerenciamento de Pedidos (Gerado Automaticamente)",
    version: "1.0.0",
  },
  host: "localhost:3000",
  schemes: ["http"],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
  },
};

const outputFile = "./src/swagger_output.json"; // Onde o JSON será gerado
const routes = ["./src/index.js"]; // Ponto de entrada da sua API

// Gera o arquivo e depois de terminar, você pode iniciar o servidor se quiser
swaggerAutogen(outputFile, routes, doc);
