import express from "express";
import cors from "cors";
import db from "./db.js";

const app = express();
app.use(cors());
app.use(express.json());

// Listar servicios
app.get("/api/servicios", (req, res) => {
  db.query("SELECT * FROM servicios", (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});

// Agregar servicio
app.post("/api/servicios", (req, res) => {
  const { nombre, descripcion, precio, activo } = req.body;
  db.query("INSERT INTO servicios (nombre, descripcion, precio, activo) VALUES (?, ?, ?, ?)",
    [nombre, descripcion, precio, activo],
    (err, result) => {
      if (err) throw err;
      res.json({ id: result.insertId, ...req.body });
    });
});

// Editar servicio
app.put("/api/servicios/:id", (req, res) => {
  const { id } = req.params;
  const { nombre, descripcion, precio, activo } = req.body;
  db.query("UPDATE servicios SET nombre=?, descripcion=?, precio=?, activo=? WHERE id=?",
    [nombre, descripcion, precio, activo],
    (err) => {
      if (err) throw err;
      res.json({nombre, descripcion, precio, activo });
    });
});

// Eliminar servicio
app.delete("/api/servicios/:id", (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM servicios WHERE id=?", [id], (err) => {
    if (err) throw err;
    res.json({ message: "Servicio eliminado" });
  });
});

app.listen(4000, () => console.log("🚀 API corriendo en http://localhost:3000"));
