import type { APIRoute } from 'astro';
import db from '../../lib/database';

export const GET: APIRoute = () => {
  const items = db.prepare('SELECT * FROM menu_items ORDER BY category, name').all();
  return new Response(JSON.stringify(items), {
    headers: { 'Content-Type': 'application/json' }
  });
};
