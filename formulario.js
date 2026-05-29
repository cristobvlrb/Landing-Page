document.getElementById("formulario-contacto").addEventListener("submit", function (e) {
  e.preventDefault();

  const nombre   = document.getElementById("nombre").value.trim();
  const email    = document.getElementById("email").value.trim();
  const telefono = document.getElementById("telefono").value.trim();
  const servicio = document.getElementById("servicio").value;
  const mensaje  = document.getElementById("mensaje").value.trim();

  limpiarErrores();
  let valido = true;

  if (nombre === "") {
    mostrarError("error-nombre", "El nombre es obligatorio.");
    valido = false;
  } else if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{3,}$/.test(nombre)) {
    mostrarError("error-nombre", "El nombre solo debe contener letras y al menos 3 caracteres.");
    valido = false;
  }

  if (email === "") {
    mostrarError("error-email", "El correo es obligatorio.");
    valido = false;
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    mostrarError("error-email", "Ingresa un correo válido (Ej: juan@correo.com).");
    valido = false;
  }

  if (telefono === "") {
    mostrarError("error-telefono", "El teléfono es obligatorio.");
    valido = false;
  } else if (!/^\+56[0-9]{9}$/.test(telefono)) {
    mostrarError("error-telefono", "Formato incorrecto. Usa: +56912345678");
    valido = false;
  }

  if (servicio === "") {
    mostrarError("error-servicio", "Debes seleccionar un servicio.");
    valido = false;
  }

  if (mensaje === "") {
    mostrarError("error-mensaje", "El mensaje es obligatorio.");
    valido = false;
  } else if (mensaje.length < 10) {
    mostrarError("error-mensaje", "El mensaje debe tener al menos 10 caracteres.");
    valido = false;
  }

  if (valido) {
    guardarCSV(nombre, email, telefono, servicio, mensaje);

    document.getElementById("formulario-contacto").reset();

    alert("Formulario enviado.");
  }
});

function mostrarError(idSpan, texto) {
  const span = document.getElementById(idSpan);
  span.textContent = texto;

  const campo = idSpan.replace("error-", "");
  const elemento = document.getElementById(campo);
  if (elemento) elemento.classList.add("campo-invalido");
}

function limpiarErrores() {
  const spans = document.querySelectorAll(".error-msg");
  spans.forEach(s => s.textContent = "");

  const campos = document.querySelectorAll(".campo-invalido");
  campos.forEach(c => c.classList.remove("campo-invalido"));
}

function guardarCSV(nombre, email, telefono, servicio, mensaje) {
  const encabezados = ["Nombre", "Email", "Telefono", "Servicio", "Mensaje", "Fecha"];

  const fecha = new Date().toLocaleString("es-CL");

  const fila = [nombre, email, telefono, servicio, mensaje, fecha].map(campo => {
    const str = String(campo).replace(/"/g, '""');
    return `"${str}"`;
  });

  const contenidoCSV = encabezados.join(";") + "\n" + fila.join(";");

  const blob = new Blob([contenidoCSV], { type: "text/csv;charset=utf-8;" });
  const url  = URL.createObjectURL(blob);

  const enlace = document.createElement("a");
  enlace.href     = url;
  enlace.download = "contacto_kf.csv";
  enlace.click();

  URL.revokeObjectURL(url);
}
