// index.js (backend)
const express = require("express");
const cors = require("cors");
const db = require("./db");

const app = express();
app.use(cors());
app.use(express.json());

function fechaLocalISO() {
  const fecha = new Date();
  const tzOffset = fecha.getTimezoneOffset() * 60000;
  return new Date(fecha - tzOffset).toISOString().slice(0, 19).replace('T', 'T');
}

// GET servicios
app.get("/servicios", async (req, res) => {
  const [rows] = await db.query("SELECT * FROM servicios");
  res.json(rows);
});

// POST servicio nuevo
app.post("/servicios", async (req, res) => {
  const { nombre, descripcion, precio, activo } = req.body;
  const creado = fechaLocalISO();
  const actualizado = creado;
  await db.query(
    "INSERT INTO servicios (nombre, descripcion, precio, activo, creado, actualizado) VALUES (?, ?, ?, ?, ?, ?)",
    [nombre, descripcion, precio, activo, creado, actualizado]
  );
  res.json({ success: true });
});

// Eliminar servicio
app.delete("/servicios/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await db.query("DELETE FROM servicios WHERE id = ?", [id]);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: "No se pudo eliminar el servicio" });
  }
});

// Editar servicio
app.put("/servicios/:id", async (req, res) => {
  const { id } = req.params;
  const { nombre, descripcion, precio, activo } = req.body;
  const actualizado = fechaLocalISO();
  await db.query(
    "UPDATE servicios SET nombre = ?, descripcion = ?, precio = ?, activo = ?, actualizado = ? WHERE id = ?",
    [nombre, descripcion, precio, activo, actualizado, id]
  );
  res.json({ success: true });
});

app.listen(3000, () => {
  console.log("Servidor corriendo en http://localhost:3000");
});
