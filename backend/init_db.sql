-- Inicialización básica de la base de datos para el proyecto front-sub17
-- Crea tablas `usuarios` y `contactos`.

CREATE TABLE IF NOT EXISTS usuarios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(255) DEFAULT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  creado DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS contactos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  telefono VARCHAR(100) DEFAULT NULL,
  empresa VARCHAR(255) DEFAULT NULL,
  mensaje TEXT NOT NULL,
  creado DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Insert ejemplo: usuario (contraseña en texto plano para desarrollo). Reemplazar por hash en producción.
INSERT INTO usuarios (nombre, email, password) VALUES ('Admin', 'admin@example.com', 'admin123')
ON DUPLICATE KEY UPDATE nombre = VALUES(nombre);
