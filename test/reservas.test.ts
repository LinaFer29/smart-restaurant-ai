import { describe, it, expect } from "vitest";

function validarReserva(data: any) {
  return !!(
    data.date &&
    data.time &&
    data.guests &&
    data.customerName &&
    data.customerEmail
  );
}

describe("Pruebas módulo reservas", () => {

  it("Debe validar una reserva correcta", () => {
    const result = validarReserva({
      date: "2026-06-01",
      time: "19:00",
      guests: 2,
      customerName: "Juan",
      customerEmail: "juan@gmail.com"
    });

    expect(result).toBe(true);
  });

  it("Debe rechazar reserva sin fecha", () => {
    const result = validarReserva({
      time: "19:00",
      guests: 2,
      customerName: "Juan",
      customerEmail: "juan@gmail.com"
    });

    expect(result).toBe(false);
  });

  it("Debe rechazar reserva sin correo", () => {
    const result = validarReserva({
      date: "2026-06-01",
      time: "19:00",
      guests: 2,
      customerName: "Juan"
    });

    expect(result).toBe(false);
  });

});