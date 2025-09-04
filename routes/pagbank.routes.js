const express = require('express');
const axios = require('axios');
const router = express.Router();

// Configuração PagBank (pode vir do banco, do .env, ou do cliente)
const getPagBankConfig = async (clientId) => {
  // Exemplo: buscar config do restaurante/bar
  // Aqui, simulação estática
  return {
    token: process.env.PAGBANK_TOKEN || 'SEU_TOKEN_PAGBANK',
    seller_id: process.env.PAGBANK_SELLER_ID || 'SEU_SELLER_ID'
  };
};

// Criar link de pagamento PagBank
router.post('/cobrar', async (req, res) => {
  const { clientId, amount, description, customer } = req.body;
  try {
    const config = await getPagBankConfig(clientId);

    const response = await axios.post(
      'https://sandbox.api.pagseguro.com/orders',
      {
        reference_id: `pedido-${Date.now()}`,
        customer: {
          name: customer.name,
          email: customer.email,
          phones: [{
            country: "55",
            area: customer.phone_area,
            number: customer.phone_number,
            type: "MOBILE"
          }]
        },
        items: [{
          name: description,
          quantity: 1,
          unit_amount: amount * 100 // em centavos
        }]
      },
      {
        headers: {
          'Authorization': `Bearer ${config.token}`,
          'Content-Type': 'application/json'
        }
      }
    );
    res.json({ url: response.data.payment_url, order_id: response.data.id });
  } catch (err) {
    res.status(400).json({ error: err.response?.data || err.message });
  }
});

module.exports = router;