-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 26, 2024 at 09:30 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `iitc_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `course_detail`
--

CREATE TABLE `course_detail` (
  `CD_ID` int(4) NOT NULL,
  `CourseName` varchar(250) NOT NULL,
  `CourseType` varchar(15) NOT NULL,
  `Duration` varchar(20) NOT NULL,
  `Medium` varchar(20) NOT NULL,
  `CourseLevel` varchar(20) NOT NULL,
  `ModuleCode` varchar(10) NOT NULL,
  `Active` int(3) NOT NULL,
  `DateEntered` date NOT NULL,
  `User` varchar(25) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `course_detail`
--

INSERT INTO `course_detail` (`CD_ID`, `CourseName`, `CourseType`, `Duration`, `Medium`, `CourseLevel`, `ModuleCode`, `Active`, `DateEntered`, `User`) VALUES
(1, 'wqe', 'qweqw', 'qwe', 'qsadas', '5', 'qwe', 0, '2024-02-24', 'qwe');

-- --------------------------------------------------------

--
-- Table structure for table `course_module`
--

CREATE TABLE `course_module` (
  `ModuleId` int(4) NOT NULL,
  `ModuleName` varchar(100) NOT NULL,
  `ModuleCode` varchar(255) NOT NULL,
  `Active` varchar(3) NOT NULL,
  `User` varchar(25) NOT NULL,
  `DateEntered` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `course_module`
--

INSERT INTO `course_module` (`ModuleId`, `ModuleName`, `ModuleCode`, `Active`, `User`, `DateEntered`) VALUES
(1000, 'asdas', 'sdsa', 'ye', 'sf', '2024-02-26 16:52:39');

-- --------------------------------------------------------

--
-- Table structure for table `student_detail`
--

CREATE TABLE `student_detail` (
  `Id` int(4) NOT NULL,
  `CourseYear` int(4) NOT NULL,
  `CourseId` int(4) NOT NULL,
  `FullName` varchar(255) NOT NULL,
  `NameWithInitials` varchar(255) NOT NULL,
  `Nic` varchar(255) NOT NULL,
  `MISNumber` varchar(255) NOT NULL,
  `Mobile` varchar(10) NOT NULL,
  `Address` varchar(555) NOT NULL,
  `Gender` varchar(6) NOT NULL,
  `Deleted` bit(1) NOT NULL,
  `Changed` bit(1) NOT NULL,
  `User` int(7) NOT NULL,
  `DateEntered` date NOT NULL,
  `Dropout` bit(1) NOT NULL,
  `FinalExamSitted` bit(1) NOT NULL,
  `RepeatStudent` bit(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `student_detail`
--

INSERT INTO `student_detail` (`Id`, `CourseYear`, `CourseId`, `FullName`, `NameWithInitials`, `Nic`, `MISNumber`, `Mobile`, `Address`, `Gender`, `Deleted`, `Changed`, `User`, `DateEntered`, `Dropout`, `FinalExamSitted`, `RepeatStudent`) VALUES
(1000, 2021, 3244, 'abcd efgh', 'rkl nayanajith', '899657822369', 'MISNumber', '0777963321', 'Address', 'female', b'1', b'1', 6456, '2023-02-20', b'1', b'1', b'1'),
(1001, 234, 234, '24242', '234234', '23424', '23423', '423423', '423423', 'Male', b'0', b'0', 234234, '2024-02-24', b'0', b'0', b'0');

-- --------------------------------------------------------

--
-- Table structure for table `student_exam_result`
--

CREATE TABLE `student_exam_result` (
  `StudentId` int(4) NOT NULL,
  `CourseYear` int(10) NOT NULL,
  `ModuleCode` varchar(255) NOT NULL,
  `Marks` int(10) NOT NULL,
  `DateEntered` date NOT NULL,
  `User` varchar(25) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `student_exam_result`
--

INSERT INTO `student_exam_result` (`StudentId`, `CourseYear`, `ModuleCode`, `Marks`, `DateEntered`, `User`) VALUES
(1000, 2023, 'adv366', 66, '2024-02-24', 'ad');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `course_detail`
--
ALTER TABLE `course_detail`
  ADD PRIMARY KEY (`CD_ID`);

--
-- Indexes for table `course_module`
--
ALTER TABLE `course_module`
  ADD PRIMARY KEY (`ModuleId`);

--
-- Indexes for table `student_detail`
--
ALTER TABLE `student_detail`
  ADD PRIMARY KEY (`Id`);

--
-- Indexes for table `student_exam_result`
--
ALTER TABLE `student_exam_result`
  ADD PRIMARY KEY (`StudentId`,`ModuleCode`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `course_detail`
--
ALTER TABLE `course_detail`
  MODIFY `CD_ID` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `course_module`
--
ALTER TABLE `course_module`
  MODIFY `ModuleId` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1005;

--
-- AUTO_INCREMENT for table `student_detail`
--
ALTER TABLE `student_detail`
  MODIFY `Id` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1003;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
