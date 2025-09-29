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

