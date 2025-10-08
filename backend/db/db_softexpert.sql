-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost:8889
-- Generation Time: Oct 08, 2025 at 02:31 AM
-- Server version: 5.7.39
-- PHP Version: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `db_softexpert`
--

-- --------------------------------------------------------

--
-- Table structure for table `contactos`
--

CREATE TABLE `contactos` (
  `id` int(11) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `telefono` varchar(100) DEFAULT NULL,
  `empresa` varchar(255) DEFAULT NULL,
  `mensaje` text NOT NULL,
  `creado` datetime DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `contactos`
--

INSERT INTO `contactos` (`id`, `nombre`, `email`, `telefono`, `empresa`, `mensaje`, `creado`) VALUES
(1, 'Jhonatan Vanegas', 'chuzas.j@gmail.com', '4448158210', 'Test company', 'Test message', '2025-10-07 20:17:04');

-- --------------------------------------------------------

--
-- Table structure for table `servicios`
--

CREATE TABLE `servicios` (
  `id` int(11) NOT NULL,
  `nombre` varchar(150) NOT NULL,
  `descripcion` text,
  `precio` decimal(10,2) DEFAULT '0.00',
  `activo` tinyint(1) DEFAULT '1',
  `creado` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `actualizado` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `servicios`
--

INSERT INTO `servicios` (`id`, `nombre`, `descripcion`, `precio`, `activo`, `creado`, `actualizado`) VALUES
(1, 'Soporte técnico', 'Atención especializada para resolver fallas en equipos de cómputo, instalación de software, configuración de dispositivos y asistencia remota o presencial según la necesidad.', '299.00', 1, '2025-09-06 04:24:58', '2025-09-29 03:02:50'),
(2, 'Desarrollo de páginas web', NULL, '0.00', 1, '2025-09-06 04:24:58', '2025-09-06 04:24:58'),
(3, 'Aplicaciones móviles', NULL, '0.00', 1, '2025-09-06 04:24:58', '2025-09-06 04:24:58'),
(4, 'Pruebas de seguridad', NULL, '0.00', 1, '2025-09-06 04:24:58', '2025-09-06 04:24:58'),
(5, 'Data testing', NULL, '0.00', 1, '2025-09-06 04:24:58', '2025-09-06 04:24:58'),
(6, 'Migración a la nube', NULL, '0.00', 1, '2025-09-06 04:24:58', '2025-09-06 04:24:58'),
(7, 'Diseño UX/UI', 'Diseñamos interfaces modernas, intuitivas y atractivas que ofrecen una experiencia de usuario sencilla y agradable en cualquier dispositivo.', '299.00', 1, '2025-09-06 04:24:58', '2025-10-08 02:14:00'),
(8, 'Almacenamiento seguro', NULL, '0.00', 1, '2025-09-06 04:24:58', '2025-09-06 04:24:58'),
(9, 'Mantenimiento de servidores', NULL, '0.00', 1, '2025-09-06 04:24:58', '2025-09-06 04:24:58'),
(10, 'Implementación de IA', NULL, '0.00', 1, '2025-09-06 04:24:58', '2025-09-06 04:24:58');

-- --------------------------------------------------------

--
-- Table structure for table `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `nombre` varchar(255) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `creado` datetime DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `usuarios`
--

INSERT INTO `usuarios` (`id`, `nombre`, `email`, `password`, `creado`) VALUES
(1, 'Admin', 'admin@example.com', '$2b$10$.ihEeElNCA9VYvzIThjO4uhYAHZQf6Cex/trNiFWvfSA2QVBLmWLK', '2025-10-07 19:50:27');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `contactos`
--
ALTER TABLE `contactos`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `servicios`
--
ALTER TABLE `servicios`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `contactos`
--
ALTER TABLE `contactos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `servicios`
--
ALTER TABLE `servicios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
