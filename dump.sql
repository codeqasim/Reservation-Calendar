-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;


CREATE TABLE `cars` (
  `id` int(11) NOT NULL,
  `label` text NOT NULL,
  `price` text NOT NULL,
  `link` text NOT NULL,
  `type` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO `cars` (`id`, `label`, `price`, `link`, `type`) VALUES
(1, 'Dodge Caliber', '129.99', './content/dodge_caliber.png', 1),
(2, 'Ford Focus', '129.45', './content/ford_focus.png', 1),
(3, 'Chevy Cruze', '95.5', './content/chevy_cruze.png', 1),
(4, 'Honda Civic', '99.9', './content/honda_civic.png', 1),
(5, 'Hyundai Elantra', '58.6', './content/hyundai_elantra.png', 1),
(6, 'Mitsubishi Lancer', '59.9', './content/mitsubishi_lancer.png', 1),
(7, 'Nissan Sentra', '60.05', './content/nissan_sentra.png', 1),
(8, 'Subaru Impreza', '120.98', './content/subaru_impreza.png', 1),
(9, 'Toyota Corolla', '140.99', './content/toyota_corolla.png', 1),
(10, 'Renault Megane', '99.99', './content/renault_megane.png', 1),
(11, 'Audi A3', '89.99', './content/audi_a3.png', 1),
(12, 'Dodge Avenger', '99.59', './content/dodge_avenger.png', 2),
(13, 'Ford Fusion', '69.99', './content/ford_fusion.png', 2),
(14, 'Hyundai Sonata', '68.59', './content/hyundai_sonata.png', 2),
(15, 'Mitsubishi Galant', '88.99', './content/mitsubishi_galant.png', 2),
(16, 'Nissan Altima', '99.99', './content/nissan_altima.png', 2),
(17, 'Subaru Legacy', '100.99', './content/subaru_legacy.png', 2),
(18, 'Toyota Camry', '89.99', './content/toyota_camry.png', 2),
(19, 'Lexus GS', '115.99', './content/lexus_gs.png', 2),
(20, 'Audi A6', '118.99', './content/audi_a6.png', 2),
(21, 'BMW 5-Series', '121.99', './content/bmw_5_series.png', 2),
(22, 'Infiniti M', '99.99', './content/infiniti_m.png', 2),
(23, 'Dodge Charger', '100.99', './content/dodge_charger.png', 3),
(24, 'Chrysler 300', '129.59', './content/chrysler_300.png\r\n', 3),
(25, 'BMW 7-Series', '131.99', './content/bmw_7_series.png', 3),
(26, 'Toyota Avalon', '100.59', './content/toyota_avalon.png', 3),
(27, 'Nissan Maxima', '110.99', './content/nissan_maxima.png', 3),
(28, 'Honda Accord', '139.59\r\n', './content/honda_accord.png', 3),
(29, 'Cadillac DTS', '149.99', './content/cadillac_dts.png', 3),
(30, 'Ford Taurus', '115.99', './content/ford_taurus.png', 3),
(31, 'Chevy Impala', '107.59', './content/chevy_impala.png', 3),
(32, 'Mercedes-Benz', '115.99', './content/mercedes_benz.png', 3),
(33, 'Audi A8', '121.59', './content/audi_a8.png', 3),
(34, 'Lexus LS S-Class', '135.99', './content/lexus_ls_s_class.png', 3),
(35, 'Dodge Challenger', '139.99', './content/dodge_challenger.png', 4),
(36, 'Ford Mustang', '129.99', './content/ford_mustang.png', 4),
(37, 'Chevy Camaro', '149.59', './content/chevy_camaro.png', 4),
(38, 'Honda CR-Z', '168.59', './content/honda_cr_z.png', 4),
(39, 'Mitsubishi Eclipse', '119.99', './content/mitsubishi_eclipse.png', 4),
(40, 'Nissan Z', '100.99', './content/nissan_z.png', 4),
(41, 'BMW M-Series', '105.99', './content/bmw_m_series.png', 4),
(42, 'BMW Z-Series', '110.99', './content/bmw_z_series.png', 4),
(43, 'Audi TT', '129.9', './content/audi_tt.png', 4),
(44, 'Ferrari California', '149.59', './content/ferrari_california.png', 4),
(45, 'Lamborghini Gallardo', '100.99', './content/lamborghini_gallardo.png', 4),
(46, 'Dodge Viper GTS V10', '100.99', './content/dodge_viper_gts_v10.png', 4);

CREATE TABLE `hours` (
  `id` int(11) NOT NULL,
  `label` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO `hours` (`id`, `label`) VALUES
(1, '00:00'),
(2, '01:00'),
(3, '02:00'),
(4, '03:00'),
(5, '04:00'),
(6, '05:00'),
(7, '06:00'),
(8, '07:00'),
(9, '08:00'),
(10, '09:00'),
(11, '10:00'),
(12, '11:00'),
(13, '12:00'),
(14, '13:00'),
(15, '14:00'),
(16, '15:00'),
(17, '16:00'),
(18, '17:00'),
(19, '18:00'),
(20, '19:00'),
(21, '20:00'),
(22, '21:00'),
(23, '22:00'),
(24, '23:00');

CREATE TABLE `price_ranges` (
  `id` int(11) NOT NULL,
  `minVal` int(11) NOT NULL,
  `maxVal` int(11) NOT NULL,
  `label` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO `price_ranges` (`id`, `minVal`, `maxVal`, `label`) VALUES
(1, 50, 80, 'Budget'),
(2, 80, 120, 'Premium'),
(3, 120, 150, 'Luxury');

CREATE TABLE `rents` (
  `id` int(11) NOT NULL,
  `start_date` text NOT NULL,
  `end_date` text NOT NULL,
  `text` text NOT NULL,
  `car` int(11) NOT NULL,
  `status` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO `rents` (`id`, `start_date`, `end_date`, `text`, `car`, `status`) VALUES
(1, '2017-05-17 12:00', '2017-05-21 12:00', 'Rent 1', 2, 1),
(2, '2017-05-17 11:00', '2017-05-20 11:00', 'Rent 2', 3, 2),
(3, '2017-05-17 06:00', '2017-05-21 07:00', 'Rent 3', 4, 3),
(4, '2017-05-17 00:00', '2017-05-21 22:00', 'Rent 4', 5, 1);

CREATE TABLE `statuses` (
  `id` int(11) NOT NULL,
  `label` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO `statuses` (`id`, `label`) VALUES
(1, 'Reservation'),
(2, 'Prepaid'),
(3, '100% payment');

CREATE TABLE `types` (
  `id` int(11) NOT NULL,
  `label` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO `types` (`id`, `label`) VALUES
(1, 'Compact: 11 cars'),
(2, 'Mid-size: 11 cars'),
(3, 'Full-size: 12 cars'),
(4, 'Sports car: 12 cars');


ALTER TABLE `cars`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `hours`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `price_ranges`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `rents`
  ADD UNIQUE KEY `id` (`id`);

ALTER TABLE `statuses`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `types`
  ADD PRIMARY KEY (`id`);


ALTER TABLE `cars`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=47;
ALTER TABLE `hours`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;
ALTER TABLE `price_ranges`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
ALTER TABLE `rents`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
ALTER TABLE `statuses`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
ALTER TABLE `types`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
