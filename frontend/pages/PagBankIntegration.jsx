import React, { useState } from 'react';
import axios from 'axios';

export default function PagBankIntegration({ clientId }) {
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [customer, setCustomer] = useState({ name: '', email: '', phone_area: '', phone_number: '' });
  const [paymentUrl, setPaymentUrl] = useState('');
  const [error, setError] = useState('');

  const handleCharge = async () => {
    setError('');
    try {
      const { data } = await axios.post('/api/pagbank/cobrar', {
        clientId,
        amount: parseFloat(amount),
        description,
        customer
      });
      setPaymentUrl(data.url);
    } catch (e) {
      setError(e.response?.data?.error || 'Erro ao gerar cobrança');
    }
  };

  return (
    <div>
      <h2>Integração PagBank</h2>
      <div>
        <label>Valor (R$): <input value={amount} onChange={e => setAmount(e.target.value)} /></label>
      </div>
      <div>
        <label>Descrição: <input value={description} onChange={e => setDescription(e.target.value)} /></label>
      </div>
      <div>
        <label>Cliente Nome: <input value={customer.name} onChange={e => setCustomer({ ...customer, name: e.target.value })} /></label>
        <label>Cliente Email: <input value={customer.email} onChange={e => setCustomer({ ...customer, email: e.target.value })} /></label>
        <label>DDD: <input value={customer.phone_area} onChange={e => setCustomer({ ...customer, phone_area: e.target.value })} /></label>
        <label>Número: <input value={customer.phone_number} onChange={e => setCustomer({ ...customer, phone_number: e.target.value })} /></label>
      </div>
      <button onClick={handleCharge}>Gerar Pagamento</button>
      {paymentUrl && (
        <div>
          <p>Pagamento gerado! <a href={paymentUrl} target="_blank" rel="noopener noreferrer">Clique aqui para pagar</a></p>
        </div>
      )}
      {error && <div style={{color: 'red'}}>{error}</div>}
    </div>
  );
}