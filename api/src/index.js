const express = require("express");
const swaggerUi = require("swagger-ui-express");
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../../.env") });

const authRoutes = require("./routes/auth.routes");
const orderRoutes = require("./routes/order.routes");

const swaggerFile = require("./swagger_output.json");

const app = express();
app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use("/login", authRoutes);
app.use("/order", orderRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
  console.log(`📄 Swagger (Autogen) em: http://localhost:${PORT}/api-docs`);
});
