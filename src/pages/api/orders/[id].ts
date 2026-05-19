import type { APIRoute } from 'astro';
import db from '../../../lib/database';

export const GET: APIRoute = ({ params }) => {
  const row = db.prepare('SELECT * FROM orders WHERE id = ?').get(Number(params.id)) as any;
  if (!row) {
    return new Response(JSON.stringify({ error: 'Pedido no encontrado' }), {
      status: 404, headers: { 'Content-Type': 'application/json' }
    });
  }
  return new Response(JSON.stringify({ ...row, items: JSON.parse(row.items) }), {
    headers: { 'Content-Type': 'application/json' }
  });
};
