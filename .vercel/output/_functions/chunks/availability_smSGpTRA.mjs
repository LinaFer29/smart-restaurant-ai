import { d as db } from './database_-EysS8Jg.mjs';

const TIME_SLOTS = ["12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "19:00", "19:30", "20:00", "20:30", "21:00", "21:30"];
const MAX_CONCURRENT = 3;
const GET = ({ url }) => {
  const date = url.searchParams.get("date");
  const time = url.searchParams.get("time");
  if (!date || !time) {
    return new Response(JSON.stringify({ error: "Se requieren date y time" }), {
      status: 400,
      headers: { "Content-Type": "application/json" }
    });
  }
  const count = db.prepare(
    "SELECT COUNT(*) as n FROM reservations WHERE date = ? AND time = ? AND status != 'cancelada'"
  ).get(date, time).n;
  if (count < MAX_CONCURRENT) {
    return new Response(JSON.stringify({ available: true }), {
      headers: { "Content-Type": "application/json" }
    });
  }
  const alternatives = [];
  for (const t of TIME_SLOTS) {
    if (t === time || alternatives.length >= 2) continue;
    const n = db.prepare(
      "SELECT COUNT(*) as n FROM reservations WHERE date = ? AND time = ? AND status != 'cancelada'"
    ).get(date, t).n;
    if (n < MAX_CONCURRENT) alternatives.push({ date, time: t });
  }
  return new Response(JSON.stringify({ available: false, alternatives }), {
    headers: { "Content-Type": "application/json" }
  });
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
