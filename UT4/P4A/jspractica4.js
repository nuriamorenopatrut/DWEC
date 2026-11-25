fetch("./data/heros.json")
  .then((response) => {
    return response.json();
  })
  .then((jsondata) => procesarJSON(jsondata))
  .catch((e) => {
    console.log(e);
  });

function procesarJSON(jsondata) {
  //tu codigo aqui

  let plantilla = document.getElementById("plantilla");
  let contenedor = plantilla.parentNode;
  //contenedor.removeChild(plantilla);
  const heroes = jsondata.data.results;
  /*


aqui metemos el codigo para crear las tarjetas de los heroes
*/
  contenedor.removeChild(plantilla);

  for (let heroe of heroes) {
    let tarjeta = plantilla.cloneNode(true);
    contenedor.appendChild(tarjeta);
    tarjeta.setAttribute("id", "heroe_" + heroe.id);

    // imagen
    let propiedad = document.getElementById("imagen");
    propiedad.setAttribute("id", "imagen_" + heroe.id);
    let rutaImagen = heroe.thumbnail.path + "." + heroe.thumbnail.extension;
    propiedad.setAttribute("src", rutaImagen.replace("http://", "https://"));
    propiedad.setAttribute("alt", heroe.name);

    // nombre
    propiedad = document.getElementById("nombre");
    propiedad.setAttribute("id", "nombre_" + heroe.id);
    propiedad.textContent = heroe.name;

    // descripcion
    propiedad = document.getElementById("descripcion");
    propiedad.setAttribute("id", "descripcion_" + heroe.id);
    if (heroe.description.trim() != "") {
      propiedad.textContent = heroe.description;
    } else {
      propiedad.textContent = "Este personaje no tiene descripción.";
    }

    // lista
    propiedad = document.getElementById("numcomics");
    propiedad.setAttribute("id", "numcomics_" + heroe.id);
    propiedad.textContent = "Aparece en " + heroe.comics.available + " comics";

    propiedad = document.getElementById("numseries");
    propiedad.setAttribute("id", "numseries_" + heroe.id);
    propiedad.textContent = "Aparece en " + heroe.series.available + " series";

    propiedad = document.getElementById("numstories");
    propiedad.setAttribute("id", "numstories_" + heroe.id);
    propiedad.textContent =
      "Aparece en " + heroe.stories.available + " historias";

    // desplegable de comics
    propiedad = document.getElementById("mccomics");
    propiedad.setAttribute("id", "mccomics_" + heroe.id);

    let listaComics = document.getElementById("listacomics");
    listaComics.setAttribute("id", "listacomics_" + heroe.id);

    let plantillaComic = document.getElementById("comic");
    listaComics.removeChild(plantillaComic);

    if (heroe.comics.items.length == 0) {
      let li = plantillaComic.cloneNode(true);
      li.removeAttribute("id");
      li.textContent = "No aparece en ningún comic";
      listaComics.appendChild(li);
    }

    for (let comic of heroe.comics.items) {
      let li = plantillaComic.cloneNode(true);
      li.removeAttribute("id");
      li.textContent = comic.name;
      listaComics.appendChild(li);
    }

    // el boton apunta al desplegable de este heroe
    for (let boton of tarjeta.getElementsByTagName("button")) {
      boton.setAttribute(
        "data-bs-target",
        boton.getAttribute("data-bs-target") + "_" + heroe.id,
      );
      boton.setAttribute(
        "aria-controls",
        boton.getAttribute("aria-controls") + "_" + heroe.id,
      );
    }
  }

  /*

    Ahora crea un enlace al final del footer que permita descargar el HTML que has creado



  */
  const a = document.createElement("a");
  //cuidadiinn joorrlll, que estamos con un literal de cadena
  const archivo = new Blob(
    [
      `
      <!doctype html>
      <html lang="en">
        ` +
        document.head.outerHTML +
        `




      <!-- Todo lo que viene ahora lo has creado tu solit@ con javascript y jugando con el DOM
           y esto solo la punta del iceberg de todo lo que vas a crear!!!
           venga! vamos a por ello  -->







      ` +
        document.body.outerHTML +
        `
      </html>`,
    ],
    { type: "html" },
  );
  const url = URL.createObjectURL(archivo);
  a.href = url;
  a.download = "statico.html";
  a.innerHTML = "descarga el htlm que has creado con js y el dom";
  document.getElementsByTagName("footer")[0].appendChild(a);
}
