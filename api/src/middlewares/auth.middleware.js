const jwt = require("jsonwebtoken");
require("dotenv").config();

const SECRET = process.env.JWT_SECRET;

// Middleware para verificar se o token JWT é válido nas rotas protegidas
const verifyToken = (req, res, next) => {
  const tokenHeader = req.headers["authorization"];

  if (!tokenHeader) {
    return res
      .status(403)
      .json({ error: "Nenhum token fornecido. Acesso negado." });
  }

  // Remove o prefixo "Bearer " para validar apenas o hash
  const token = tokenHeader.split(" ")[1];

  jwt.verify(token, SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: "Token inválido ou expirado." });
    }
    // Salva o ID do usuário na requisição caso os controllers precisem
    req.userId = decoded.id;
    next();
  });
};

module.exports = { verifyToken };
