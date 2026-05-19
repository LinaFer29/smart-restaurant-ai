import { d as db } from './database_-EysS8Jg.mjs';

const GET = ({ params }) => {
  const row = db.prepare("SELECT * FROM orders WHERE id = ?").get(Number(params.id));
  if (!row) {
    return new Response(JSON.stringify({ error: "Pedido no encontrado" }), {
      status: 404,
      headers: { "Content-Type": "application/json" }
    });
  }
  return new Response(JSON.stringify({ ...row, items: JSON.parse(row.items) }), {
    headers: { "Content-Type": "application/json" }
  });
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
