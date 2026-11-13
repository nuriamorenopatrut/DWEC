const COLORES_GALLO = ["azul", "verde", "amarillo", "marrón", "blanco", "negro", "gris"];
const TIPOS_LECHE = ["entera", "desnatada", "semidesnatada", "merengada"];
const MILISEGUNDOS_DIA = 24 * 60 * 60 * 1000;

function imprimir(texto) {
  console.log(texto);
  document.write('<p class="salida__linea">' + texto + "</p>");
}

function imprimirTitulo(texto) {
  console.log(texto);
  document.write('<h2 class="salida__titulo">' + texto + "</h2>");
}

function imprimirDestacado(texto) {
  console.log(texto);
  document.write('<p class="salida__linea salida__linea--destacada">' + texto + "</p>");
}

function imprimirImagen(ruta, descripcion) {
  document.write('<img class="salida__imagen" src="' + ruta + '" alt="' + descripcion + '">');
}

function abrirTarjeta(ancha) {
  document.write('<article class="tarjeta' + (ancha ? " tarjeta--ancha" : "") + '">');
}

function cerrarTarjeta() {
  document.write("</article>");
}

function aleatorioEntre(minimo, maximo) {
  return Math.floor(Math.random() * (maximo - minimo + 1)) + minimo;
}

function redondear(numero) {
  return Math.round(numero * 100) / 100;
}

function Oveja(raza, maxleche, esquilada) {
  this.raza = raza;
  this.color = "blanco";
  this.maxleche = maxleche;
  this.esquilada = esquilada === true;
  this.embarazada = false;
  this.lecheTotal = 0;
}

Oveja.prototype.getRaza = function () {
  return this.raza;
};

Oveja.prototype.getColor = function () {
  return this.color;
};

Oveja.prototype.setColor = function (color) {
  this.color = color;
};

Oveja.prototype.getMaxleche = function () {
  return this.maxleche;
};

Oveja.prototype.isEsquilada = function () {
  return this.esquilada;
};

Oveja.prototype.setEsquilada = function (esquilada) {
  this.esquilada = esquilada;
};

Oveja.prototype.isEmbarazada = function () {
  return this.embarazada;
};

Oveja.prototype.quedarEmbarazada = function () {
  this.embarazada = true;
};

Oveja.prototype.getLecheTotal = function () {
  return this.lecheTotal;
};

Oveja.prototype.ordeñar = function () {
  if (this.embarazada) {
    return 0;
  }
  const litros = redondear(Math.random() * this.maxleche);
  this.lecheTotal = redondear(this.lecheTotal + litros);
  return litros;
};

Oveja.prototype.balar = function () {
  imprimir("Beeeee");
};

Oveja.prototype.toString = function () {
  return "Oveja de raza " + this.raza + ", de color " + this.color + ", ha producido " + this.lecheTotal + " litros de leche en total";
};

function Conejo(colores, orejas) {
  this.colores = colores;
  this.orejas = orejas;
  this.carino = aleatorioEntre(0, 100);
  this.potencia = aleatorioEntre(1, 100);
}

Conejo.prototype.getColores = function () {
  return this.colores;
};

Conejo.prototype.getOrejas = function () {
  return this.orejas;
};

Conejo.prototype.getCarino = function () {
  return this.carino;
};

Conejo.prototype.setCarino = function (carino) {
  this.carino = carino;
};

Conejo.prototype.getPotencia = function () {
  return this.potencia;
};

Conejo.prototype.setPotencia = function (potencia) {
  this.potencia = potencia;
};

Conejo.prototype.indiceAchuchabilidad = function () {
  return this.carino / this.potencia;
};

Conejo.prototype.esAchuchable = function () {
  return this.indiceAchuchabilidad() > 0.5;
};

Conejo.prototype.achuchar = function () {
  if (this.esAchuchable()) {
    imprimir("Cariñitos");
  } else {
    imprimir("buffffff");
  }
};

Conejo.prototype.toString = function () {
  let texto = "Conejo de colores " + this.colores.join(", ") + ", con las orejas hacia " + this.orejas;
  if (this.esAchuchable()) {
    texto += ". Quiero ser tu mejor amigooo";
  }
  return texto;
};

function Gallina(colorHuevos, edadMeses) {
  this.colorHuevos = colorHuevos;
  this.edadMeses = edadMeses;
  this.huevosTotales = 0;
  this.fechasHuevos = [];
  this.fechaAlta = new Date();
}

Gallina.prototype.getColorHuevos = function () {
  return this.colorHuevos;
};

Gallina.prototype.getEdadMeses = function () {
  return this.edadMeses;
};

Gallina.prototype.getHuevosTotales = function () {
  return this.huevosTotales;
};

Gallina.prototype.diasDeAdulta = function () {
  return Math.max(0, (this.edadMeses - 6) * 30);
};

Gallina.prototype.indicePonibilidad = function () {
  const dias = this.diasDeAdulta();
  if (dias === 0) {
    return 0;
  }
  return this.huevosTotales / dias;
};

Gallina.prototype.huevosUltimaSemana = function () {
  const limite = Date.now() - 7 * MILISEGUNDOS_DIA;
  return this.fechasHuevos.filter((fecha) => fecha.getTime() >= limite).length;
};

Gallina.prototype.diasSinPoner = function () {
  const ultima = this.fechasHuevos.length > 0 ? this.fechasHuevos[this.fechasHuevos.length - 1] : this.fechaAlta;
  return (Date.now() - ultima.getTime()) / MILISEGUNDOS_DIA;
};

Gallina.prototype.cacarear = function () {
  imprimir("caaaaa caaaca ca caaaaaa");
};

Gallina.prototype.ponerHuevo = function () {
  this.huevosTotales++;
  this.fechasHuevos.push(new Date());
  this.cacarear();
};

Gallina.prototype.controlar = function () {
  const primerAñoPasado = this.edadMeses > 12;
  const ponibilidadBaja = primerAñoPasado && this.indicePonibilidad() < 0.1;
  const semanaSinPoner = this.diasSinPoner() >= 7;
  if (ponibilidadBaja || semanaSinPoner) {
    imprimir("Aviso a Gallina Blanca: esta gallina ya no es productiva");
    return true;
  }
  return false;
};

Gallina.prototype.toString = function () {
  let texto = "Gallina que pone huevos de color " + this.colorHuevos + ", lleva " + this.huevosTotales + " huevos totales y " + this.huevosUltimaSemana() + " en la última semana";
  if (this.indicePonibilidad() < 0.1) {
    texto += ". Poooo po po po, me voy al puchero";
  }
  return texto;
};

function Vaca(colores, longitudCuernos, maxleche, tipoLeche) {
  this.colores = colores;
  this.longitudCuernos = longitudCuernos;
  this.maxleche = maxleche;
  this.tipoLeche = TIPOS_LECHE.includes(tipoLeche) ? tipoLeche : "entera";
  this.embarazada = false;
  this.lecheTotal = 0;
  this.mugidos = 0;
}

Vaca.prototype.getColores = function () {
  return this.colores;
};

Vaca.prototype.getLongitudCuernos = function () {
  return this.longitudCuernos;
};

Vaca.prototype.getMaxleche = function () {
  return this.maxleche;
};

Vaca.prototype.getTipoLeche = function () {
  return this.tipoLeche;
};

Vaca.prototype.isEmbarazada = function () {
  return this.embarazada;
};

Vaca.prototype.quedarEmbarazada = function () {
  this.embarazada = true;
};

Vaca.prototype.getLecheTotal = function () {
  return this.lecheTotal;
};

Vaca.prototype.getMugidos = function () {
  return this.mugidos;
};

Vaca.prototype.mugir = function () {
  this.mugidos++;
  imprimir("muuuuuuu-cho cuidado que tengo cuernos");
};

Vaca.prototype.ordeñar = function () {
  let litros = 0;
  if (!this.embarazada) {
    litros = redondear(Math.random() * this.maxleche);
    this.lecheTotal = redondear(this.lecheTotal + litros);
  }
  if (Math.random() < 0.3) {
    this.mugir();
  }
  return litros;
};

Vaca.prototype.toString = function () {
  let texto = "Vaca de colores " + this.colores.join(", ") + ", ha dado " + this.lecheTotal + " litros de leche " + this.tipoLeche;
  if (this.embarazada) {
    texto += ". Estoy esperando un ternerito";
  }
  return texto;
};

function Gallo(raza) {
  this.raza = raza;
  this.colores = aleatorioEntre(1, 127);
  this.ultimoCanto = null;
}

Gallo.prototype.getRaza = function () {
  return this.raza;
};

Gallo.prototype.getColores = function () {
  return COLORES_GALLO.filter((color, posicion) => (this.colores & (1 << posicion)) !== 0);
};

Gallo.prototype.getUltimoCanto = function () {
  return this.ultimoCanto;
};

Gallo.prototype.cantar = function () {
  const ahora = new Date();
  const hora = ahora.getHours();
  const entreCuatroYOcho = hora >= 4 && hora < 8;
  const pasaronCincoMinutos = this.ultimoCanto === null || ahora - this.ultimoCanto >= 5 * 60 * 1000;
  if (entreCuatroYOcho || pasaronCincoMinutos) {
    imprimir("kikirikiiiiii");
    this.ultimoCanto = ahora;
  } else {
    imprimir("poo popopo pooo");
  }
};

Gallo.prototype.toString = function () {
  const ultimo = this.ultimoCanto === null ? "todavía no ha cantado" : this.ultimoCanto.toLocaleTimeString("es-ES");
  return "Gallo de raza " + this.raza + ", de colores " + this.getColores().join(", ") + ", hora del último canto: " + ultimo;
};

const oveja = new Oveja("churra", 3, true);
const conejo = new Conejo(["azul", "rojo", "verde"], "abajo");
const gallina = new Gallina("azul fosforito", 7);
const vaca = new Vaca(["negro"], 0.1, 25, "desnatada");
const gallo = new Gallo("azarqueliana");

abrirTarjeta(false);
imprimirTitulo("La oveja");
imprimirImagen("img/oveja.PNG", "Oveja");
imprimir("Raza: " + oveja.getRaza() + ", esquilada: " + (oveja.isEsquilada() ? "sí" : "no"));
imprimir("Primer ordeño: " + oveja.ordeñar() + " litros");
imprimir("Segundo ordeño: " + oveja.ordeñar() + " litros");
oveja.quedarEmbarazada();
imprimir("Ordeño estando embarazada: " + oveja.ordeñar() + " litros");
oveja.setColor("marrón");
oveja.balar();

imprimirDestacado(oveja.toString());
cerrarTarjeta();
abrirTarjeta(false);
imprimirTitulo("El conejo");
imprimirImagen("img/conejo.PNG", "Conejo");
imprimir("Cariño: " + conejo.getCarino() + ", potencia de roedura: " + conejo.getPotencia() + ", índice de achuchabilidad: " + redondear(conejo.indiceAchuchabilidad()));
conejo.achuchar();
if (!conejo.esAchuchable()) {
  conejo.setCarino(100);
  conejo.setPotencia(50);
  imprimir("No era achuchable: nuevo cariño " + conejo.getCarino() + ", nueva potencia " + conejo.getPotencia());
  conejo.achuchar();
}

imprimirDestacado(conejo.toString());
cerrarTarjeta();
abrirTarjeta(false);
imprimirTitulo("La gallina");
imprimirImagen("img/gallina.jpg", "Gallina");
imprimir("Índice de ponibilidad inicial: " + gallina.indicePonibilidad());
gallina.controlar();
for (let i = 0; i < 3; i++) {
  gallina.ponerHuevo();
}
imprimir("Índice de ponibilidad después de tres huevos: " + gallina.indicePonibilidad());
gallina.controlar();

imprimirDestacado(gallina.toString());
cerrarTarjeta();
abrirTarjeta(false);
imprimirTitulo("La vaca");
imprimirImagen("img/vaca.jpg", "Vaca");
let ordeños = 0;
while (vaca.getMugidos() === 0) {
  ordeños++;
  imprimir("Ordeño " + ordeños + ": " + vaca.ordeñar() + " litros");
}
imprimir("Leche total dada: " + vaca.getLecheTotal() + " litros de leche " + vaca.getTipoLeche() + " en " + ordeños + " ordeños");

imprimirDestacado(vaca.toString());
cerrarTarjeta();
abrirTarjeta(false);
imprimirTitulo("El gallo");
imprimirImagen("img/gallo.PNG", "Gallo");
for (let i = 0; i < 4; i++) {
  gallo.cantar();
}

imprimirDestacado(gallo.toString());
cerrarTarjeta();