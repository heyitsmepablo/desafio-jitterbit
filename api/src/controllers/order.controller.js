const orderService = require("../services/order.service");

class OrderController {
  async create(req, res) {
    try {
      const result = await orderService.createOrder(req.body);
      res.status(201).json(result); // 201 Created [cite: 314]
    } catch (error) {
      console.error("Erro no controller de criação:", error);
      res
        .status(500)
        .json({ error: "Erro interno ao criar pedido no banco de dados." }); // 500 Internal Error [cite: 313, 314]
    }
  }

  async getById(req, res) {
    try {
      const { orderId } = req.params;
      const order = await orderService.getOrderById(orderId);

      if (!order) {
        return res.status(404).json({ error: "Pedido não encontrado." }); // 404 Not Found [cite: 313, 314]
      }
      res.status(200).json(order); // 200 OK [cite: 314]
    } catch (error) {
      console.error("Erro no controller de busca:", error);
      res.status(500).json({ error: "Erro interno ao buscar o pedido." });
    }
  }
}

module.exports = new OrderController();
