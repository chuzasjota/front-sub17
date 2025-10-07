// CAMBIO DE IMAGEN PRINCIPAL AL HACER CLIC EN MINIATURA
function cambiarImagen(elemento) {
  document.getElementById("imagen-grande").src = elemento.src;
}


// BOTÓN COMPRAR 
const btnComprar = document.querySelector(".btn-comprar");
if (btnComprar) {
  btnComprar.addEventListener("click", () => {
    alert("✅ Tu servicio fue agregado al carrito.");
  });
}
document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".card-preferencia");

  const mostrarEnScroll = () => {
    const triggerBottom = window.innerHeight * 0.85;

    cards.forEach(card => {
      const cardTop = card.getBoundingClientRect().top;

      if (cardTop < triggerBottom) {
        card.classList.add("show");
      }
    });
  };

  window.addEventListener("scroll", mostrarEnScroll);
  mostrarEnScroll(); // Ejecuta al cargar la página
});

// Manejo del formulario de contacto (si existe en la página)
const formContact = document.querySelector('.form-contact');
if (formContact) {
  formContact.addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = {
      nombre: document.getElementById('nombre').value,
      email: document.getElementById('email').value,
      telefono: document.getElementById('telefono').value,
      empresa: document.getElementById('empresa').value,
      mensaje: document.getElementById('mensaje').value
    };
    try {
      const res = await fetch('http://localhost:3000/contactos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      const json = await res.json();
      if (json.success) {
        alert('Mensaje enviado. Gracias por contactarnos.');
        formContact.reset();
      } else {
        alert('Error al enviar el mensaje');
      }
    } catch (err) {
      console.error(err);
      alert('No se pudo conectar con el servidor');
    }
  });
}

