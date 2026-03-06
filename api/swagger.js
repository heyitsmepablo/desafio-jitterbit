const swaggerAutogen = require("swagger-autogen")({ openapi: "3.0.0" });

const doc = {
  info: {
    title: "API de Pedidos Jitterbit",
    description:
      "Teste Teórico Professional Services - Gerenciamento de Pedidos",
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
    schemas: {
      LoginPayload: {
        username: "admin",
        password: "admin",
      },
      OrderPayload: {
        numeroPedido: "v10089015vdb-01",
        valorTotal: 10000,
        dataCriacao: "2023-07-19T12:24:11.529Z",
        items: [
          {
            idItem: "2434",
            quantidadeItem: 1,
            valorItem: 1000,
          },
        ],
      },
    },
  },
};

const outputFile = "./src/swagger_output.json";
const routes = ["./src/index.js"];

swaggerAutogen(outputFile, routes, doc);
