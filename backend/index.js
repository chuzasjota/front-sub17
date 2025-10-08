// index.js (backend)
require('dotenv').config();
const express = require("express");
const cors = require("cors");
const db = require("./db");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret_change_me';
const JWT_EXPIRES = process.env.JWT_EXPIRES || '8h';

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

// POST contacto: guarda mensajes de contacto en la tabla 'contactos'
app.post('/contactos', async (req, res) => {
  const { nombre, email, telefono, empresa, mensaje } = req.body;
  const creado = fechaLocalISO();
  try {
    await db.query(
      'INSERT INTO contactos (nombre, email, telefono, empresa, mensaje, creado) VALUES (?, ?, ?, ?, ?, ?)',
      [nombre, email, telefono, empresa, mensaje, creado]
    );
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: 'Error guardando contacto' });
  }
});

// POST login: autentica contra la tabla 'usuarios'.
// Nota: en producción use hashing (bcrypt) y tokens (JWT). Aquí se hace una comprobación simple
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const [rows] = await db.query('SELECT id, nombre, email, password FROM usuarios WHERE email = ?', [email]);
    if (rows.length === 0) return res.status(401).json({ success: false, message: 'Credenciales inválidas' });
    const user = rows[0];
    // Intentar comparar con bcrypt (si la contraseña está hasheada)
    let match = false;
    try {
      match = await bcrypt.compare(password, user.password);
    } catch (e) {
      match = false;
    }
    // Si no coincide con bcrypt, intentar comparación directa (migración de contraseñas en texto plano)
    if (!match) {
      if (user.password === password) {
        match = true;
        // Re-hashear la contraseña y actualizar la DB para migrar a un hash seguro
        try {
          const newHash = await bcrypt.hash(password, 10);
          await db.query('UPDATE usuarios SET password = ? WHERE id = ?', [newHash, user.id]);
        } catch (err) {
          console.error('No se pudo actualizar el hash de la contraseña:', err);
        }
      }
    }

    if (!match) return res.status(401).json({ success: false, message: 'Credenciales inválidas' });

    // No devolver la contraseña al cliente
    delete user.password;

    // Crear JWT
    const token = jwt.sign({ id: user.id, email: user.email, nombre: user.nombre }, JWT_SECRET, { expiresIn: JWT_EXPIRES });

    res.json({ success: true, user, token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: 'Error en autenticación' });
  }
});

app.listen(3000, () => {
  console.log("Servidor corriendo en http://localhost:3000");
});
