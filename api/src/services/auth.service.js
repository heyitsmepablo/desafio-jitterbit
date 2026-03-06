const pool = require("../config/postgres");
const jwt = require("jsonwebtoken");
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../../.env") });

class AuthService {
  async login(username, password) {
    // Busca o usuário no banco (validação simples em texto plano conforme solicitado)
    const result = await pool.query(
      'SELECT id, username FROM "Users" WHERE username = $1 AND password = $2',
      [username, password],
    );

    if (result.rows.length === 0) {
      throw new Error("Usuário ou senha inválidos.");
    }

    const user = result.rows[0];

    // Gera o token JWT válido por 2 horas
    const token = jwt.sign(
      { id: user.id, username: user.username },
      process.env.JWT_SECRET,
      {
        expiresIn: "2h",
      },
    );

    return { auth: true, token };
  }
}

module.exports = new AuthService();
