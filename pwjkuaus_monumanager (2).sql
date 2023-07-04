-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Jul 04, 2023 at 04:36 PM
-- Server version: 5.7.42
-- PHP Version: 8.1.16

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `pwjkuaus_monumanager`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `id` int(11) NOT NULL,
  `email` varchar(50) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`id`, `email`, `username`, `password`) VALUES
(2, 'amitkumarbca1990@gmail.com', 'admin', '$2a$10$WtuS65CYyJNJEMIFNvCzpO241LDwvXOSJgBQILyG8OaqjIfoeUR9a');

-- --------------------------------------------------------

--
-- Table structure for table `carving`
--

CREATE TABLE `carving` (
  `id` int(11) NOT NULL,
  `job_id` int(11) NOT NULL,
  `side` varchar(30) DEFAULT NULL,
  `position` varchar(30) DEFAULT NULL,
  `first_name` varchar(50) DEFAULT NULL,
  `middle_name` varchar(50) DEFAULT NULL,
  `last_name` varchar(50) NOT NULL,
  `birth_date` date DEFAULT NULL,
  `passing_date` date DEFAULT NULL,
  `other_details` text
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `carving`
--

INSERT INTO `carving` (`id`, `job_id`, `side`, `position`, `first_name`, `middle_name`, `last_name`, `birth_date`, `passing_date`, `other_details`) VALUES
(16, 293, 'Back', 'Center Center', 'Amit', 'Kumar', 'Sharma', '2023-05-01', '2023-05-12', 'To beloved my friend'),
(17, 296, 'Back', 'Center Center', 'Lalit', NULL, 'Kumar', '2023-05-10', '2023-05-16', 'For my beloved Love'),
(19, 301, 'Back', NULL, 'Amit', 'Kumar', 'Sharma', '2023-05-17', '2023-05-22', 'For beloved Love'),
(20, 305, 'Back', 'Center Center', 'Amit', 'Kumar', 'Sharma', '2023-05-16', '2023-05-23', 'tesst'),
(38, 339, 'Front', 'Center Center', 'Not Needed', 'Not Needed', 'RICHARDS', '2023-06-02', '2023-06-01', 'Not Needed'),
(40, 339, 'Back', 'Center Center', 'test', NULL, 'test', '2023-06-21', '2023-06-21', 'Not Required'),
(41, 329, 'Back', 'Center Center', NULL, NULL, 'Boseefus', NULL, NULL, NULL),
(42, 329, NULL, 'Center Center', 'Charles Eric', 'Bocephus', 'Johnson', NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `customer`
--

CREATE TABLE `customer` (
  `id` int(11) NOT NULL,
  `first_name` varchar(50) NOT NULL,
  `middle_name` varchar(50) DEFAULT NULL,
  `last_name` varchar(50) NOT NULL,
  `phone` varchar(15) NOT NULL,
  `email` varchar(100) NOT NULL,
  `address` varchar(255) DEFAULT NULL,
  `notes` text
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `customer`
--

INSERT INTO `customer` (`id`, `first_name`, `middle_name`, `last_name`, `phone`, `email`, `address`, `notes`) VALUES
(153, 'Amit', 'kumar', 'Sharma', '9313045394', 'amitkumarbca1990@gmail.com', 'Delhi ', NULL),
(162, 'Elisha', 'C', 'Johnson', '444', 'bytewrenech@gmail.com', '2015 Franklin Rd\nAddress', ' qwe'),
(166, 'Jo', NULL, 'Jo', '6153307920', 'bytewwrench@gmail.com', ' Heresville', NULL),
(168, 'Elrod', NULL, 'Curtis', '111', 'elrod@curtis.com', NULL, ' Nice guy'),
(169, 'Charles Eric', NULL, 'Lascassas', '6153307920', 'somestill@dontuseemail.com', '', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `job`
--

CREATE TABLE `job` (
  `id` int(10) NOT NULL,
  `customer_id` int(20) DEFAULT NULL,
  `status` varchar(200) DEFAULT NULL,
  `notes` varchar(1000) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `job`
--

INSERT INTO `job` (`id`, `customer_id`, `status`, `notes`) VALUES
(291, 47, 'Stone Ordered', 'New Order'),
(292, 59, 'Stone Ordered', 'Want a carving'),
(293, 73, 'Inside the Shop', 'Fine Job'),
(294, 74, NULL, 'New Order Description'),
(295, 82, 'Ready for Placement', 'Want a Carving'),
(296, 83, 'Stone Ready To Carve', 'Want a Carving job'),
(297, NULL, 'Inside the Shop', 'asfasdf'),
(298, NULL, NULL, 'test'),
(300, 120, 'Stone Ready To Carve', 'carving test'),
(301, 120, 'Inside the Shop', 'order for finishing'),
(305, 138, 'Stone Ready To Carve', 'Stone order for carving'),
(306, 141, NULL, 'Text order'),
(309, 146, NULL, 'test'),
(311, 145, NULL, 'Brand New Order'),
(315, 151, NULL, 'asdfasdfasd'),
(316, NULL, NULL, 'Test order for dharra'),
(317, 152, NULL, 'test order for dharra'),
(318, 153, 'Done', 'Order for finishing'),
(319, 153, 'Ready for Placement', 'asdfasdf'),
(320, 153, NULL, 'asdfasdf asd'),
(321, 153, ' Complete', 'test order'),
(322, 153, NULL, 'order test most'),
(323, 153, 'Ready for Placement', 'test order'),
(324, 153, NULL, 'test order'),
(325, 153, NULL, 'test'),
(326, 153, NULL, 'test'),
(328, 153, NULL, 'test order'),
(329, 153, 'Finished', 'test normal'),
(339, 162, 'ADDING new status. I love it. We should limit it\'s availability to admins, whenever we get to where we save them to the \"status\" table', 'New Order (6x12 mailbox)'),
(345, 166, 'Stone Ordered', 'Vase'),
(346, 166, 'New Status', 'N3w'),
(348, 169, 'Complete ', 'Footstone, level in cemetery.  55.00'),
(349, 166, 'Ready for Placement', 'Mailbox Insert');

-- --------------------------------------------------------

--
-- Table structure for table `product`
--

CREATE TABLE `product` (
  `id` int(11) NOT NULL,
  `job_id` int(11) NOT NULL,
  `description` varchar(255) NOT NULL,
  `color` varchar(50) DEFAULT NULL,
  `size` varchar(50) DEFAULT NULL,
  `options` text,
  `quantity_on_hand` int(11) DEFAULT NULL,
  `price` decimal(10,0) DEFAULT NULL,
  `notes` text,
  `image` varchar(60) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `product`
--

INSERT INTO `product` (`id`, `job_id`, `description`, `color`, `size`, `options`, `quantity_on_hand`, `price`, `notes`, `image`) VALUES
(19, 339, '4x8 footstone', 'Gray', '4x8', '1', 1, 1, '1', '1687212745962HalfSerp2.png'),
(35, 323, 'Easiest does it', 'undefined', 'undefined', 'undefined', 0, 0, 'undefined', ''),
(36, 329, '', NULL, NULL, NULL, NULL, NULL, NULL, ''),
(37, 319, 'aaa', NULL, NULL, NULL, NULL, NULL, NULL, '');

-- --------------------------------------------------------

--
-- Table structure for table `task`
--

CREATE TABLE `task` (
  `id` int(11) NOT NULL,
  `job_id` int(11) NOT NULL,
  `description` varchar(255) NOT NULL,
  `creation_time` datetime NOT NULL,
  `due_date` datetime DEFAULT NULL,
  `notes` text
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `task`
--

INSERT INTO `task` (`id`, `job_id`, `description`, `creation_time`, `due_date`, `notes`) VALUES
(18, 0, 'Work for carve', '2023-05-17 00:00:00', '2023-05-27 00:00:00', 'Carving add'),
(34, 319, 'Clean Stone (*) The creation date should be automatically filled with Today. the Due date should be optional', '2023-06-07 00:00:00', '2023-06-07 00:00:00', '(Possibly Inrequired)'),
(35, 319, 'Clean Stone (*) The creation date should be automatically filled with Today. the Due date should be optional', '2023-06-07 00:00:00', '2023-06-07 00:00:00', '(Possibly Inrequired)'),
(39, 339, 'test Taski', '2023-06-19 00:00:00', '2023-06-19 00:00:00', 'Not Required'),
(44, 339, 'Add Footstone', '2023-06-21 00:00:00', '2023-06-21 00:00:00', '0'),
(48, 329, 'Save this', '2023-06-27 00:00:00', NULL, NULL),
(49, 339, 'Fix sealant5', '2023-06-27 00:00:00', NULL, NULL),
(50, 319, 'Clean', '2023-06-27 00:00:00', NULL, NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `carving`
--
ALTER TABLE `carving`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `customer`
--
ALTER TABLE `customer`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `job`
--
ALTER TABLE `job`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `task`
--
ALTER TABLE `task`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin`
--
ALTER TABLE `admin`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `carving`
--
ALTER TABLE `carving`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=45;

--
-- AUTO_INCREMENT for table `customer`
--
ALTER TABLE `customer`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=170;

--
-- AUTO_INCREMENT for table `job`
--
ALTER TABLE `job`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=351;

--
-- AUTO_INCREMENT for table `product`
--
ALTER TABLE `product`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=39;

--
-- AUTO_INCREMENT for table `task`
--
ALTER TABLE `task`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
