import { d as db } from './database_-EysS8Jg.mjs';

const GET = () => {
  const items = db.prepare("SELECT * FROM menu_items ORDER BY category, name").all();
  return new Response(JSON.stringify(items), {
    headers: { "Content-Type": "application/json" }
  });
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
