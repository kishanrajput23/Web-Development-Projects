-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 18, 2020 at 12:59 PM
-- Server version: 10.4.13-MariaDB
-- PHP Version: 7.2.32

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `travel1`
--

-- --------------------------------------------------------

--
-- Table structure for table `enquirydb`
--

CREATE TABLE `enquirydb` (
  `id` int(255) NOT NULL,
  `user` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `mobile` varchar(255) NOT NULL,
  `message` varchar(1000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `enquirydb`
--

INSERT INTO `enquirydb` (`id`, `user`, `email`, `mobile`, `message`) VALUES
(1, 'chaitanya', 'chaitanya@gmail.com', '9326154311', '        I want to enquire              ');

-- --------------------------------------------------------

--
-- Table structure for table `travel11`
--

CREATE TABLE `travel11` (
  `id` int(255) NOT NULL,
  `user` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `mobile` varchar(255) NOT NULL,
  `message` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `travel11`
--

INSERT INTO `travel11` (`id`, `user`, `email`, `mobile`, `message`) VALUES
(2, 'Chaitanya ', 'chaitanya@gmail.com', '902615477', '        Hello i want to enquire about london trip.           '),
(3, 'lucifer', 'abcd@gmail.com', '23423423432', '        Hello i want to enquire              '),
(4, 'Ram', 'Ram@gmail.com', '58585262626', '           Hello i want to tour to Uk           ');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `password`) VALUES
(1, 'chaitanya', 'chaitanya@gmail.com', '81dc9bdb52d04dc20036dbd8313ed055'),
(2, 'Arun', 'abc@gmail.com', '81dc9bdb52d04dc20036dbd8313ed055'),
(3, 'abc123', 'abc@gmail.com', '81dc9bdb52d04dc20036dbd8313ed055'),
(4, 'San', 'abcd@gmail.com', '81dc9bdb52d04dc20036dbd8313ed055');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `enquirydb`
--
ALTER TABLE `enquirydb`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `travel11`
--
ALTER TABLE `travel11`
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
-- AUTO_INCREMENT for table `enquirydb`
--
ALTER TABLE `enquirydb`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `travel11`
--
ALTER TABLE `travel11`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
