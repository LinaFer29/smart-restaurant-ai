import { o as createRenderInstruction, p as renderHead, h as addAttribute, q as renderSlot, r as renderTemplate } from './entrypoint_Bx1_gYkZ.mjs';
import { c as createComponent } from './astro-component_DVbGZrws.mjs';
import 'piccolore';
import 'clsx';

async function renderScript(result, id) {
  const inlined = result.inlinedScripts.get(id);
  let content = "";
  if (inlined != null) {
    if (inlined) {
      content = `<script type="module">${inlined}</script>`;
    }
  } else {
    const resolved = await result.resolve(id);
    content = `<script type="module" src="${result.userAssetsBase ? (result.base === "/" ? "" : result.base) + result.userAssetsBase : ""}${resolved}"></script>`;
  }
  return createRenderInstruction({ type: "script", id, content });
}

const $$Layout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Layout;
  const { title, activePage } = Astro2.props;
  return renderTemplate`<html lang="es"> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><meta name="description" content="La Mesa — Pedidos y reservas online"><title>${title} — La Mesa</title><link rel="icon" type="image/svg+xml" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🍽️</text></svg>">${renderHead()}</head> <body> <header class="site-header"> <div class="container header-inner"> <a href="/" class="logo">🍽️ La Mesa</a> <nav aria-label="Navegación principal"> <a href="/"${addAttribute(["nav-link", { active: activePage === "menu" }], "class:list")}>Menú</a> <a href="/reservas"${addAttribute(["nav-link", { active: activePage === "reservas" }], "class:list")}>Reservar mesa</a> </nav> </div> </header> <main> ${renderSlot($$result, $$slots["default"])} </main> <footer class="site-footer"> <div class="container"> <p>© 2026 La Mesa &middot; Pedidos y reservas online</p> </div> </footer> </body></html>`;
}, "/Users/linamfernandezg/Universidad/Roles/3 corte/MenuUNI-master/src/layouts/Layout.astro", void 0);

export { $$Layout as $, renderScript as r };
