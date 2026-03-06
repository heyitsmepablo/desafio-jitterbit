const pool = require("../config/postgres");

class OrderService {
  async createOrder(payload) {
    // Extrai os dados em português do payload JSON [cite: 237, 238, 239, 244]
    const { numeroPedido, valorTotal, dataCriacao, items } = payload;

    // Realiza o mapping obrigatório para os campos em inglês do banco de dados [cite: 266, 268, 269, 270, 275, 276, 277]
    const mappedOrder = {
      orderId: numeroPedido,
      value: valorTotal,
      creationDate: dataCriacao,
    };
    const mappedItems = items.map((item) => ({
      productId: parseInt(item.idItem),
      quantity: item.quantidadeItem,
      price: item.valorItem,
    }));

    const client = await pool.connect();

    try {
      // Inicia a transação. Se algo falhar, nada é salvo.
      await client.query("BEGIN");

      const insertOrderQuery = `INSERT INTO "Order" (orderId, value, creationDate) VALUES ($1, $2, $3) RETURNING *`;
      await client.query(insertOrderQuery, [
        mappedOrder.orderId,
        mappedOrder.value,
        mappedOrder.creationDate,
      ]);

      const insertItemQuery = `INSERT INTO "Items" (orderId, productId, quantity, price) VALUES ($1, $2, $3, $4)`;
      // Uso do for...of para iteração sequencial no banco [cite: 116, 117]
      for (const item of mappedItems) {
        await client.query(insertItemQuery, [
          mappedOrder.orderId,
          item.productId,
          item.quantity,
          item.price,
        ]);
      }

      await client.query("COMMIT");
      return { ...mappedOrder, items: mappedItems };
    } catch (error) {
      await client.query("ROLLBACK");
      throw error;
    } finally {
      client.release();
    }
  }

  async getOrderById(orderId) {
    // Busca os dados do pedido [cite: 229]
    const orderResult = await pool.query(
      'SELECT * FROM "Order" WHERE orderId = $1',
      [orderId],
    );
    if (orderResult.rows.length === 0) return null;

    // Busca os itens do pedido
    const itemsResult = await pool.query(
      'SELECT productId, quantity, price FROM "Items" WHERE orderId = $1',
      [orderId],
    );

    // Monta o objeto final para retorno
    return {
      orderId: orderResult.rows[0].orderid,
      value: Number(orderResult.rows[0].value),
      creationDate: orderResult.rows[0].creationdate,
      items: itemsResult.rows.map((item) => ({
        productId: item.productid,
        quantity: item.quantity,
        price: Number(item.price),
      })),
    };
  }
}

module.exports = new OrderService();
