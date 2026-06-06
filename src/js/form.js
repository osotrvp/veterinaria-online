/* form.js — Validación del formulario de reserva */

(function () {
  "use strict";

  const form         = document.getElementById("reservaForm");
  if (!form) return;

  const campoNombre  = document.getElementById("nombre");
  const campoEmail   = document.getElementById("email");
  const campoAsunto  = document.getElementById("asunto");
  const campoMensaje = document.getElementById("mensaje");
  const exito        = document.getElementById("mensajeExito");

  /* ── Helpers ────────────────────────────────────────────── */
  function esEmailValido(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
  }

  function mostrarError(campo, idError, mensaje) {
    campo.classList.add("error");
    const el = document.getElementById(idError);
    if (el) el.textContent = mensaje;
  }

  function limpiarError(campo, idError) {
    campo.classList.remove("error");
    const el = document.getElementById(idError);
    if (el) el.textContent = "";
  }

  /* ── Validación en tiempo real ──────────────────────────── */
  campoNombre.addEventListener("input", function () {
    if (this.value.trim() !== "") limpiarError(this, "errNombre");
  });

  campoEmail.addEventListener("input", function () {
    if (esEmailValido(this.value)) limpiarError(this, "errEmail");
  });

  campoAsunto.addEventListener("change", function () {
    if (this.value !== "") limpiarError(this, "errAsunto");
  });

  campoMensaje.addEventListener("input", function () {
    if (this.value.trim() !== "") limpiarError(this, "errMensaje");
  });

  /* ── Validación al enviar ───────────────────────────────── */
  form.addEventListener("submit", function (event) {
    event.preventDefault();
    let valido = true;

    exito.hidden = true;

    if (campoNombre.value.trim() === "") {
      mostrarError(campoNombre, "errNombre", "Por favor ingresa tu nombre completo.");
      valido = false;
    } else {
      limpiarError(campoNombre, "errNombre");
    }

    if (!esEmailValido(campoEmail.value)) {
      mostrarError(campoEmail, "errEmail", "Ingresa un correo válido (ej: tu@correo.cl).");
      valido = false;
    } else {
      limpiarError(campoEmail, "errEmail");
    }

    if (campoAsunto.value === "") {
      mostrarError(campoAsunto, "errAsunto", "Selecciona el motivo de tu consulta.");
      valido = false;
    } else {
      limpiarError(campoAsunto, "errAsunto");
    }

    if (campoMensaje.value.trim().length < 10) {
      mostrarError(campoMensaje, "errMensaje", "El mensaje debe tener al menos 10 caracteres.");
      valido = false;
    } else {
      limpiarError(campoMensaje, "errMensaje");
    }

    if (valido) {
      exito.hidden = false;
      form.reset();
      exito.scrollIntoView({ behavior: "smooth", block: "nearest" });
      setTimeout(function () {
        exito.hidden = true;
      }, 5000);
    } else {
      const primerError = form.querySelector(".error");
      if (primerError) primerError.focus();
    }
  });

})();