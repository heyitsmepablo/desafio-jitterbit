const authService = require("../services/auth.service");

class AuthController {
  async login(req, res) {
    try {
      // Desmembra o objeto recebido
      const { username, password } = req.body;
      // Passa as constantes para o serviço de autenticação nos argumentos
      const result = await authService.login(username, password);
      // Retorna sucesso do login passando a resposta do serviço no corpo
      return res.status(200).json(result);
    } catch (error) {
      // Em caso de erro joga uma resposta
      throw res.status(401).json({ error: error.message });
    }
  }
}

module.exports = new AuthController();
