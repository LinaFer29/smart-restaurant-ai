import { c as createComponent } from './astro-component_Cm4UKfQu.mjs';
import 'piccolore';
import { n as renderComponent, r as renderTemplate, m as maybeRenderHead, h as addAttribute } from './entrypoint_BZTOof7K.mjs';
import { $ as $$Layout, r as renderScript } from './Layout_FNj9GLuS.mjs';

const $$Reservas = createComponent(async ($$result, $$props, $$slots) => {
  const today = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
  const maxDate = /* @__PURE__ */ new Date();
  maxDate.setDate(maxDate.getDate() + 30);
  const maxDateStr = maxDate.toISOString().split("T")[0];
  const lunchSlots = ["12:00", "12:30", "13:00", "13:30", "14:00", "14:30"];
  const dinnerSlots = ["19:00", "19:30", "20:00", "20:30", "21:00", "21:30"];
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Reservar mesa", "activePage": "reservas" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="page-header"> <div class="container"> <h1>Reservar Mesa</h1> <p>Garantiza tu lugar sin necesidad de llamarnos</p> </div> </div> <div class="form-section"> <!-- Formulario --> <div class="form-card" id="form-card"> <form id="reservation-form" novalidate> <div class="form-row"> <div class="form-group"> <label for="date">Fecha *</label> <input type="date" id="date" name="date"${addAttribute(today, "min")}${addAttribute(maxDateStr, "max")} required> </div> <div class="form-group"> <label for="time">Hora *</label> <select id="time" name="time" required> <option value="">Selecciona un horario</option> <optgroup label="Almuerzo"> ${lunchSlots.map((t) => renderTemplate`<option${addAttribute(t, "value")}>${t}</option>`)} </optgroup> <optgroup label="Cena"> ${dinnerSlots.map((t) => renderTemplate`<option${addAttribute(t, "value")}>${t}</option>`)} </optgroup> </select> </div> </div> <div class="form-group"> <label for="guests">Número de comensales *</label> <select id="guests" name="guests" required> <option value="">Selecciona</option> ${[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => renderTemplate`<option${addAttribute(String(n), "value")}>${n} ${n === 1 ? "persona" : "personas"}</option>`)} </select> </div> <div class="form-group"> <label for="customerName">Nombre completo *</label> <input type="text" id="customerName" name="customerName" placeholder="Ej. María García" required autocomplete="name"> </div> <div class="form-group"> <label for="customerEmail">Correo electrónico *</label> <input type="email" id="customerEmail" name="customerEmail" placeholder="correo@ejemplo.com" required autocomplete="email"> </div> <div id="alert-zone"></div> <div class="alternatives hidden" id="alt-zone"> <h4>Horarios disponibles cercanos:</h4> <div id="alt-buttons"></div> </div> <button type="submit" class="btn-primary btn-full" id="btn-reserve">
Verificar disponibilidad y reservar
</button> </form> </div> <!-- Confirmación --> <div class="form-card confirmation-card hidden" id="conf-card" role="region" aria-live="polite"> <div class="confirmation-icon" aria-hidden="true">🎉</div> <h2>¡Reserva confirmada!</h2> <div class="confirmation-code" id="conf-code"></div> <p class="confirmation-detail" id="conf-details"></p> <p class="confirmation-detail" style="margin-top:.625rem">
Te esperamos puntual para que disfrutes la experiencia completa.
</p> <a href="/" class="btn-primary" style="margin-top:1.5rem;display:inline-flex">
Ver menú
</a> </div> </div> ` })} ${renderScript($$result, "/Users/linamfernandezg/Universidad/Roles/3 corte/MenuUNI-master/src/pages/reservas.astro?astro&type=script&index=0&lang.ts")}`;
}, "/Users/linamfernandezg/Universidad/Roles/3 corte/MenuUNI-master/src/pages/reservas.astro", void 0);

const $$file = "/Users/linamfernandezg/Universidad/Roles/3 corte/MenuUNI-master/src/pages/reservas.astro";
const $$url = "/reservas";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Reservas,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
