const express = require("express");
const swaggerUi = require("swagger-ui-express");
require("dotenv").config();

const authRoutes = require("./routes/auth.routes");
const orderRoutes = require("./routes/order.routes");

// Importa o arquivo JSON que será gerado pelo swagger-autogen
const swaggerFile = require("./swagger_output.json");

const app = express();
app.use(express.json());

// Rota do Swagger servindo o arquivo estático gerado
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use("/login", authRoutes);
app.use("/order", orderRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
  console.log(`📄 Swagger (Autogen) em: http://localhost:${PORT}/api-docs`);
});
