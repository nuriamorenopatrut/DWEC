function imprimir(texto) {
  console.log(texto);
  document.write('<p class="salida__linea">' + texto + "</p>");
}

function imprimirTitulo(texto) {
  console.log(texto);
  document.write('<h2 class="salida__titulo">' + texto + "</h2>");
}

function imprimirArray(nombre, array) {
  console.log(array);
  for (let i = 0; i < array.length; i++) {
    imprimir(nombre + "[" + i + "] = " + array[i]);
  }
}

imprimirTitulo("1. Array sin inicializar");
const Numeros = new Array(10);
imprimir("Array Numeros creado con " + Numeros.length + " huecos sin valor");

imprimirTitulo("2. Inicializar con aleatorios entre 0 y 1000");
for (let i = 0; i < Numeros.length; i++) {
  Numeros[i] = Math.round(Math.random() * 100000) / 100;
}

imprimirTitulo("4. Elementos del array");
imprimirArray("Numeros", Numeros);

imprimirTitulo("5. Mayor y menor");
const mayor = Math.max(...Numeros);
const menor = Math.min(...Numeros);
imprimir("Número mayor: " + mayor);
imprimir("Número menor: " + menor);

imprimirTitulo("6. Posiciones del mayor y del menor");
const posicionMayor = Numeros.indexOf(mayor);
const posicionMenor = Numeros.indexOf(menor);
imprimir("Posición del mayor: " + posicionMayor);
imprimir("Posición del menor: " + posicionMenor);

imprimirTitulo("7. Array sin el mayor ni el menor");
const posicionesABorrar = [posicionMayor, posicionMenor].sort((a, b) => b - a);
for (const posicion of posicionesABorrar) {
  Numeros.splice(posicion, 1);
}
imprimirArray("Numeros", Numeros);

imprimirTitulo("8. Array Raices");
const Raices = [];
for (let i = 0; i < Numeros.length; i++) {
  Raices.push(Math.pow(Numeros[i], 1 / (i + 2)));
}
imprimirArray("Raices", Raices);

imprimirTitulo("9. Raices con un 1 al principio");
Raices.unshift(1);
imprimirArray("Raices", Raices);

imprimirTitulo("10. Añadir a Numeros las raíces mayores que 1");
for (const raiz of Raices) {
  if (raiz > 1) {
    Numeros.push(raiz);
  }
}
imprimirArray("Numeros", Numeros);

imprimirTitulo("11. Numeros ordenado");
Numeros.sort((a, b) => a - b);
imprimirArray("Numeros", Numeros);