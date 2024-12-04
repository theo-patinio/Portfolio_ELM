document.addEventListener("DOMContentLoaded", function () {
    var offset = 70;
  
    // Selecciona todos los enlaces del navbar
    const navbarLinks = document.querySelectorAll('.navbar li a');
  
    navbarLinks.forEach(function (link) {
      link.addEventListener("click", function (event) {
        event.preventDefault();
        
        // Obtiene el ID del elemento al que queremos desplazarnos
        const targetId = this.getAttribute("href");
        const targetElement = document.querySelector(targetId);
  
        if (targetElement) {
          // Realiza el scroll hasta la sección con el offset deseado
          window.scrollTo({
            top: targetElement.offsetTop - offset,
            behavior: "smooth"
          });
        }
      });
    });
  });