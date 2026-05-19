import { describe, it, expect } from "vitest";

function validarTarjeta(numero: string) {
  return numero.replace(/\s/g, "").length === 16;
}

function validarCVV(cvv: string) {
  return cvv.length >= 3;
}

describe("Pruebas módulo pagos", () => {

  it("Debe aceptar tarjeta válida", () => {
    expect(validarTarjeta("4111 1111 1111 1111")).toBe(true);
  });

  it("Debe rechazar tarjeta inválida", () => {
    expect(validarTarjeta("1234")).toBe(false);
  });

  it("Debe aceptar CVV válido", () => {
    expect(validarCVV("123")).toBe(true);
  });

  it("Debe rechazar CVV inválido", () => {
    expect(validarCVV("1")).toBe(false);
  });

});