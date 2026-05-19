import type { APIRoute } from 'astro';
import db from '../../../lib/database';

const MAX_CONCURRENT = 3;

export const POST: APIRoute = async ({ request }) => {
  try {
    const { date, time, guests, customerName, customerEmail } = await request.json();

    if (!date || !time || !guests || !customerName || !customerEmail) {
      return new Response(JSON.stringify({ error: 'Todos los campos son requeridos' }), {
        status: 400, headers: { 'Content-Type': 'application/json' }
      });
    }

    const count = (db.prepare(
      "SELECT COUNT(*) as n FROM reservations WHERE date = ? AND time = ? AND status != 'cancelada'"
    ).get(date, time) as { n: number }).n;

    if (count >= MAX_CONCURRENT) {
      return new Response(JSON.stringify({ error: 'No hay disponibilidad en ese horario' }), {
        status: 409, headers: { 'Content-Type': 'application/json' }
      });
    }

    const confirmationCode = `RES-${Date.now()}`;
    const result = db.prepare(
      'INSERT INTO reservations (confirmation_code, date, time, guests, customer_name, customer_email, status, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)'
    ).run(confirmationCode, date, time, Number(guests), customerName, customerEmail, 'confirmada', new Date().toISOString());

    return new Response(JSON.stringify({
      id: result.lastInsertRowid, confirmationCode, date, time, guests, customerName, customerEmail, status: 'confirmada'
    }), {
      status: 201, headers: { 'Content-Type': 'application/json' }
    });
  } catch {
    return new Response(JSON.stringify({ error: 'Error al procesar la reserva' }), {
      status: 500, headers: { 'Content-Type': 'application/json' }
    });
  }
};
