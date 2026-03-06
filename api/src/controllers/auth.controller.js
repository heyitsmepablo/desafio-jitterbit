const authService = require("../services/auth.service");

class AuthController {
  async login(req, res) {
    /* #swagger.tags = ['Autenticação']
       #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: { $ref: "#/components/schemas/LoginPayload" }
                }
            }
        } 
    */
    try {
      const { username, password } = req.body;
      const result = await authService.login(username, password);
      res.status(200).json(result);
    } catch (error) {
      res.status(401).json({ error: error.message });
    }
  }
}

module.exports = new AuthController();
