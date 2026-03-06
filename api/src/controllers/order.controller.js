const orderService = require("../services/order.service");

class OrderController {
  async create(req, res) {
    // #swagger.tags = ['Pedidos']
    // #swagger.requestBody = { schema: { $ref: '#/components/schemas/OrderPayload' } }
    // #swagger.security = [{ "bearerAuth": [] }]
    try {
      const result = await orderService.createOrder(req.body);
      res.status(201).json(result);
    } catch (error) {
      res.status(500).json({ error: "Erro interno ao criar pedido." });
    }
  }

  async getById(req, res) {
    // #swagger.tags = ['Pedidos']
    // #swagger.security = [{ "bearerAuth": [] }]
    try {
      const { orderId } = req.params;
      const order = await orderService.getOrderById(orderId);
      if (!order)
        return res.status(404).json({ error: "Pedido não encontrado." });
      res.status(200).json(order);
    } catch (error) {
      res.status(500).json({ error: "Erro interno ao buscar o pedido." });
    }
  }
}

module.exports = new OrderController();
