-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Apr 30, 2023 at 08:25 PM
-- Server version: 10.4.21-MariaDB
-- PHP Version: 7.4.29

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `xenial`
--

-- DROP database xenial;
-- create database xenial;
-- use xenial;
-- --------------------------------------------------------

--
-- Table structure for table `booking_master`
--

CREATE TABLE `booking_master` (
  `id` varchar(50) NOT NULL PRIMARY KEY,
  `user_id` varchar(50) DEFAULT NULL,
  `hotel_id` varchar(50) DEFAULT NULL,
  `hotel_name` varchar(100) DEFAULT NULL,
  `guest_name` varchar(100) DEFAULT NULL,
  `no_of_rooms_required` int(11) DEFAULT NULL,
  `check_in_date_time` datetime DEFAULT NULL,
  `check_out_date_time` datetime DEFAULT NULL,
  `guest_entitlement` varchar(100) DEFAULT NULL,
  `meal_plan` varchar(100) DEFAULT NULL,
  `room_type` varchar(50) DEFAULT NULL,
  `occupancy` varchar(100) DEFAULT NULL,
  `hotel_contact_person` varchar(100) DEFAULT NULL,
  `payment_mode` varchar(100) DEFAULT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  `special_instruction` varchar(255) DEFAULT NULL,
  `note` varchar(255) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `created_by` varchar(50) NOT NULL,
  `updated_at` datetime NOT NULL,
  `updated_by` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `booking_master`
--

INSERT INTO `booking_master` (`id`, `user_id`, `hotel_id`, `hotel_name`, `guest_name`, `no_of_rooms_required`, `check_in_date_time`, `check_out_date_time`, `guest_entitlement`, `meal_plan`, `room_type`, `occupancy`, `hotel_contact_person`, `payment_mode`, `price`, `special_instruction`, `note`) VALUES
(uuid(), 1, 1, NULL, 'Ram', 1, '2023-04-23 00:00:00', '2023-04-24 00:00:00', '1500 + GST (Incl B\'Fast)', 'CP', 'AC', 'Single', 'manager@gmail.com', 'UPI', '2500.00', 'Do not share invoice copy with the guest', 'Extras to be payable by the guest');

-- --------------------------------------------------------

--
-- Table structure for table `client_details`
--

CREATE TABLE `client_details` (
  `id` varchar(50) NOT NULL PRIMARY KEY,
  `client_id` varchar(50) NOT NULL,
  `attribute_type` varchar(100) DEFAULT NULL COMMENT 'Data type i.e. string, integer',
  `attribute_name` varchar(255) DEFAULT NULL,
  `attribute_value` varchar(255) DEFAULT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `created_by` varchar(50) NOT NULL,
  `updated_at` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `updated_by` varchar(50) NOT NULL,
  UNIQUE KEY `unique_client_value`(`client_id`, `attribute_name`),
  CONSTRAINT FOREIGN KEY `fk_client_id` (`client_id`) REFERENCES `client_master`(`id`),
  INDEX `idx_client_detail_client_id`(`client_id`),
  INDEX `idx_client_detail_attribute_name`(`attribute_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `client_master`
--

CREATE TABLE `client_master` (
  `id` varchar(50) NOT NULL PRIMARY KEY,
  `name` varchar(100) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `password` varchar(100) DEFAULT NULL,
  `status` int(2) DEFAULT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `created_by` varchar(50) NOT NULL,
  `updated_at` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `updated_by` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `client_master`
--

INSERT INTO `client_master` (`id`, `name`, `email`, `password`, `status`, `created_at`, `created_by`, `updated_at`, `updated_by`) VALUES
(uuid(), 'XENIAL', 'xenial@gmail.com', '123456', NULL, '2023-04-24 11:18:45', NULL, '2023-04-24 11:18:45', NULL),
(uuid(), 'XENIAL2', 'xenial@gmail.com', '123456', NULL, '2023-04-24 11:29:21', NULL, '2023-04-24 11:29:21', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `corporate_details`
--

CREATE TABLE `corporate_details` (
  `id` varchar(50) NOT NULL PRIMARY KEY,
  `corporate_id` varchar(50) NOT NULL,
  `attribute_type` varchar(255) DEFAULT NULL,
  `attribute_name` varchar(255) DEFAULT NULL,
  `attribute_value` varchar(255) DEFAULT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `created_by` varchar(50) NOT NULL,
  `updated_at` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `updated_by` varchar(50) NOT NULL,
  UNIQUE KEY `unique_corporate_value`(`corporate_id`, `attribute_name`),
  CONSTRAINT FOREIGN KEY `fk_corporate_detail_corporate_id` (`corporate_id`) REFERENCES `corporate_master`(`id`),
  INDEX `idx_corporate_detail_corporate_id`(`corporate_id`),
  INDEX `idx_corporate_detail_attribute_name`(`attribute_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `corporate_master`
--

CREATE TABLE `corporate_master` (
  `id` varchar(50) NOT NULL PRIMARY KEY,
  `client_id` varchar(50) NOT NULL,
  `registration_number` varchar(20) DEFAULT NULL,
  `corporate_name` varchar(255) DEFAULT NULL,
  `billing_name` varchar(100) DEFAULT NULL,
  `email` varchar(100) NOT NULL,
  `status` int(2) DEFAULT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `created_by` varchar(50) NOT NULL,
  `updated_at` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `updated_by` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `corporate_master`
--

INSERT INTO `corporate_master` (`id`, `client_id`, `registration_number`, `corporate_name`, `billing_name`, `email`, `status`) VALUES
(uuid(), 1, NULL, 'ABC Pvt. Ltd.', 'ABC Ltd.', 'abc@gmail.com', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `guest_details`
--

CREATE TABLE `guest_details` (
  `id` varchar(50) NOT NULL PRIMARY KEY,
  `guest_id` varchar(50) NOT NULL,
  `attribute_type` varchar(255) DEFAULT NULL,
  `attribute_name` varchar(255) DEFAULT NULL,
  `attribute_value` varchar(255) DEFAULT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `created_by` varchar(50) NOT NULL,
  `updated_at` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `updated_by` varchar(50) NOT NULL,
  UNIQUE KEY `unique_guest_value`(`guest_id`, `attribute_name`),
  CONSTRAINT FOREIGN KEY `fk_guest_detail_guest_id` (`guest_id`) REFERENCES `guest_master`(`id`),
  INDEX `idx_guest_detail_guest_id`(`guest_id`),
  INDEX `idx_guest_detail_attribute_name`(`attribute_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `guest_master`
--

CREATE TABLE `guest_master` (
  `id` varchar(50) NOT NULL PRIMARY KEY,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `contact` varchar(100) NOT NULL,
  `gender` varchar(100) NOT NULL,
  `address` varchar(100) NOT NULL,
  `city` varchar(100) NOT NULL,
  `state` varchar(100) NOT NULL,
  `country` varchar(100) NOT NULL,
  `status` int(10) NOT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `created_by` varchar(50) NOT NULL,
  `updated_at` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `updated_by` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `hotels_confrenece_room_capacity_info`
--

CREATE TABLE `hotels_confrenece_room_capacity_info` (
  `id` varchar(50) NOT NULL PRIMARY KEY,
  `hotel_id` varchar(50) DEFAULT NULL,
  `hotel_number_of_room_inventory` varchar(100) DEFAULT NULL,
  `hotel_room_description` text DEFAULT NULL,
  `hotel_conference_hall_availability` varchar(100) DEFAULT NULL,
  `hotel_number_of_conference_halls` varchar(100) DEFAULT NULL,
  `hotel_conference_hall_capacity` varchar(100) DEFAULT NULL,
  `hotel_hall_description` text DEFAULT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT FOREIGN KEY `fk_guest_detail_guest_id` (`guest_id`) REFERENCES `guest_master`(`id`),
  INDEX `idx_guest_detail_guest_id`(`guest_id`),
  INDEX `idx_guest_detail_attribute_name`(`attribute_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `hotel_discount_information`
--

CREATE TABLE `hotel_discount_information` (
  `id` varchar(50) NOT NULL PRIMARY KEY,
  `hotel_id` varchar(50) DEFAULT NULL,
  `discount_in_percent` int(11) DEFAULT NULL,
  `discount_description` text DEFAULT NULL,
  `status` int(11) DEFAULT 0 COMMENT '1: Active, 2: Not Active',
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `hotel_facility_information`
--

CREATE TABLE `hotel_facility_information` (
  `id` varchar(50) NOT NULL PRIMARY KEY,
  `hotel_id` varchar(50) DEFAULT NULL,
  `facility_name` varchar(255) DEFAULT NULL,
  `facility_additional_charges` varchar(100) DEFAULT NULL,
  `hotels_facility_description` text DEFAULT NULL,
  `hotel_facility_images` text DEFAULT NULL,
  `facility_status` int(11) NOT NULL DEFAULT 0 COMMENT '1: Yes, 2: No',
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `hotel_meals`
--

CREATE TABLE `hotel_meals` (
  `id` varchar(50) NOT NULL PRIMARY KEY,
  `hotel_id` varchar(50) DEFAULT NULL,
  `meal_name` varchar(255) DEFAULT NULL,
  `meal_price` varchar(100) DEFAULT NULL,
  `manual_dicsount` varchar(100) DEFAULT NULL,
  `status` int(11) NOT NULL DEFAULT 0 COMMENT '1: Yes, 2: No',
  `meal_description` text DEFAULT NULL,
  `meal_images` text DEFAULT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `hotel_master`
--

CREATE TABLE `hotel_master` (
  `id` varchar(50) NOT NULL PRIMARY KEY,
  `client_id` varchar(50) NOT NULL,
  `corporate_id` varchar(50) NOT NULL,
  `hotel_name` varchar(100) NOT NULL,
  `legal_name` varchar(100) DEFAULT NULL,
  `hotel_address` varchar(255) DEFAULT NULL,
  `hotel_city` varchar(255) DEFAULT NULL,
  `hotel_state` varchar(255) DEFAULT NULL,
  `hotel_country` varchar(255) DEFAULT NULL,
  `hotel_zip_code` varchar(100) DEFAULT NULL,
  `hotel_latitude` varchar(255) DEFAULT NULL,
  `hotel_longitude` varchar(255) DEFAULT NULL,
  `hotel_images` text DEFAULT NULL,
  `status` int(11) DEFAULT 0 COMMENT '0:Not Active,1:Active',
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `created_by` varchar(50) NOT NULL,
  `updated_at` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `updated_by` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `hotel_master`
--

INSERT INTO `hotel_master` (`id`, `client_id`, `corporate_id`, `hotel_name`, `legal_name`, `hotel_address`, `hotel_city`, `hotel_state`, `hotel_country`, `hotel_zip_code`, `hotel_latitude`, `hotel_longitude`, `hotel_images`, `status`) VALUES
(uuid(), 1, 1, 'Taj', 'Mini Taj', 'Huda City Center', 'Grugram', 'Hariyana', 'India', '220045', '28.457523', '77.026344', NULL, 0);

-- --------------------------------------------------------

--
-- Table structure for table `hotel_registration_detail`
--

CREATE TABLE `hotel_registration_detail` (
  `id` varchar(50) NOT NULL PRIMARY KEY,
  `hotel_id` varchar(50) DEFAULT NULL,
  `hotel_pan_number` varchar(100) DEFAULT NULL,
  `hotel_GST_number` varchar(100) DEFAULT NULL,
  `bank_account_holder_name` varchar(255) DEFAULT NULL,
  `bank_name` varchar(255) DEFAULT NULL,
  `bank_account_number` varchar(255) DEFAULT NULL,
  `bank_ifsc_code` varchar(255) DEFAULT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `hotel_room_category`
--

CREATE TABLE `hotel_room_category` (
  `id` varchar(50) NOT NULL PRIMARY KEY,
  `hotel_id` varchar(50) DEFAULT NULL,
  `room_category_name` varchar(255) DEFAULT NULL,
  `room_price` varchar(100) DEFAULT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `hotel_room_detail`
--

CREATE TABLE `hotel_room_detail` (
  `id` varchar(50) NOT NULL PRIMARY KEY,
  `hotel_id` varchar(50) DEFAULT NULL,
  `room_category_id` varchar(50) DEFAULT NULL,
  `hotel_floor_number` int(11) DEFAULT NULL,
  `room_number` text DEFAULT NULL,
  `description` int(11) NOT NULL,
  `hotels_room_images` text DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `hotel_tax_detail`
--

CREATE TABLE `hotel_tax_detail` (
  `id` varchar(50) NOT NULL PRIMARY KEY,
  `hotel_id` varchar(50) DEFAULT NULL,
  `tax_in_percent` int(11) DEFAULT NULL,
  `tax_description` text DEFAULT NULL,
  `status` int(11) NOT NULL DEFAULT 0 COMMENT '1:Yes, 2: NO',
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `hotel_contact_information`
--

CREATE TABLE `hotel_contact_information` (
  `id` varchar(50) NOT NULL PRIMARY KEY,
  `hotel_id` varchar(50) DEFAULT NULL,
  `hotel_contact_person_name` varchar(100) DEFAULT NULL,
  `hotel_contact_person_number` varchar(100) DEFAULT NULL,
  `hotel_email_id` varchar(100) DEFAULT NULL,
  `hotel_general_manager_name` varchar(100) DEFAULT NULL,
  `hotel_general_manager_conatct_number` varchar(100) DEFAULT NULL,
  `hotel_general_manager_email` varchar(100) DEFAULT NULL,
  `hotel_standard_check_in` timestamp NULL DEFAULT NULL,
  `hotel_standard_check_out` timestamp NULL DEFAULT NULL,
  `hotel_map_url` varchar(255) DEFAULT NULL,
  `website_url` varchar(255) DEFAULT NULL,
  `conference_hall` int(11) DEFAULT NULL,
  `number_of_confrence_hall` varchar(100) DEFAULT NULL,
  `conference_hall_capacity` varchar(100) DEFAULT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `login_history`
--

CREATE TABLE `login_history` (
  `id` int(11) NOT NULL PRIMARY KEY,
  `user_id` varchar(50) DEFAULT NULL,
  `login_time` varchar(50) DEFAULT NULL,
  `ip_address` varchar(100) DEFAULT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `login_history`
--

INSERT INTO `login_history` (`id`, `user_id`, `login_time`, `ip_address`, `created_at`) VALUES
(uuid(), NULL, '2023-04-24 14:50:01.565', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `manage_documents`
--

CREATE TABLE `manage_documents` (
  `id` varchar(50) NOT NULL PRIMARY KEY,
  `client_id` varchar(50) DEFAULT NULL,
  `guest_id` varchar(50) DEFAULT NULL,
  `hotel_id` varchar(50) DEFAULT NULL,
  `attribute_type` varchar(100) DEFAULT NULL,
  `attribute_name` varchar(255) DEFAULT NULL,
  `attribute_value` varchar(255) DEFAULT NULL,
  `file_name` varchar(100) NOT NULL,
  `file_type` varchar(100) NOT NULL,
  `file_path` varchar(100) NOT NULL,
  `uploaded_date` timestamp NOT NULL DEFAULT current_timestamp(),
  `status` int(10) NOT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `created_by` varchar(50) NOT NULL,
  `updated_at` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `updated_by` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `manage_rooms`
--

CREATE TABLE `manage_rooms` (
  `id` varchar(50) NOT NULL PRIMARY KEY,
  `hotel_id` varchar(50) NOT NULL,
  `room_type` varchar(100) NOT NULL,
  `room_number` int(10) NOT NULL,
  `room_cost` varchar(100) NOT NULL,
  `floor` varchar(100) NOT NULL,
  `location` varchar(100) NOT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `role_master`
--

CREATE TABLE `role_master` (
  `id` varchar(50) NOT NULL PRIMARY KEY,
  `name` varchar(100) NOT NULL,
  `status` int(10) NOT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `user_master`
--

CREATE TABLE `user_master` (
  `id` varchar(50) NOT NULL PRIMARY KEY,
  `client_id` varchar(50) DEFAULT NULL,
  `name` varchar(100) DEFAULT NULL,
  `username` varchar(100) DEFAULT NULL,
  `password` varchar(100) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `role_id` int(11) DEFAULT NULL,
  `is_verified` varchar(11) DEFAULT NULL,
  `token` text DEFAULT NULL,
  `last_login` varchar(100) DEFAULT NULL,
  `status` tinyint(3) DEFAULT 1,
  `ip_address` varchar(100) DEFAULT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `created_by` varchar(50) NOT NULL,
  `updated_at` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `updated_by` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user_master`
--

INSERT INTO `user_master` (`id`, `client_id`, `name`, `username`, `password`, `email`, `role_id`, `is_verified`, `token`, `last_login`, `status`, `ip_address`) VALUES
(uuid(), 1, 'admin', 'admin@gmail.com', '$2b$10$5YgyaBbeey4P3R/OkixR2.vizEKQ751sSSbyYL1NiNsBH00bqQwhG', 'admin@gmail.com', 1, NULL, NULL, '2023-04-24 14:50:01.565', 1, NULL);


/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;