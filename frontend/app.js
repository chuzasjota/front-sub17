const form = document.getElementById("formServicio");
const tablaBody = document.querySelector("#tablaServicios tbody");
let serviciosGlobal = [];

// Mostrar servicios al cargar
function cargarServicios() {
  fetch("http://localhost:3000/servicios")
    .then(res => res.json())
    .then(data => {
      serviciosGlobal = data; // Guarda todos los servicios
      mostrarServicios(data);
    })
    .catch(err => console.error("Error cargando:", err));
}

function mostrarServicios(servicios) {
  tablaBody.innerHTML = "";
  servicios.forEach(s => {
    const fila = document.createElement("tr");
    fila.innerHTML = `
      <td>${s.id}</td>
      <td>${s.nombre}</td>
      <td>${s.descripcion ?? ""}</td>
      <td>${s.precio}</td>
      <td>${s.activo == 1 ? "Activo" : "Inactivo"}</td>
      <td>${s.creado ?? ""}</td>
      <td>${s.actualizado ?? ""}</td>
      <td>
        <button class="btn-editar" data-id="${s.id}" title="Editar">✏️</button>
        <button class="btn-eliminar" data-id="${s.id}" title="Eliminar">🗑️</button>
      </td>
    `;
    tablaBody.appendChild(fila);
  });
}

// Guardar nuevo servicio
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const nuevoServicio = {
    nombre: document.getElementById("producto").value,
    descripcion: document.getElementById("descripcion").value,
    precio: document.getElementById("precio").value,
    activo: document.getElementById("activo").value
  };

  const editId = form.dataset.editId;
  let url = "http://localhost:3000/servicios";
  let method = "POST";

  if (editId) {
    url += `/${editId}`;
    method = "PUT";
  }

  try {
    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(nuevoServicio)
    });

    if (res.ok) {
      alert(editId ? "Servicio actualizado" : "Servicio guardado correctamente");
      form.reset();
      document.getElementById("modal").classList.remove("mostrar");
      cargarServicios();
      delete form.dataset.editId;
    } else {
      alert("Error al guardar el servicio");
    }
  } catch (err) {
    alert("Error de conexión al guardar");
    console.error(err);
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const btnAgregar = document.getElementById("btnAgregar");
  const modal = document.getElementById("modal");
  const btnCancelar = document.getElementById("btnCancelar");

  btnAgregar.addEventListener("click", () => {
    modal.classList.add("mostrar");
  });

  btnCancelar.addEventListener("click", () => {
    modal.classList.remove("mostrar");
  });

  // Opcional: cerrar el modal al hacer clic fuera del contenido
  window.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.classList.remove("mostrar");
    }
  });
});

tablaBody.addEventListener("click", async (e) => {
  if (e.target.closest(".btn-eliminar")) {
    const id = e.target.closest(".btn-eliminar").dataset.id;
    if (confirm("¿Seguro que deseas eliminar este servicio?")) {
      try {
        const res = await fetch(`http://localhost:3000/servicios/${id}`, {
          method: "DELETE"
        });
        if (res.ok) {
          alert("Servicio eliminado");
          cargarServicios();
        } else {
          alert("Error al eliminar el servicio");
        }
      } catch (err) {
        alert("Error de conexión al eliminar");
      }
    }
  }
});

tablaBody.addEventListener("click", async (e) => {
  if (e.target.closest(".btn-editar")) {
    const id = e.target.closest(".btn-editar").dataset.id;
    // Busca el servicio en la tabla actual
    const fila = e.target.closest("tr");
    document.getElementById("producto").value = fila.children[1].textContent;
    document.getElementById("descripcion").value = fila.children[2].textContent;
    document.getElementById("precio").value = fila.children[3].textContent;
    document.getElementById("activo").value = fila.children[4].textContent === "Activo" ? "1" : "0";
    form.dataset.editId = id; // Guardar el id para editar
    document.getElementById("modal").classList.add("mostrar");
  }
});

// Evento para buscar
document.getElementById("buscador").addEventListener("input", function() {
  const texto = this.value.toLowerCase();
  const filtrados = serviciosGlobal.filter(s =>
    s.id.toString().includes(texto) ||
    s.nombre.toLowerCase().includes(texto) ||
    (s.descripcion ?? "").toLowerCase().includes(texto)
  );
  mostrarServicios(filtrados);
});

// Cargar al iniciar
cargarServicios();
