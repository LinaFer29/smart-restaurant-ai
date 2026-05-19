import { c as createComponent } from './astro-component_DSw7g-oM.mjs';
import 'piccolore';
import { n as renderComponent, r as renderTemplate, m as maybeRenderHead, h as addAttribute } from './entrypoint_lgj9SqG-.mjs';
import { $ as $$Layout, r as renderScript } from './Layout_BOJ6nVXM.mjs';
import { d as db } from './database_DUDdWhjA.mjs';

const $$Pago = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Pago;
  const orderId = Astro2.url.searchParams.get("orderId");
  let order = null;
  if (orderId) {
    const raw = db.prepare("SELECT * FROM orders WHERE id = ?").get(Number(orderId));
    if (raw) order = { ...raw, items: JSON.parse(raw.items) };
  }
  function formatCOP(n) {
    return "$" + n.toLocaleString("es-CO");
  }
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Pago" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="page-header"> <div class="container"> <h1>Pago del pedido</h1> <p>Completa tu pago de forma segura</p> </div> </div> ${!order ? renderTemplate`<div class="no-order container"> <div class="no-order-icon" aria-hidden="true">🔍</div> <h2>Pedido no encontrado</h2> <p>No encontramos el pedido solicitado.</p> <a href="/" class="btn-primary">Volver al menú</a> </div>` : order.status === "pagado" ? renderTemplate`<div class="no-order container"> <div class="no-order-icon" aria-hidden="true">✅</div> <h2>Pedido ya pagado</h2> <p>El pedido <strong>${order.order_number}</strong> ya tiene su pago registrado.</p> <a href="/" class="btn-primary">Ver menú</a> </div>` : renderTemplate`<div class="pago-layout container"> <!-- Formulario de pago --> <div> <div class="form-card" id="payment-form-card"> <h3 style="font-size:1.05rem;font-weight:700;margin-bottom:1.25rem">Datos de pago</h3> <div id="payment-alert"></div> <form id="payment-form" novalidate> <input type="hidden" id="order-id-val"${addAttribute(String(order.id), "value")}> <input type="hidden" id="paymentMethod" value="card"> <div class="form-group"> <label>Método de pago</label> <div class="payment-methods" role="radiogroup" aria-label="Métodos de pago"> <button type="button" class="payment-method active" data-method="card" aria-pressed="true"> <span class="payment-method-title">Tarjeta débito / crédito</span> <span class="payment-method-subtitle">Visa, Mastercard, Amex</span> </button> <button type="button" class="payment-method" data-method="pse" aria-pressed="false"> <span class="payment-method-title">PSE</span> <span class="payment-method-subtitle">Débito bancario en línea</span> </button> <button type="button" class="payment-method" data-method="wallet" aria-pressed="false"> <span class="payment-method-title">Billetera digital</span> <span class="payment-method-subtitle">Nequi, Daviplata</span> </button> </div> </div> <div id="fields-card"> <div class="form-group"> <label for="cardNumber">Número de tarjeta</label> <div class="card-input-wrapper"> <input type="text" id="cardNumber" placeholder="0000 0000 0000 0000" maxlength="19" inputmode="numeric" autocomplete="cc-number" required> <span class="card-icon" aria-hidden="true">💳</span> </div> <small style="color:var(--muted);font-size:.75rem;margin-top:.25rem;display:block">
Prueba: <code>4111 1111 1111 1111</code> aprobada · <code>1111 0000 0000 0000</code> rechazada
</small> </div> <div class="form-group"> <label for="cardName">Nombre en la tarjeta</label> <input type="text" id="cardName" placeholder="Como aparece en la tarjeta" autocomplete="cc-name" required> </div> <div class="form-row"> <div class="form-group"> <label for="expiry">Vencimiento</label> <input type="text" id="expiry" placeholder="MM/AA" maxlength="5" inputmode="numeric" autocomplete="cc-exp" required> </div> <div class="form-group"> <label for="cvv">CVV</label> <input type="text" id="cvv" placeholder="000" maxlength="4" inputmode="numeric" autocomplete="cc-csc" required> </div> </div> </div> <div id="fields-pse" class="hidden"> <div class="form-group"> <label for="bank">Banco</label> <select id="bank"> <option value="">Selecciona tu banco</option> <option value="bancolombia">Bancolombia</option> <option value="davivienda">Davivienda</option> <option value="bbva">BBVA</option> <option value="bogota">Banco de Bogotá</option> </select> </div> <div class="form-group"> <label for="document">Documento del titular</label> <input type="text" id="document" placeholder="Cédula o NIT" inputmode="numeric"> </div> </div> <div id="fields-wallet" class="hidden"> <div class="form-group"> <label for="walletProvider">Billetera digital</label> <select id="walletProvider"> <option value="">Selecciona una billetera</option> <option value="nequi">Nequi</option> <option value="daviplata">Daviplata</option> </select> </div> <div class="form-group"> <label for="walletPhone">Celular asociado</label> <input type="text" id="walletPhone" placeholder="3001234567" inputmode="numeric"> </div> </div> <button type="submit" class="btn-primary btn-full" id="btn-pay" style="margin-top:.375rem">
Pagar ${formatCOP(order.total)} </button> </form> </div> <!-- Recibo (oculto hasta el pago exitoso) --> <div class="receipt hidden" id="receipt" role="region" aria-live="polite"> <div class="receipt-icon" aria-hidden="true">🧾</div> <h3>¡Pago exitoso!</h3> <p class="receipt-detail">Pedido <strong>${order.order_number}</strong></p> <div class="receipt-amount">${formatCOP(order.total)}</div> <p class="receipt-detail">ID de transacción:</p> <p class="receipt-txn" id="receipt-txn"></p> <p class="receipt-detail" id="receipt-date" style="margin-top:.5rem"></p> <a href="/" class="btn-primary" style="margin-top:1.5rem;display:inline-flex">Volver al menú</a> </div> </div> <!-- Resumen del pedido --> <aside class="order-summary-card" aria-label="Resumen del pedido"> <h3>Resumen</h3> <p style="font-size:.8rem;color:var(--muted);margin-bottom:.875rem">#${order.order_number}</p> ${order.items.map((item) => renderTemplate`<div class="summary-item"> <span>${item.qty}× ${item.name}</span> <span>${formatCOP(item.price * item.qty)}</span> </div>`)} ${order.allergies?.trim() && renderTemplate`<div style="margin-top:.8rem;padding:.65rem;border-radius:.6rem;background:#fff8e8;border:1px solid #f4d08a"> <p style="font-size:.76rem;font-weight:700;margin-bottom:.2rem">Comentario del pedido (alergias)</p> <p style="font-size:.82rem;line-height:1.35">${order.allergies}</p> </div>`} <div class="summary-total"> <span>Total</span> <span class="summary-total-amount">${formatCOP(order.total)}</span> </div> </aside> </div>`}` })} ${renderScript($$result, "/Users/linamfernandezg/Universidad/Roles/3 corte/MenuUNI-master/src/pages/pago.astro?astro&type=script&index=0&lang.ts")}`;
}, "/Users/linamfernandezg/Universidad/Roles/3 corte/MenuUNI-master/src/pages/pago.astro", void 0);

const $$file = "/Users/linamfernandezg/Universidad/Roles/3 corte/MenuUNI-master/src/pages/pago.astro";
const $$url = "/pago";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Pago,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
