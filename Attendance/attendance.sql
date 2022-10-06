-- phpMyAdmin SQL Dump
-- version 4.8.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 06, 2018 at 08:46 AM
-- Server version: 10.1.33-MariaDB
-- PHP Version: 7.2.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `attendance`
--
CREATE DATABASE attendance;
USE attendance;
-- --------------------------------------------------------

--
-- Table structure for table `arecordtable`
--

CREATE TABLE `arecordtable` (
  `AId` int(11) DEFAULT NULL,
  `Date` date DEFAULT NULL,
  `StudentName` varchar(100) DEFAULT NULL,
  `Present` tinyint(4) DEFAULT NULL,
  `RollNumber` int(11) DEFAULT NULL,
  `ClassName` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `arecordtable`
--

INSERT INTO `arecordtable` (`AId`, `Date`, `StudentName`, `Present`, `RollNumber`, `ClassName`) VALUES
(2, '2018-09-06', 'arnold', 1, 1, '10th'),
(2, '2018-09-06', 'luis', 0, 3, '10th');

-- --------------------------------------------------------

--
-- Table structure for table `attendancetable`
--

CREATE TABLE `attendancetable` (
  `Id` int(11) NOT NULL,
  `Date` date DEFAULT NULL,
  `ClassName` varchar(100) DEFAULT NULL,
  `TeacherId` varchar(100) DEFAULT NULL,
  `TotalStrength` int(11) DEFAULT NULL,
  `TotalPresent` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `attendancetable`
--

INSERT INTO `attendancetable` (`Id`, `Date`, `ClassName`, `TeacherId`, `TotalStrength`, `TotalPresent`) VALUES
(2, '2018-09-06', '10th', 'john', 2, 1);

-- --------------------------------------------------------

--
-- Table structure for table `classtable`
--

CREATE TABLE `classtable` (
  `Id` int(11) NOT NULL,
  `ClassName` varchar(100) DEFAULT NULL,
  `Teacher` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `classtable`
--

INSERT INTO `classtable` (`Id`, `ClassName`, `Teacher`) VALUES
(1, '10th', 'john');

-- --------------------------------------------------------

--
-- Table structure for table `studenttable`
--

CREATE TABLE `studenttable` (
  `Id` int(11) NOT NULL,
  `Roll_Number` int(11) NOT NULL,
  `Name` varchar(100) DEFAULT NULL,
  `Gender` varchar(100) DEFAULT NULL,
  `CName` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `studenttable`
--

INSERT INTO `studenttable` (`Id`, `Roll_Number`, `Name`, `Gender`, `CName`) VALUES
(1, 1, 'arnold', 'M', '10th'),
(2, 3, 'luis', 'M', '10th');

-- --------------------------------------------------------

--
-- Table structure for table `teachertable`
--

CREATE TABLE `teachertable` (
  `TId` int(11) NOT NULL,
  `Name` varchar(50) NOT NULL,
  `Subject` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `teachertable`
--

INSERT INTO `teachertable` (`TId`, `Name`, `Subject`) VALUES
(1, 'john', 'math'),
(2, 'mark', 'physical ');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `arecordtable`
--
ALTER TABLE `arecordtable`
  ADD KEY `arecrd_Index` (`AId`);

--
-- Indexes for table `attendancetable`
--
ALTER TABLE `attendancetable`
  ADD PRIMARY KEY (`Id`);

--
-- Indexes for table `classtable`
--
ALTER TABLE `classtable`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `ClassName` (`ClassName`);

--
-- Indexes for table `studenttable`
--
ALTER TABLE `studenttable`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `cNAME_ind` (`CName`);

--
-- Indexes for table `teachertable`
--
ALTER TABLE `teachertable`
  ADD PRIMARY KEY (`TId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `attendancetable`
--
ALTER TABLE `attendancetable`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `classtable`
--
ALTER TABLE `classtable`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `studenttable`
--
ALTER TABLE `studenttable`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `teachertable`
--
ALTER TABLE `teachertable`
  MODIFY `TId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `arecordtable`
--
ALTER TABLE `arecordtable`
  ADD CONSTRAINT `fk_AttendanceTable` FOREIGN KEY (`AId`) REFERENCES `attendancetable` (`Id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `studenttable`
--
ALTER TABLE `studenttable`
  ADD CONSTRAINT `fk_ClassTable` FOREIGN KEY (`CName`) REFERENCES `classtable` (`ClassName`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
