// Envolvemos el código en un evento para asegurarnos de que el DOM esté cargado
(() => {
    // Al inicio de tu script
    localStorage.removeItem('loggedIn');

    document.addEventListener('DOMContentLoaded', () => {
        // Estado inicial del login
        const state = {
            loggedIn: localStorage.getItem('loggedIn') === 'true',
        };

        // Elementos reutilizables
        const elements = {
            btnLogin: document.getElementById('btn_login'),
            btnEditContact: document.getElementById('btn_edit_contact'),
            btnEditAcerca: document.getElementById('btn_edit_acerca'),
            btnEnviarText: document.getElementById('btn_enviar_text'),
            btnEnviarContact: document.getElementById('btn_enviar_contact'),
            editContact: document.querySelector('.contact_edit'),
            editAcerca: document.querySelector('.acerca_edit'),
            mail: document.getElementById('mail'),
            telefono: document.getElementById('telefono'),
            instagram: document.getElementById('instagram'),
            acercaText: document.getElementById('acerca_text'),
        };

        // Mostrar/ocultar botones de edición dependiendo del estado de logueo
        const toggleEditButtons = () => {
            const display = state.loggedIn ? 'inline-block' : 'none';
            if (elements.btnEditContact) elements.btnEditContact.style.display = display;
            if (elements.btnEditAcerca) elements.btnEditAcerca.style.display = display;
        };

        // Obtener los datos de "Acerca de mí" al cargar la página
        fetch('http://localhost:3001/get-about')
            .then(response => {
                console.log('Respuesta del servidor (get-about):', response);
                if (!response.ok) {
                    throw new Error(`Error al obtener acerca de mí: ${response.statusText}`);
                }
                return response.json();
            })
            .then(data => {
                console.log('Datos recibidos (get-about):', data);
                if (elements.acercaText) {
                    elements.acercaText.innerText = data.text;
                }
            })
            .catch(error => console.error('Error al obtener acerca de mí:', error));

        // Obtener los datos de contacto al cargar la página
        fetch('http://localhost:3001/get-contact')
            .then(response => {
                console.log('Respuesta del servidor (get-contact):', response);
                if (!response.ok) {
                    throw new Error(`Error al obtener contacto: ${response.statusText}`);
                }
                return response.json();
            })
            .then(data => {
                console.log('Datos recibidos (get-contact):', data);
                if (elements.mail) {
                    elements.mail.innerText = `Mail: ${data.email}`;
                    elements.mail.setAttribute('href', `mailto:${data.email}`);
                }
                if (elements.telefono) {
                    elements.telefono.innerText = `Telefono/WS: +54 ${data.telefono}`;
                }
                if (elements.instagram) {
                    elements.instagram.innerText = `IG: @${data.instagram}`;
                    elements.instagram.setAttribute('href', `https://www.instagram.com/${data.instagram}`);
                }
            })
            .catch(error => console.error('Error al obtener contacto:', error));

        // Mostrar botones de edición si está logueado
        toggleEditButtons();

        // Verificar si el usuario está logueado
        document.getElementById('btn_login').addEventListener('click', function(event) {
            event.preventDefault(); // Evita que el formulario se envíe y recargue la página
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            realizarLogin(username, password);
        });

        // Lógica de login para guardar el estado en localStorage
        function realizarLogin(username, password) {
            console.log("Intentando iniciar sesión con:", { username, password }); // Depuración
            fetch('http://localhost:3001/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            })
            .then(response => {
                console.log("Respuesta del servidor (estatus):", response.status); // Depuración
                if (!response.ok) {
                    throw new Error('Error en la solicitud de login');
                }
                return response.json();
            })
            .then(data => {
                console.log("Datos recibidos del servidor:", data);
                if (data.authorized) {
                    alert('Inicio de sesión exitoso');
                    localStorage.setItem("loggedIn", "true");
                    console.log("Logged In guardado en localStorage:", localStorage.getItem("loggedIn"));
                    state.loggedIn = true;
                    toggleEditButtons();
                    // Cerrar el modal de login
                    const loginModalElement = document.getElementById('login');
                    const modalInstance = bootstrap.Modal.getOrCreateInstance(loginModalElement);
                    modalInstance.hide();
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Hubo un problema al intentar iniciar sesión. Inténtalo nuevamente.');
            });
        }

        // Funciones para mostrar y editar contenido
        const mostrar_edit_contact = () => {
            console.log('mostrar_edit_contact fue llamado');
            elements.editContact.classList.toggle("mostrar");
        };

        const mostrar_edit_acerca = () => {
            console.log('mostrar_edit_acerca fue llamado');
            elements.editAcerca.classList.toggle("mostrar");
        };

        const updateAcerca = () => {
            const newText = document.getElementById('new_text').value;

            if (newText.trim()) {
                console.log('Actualizando acerca de mí con:', newText);
                fetch('http://localhost:3001/update-about', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ text: newText }),
                })
                .then(response => {
                    console.log('Respuesta del servidor (update-about):', response);
                    if (!response.ok) {
                        throw new Error(`Error al actualizar acerca de mí: ${response.statusText}`);
                    }
                    return response.json();
                })
                .then(data => {
                    console.log('Datos recibidos (update-about):', data);
                    elements.acercaText.innerText = newText;
                    elements.editAcerca.classList.remove("mostrar");
                })
                .catch(error => console.error('Error al actualizar acerca de mí:', error));
            }
        };

        const updateContact = () => {
            const newMail = document.getElementById('new_mail').value;
            const newTelefono = document.getElementById('new_telefono').value;
            const newInstagram = document.getElementById('new_instagram').value;

            console.log('Actualizando contacto con:', { email: newMail, telefono: newTelefono, instagram: newInstagram });
            fetch('http://localhost:3001/update-contact', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: newMail, telefono: newTelefono, instagram: newInstagram }),
            })
            .then(response => {
                console.log('Respuesta del servidor (update-contact):', response);
                if (!response.ok) {
                    throw new Error(`Error al actualizar contacto: ${response.statusText}`);
                }
                return response.json();
            })
            .then(data => {
                console.log('Datos recibidos (update-contact):', data);
                if (newMail) {
                    elements.mail.innerText = `Mail: ${newMail}`;
                    elements.mail.setAttribute('href', `mailto:${newMail}`);
                }
                if (newTelefono) {
                    elements.telefono.innerText = `Telefono/WS: +54 ${newTelefono}`;
                }
                if (newInstagram) {
                    elements.instagram.innerText = `IG: @${newInstagram}`;
                    elements.instagram.setAttribute('href', `https://www.instagram.com/${newInstagram}`);
                }
                elements.editContact.classList.remove("mostrar");
            })
            .catch(error => console.error('Error al actualizar contacto:', error));
        };

        // Añadir eventos de clic a los botones de editar y guardar
        if (elements.btnEditContact) {
            console.log('Asignando evento a btnEditContact');
            elements.btnEditContact.addEventListener("click", mostrar_edit_contact);
        }
        if (elements.btnEditAcerca) {
            console.log('Asignando evento a btnEditAcerca');
            elements.btnEditAcerca.addEventListener("click", mostrar_edit_acerca);
        }
        if (elements.btnEnviarText) {
            console.log('Asignando evento a btnEnviarText');
            elements.btnEnviarText.addEventListener("click", updateAcerca);
        }
        if (elements.btnEnviarContact) {
            console.log('Asignando evento a btnEnviarContact');
            elements.btnEnviarContact.addEventListener("click", updateContact);
        }
    });
})();
