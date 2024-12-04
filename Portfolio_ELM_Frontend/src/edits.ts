(()=>{
  let contact_edit = document.querySelector(".contact_edit");
  let btn_edit_contact = document.getElementById("btn_edit_contact");
  let acerca_edit = document.querySelector(".acerca_edit");
  let btn_edit_acerca = document.getElementById("btn_edit_acerca");
  let btn_enviar_text = document.getElementById("btn_enviar_text");
  let acerca_text = document.getElementById("acerca_text");
  let btn_enviar_contact = document.getElementById("btn_enviar_contact");
  let mail = document.getElementById("mail");
  let telefono = document.getElementById("telefono");
  let instagram = document.getElementById("instagram");




   btn_edit_contact.addEventListener("click", mostrar_edit_contact);
   btn_edit_acerca.addEventListener("click", mostrar_edit_acerca);
   btn_enviar_text.addEventListener("click", editar_text_acerca);
   btn_enviar_contact.addEventListener("click", editar_contact);

   function mostrar_edit_contact() {
     contact_edit.classList.toggle("contact_edit");
    }
    function mostrar_edit_acerca() {
      acerca_edit.classList.toggle("acerca_edit");
    }

    function editar_text_acerca() {
      let new_text = document.getElementById("new_text").value;
      acerca_text.innerText = new_text;
      acerca_edit.classList.toggle("acerca_edit");
    }
    function editar_contact() {
      let new_mail = document.getElementById("new_mail").value;
      let new_telefono = document.getElementById("new_telefono").value;
      let new_instagram = document.getElementById("new_instagram").value;


      if (new_mail) {
        mail.innerText = "Mail: " + new_mail;
        mail.setAttribute("href", "mailto:"+new_mail);
      }
      if (new_telefono) {
        telefono.innerText = "Telefono/WS: +54 " + new_telefono;
      }
      if (new_instagram) {
        instagram.innerText = "IG: " + new_instagram;
        instagram.setAttribute("href", "https://www.instagram.com/"+new_instagram);
      }

      contact_edit.classList.toggle("contact_edit");
    }




})();
