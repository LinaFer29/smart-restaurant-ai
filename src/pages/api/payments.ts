import type { APIRoute } from 'astro';
import db from '../../lib/database';

export const POST: APIRoute = async ({ request }) => {
  try {
    const {
      orderId,
      paymentMethod = 'card',
      cardNumber,
      cardName,
      expiry,
      cvv,
      bank,
      documentId,
      walletProvider,
      walletPhone
    } = await request.json();

    if (!orderId) {
      return new Response(JSON.stringify({ error: 'Datos de pago incompletos' }), {
        status: 400, headers: { 'Content-Type': 'application/json' }
      });
    }
    if (!['card', 'pse', 'wallet'].includes(paymentMethod)) {
      return new Response(JSON.stringify({ error: 'Método de pago no válido' }), {
        status: 400, headers: { 'Content-Type': 'application/json' }
      });
    }

    if (paymentMethod === 'card' && (!cardNumber || !cardName || !expiry || !cvv)) {
      return new Response(JSON.stringify({ error: 'Completa los datos de la tarjeta' }), {
        status: 400, headers: { 'Content-Type': 'application/json' }
      });
    }
    if (paymentMethod === 'pse' && (!bank || !documentId)) {
      return new Response(JSON.stringify({ error: 'Completa los datos de PSE' }), {
        status: 400, headers: { 'Content-Type': 'application/json' }
      });
    }
    if (paymentMethod === 'wallet' && (!walletProvider || !walletPhone)) {
      return new Response(JSON.stringify({ error: 'Completa los datos de la billetera digital' }), {
        status: 400, headers: { 'Content-Type': 'application/json' }
      });
    }

    const order = db.prepare('SELECT * FROM orders WHERE id = ?').get(Number(orderId)) as any;
    if (!order) {
      return new Response(JSON.stringify({ error: 'Pedido no encontrado' }), {
        status: 404, headers: { 'Content-Type': 'application/json' }
      });
    }
    if (order.status === 'pagado') {
      return new Response(JSON.stringify({ error: 'Este pedido ya fue pagado' }), {
        status: 400, headers: { 'Content-Type': 'application/json' }
      });
    }

    // Simula pasarela: tarjetas terminadas en 0000 son rechazadas
    if (paymentMethod === 'card' && cardNumber.replace(/\s/g, '').endsWith('0000')) {
      return new Response(JSON.stringify({
        error: 'Transacción rechazada por la pasarela. Verifica tus datos o intenta con otro método de pago.',
        code: 'PAYMENT_DECLINED'
      }), { status: 402, headers: { 'Content-Type': 'application/json' } });
    }

    const transactionId = `TXN-${Date.now()}`;
    db.prepare(
      'INSERT INTO payments (order_id, transaction_id, amount, status, created_at) VALUES (?, ?, ?, ?, ?)'
    ).run(Number(orderId), transactionId, order.total, 'aprobado', new Date().toISOString());
    db.prepare("UPDATE orders SET status = 'pagado' WHERE id = ?").run(Number(orderId));

    return new Response(JSON.stringify({
      success: true,
      transactionId,
      amount: order.total,
      orderNumber: order.order_number,
      paidAt: new Date().toISOString()
    }), { headers: { 'Content-Type': 'application/json' } });
  } catch {
    return new Response(JSON.stringify({ error: 'Error interno al procesar el pago' }), {
      status: 500, headers: { 'Content-Type': 'application/json' }
    });
  }
};
