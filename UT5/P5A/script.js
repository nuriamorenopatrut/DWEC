// array donde guardamos las mascotas
let pets = [];

// codigo de la mascota que estamos editando (null si estamos creando)
let codigoEditando = null;

const form = document.getElementById("formMascota");
const lista = document.getElementById("listaMascotas");
const btnEnviar = document.getElementById("btnEnviar");
const btnCancelar = document.getElementById("btnCancelar");
const tituloFormulario = document.getElementById("tituloFormulario");

// expresiones regulares
const regexImagen = /^https?:\/\/\S+\.(jpg|jpeg|png|gif)$/i;
const regexCodigo = /^[A-Za-z]{3}[0-9]{3}$/;

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const mascota = {
    nombre: document.getElementById("nombre").value.trim(),
    descripcion: document.getElementById("descripcion").value.trim(),
    imagen: document.getElementById("imagen").value.trim(),
    fecha: document.getElementById("fecha").value,
    precio: document.getElementById("precio").value,
    codigo: document.getElementById("codigo").value.trim().toUpperCase(),
  };

  if (!validar(mascota)) {
    return;
  }

  mascota.precio = parseFloat(mascota.precio);

  if (codigoEditando == null) {
    agregarMascota(mascota);
  } else {
    editarMascota(codigoEditando, mascota);
  }

  limpiarFormulario();
  renderPets();
});

btnCancelar.addEventListener("click", limpiarFormulario);

// ---------- CRUD ----------

function agregarMascota(mascota) {
  pets.push(mascota);
}

function editarMascota(codigo, datosNuevos) {
  const posicion = pets.findIndex((p) => p.codigo == codigo);
  if (posicion != -1) {
    pets[posicion] = datosNuevos;
  }
}

function eliminarMascota(codigo) {
  if (confirm("¿Seguro que quieres eliminar esta mascota?")) {
    pets = pets.filter((p) => p.codigo != codigo);
    if (codigoEditando == codigo) {
      limpiarFormulario();
    }
    renderPets();
  }
}

// carga los datos de la mascota en el formulario
function cargarEnFormulario(codigo) {
  const mascota = pets.find((p) => p.codigo == codigo);

  document.getElementById("nombre").value = mascota.nombre;
  document.getElementById("descripcion").value = mascota.descripcion;
  document.getElementById("imagen").value = mascota.imagen;
  document.getElementById("fecha").value = mascota.fecha;
  document.getElementById("precio").value = mascota.precio;
  document.getElementById("codigo").value = mascota.codigo;

  codigoEditando = codigo;
  tituloFormulario.textContent = "Editar mascota";
  btnEnviar.textContent = "Guardar cambios";
  btnCancelar.classList.remove("formulario__boton--oculto");
  borrarErrores();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

// ---------- RENDER ----------

function renderPets() {
  lista.innerHTML = "";

  if (pets.length == 0) {
    document
      .getElementById("mensajeVacio")
      .classList.remove("lista__vacio--oculto");
  } else {
    document
      .getElementById("mensajeVacio")
      .classList.add("lista__vacio--oculto");
  }

  for (let mascota of pets) {
    const ficha = document.createElement("article");
    ficha.className = "ficha";

    const img = document.createElement("img");
    img.src = mascota.imagen;
    img.alt = mascota.nombre;
    img.className = "ficha__imagen";
    ficha.appendChild(img);

    const cuerpo = document.createElement("div");
    cuerpo.className = "ficha__cuerpo";

    const nombre = document.createElement("h3");
    nombre.className = "ficha__nombre";
    nombre.textContent = mascota.nombre;
    cuerpo.appendChild(nombre);

    const codigo = document.createElement("span");
    codigo.className = "ficha__codigo";
    codigo.textContent = mascota.codigo;
    cuerpo.appendChild(codigo);

    const precio = document.createElement("p");
    precio.className = "ficha__precio";
    precio.textContent = mascota.precio.toFixed(2) + " €";
    cuerpo.appendChild(precio);

    const descripcion = document.createElement("p");
    descripcion.className = "ficha__texto";
    descripcion.textContent =
      mascota.descripcion != "" ? mascota.descripcion : "Sin descripción.";
    cuerpo.appendChild(descripcion);

    const fecha = document.createElement("p");
    fecha.className = "ficha__texto";
    fecha.textContent = "Nacimiento: " + formatearFecha(mascota.fecha);
    cuerpo.appendChild(fecha);

    // detalles (ocultos hasta pulsar "Ver detalles")
    const detalles = document.createElement("div");
    detalles.className = "ficha__detalles ficha__detalles--oculto";

    const edad = document.createElement("p");
    edad.className = "ficha__texto";
    edad.textContent = "Edad: " + calcularEdad(mascota.fecha);
    detalles.appendChild(edad);

    const urlImagen = document.createElement("a");
    urlImagen.className = "ficha__enlace";
    urlImagen.href = mascota.imagen;
    urlImagen.target = "_blank";
    urlImagen.textContent = "Ver imagen original";
    detalles.appendChild(urlImagen);

    cuerpo.appendChild(detalles);
    ficha.appendChild(cuerpo);

    // botones
    const botones = document.createElement("div");
    botones.className = "ficha__botones";

    const btnDetalles = document.createElement("button");
    btnDetalles.className = "ficha__boton ficha__boton--detalles";
    btnDetalles.textContent = "Ver detalles";
    btnDetalles.addEventListener("click", function () {
      detalles.classList.toggle("ficha__detalles--oculto");
      btnDetalles.textContent = detalles.classList.contains(
        "ficha__detalles--oculto",
      )
        ? "Ver detalles"
        : "Ocultar";
    });

    const btnEditar = document.createElement("button");
    btnEditar.className = "ficha__boton ficha__boton--editar";
    btnEditar.textContent = "Editar";
    btnEditar.addEventListener("click", () =>
      cargarEnFormulario(mascota.codigo),
    );

    const btnEliminar = document.createElement("button");
    btnEliminar.className = "ficha__boton ficha__boton--eliminar";
    btnEliminar.textContent = "Eliminar";
    btnEliminar.addEventListener("click", () =>
      eliminarMascota(mascota.codigo),
    );

    botones.appendChild(btnDetalles);
    botones.appendChild(btnEditar);
    botones.appendChild(btnEliminar);
    ficha.appendChild(botones);

    lista.appendChild(ficha);
  }
}

// ---------- VALIDACION ----------

function validar(mascota) {
  borrarErrores();
  let correcto = true;

  if (mascota.nombre == "") {
    mostrarError("nombre", "errorNombre", "El nombre es obligatorio.");
    correcto = false;
  }

  if (mascota.imagen == "") {
    mostrarError(
      "imagen",
      "errorImagen",
      "La URL de la imagen es obligatoria.",
    );
    correcto = false;
  } else if (!regexImagen.test(mascota.imagen)) {
    mostrarError(
      "imagen",
      "errorImagen",
      "Debe ser una URL que acabe en .jpg, .jpeg, .png o .gif.",
    );
    correcto = false;
  }

  if (mascota.fecha == "") {
    mostrarError(
      "fecha",
      "errorFecha",
      "La fecha de nacimiento es obligatoria.",
    );
    correcto = false;
  } else {
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);
    const fechaNacimiento = new Date(mascota.fecha + "T00:00:00");
    if (fechaNacimiento > hoy) {
      mostrarError("fecha", "errorFecha", "La fecha no puede ser futura.");
      correcto = false;
    }
  }

  if (mascota.precio == "") {
    mostrarError("precio", "errorPrecio", "El precio es obligatorio.");
    correcto = false;
  } else if (isNaN(mascota.precio) || parseFloat(mascota.precio) <= 0) {
    mostrarError("precio", "errorPrecio", "El precio debe ser mayor que 0.");
    correcto = false;
  }

  if (mascota.codigo == "") {
    mostrarError("codigo", "errorCodigo", "El código es obligatorio.");
    correcto = false;
  } else if (!regexCodigo.test(mascota.codigo)) {
    mostrarError(
      "codigo",
      "errorCodigo",
      "Formato: 3 letras y 3 números (ej: CAT123).",
    );
    correcto = false;
  } else if (
    mascota.codigo != codigoEditando &&
    pets.some((p) => p.codigo == mascota.codigo)
  ) {
    // el codigo tiene que ser unico
    mostrarError(
      "codigo",
      "errorCodigo",
      "Ya existe una mascota con ese código.",
    );
    correcto = false;
  }

  return correcto;
}

function mostrarError(idCampo, idError, mensaje) {
  document.getElementById(idCampo).classList.add("formulario__input--invalido");
  document.getElementById(idError).textContent = mensaje;
}

function borrarErrores() {
  for (let error of document.getElementsByClassName("formulario__error")) {
    error.textContent = "";
  }
  for (let input of form.getElementsByTagName("input")) {
    input.classList.remove("formulario__input--invalido");
  }
}

// ---------- AUXILIARES ----------

function limpiarFormulario() {
  form.reset();
  borrarErrores();
  codigoEditando = null;
  tituloFormulario.textContent = "Nueva mascota";
  btnEnviar.textContent = "Agregar Mascota";
  btnCancelar.classList.add("formulario__boton--oculto");
}

// de "2024-03-15" a "15/03/2024"
function formatearFecha(fecha) {
  const partes = fecha.split("-");
  return partes[2] + "/" + partes[1] + "/" + partes[0];
}

// devuelve la edad en años y meses
function calcularEdad(fecha) {
  const nacimiento = new Date(fecha + "T00:00:00");
  const hoy = new Date();
  let meses =
    (hoy.getFullYear() - nacimiento.getFullYear()) * 12 +
    (hoy.getMonth() - nacimiento.getMonth());
  if (hoy.getDate() < nacimiento.getDate()) {
    meses--;
  }
  const anios = Math.floor(meses / 12);
  meses = meses % 12;

  if (anios == 0) {
    return meses + (meses == 1 ? " mes" : " meses");
  }
  return (
    anios +
    (anios == 1 ? " año" : " años") +
    " y " +
    meses +
    (meses == 1 ? " mes" : " meses")
  );
}

renderPets();
