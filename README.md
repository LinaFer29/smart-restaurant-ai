# MenuUNI MVP - Pedidos, Reservas y Pago Web

## Descripción
Este proyecto implementa un **MVP** para digitalizar el flujo principal de un restaurante, permitiendo a los clientes:

- hacer su pedido en línea,
- reservar mesa,
- y pagar desde la plataforma web.

El objetivo fue validar rápidamente la propuesta de valor de atención sin filas, reserva anticipada y pago digital.

## Historias de Usuario Cubiertas (MVP)

### HU-01 - Pedido online
**Como cliente, quiero realizar mi pedido desde la web o el celular, para evitar hacer fila en el restaurante y ahorrar tiempo.**

Estado en el MVP:
- Menú dinámico con categorías y productos disponibles/no disponibles.
- Carrito de compra (agregar, aumentar/disminuir cantidades, total en tiempo real).
- Confirmación del pedido con número único (`PED-...`).
- Redirección al flujo de pago desde la confirmación.

### HU-02 - Reserva de mesa
**Como cliente, quiero reservar una mesa desde la plataforma web, para garantizar mi lugar sin necesidad de llamar al restaurante.**

Estado en el MVP:
- Formulario de reserva con fecha, hora, comensales, nombre y correo.
- Validación de disponibilidad por franja horaria.
- Límite de reservas simultáneas por horario (capacidad simple de MVP).
- Sugerencia de horarios alternativos cuando no hay cupo.
- Confirmación de reserva con código único (`RES-...`).

### HU-03 - Pago desde la web
**Como cliente, quiero pagar mi pedido directamente desde la plataforma, para no tener que usar efectivo ni esperar al mesero al finalizar.**

Estado en el MVP:
- Pantalla de pago por pedido (`/pago?orderId=...`).
- Métodos simulados: tarjeta, PSE y billetera digital.
- Validaciones por método de pago.
- Registro de transacción con identificador (`TXN-...`).
- Actualización de estado del pedido a `pagado`.

## Alcance MVP y Consideraciones
- Persistencia local con SQLite (`restaurant.db`).
- Pasarela de pago **simulada** (no integración real con proveedor externo).
- Proyecto orientado a validación funcional del flujo end-to-end.
- No incluye autenticación de usuarios ni panel administrativo.

## Stack Técnico
- **Frontend/SSR:** Astro
- **Backend API:** Endpoints en Astro (`src/pages/api`)
- **Base de datos:** SQLite vía `node:sqlite`
- **Runtime recomendado:** Node.js 22.5+

## Estructura del Proyecto
```text
src/
  layouts/
  lib/
    database.ts
  pages/
    index.astro
    reservas.astro
    pago.astro
    api/
      menu.ts
      orders/
      reservations/
      payments.ts
```

## Ejecutar en Local

### 1. Instalar dependencias
```bash
npm install
```

### 2. Levantar entorno de desarrollo
```bash
npm run dev
```

### 3. Build de producción
```bash
npm run build
npm run preview
```

## Endpoints Principales
- `GET /api/menu` - Lista productos del menú.
- `POST /api/orders` - Crea un pedido.
- `GET /api/orders/:id` - Consulta detalle de pedido.
- `GET /api/reservations/availability?date=YYYY-MM-DD&time=HH:mm` - Verifica disponibilidad.
- `POST /api/reservations` - Crea reserva.
- `POST /api/payments` - Procesa pago del pedido (simulado).

## Estados de Dominio (MVP)
- Pedido: `pendiente` -> `pagado`
- Reserva: `confirmada` (se contempla `cancelada` en validaciones)
- Pago: `aprobado`

## Integrantes del equipo
- Nombre Apellido - Rol
- Nombre Apellido - Rol
- Nombre Apellido - Rol

## IA's empleadas
- ChatGPT (OpenAI) - apoyo en redacción/documentación
- Codex (OpenAI) - apoyo en asistencia de desarrollo
- [Agregar otras herramientas de IA utilizadas por el equipo]

## Próximos pasos sugeridos
- Integrar pasarela de pagos real (Wompi, Mercado Pago, Stripe, etc.).
- Implementar autenticación y perfil de cliente.
- Agregar panel operativo para cocina y reservas.
- Incorporar pruebas automáticas (unitarias e integración).
