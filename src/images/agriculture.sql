-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Jan 22, 2019 at 01:26 PM
-- Server version: 10.1.10-MariaDB
-- PHP Version: 5.5.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `agriculture`
--

-- --------------------------------------------------------

--
-- Table structure for table `formers`
--

CREATE TABLE `formers` (
  `id` int(11) NOT NULL,
  `first_name` varchar(100) NOT NULL,
  `last_name` varchar(200) NOT NULL,
  `gender` varchar(20) NOT NULL,
  `phone_number` varchar(20) NOT NULL,
  `address` varchar(400) NOT NULL,
  `image_path` varchar(100) NOT NULL,
  `cdate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `formers`
--

INSERT INTO `formers` (`id`, `first_name`, `last_name`, `gender`, `phone_number`, `address`, `image_path`, `cdate`) VALUES
(32, 'werwqrwwwwwwwww', 'werqwe', 'werewq', 'werwer', 'wqerew', '', '2019-01-20 19:11:00'),
(34, 'werweqreeee', 'qwerwer', '', 'werqqwe', 'wqerewq', '', '2019-01-20 21:01:17'),
(35, 'www', 'werqwe', '', 'werwer', 'werweqr', '', '2019-01-21 21:05:14'),
(36, 'www', 'werqwe', '', 'werwerc', 'ewrqwe', '', '2019-01-21 21:06:23'),
(37, 'werweqreeee', 'qwerwer', '', 'werqqwe', 'wqerewq', '', '2019-01-22 17:21:43');

-- --------------------------------------------------------

--
-- Table structure for table `pays`
--

CREATE TABLE `pays` (
  `id` int(10) NOT NULL,
  `former_id` int(10) NOT NULL,
  `purchase_id` int(10) NOT NULL,
  `description` varchar(400) NOT NULL,
  `amount` varchar(100) NOT NULL,
  `cdate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `pays`
--

INSERT INTO `pays` (`id`, `former_id`, `purchase_id`, `description`, `amount`, `cdate`) VALUES
(1, 1, 3, 'this is decription', '400', '2019-01-17 15:19:24'),
(2, 1, 3, 'this is decription', '400', '2019-01-17 15:19:25');

-- --------------------------------------------------------

--
-- Table structure for table `purchases`
--

CREATE TABLE `purchases` (
  `id` int(11) NOT NULL,
  `former_id` varchar(10) NOT NULL,
  `item_name` varchar(40) NOT NULL,
  `quantity` varchar(10) NOT NULL,
  `quantity_type` varchar(10) NOT NULL,
  `item_price` int(11) NOT NULL,
  `amount` varchar(20) NOT NULL,
  `cdate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `purchases`
--

INSERT INTO `purchases` (`id`, `former_id`, `item_name`, `quantity`, `quantity_type`, `item_price`, `amount`, `cdate`) VALUES
(1, '32', 'werqwew', 'malew', '1234567899', 0, '', '2019-01-21 13:19:36'),
(2, '32', 'werqwew', 'malew', '1234567899', 0, '', '2019-01-21 13:19:40'),
(3, '32', 'werewq', '50', '40', 200, '2000', '2019-01-21 13:19:45'),
(4, '34', '', '', '10', 100, '1000', '2019-01-21 13:19:49'),
(5, '34', '', '30', '10', 100, '1000', '2019-01-21 13:19:52'),
(6, '34', 'werwqerwe', '30', '10', 100, '1000', '2019-01-21 13:20:00'),
(7, '34', 'werwqerwe', '30', '10', 100, '3000', '2019-01-21 14:22:40'),
(8, '32', 'werwqerwe', '30', '10', 100, '1000', '2019-01-21 13:20:12'),
(9, '32', 'werwqerwe', '30', '10', 100, '1000', '2019-01-21 13:20:15'),
(12, '32', 'werwqerwe', '30', '10', 100, '1000', '2019-01-21 13:20:38'),
(18, '34', 'dhanyam', '30', 'bhastalu', 1100, '33000', '2019-01-21 15:25:53'),
(19, '34', 'dhanyam', '30', 'bhastalu', 1100, '33000', '2019-01-21 15:33:33'),
(20, '32', 'dhanyam', '30', 'bhastalu', 1100, '33000', '2019-01-21 15:34:36'),
(21, '34', 'pratti', '30', 'qunta', 1100, '33000', '2019-01-21 16:51:56'),
(22, '32', 'dhanyam', '30', 'bhastalu', 1100, '33000', '2019-01-21 17:19:53');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(10) NOT NULL,
  `username` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `token` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `token`) VALUES
(1, 'admin', 'admin', 'werqewrdrwerewqrwe');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `formers`
--
ALTER TABLE `formers`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `pays`
--
ALTER TABLE `pays`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `purchases`
--
ALTER TABLE `purchases`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `formers`
--
ALTER TABLE `formers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;
--
-- AUTO_INCREMENT for table `pays`
--
ALTER TABLE `pays`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `purchases`
--
ALTER TABLE `purchases`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;
--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
