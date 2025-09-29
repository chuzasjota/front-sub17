-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 29-09-2025 a las 03:18:47
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `db_softexpert`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `servicios`
--

CREATE TABLE `servicios` (
  `id` int(11) NOT NULL,
  `nombre` varchar(150) NOT NULL,
  `descripcion` text DEFAULT NULL,
  `precio` decimal(10,2) DEFAULT 0.00,
  `activo` tinyint(1) DEFAULT 1,
  `creado` timestamp NOT NULL DEFAULT current_timestamp(),
  `actualizado` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `servicios`
--

INSERT INTO `servicios` (`id`, `nombre`, `descripcion`, `precio`, `activo`, `creado`, `actualizado`) VALUES
(1, 'Soporte técnico', NULL, 0.00, 1, '2025-09-06 04:24:58', '2025-09-06 04:24:58'),
(2, 'Desarrollo de páginas web', NULL, 0.00, 1, '2025-09-06 04:24:58', '2025-09-06 04:24:58'),
(3, 'Aplicaciones móviles', NULL, 0.00, 1, '2025-09-06 04:24:58', '2025-09-06 04:24:58'),
(4, 'Pruebas de seguridad', NULL, 0.00, 1, '2025-09-06 04:24:58', '2025-09-06 04:24:58'),
(5, 'Data testing', NULL, 0.00, 1, '2025-09-06 04:24:58', '2025-09-06 04:24:58'),
(6, 'Migración a la nube', NULL, 0.00, 1, '2025-09-06 04:24:58', '2025-09-06 04:24:58'),
(7, 'Diseño UX/UI', NULL, 0.00, 1, '2025-09-06 04:24:58', '2025-09-06 04:24:58'),
(8, 'Almacenamiento seguro', NULL, 0.00, 1, '2025-09-06 04:24:58', '2025-09-06 04:24:58'),
(9, 'Mantenimiento de servidores', NULL, 0.00, 1, '2025-09-06 04:24:58', '2025-09-06 04:24:58'),
(10, 'Implementación de IA', NULL, 0.00, 1, '2025-09-06 04:24:58', '2025-09-06 04:24:58');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `correo` varchar(255) NOT NULL,
  `contraseña` varchar(255) NOT NULL,
  `activo` tinyint(1) DEFAULT 1,
  `creado` timestamp NOT NULL DEFAULT current_timestamp(),
  `actualizado` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `rol` enum('admin','usuario','moderador') DEFAULT 'usuario'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `nombre`, `correo`, `contraseña`, `activo`, `creado`, `actualizado`, `rol`) VALUES
(2, 'Alanis Gallo', 'agallol@poligran.edu.co', '$2y$10$giS1BlqZOys3.SYlNme9puKgigcmvBX5ELb1zKrh.ak9V2oD4boCS', 1, '2025-09-06 04:40:08', '2025-09-06 04:40:08', 'usuario'),
(3, 'Marta Cecilia', 'marta@gmail.com', '$2y$10$3rI0rAwQ3DoV1NcpY5U9Y.SERiDZD7Yp036d/.nLScMY5Ufa8twBG', 1, '2025-09-06 04:43:44', '2025-09-06 04:43:44', 'usuario');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `servicios`
--
ALTER TABLE `servicios`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `correo` (`correo`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `servicios`
--
ALTER TABLE `servicios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
