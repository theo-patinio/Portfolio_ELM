const contenedor_estudios = document.querySelector(".edu_main");
fetch('./datos.json')
    .then(response => response.json())
    .then(data => {
    cargar_estudios(data.estudios_list);
});
/*   let estudios_list= []


   estudios_list.push({
    icon:"/Portfolio_ELM/Portfolio_ELM_Frontend/img/ENET_17.jpg",
    icon_link: "https://frika.com.ar",
    Description:`Escuela de Educación Técnica Nro 17 Cornelio Saavedra. Floresta - Buenos Aires - Argentina.
    Orientacion construccion. Titulo obtenido Maestro Mayor de Obras.`
  });
  estudios_list.push({
    icon:"https://upload.wikimedia.org/wikipedia/commons/thumb/3/32/Platzi.jpg/1200px-Platzi.jpg",
    icon_link: "https://frika.com.ar",
    Description:"Platzi es una plataforma latinoamericana de educación en línea.​ Fue fundada en 2014 por el ingeniero colombiano Freddy Vega y por el informático guatemalteco Christian Van Der Henst. "
  });
estudios_list.push({
    icon:"https://media-exp1.licdn.com/dms/image/C560BAQGv-Dd7A2pQ0g/company-logo_200_200/0/1646458288684?e=2147483647&v=beta&t=2bEkW38L80hsKUeV4gucwORSlBcJNmYd5H6CBz_Z00E",
    icon_link: "https://frika.com.ar",
    Description:"Argentina Programa es un programa para acceder a capacitaciones gratuitas en tres áreas: programación, testing y habilidades digitales."
})


console.log(estudios_list)
 */
function cargar_estudios(array) {
    for (estudio of array) {
        const card_estudio = document.createElement("div");
        card_estudio.classList.add("row", "contenedor_estudios", "p-3");
        const contenedor_logo = document.createElement("div");
        contenedor_logo.classList.add("col-3", "text-center");
        const ancla = document.createElement("a");
        ancla.setAttribute("href", estudio.icon_link);
        ancla.setAttribute("rel", "noopener noreferrer");
        const icon = document.createElement("img");
        icon.classList.add("img-thumbnail");
        icon.setAttribute("src", estudio.icon);
        const contenedor_p = document.createElement("div");
        contenedor_p.classList.add("col-9");
        const Description = document.createElement("p");
        Description.innerText = estudio.Description;
        ancla.appendChild(icon);
        contenedor_logo.appendChild(ancla);
        contenedor_p.appendChild(Description);
        card_estudio.append(contenedor_logo, contenedor_p);
        contenedor_estudios.appendChild(card_estudio);
    }
}
