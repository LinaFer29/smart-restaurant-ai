import { c as createComponent } from './astro-component_Cm4UKfQu.mjs';
import 'piccolore';
import { n as renderComponent, r as renderTemplate, m as maybeRenderHead, h as addAttribute } from './entrypoint_BZTOof7K.mjs';
import { $ as $$Layout, r as renderScript } from './Layout_FNj9GLuS.mjs';
import { d as db } from './database_-EysS8Jg.mjs';

const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const menuItems = db.prepare("SELECT * FROM menu_items ORDER BY category, name").all();
  const categories = [...new Set(menuItems.map((i) => i.category))];
  function formatCOP(n) {
    return "$" + n.toLocaleString("es-CO");
  }
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Menú", "activePage": "menu" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="page-header"> <div class="container"> <h1>Nuestro Menú</h1> <p>Elige tus platos y confirma tu pedido sin hacer fila</p> </div> </div> <div class="category-tabs" role="tablist" id="cat-tabs"> <button class="tab active" data-cat="all" role="tab" aria-selected="true">Todos</button> ${categories.map((cat) => renderTemplate`<button class="tab"${addAttribute(cat, "data-cat")} role="tab" aria-selected="false">${cat}</button>`)} </div> <div class="menu-layout container"> <!-- Grilla de platos --> <section aria-label="Menú"> <div class="menu-grid" id="menu-grid"> ${menuItems.map((item) => renderTemplate`<article${addAttribute(`menu-card${!item.available ? " unavailable" : ""}`, "class")}${addAttribute(item.category, "data-cat")}> <div class="card-emoji-wrap" aria-hidden="true">${item.emoji}</div> <div class="card-body"> <h3>${item.name}</h3> <p class="card-desc">${item.description}</p> <div class="card-footer"> <span class="price">${formatCOP(item.price)}</span> ${item.available ? renderTemplate`<button class="btn-add"${addAttribute(String(item.id), "data-id")}${addAttribute(item.name, "data-name")}${addAttribute(String(item.price), "data-price")}${addAttribute(`Agregar ${item.name} al carrito`, "aria-label")}>+ Agregar</button>` : renderTemplate`<span class="unavailable-badge" role="status">No disponible</span>`} </div> </div> </article>`)} </div> </section> <!-- Carrito (desktop sidebar) --> <aside class="cart-panel" id="cart-panel" aria-label="Carrito de pedido"> <div class="cart-header"> <h2>Tu pedido</h2> <span class="cart-count" id="cart-count" aria-live="polite">0</span> </div> <div class="cart-items" id="cart-items"> <p class="cart-empty">Agrega productos para comenzar tu pedido</p> </div> <div class="cart-footer hidden" id="cart-footer"> <div class="cart-total"> <span>Total</span> <span class="cart-total-amount" id="cart-total">$0</span> </div> <button class="btn-primary btn-full" id="btn-order">Confirmar pedido</button> </div> </aside> </div>  <div class="cart-mobile-bar" id="cart-mobile-bar" role="region" aria-label="Resumen del pedido"> <div class="bar-info"> <span id="bar-items-text">0 productos</span> <strong id="bar-total">$0</strong> </div> <button class="btn-primary" id="btn-order-mobile">Confirmar →</button> </div>  <div class="modal-overlay" id="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title"> <div class="modal"> <div class="modal-icon" aria-hidden="true">✅</div> <h2 id="modal-title">¡Pedido registrado!</h2> <p>Tu número de confirmación es:</p> <div class="order-number" id="modal-order-number" aria-live="polite"></div> <p class="modal-sub">La cocina ya fue notificada. ¿Quieres pagar ahora?</p> <div class="modal-actions"> <button class="btn-secondary" id="btn-later">Pagar después</button> <a class="btn-primary" id="btn-pay-now" href="#">Pagar ahora</a> </div> </div> </div> ` })} ${renderScript($$result, "/Users/linamfernandezg/Universidad/Roles/3 corte/MenuUNI-master/src/pages/index.astro?astro&type=script&index=0&lang.ts")}`;
}, "/Users/linamfernandezg/Universidad/Roles/3 corte/MenuUNI-master/src/pages/index.astro", void 0);

const $$file = "/Users/linamfernandezg/Universidad/Roles/3 corte/MenuUNI-master/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
