import { d as db } from './database_3TQ1Q7XS.mjs';

const POST = async ({ request }) => {
  try {
    const { items, total, customerName } = await request.json();
    if (!items?.length) {
      return new Response(JSON.stringify({ error: "El pedido debe tener al menos un producto" }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }
    for (const item of items) {
      const row = db.prepare("SELECT * FROM menu_items WHERE id = ?").get(item.id);
      if (!row || !row.available) {
        return new Response(JSON.stringify({ error: `"${item.name}" ya no está disponible` }), {
          status: 400,
          headers: { "Content-Type": "application/json" }
        });
      }
    }
    const orderNumber = `PED-${Date.now()}`;
    const result = db.prepare(
      "INSERT INTO orders (order_number, items, total, status, customer_name, created_at) VALUES (?, ?, ?, ?, ?, ?)"
    ).run(orderNumber, JSON.stringify(items), total, "pendiente", customerName ?? "Cliente", (/* @__PURE__ */ new Date()).toISOString());
    return new Response(JSON.stringify({ id: result.lastInsertRowid, orderNumber, status: "pendiente", total, items }), {
      status: 201,
      headers: { "Content-Type": "application/json" }
    });
  } catch {
    return new Response(JSON.stringify({ error: "Error al procesar el pedido" }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
