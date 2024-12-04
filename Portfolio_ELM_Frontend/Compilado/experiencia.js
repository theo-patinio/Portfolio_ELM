const contenedor_experiencia = document.querySelector(".exp_main");




/* const exp = [];

exp.push({
  imagen:"https://www.frikaropalinda.com.ar/wp-content/uploads/2020/04/logo-frikanegro-e1591549798726-87x63.png",
    img_link: "https://frika.com.ar",
    Description:"Realizacion de pagina web con e-commerce. Diseño de arquitectura, incluyendo SEO y Pixel de Facebook para relacionar el e-commerce con las redes sociales de la empresa.Mantenimiento y actualizaciones de productos, precios, cambios de temporada."
});
exp.push({
    imagen:"/Portfolio_ELM/Portfolio_ELM_Frontend/img/wiki.png",
    img_link: "https://www.wikipedia.com",
    Description:"Clon de pagina principal de Wikipedia. Trabajo practico para aplicar primeros conocimientos en HTML, CSS, y JavaScript."
});
exp.push({
    imagen:"https://www.globant.com/themes/custom/globant_corp_theme/images/2019/globant-logo-dark.svg",
    img_link: "https://www.globant.com/",
    Description:"Debo confesar que nunca trabajé en esta compania, pero me encantaría. Se que tengo los conocimientos y Habilidades necesarios y gran capacidad de trabajo en equipo.  Espero su llamado !"
});
 */


fetch('./datos.json')
  .then(response => response.json())
  .then(data=>{
    cargar_exp(data.exp);
  })

function cargar_exp(array) {
  for (experiencia of array) {

    const div_contenedor = document.createElement("div");
    div_contenedor.classList.add("row", "p-3", "exp");

    const contenedor_logo = document.createElement("div");
    contenedor_logo.classList.add("col-3", "text-center");

    const ancla_exp = document.createElement("a");
    ancla_exp.setAttribute("href", experiencia.img_link);
    ancla_exp.setAttribute("rel", "noopener noreferrer");

    const img = document.createElement("img");
    img.classList.add("img-thumbnail");
    img.setAttribute("src", experiencia.imagen);

    const contenedor_p = document.createElement("div");
    contenedor_p.classList.add("col-9");

    const description = document.createElement("p");
    description.innerText = experiencia.Description;

    ancla_exp.appendChild(img)
    contenedor_logo.appendChild(ancla_exp)

    contenedor_p.appendChild(description)
    div_contenedor.append(contenedor_logo, contenedor_p)

    contenedor_experiencia.appendChild(div_contenedor)
  }

}
/*
<div class="row  p-3 ">
    <div class="col-3 text-center ">
        <a href="https://www.frikaropalinda.com.ar" target="_blank" rel="noopener noreferrer">
            <img src="https://www.frikaropalinda.com.ar/wp-content/uploads/2020/04/logo-frikanegro-e1591549798726-87x63.png" class="img-thumbnail" alt="...">
        </a>
    </div>

    <div class="col-9">
        <p>Realizacion de pagina web con e-commerce. <br>
            Diseño de arquitectura, incluyendo SEO y Pixel de Facebook para relacionar el e-commerce con las redes sociales de la empresa. <br>
            mantenimiento y actualizaciones de productos, precios, cambios de temporada.
        </p>
    </div>
</div>

 */
