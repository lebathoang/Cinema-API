-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 31, 2026 at 10:55 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `db_cinema`
--

-- --------------------------------------------------------

--
-- Table structure for table `actors`
--

CREATE TABLE `actors` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `original_name` varchar(255) DEFAULT NULL,
  `avatar` varchar(500) DEFAULT NULL,
  `bio` text DEFAULT NULL,
  `birthday` date DEFAULT NULL,
  `nationality` varchar(100) DEFAULT NULL,
  `gender` enum('MALE','FEMALE','OTHER') DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `actors`
--

INSERT INTO `actors` (`id`, `name`, `original_name`, `avatar`, `bio`, `birthday`, `nationality`, `gender`, `created_at`, `updated_at`) VALUES
(1, 'Timothée Chalamet', NULL, NULL, NULL, '1995-12-27', 'USA', 'MALE', '2026-03-24 09:16:11', '2026-03-24 09:16:11'),
(2, 'Zendaya', NULL, NULL, NULL, '1996-09-01', 'USA', 'FEMALE', '2026-03-24 09:16:11', '2026-03-24 09:16:11'),
(3, 'Rebecca Ferguson', NULL, NULL, NULL, '1983-10-19', 'Sweden', 'FEMALE', '2026-03-24 09:16:11', '2026-03-24 09:16:11'),
(4, 'Josh Brolin', NULL, NULL, NULL, '1968-02-12', 'USA', 'MALE', '2026-03-24 09:16:11', '2026-03-24 09:16:11'),
(5, 'Austin Butler', NULL, NULL, NULL, '1991-08-17', 'USA', 'MALE', '2026-03-24 09:16:11', '2026-03-24 09:16:11'),
(6, 'Ryan Reynolds', NULL, NULL, NULL, '1976-10-23', 'Canada', 'MALE', '2026-03-24 09:16:11', '2026-03-24 09:16:11'),
(7, 'Hugh Jackman', NULL, NULL, NULL, '1968-10-12', 'Australia', 'MALE', '2026-03-24 09:16:11', '2026-03-24 09:16:11'),
(8, 'Emma Corrin', NULL, NULL, NULL, '1995-12-13', 'UK', 'OTHER', '2026-03-24 09:16:11', '2026-03-24 09:16:11'),
(9, 'Morena Baccarin', NULL, NULL, NULL, '1979-06-02', 'Brazil', 'FEMALE', '2026-03-24 09:16:11', '2026-03-24 09:16:11'),
(10, 'Matthew Macfadyen', NULL, NULL, NULL, '1974-10-17', 'UK', 'MALE', '2026-03-24 09:16:11', '2026-03-24 09:16:11'),
(11, 'Jack Black', NULL, NULL, NULL, '1969-08-28', 'USA', 'MALE', '2026-03-24 09:16:11', '2026-03-24 09:16:11'),
(12, 'Awkwafina', NULL, NULL, NULL, '1988-06-02', 'USA', 'FEMALE', '2026-03-24 09:16:11', '2026-03-24 09:16:11'),
(13, 'Viola Davis', NULL, NULL, NULL, '1965-08-11', 'USA', 'FEMALE', '2026-03-24 09:16:11', '2026-03-24 09:16:11'),
(14, 'Dustin Hoffman', NULL, NULL, NULL, '1937-08-08', 'USA', 'MALE', '2026-03-24 09:16:11', '2026-03-24 09:16:11'),
(15, 'James Hong', NULL, NULL, NULL, '1929-02-22', 'USA', 'MALE', '2026-03-24 09:16:11', '2026-03-24 09:16:11'),
(16, 'Amy Poehler', NULL, NULL, NULL, '1971-09-16', 'USA', 'FEMALE', '2026-03-24 09:16:11', '2026-03-24 09:16:11'),
(17, 'Phyllis Smith', NULL, NULL, NULL, '1951-07-10', 'USA', 'FEMALE', '2026-03-24 09:16:11', '2026-03-24 09:16:11'),
(18, 'Lewis Black', NULL, NULL, NULL, '1948-08-30', 'USA', 'MALE', '2026-03-24 09:16:11', '2026-03-24 09:16:11'),
(19, 'Tony Hale', NULL, NULL, NULL, '1970-09-30', 'USA', 'MALE', '2026-03-24 09:16:11', '2026-03-24 09:16:11'),
(20, 'Maya Hawke', NULL, NULL, NULL, '1998-07-08', 'USA', 'FEMALE', '2026-03-24 09:16:11', '2026-03-24 09:16:11'),
(21, 'Tom Cruise', NULL, NULL, NULL, '1962-07-03', 'USA', 'MALE', '2026-03-24 09:16:11', '2026-03-24 09:16:11'),
(22, 'Hayley Atwell', NULL, NULL, NULL, '1982-04-05', 'UK', 'FEMALE', '2026-03-24 09:16:11', '2026-03-24 09:16:11'),
(23, 'Ving Rhames', NULL, NULL, NULL, '1959-05-12', 'USA', 'MALE', '2026-03-24 09:16:11', '2026-03-24 09:16:11'),
(24, 'Simon Pegg', NULL, NULL, NULL, '1970-02-14', 'UK', 'MALE', '2026-03-24 09:16:11', '2026-03-24 09:16:11'),
(25, 'Keanu Reeves', NULL, NULL, NULL, '1964-09-02', 'Canada', 'MALE', '2026-03-24 09:16:11', '2026-03-24 09:16:11'),
(26, 'Donnie Yen', NULL, NULL, NULL, '1963-07-27', 'Hong Kong', 'MALE', '2026-03-24 09:16:11', '2026-03-24 09:16:11'),
(27, 'Bill Skarsgård', NULL, NULL, NULL, '1990-08-09', 'Sweden', 'MALE', '2026-03-24 09:16:11', '2026-03-24 09:16:11'),
(28, 'Laurence Fishburne', NULL, NULL, NULL, '1961-07-30', 'USA', 'MALE', '2026-03-24 09:16:11', '2026-03-24 09:16:11'),
(29, 'Hiroyuki Sanada', NULL, NULL, NULL, '1960-10-12', 'Japan', 'MALE', '2026-03-24 09:16:11', '2026-03-24 09:16:11');

-- --------------------------------------------------------

--
-- Table structure for table `bookings`
--

CREATE TABLE `bookings` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `showtime_id` int(11) DEFAULT NULL,
  `booking_code` varchar(50) DEFAULT NULL,
  `total_price` decimal(10,2) DEFAULT NULL,
  `status` enum('pending','paid','cancelled') DEFAULT 'pending',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `cinemas`
--

CREATE TABLE `cinemas` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  `rating` decimal(2,1) DEFAULT 0.0,
  `image` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `cinemas`
--

INSERT INTO `cinemas` (`id`, `name`, `location`, `rating`, `image`, `created_at`) VALUES
(9, 'Beta Giải Phóng', 'Tầng 3, Imperial Plaza, 360 Giải Phóng, Phương Liệt, Thanh Xuân, Hà Nội', 4.8, 'https://ghehoitruong.vn/wp-content/uploads/2022/10/beta-giai-phong-3.jpg', '2026-03-25 08:48:24'),
(10, 'Lotte Cinema Hà Đông', 'Tầng 4 Mê Linh Plaza, Tô Hiệu, Hà Đông, Tp. Hà Nội', 4.5, 'https://stcd02265632633.cloud.edgevnpay.vn/website-vnpay-public/fill/2023/6/04fui9oyugg31686977124245.jpg', '2026-03-25 08:48:24'),
(11, 'CGV Hà Đông', 'Tầng 3 & 4 – TTTM AEON MALL HÀ ĐÔNG, P. Dương Nội, Q. Hà Đông, Hà Nội', 4.4, 'https://img.tripi.vn/cdn-cgi/image/width=700,height=700/https://gcs.tripi.vn/public-tripi/tripi-feed/img/473782NOI/cgv-aeon-ha-dong-1041098.jpg', '2026-03-25 08:48:24'),
(12, 'CGV Vincom Bà Triệu', 'Tầng 6, Vincom Bà Triệu, 191 Bà Triệu, Hai Bà Trưng, Hà Nội', 4.7, 'https://kenhhomestay.com/wp-content/uploads/2019/12/rap-cgv-ba-trieu-3.jpg', '2026-03-26 09:20:58'),
(13, 'Lotte Cinema Liễu Giai', 'Tầng 6, Lotte Center, 54 Liễu Giai, Ba Đình, Hà Nội', 4.8, 'https://static.vivnpay.vn/202501231431/rap-chieu-phim-tai-ha-noi%20(4)_1199617565846224896.png', '2026-03-26 09:20:58'),
(14, 'Galaxy Cinema Nguyễn Du', '116 Nguyễn Du, Hai Bà Trưng, Hà Nội', 4.6, 'https://cdn11.dienmaycholon.vn/filewebdmclnew/public/userupload/files/kien-thuc/review-rap-chieu-phim-galaxy-nguyen-du/review-rap-chieu-phim-galaxy-nguyen-du-5.jpg', '2026-03-26 09:20:58'),
(15, 'BHD Star Phạm Ngọc Thạch', 'Tầng 8, Vincom Phạm Ngọc Thạch, Đống Đa, Hà Nội', 4.7, 'https://cdn.xanhsm.com/2025/02/9879b2a8-bhd-star-vincom-pham-ngoc-thach-7.jpg', '2026-03-26 09:20:58'),
(16, 'CGV Vincom Royal City', 'Tầng B2, Royal City, 72 Nguyễn Trãi, Thanh Xuân, Hà Nội', 4.9, 'https://down-vn.img.susercontent.com/vn-11134259-7r98o-lwgulnfy7heje0@resize_ss640x400', '2026-03-26 09:20:58'),
(18, 'Beta Cinemas Mỹ Đình', 'Tầng 3, Golden Palace, Mễ Trì, Nam Từ Liêm, Hà Nội', 4.6, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRSVa3TyZOxC9KQc4L7q-S9DUau69vwAQbEQ&s', '2026-03-26 09:20:58'),
(19, 'CGV Tràng Tiền Plaza', 'Tầng 5, Tràng Tiền Plaza, Hoàn Kiếm, Hà Nội', 4.8, 'https://flowerimages.vnpay.vn/flowerimages/cgv-trang-tien-plaza-2.png', '2026-03-26 09:20:58'),
(21, 'CGV Indochina Plaza', 'Tầng 4, Indochina Plaza, 241 Xuân Thủy, Cầu Giấy, Hà Nội', 4.7, 'https://rapchieuphim.com/photos/2/cgv/cgv-iph-ha-noi-3.png', '2026-03-26 09:20:58'),
(22, 'Lotte Cinema Tây Hồ', 'Tầng 5, Lotte Mall Tây Hồ, Hà Nội', 4.9, 'https://cdn.xanhsm.com/2024/12/3f462d20-lotte-cinema-tay-ho-8.jpg', '2026-03-26 09:20:58'),
(23, 'BHD Star Long Biên', 'Tầng 3, AEON Mall Long Biên, Hà Nội', 4.6, 'https://noithatddh.com.vn/wp-content/uploads/2022/09/Rap-chieu-phim-BHD-Star-BITEXCO-DDH-led-25.jpg', '2026-03-26 09:20:58'),
(25, 'Galaxy Cinema Mipec Long Biên', 'Tầng 5, Mipec Long Biên, Hà Nội', 4.5, 'https://cdn.galaxycine.vn/media/2023/10/31/galaxy-mipec-long-bien-3_1698745488907.jpg', '2026-03-26 09:20:58'),
(26, 'Beta Cinemas Thanh Xuân', 'Tầng 2, Vincom Nguyễn Trãi, Thanh Xuân, Hà Nội', 4.6, 'https://rapchieuphim.com/photos/3/rap-Beta-Cineplex-Thanh-Xuan.jpg', '2026-03-26 09:20:58');

-- --------------------------------------------------------

--
-- Table structure for table `cinema_features`
--

CREATE TABLE `cinema_features` (
  `cinema_id` int(11) NOT NULL,
  `feature_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `cinema_features`
--

INSERT INTO `cinema_features` (`cinema_id`, `feature_id`) VALUES
(9, 1),
(9, 2),
(9, 4),
(10, 3),
(10, 4),
(11, 4);

-- --------------------------------------------------------

--
-- Table structure for table `features`
--

CREATE TABLE `features` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `features`
--

INSERT INTO `features` (`id`, `name`) VALUES
(2, '4K Laser'),
(3, 'Dolby Atmos'),
(1, 'IMAX'),
(4, 'Recliners');

-- --------------------------------------------------------

--
-- Table structure for table `genres`
--

CREATE TABLE `genres` (
  `id` int(11) NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `slug` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `genres`
--

INSERT INTO `genres` (`id`, `name`, `slug`) VALUES
(1, 'Action', 'action'),
(2, 'Adventure', 'adventure'),
(3, 'Comedy', 'comedy'),
(4, 'Drama', 'drama'),
(5, 'Sci-Fi', 'sci-fi'),
(6, 'Fantasy', 'fantasy'),
(7, 'Animation', 'animation'),
(8, 'Family', 'family'),
(9, 'Thriller', 'thriller'),
(10, 'Crime', 'crime'),
(11, 'Superhero', 'superhero'),
(12, 'Historical', 'historical'),
(13, 'Biography', 'biography'),
(14, 'Horror', 'horror'),
(15, 'Monster', 'monster');

-- --------------------------------------------------------

--
-- Table structure for table `movies`
--

CREATE TABLE `movies` (
  `id` int(11) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `slug` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `duration` int(11) DEFAULT NULL,
  `release_date` date DEFAULT NULL,
  `language` varchar(50) DEFAULT NULL,
  `poster_url` varchar(255) DEFAULT NULL,
  `banner_url` varchar(255) DEFAULT NULL,
  `trailer_url` varchar(255) DEFAULT NULL,
  `age_rating` varchar(10) DEFAULT NULL,
  `status` enum('coming_soon','now_showing','ended') DEFAULT 'coming_soon'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `movies`
--

INSERT INTO `movies` (`id`, `title`, `slug`, `description`, `duration`, `release_date`, `language`, `poster_url`, `banner_url`, `trailer_url`, `age_rating`, `status`) VALUES
(51, 'Dune: Part Two', 'dune-part-two', 'Paul Atreides unites with the Fremen to seek revenge against the conspirators who destroyed his family.', 166, '2024-03-01', 'English', 'https://image.tmdb.org/t/p/w500/8b8R8l88Qje9dn9OE8PY05Nxl1X.jpg', 'https://image.tmdb.org/t/p/original/iq6x6dVjzNqLZ9G4fA3RrgPf63L.jpg', 'https://www.youtube.com/watch?v=Way9Dexny3w', 'PG-13', 'now_showing'),
(52, 'Deadpool & Wolverine', 'deadpool-and-wolverine', 'Deadpool teams up with Wolverine in a multiverse mission full of chaos.', 127, '2024-07-26', 'English', 'https://image.tmdb.org/t/p/w500/8cdWjvZQUExUUTzyp4t6EDMubfO.jpg', 'https://image.tmdb.org/t/p/original/eRsP6yTz8GHJX6mJm7p8VZ9pQOd.jpg', 'https://www.youtube.com/watch?v=73_1biulkYk', 'R', 'now_showing'),
(53, 'Godzilla x Kong: The New Empire', 'godzilla-x-kong-the-new-empire', 'Godzilla and Kong face a colossal undiscovered threat hidden within our world.', 115, '2024-03-29', 'English', 'https://image.tmdb.org/t/p/w500/z1p34vh7dEOnLDmyCrlUVLuoDzd.jpg', 'https://image.tmdb.org/t/p/original/zZqpAXxVSBtxV9qPBcscfXBcL2w.jpg', 'https://www.youtube.com/watch?v=qqrpMRDuPfc', 'PG-13', 'now_showing'),
(54, 'Inside Out 2', 'inside-out-2', 'Riley enters her teenage years, introducing new emotions into headquarters.', 96, '2024-06-14', 'English', 'https://image.tmdb.org/t/p/w500/vpnVM9B6NMmQpWeZvzLvDESb2QY.jpg', 'https://image.tmdb.org/t/p/original/7KgJY5zC1nP6jG3Z4bVqCzv3z1A.jpg', 'https://www.youtube.com/watch?v=LEjhY15eCx0', 'G', 'now_showing'),
(55, 'Kung Fu Panda 4', 'kung-fu-panda-4', 'Po becomes the Spiritual Leader of the Valley of Peace.', 94, '2024-03-08', 'English', 'https://image.tmdb.org/t/p/w500/nqXsAaQsKw2gKpkfhIgjXNDRqg7.jpg', 'https://image.tmdb.org/t/p/original/jk4K8H7m7oH4yS9N3bHq8bA3LkU.jpg', 'https://www.youtube.com/watch?v=_inKs4eeHiI', 'PG', 'now_showing'),
(56, 'Gladiator II', 'gladiator-2', 'Lucius must enter the Colosseum after his home is conquered.', 148, '2024-11-22', 'English', 'https://image.tmdb.org/t/p/w500/2cxhvwyEwRlysAmRH4iodkvo0z5.jpg', 'https://image.tmdb.org/t/p/original/9yBVqNruk6Ykrwc32qrK2TIE5xw.jpg', 'https://www.youtube.com/watch?v=4rgYUipGJNo', 'R', 'coming_soon'),
(57, 'Joker: Folie à Deux', 'joker-folie-a-deux', 'Arthur Fleck finds love in Arkham Asylum with Harley Quinn.', 138, '2024-10-04', 'English', 'https://image.tmdb.org/t/p/w500/if8QiqCI7WAGImKcJCfzp6VTyKA.jpg', 'https://image.tmdb.org/t/p/original/zfbjgQE1uSd9wiPTX4VzsLi0rGG.jpg', 'https://www.youtube.com/watch?v=XYtF9V1d0i0', 'R', 'now_showing'),
(58, 'Alien: Romulus', 'alien-romulus', 'A group of young colonizers encounter the most terrifying life form in the universe.', 119, '2024-08-16', 'English', 'https://image.tmdb.org/t/p/w500/8uUU2pxm6IYZw8UgnKJyx7Dqwu9.jpg', 'https://image.tmdb.org/t/p/original/3xwE1G6m9b7yWnS5kXg4bQ9vZ7S.jpg', 'https://www.youtube.com/watch?v=x0XDEhP4MQs', 'R', 'now_showing'),
(59, 'The Fall Guy', 'the-fall-guy', 'A stuntman must track down a missing movie star while solving a conspiracy.', 126, '2024-05-03', 'English', 'https://image.tmdb.org/t/p/w500/aBkqu7EddWK7qmY4grL4I6edx2h.jpg', 'https://image.tmdb.org/t/p/original/hpU2cHC9tk90hswCFEpf5AtbqoL.jpg', 'https://www.youtube.com/watch?v=j7jPnwVGdZ8', 'PG-13', 'now_showing'),
(60, 'Civil War', 'civil-war', 'A team of journalists travel across a dystopian America during a civil war.', 109, '2024-04-12', 'English', 'https://image.tmdb.org/t/p/w500/sh7Rg8Er3tFcN9BpKIPOMvALgZd.jpg', 'https://image.tmdb.org/t/p/original/en971MEXui9diirXlogOrPKmsEn.jpg', 'https://www.youtube.com/watch?v=aDyQxtg0V2w', 'R', 'now_showing'),
(61, 'Furiosa: A Mad Max Saga', 'furiosa-mad-max-saga', 'The origin story of renegade warrior Furiosa.', 148, '2024-05-24', 'English', 'https://image.tmdb.org/t/p/w500/iADOJ8Zymht2JPMoy3R7xceZprc.jpg', 'https://image.tmdb.org/t/p/original/2VUyG8H5F0p1GvXzLhYpQ0n0S4N.jpg', 'https://www.youtube.com/watch?v=XJMuhwVlca4', 'R', 'now_showing'),
(62, 'Kingdom of the Planet of the Apes', 'kingdom-of-the-planet-of-the-apes', 'Many years after Caesar’s reign, a young ape embarks on a journey.', 145, '2024-05-10', 'English', 'https://image.tmdb.org/t/p/w500/gKkl37BQuKTanygYQG1pyYgLVgf.jpg', 'https://image.tmdb.org/t/p/original/8rpDcsfLJypbO6vREc0547VKqEv.jpg', 'https://www.youtube.com/watch?v=XtFI7SNtVpY', 'PG-13', 'now_showing'),
(63, 'The Batman Part II', 'the-batman-part-2', 'Batman faces new threats in Gotham City.', 160, '2026-10-02', 'English', 'https://image.tmdb.org/t/p/w500/74xTEgt7R36Fpooo50r9T25onhq.jpg', 'https://image.tmdb.org/t/p/original/b0PlSFdDwbyK0cf5RxwDpaOJQvQ.jpg', 'https://www.youtube.com/watch?v=mqqft2x_Aa4', 'PG-13', 'coming_soon'),
(64, 'Mission: Impossible – Dead Reckoning', 'mission-impossible-dead-reckoning', 'Ethan Hunt and IMF team must track down a dangerous AI weapon.', 163, '2023-07-12', 'English', 'https://image.tmdb.org/t/p/w500/NNxYkU70HPurnNCSiCjYAmacwm.jpg', 'https://image.tmdb.org/t/p/original/2e853FDVSIso600RqAMunPxiZjq.jpg', 'https://www.youtube.com/watch?v=avz06PDqDbM', 'PG-13', 'now_showing'),
(65, 'John Wick: Chapter 4', 'john-wick-chapter-4', 'John Wick uncovers a path to defeating the High Table.', 169, '2023-03-24', 'English', 'https://image.tmdb.org/t/p/w500/vZloFAK7NmvMGKE7VkF5UHaz0I.jpg', 'https://image.tmdb.org/t/p/original/vVPY0d9TnC0vG3n0zqQq0r4V6gM.jpg', 'https://www.youtube.com/watch?v=qEVUtrk8_B4', 'R', 'now_showing'),
(66, 'Oppenheimer', 'oppenheimer', 'The story of J. Robert Oppenheimer and the atomic bomb.', 180, '2023-07-21', 'English', 'https://image.tmdb.org/t/p/w500/ptpr0kGAckfQkJeJIt8st5dglvd.jpg', 'https://image.tmdb.org/t/p/original/fm6KqXpk3M2HVveHwCrBSSBaO0V.jpg', 'https://www.youtube.com/watch?v=uYPbbksJxIg', 'R', 'now_showing'),
(67, 'Barbie', 'barbie', 'Barbie and Ken journey from Barbie Land to the real world.', 114, '2023-07-21', 'English', 'https://image.tmdb.org/t/p/w500/iuFNMS8U5cb6xfzi51Dbkovj7vM.jpg', 'https://image.tmdb.org/t/p/original/ctMserH8g2SeOAnCw5gFjdQF8mo.jpg', 'https://www.youtube.com/watch?v=pBk4NYhWNMM', 'PG-13', 'now_showing'),
(68, 'The Marvels', 'the-marvels', 'Captain Marvel joins forces with Ms. Marvel and Monica Rambeau.', 105, '2023-11-10', 'English', 'https://image.tmdb.org/t/p/w500/Ag3D9qXjhJ2FUkrlJ0Cv1pgxqYQ.jpg', 'https://image.tmdb.org/t/p/original/4XM8DUTQb3lhLemJC51Jx4a2EuA.jpg', 'https://www.youtube.com/watch?v=wS_qbDztgVY', 'PG-13', 'now_showing'),
(69, 'Aquaman and the Lost Kingdom', 'aquaman-lost-kingdom', 'Aquaman must protect Atlantis from Black Manta.', 124, '2023-12-20', 'English', 'https://image.tmdb.org/t/p/w500/7lTnXOy0iNtBAdRP3TZvaKJ77F6.jpg', 'https://image.tmdb.org/t/p/original/7I6VUdPj6tQECNHdviJkUHD2u89.jpg', 'https://www.youtube.com/watch?v=FV3bqvOHRQo', 'PG-13', 'now_showing'),
(70, 'Transformers: Rise of the Beasts', 'transformers-rise-of-the-beasts', 'Autobots team up with Maximals to save Earth.', 127, '2023-06-09', 'English', 'https://image.tmdb.org/t/p/w500/gPbM0MK8CP8A174rmUwGsADNYKD.jpg', 'https://image.tmdb.org/t/p/original/7vtt0B2aRaGdH0mG9pQ8f1H7d3G.jpg', 'https://www.youtube.com/watch?v=itnqEauWQZM', 'PG-13', 'now_showing'),
(71, 'Spider-Man: Across the Spider-Verse', 'spider-man-across-spider-verse', 'Miles Morales travels across the multiverse.', 140, '2023-06-02', 'English', 'https://image.tmdb.org/t/p/w500/8Vt6mWEReuy4Of61Lnj5Xj704m8.jpg', 'https://image.tmdb.org/t/p/original/8rpDcsfLJypbO6vREc0547VKqEv.jpg', 'https://www.youtube.com/watch?v=cqGjhVJWtEg', 'PG', 'now_showing'),
(72, 'Black Panther: Wakanda Forever', 'wakanda-forever', 'Wakanda faces new threats after King T’Challa’s death.', 161, '2022-11-11', 'English', 'https://image.tmdb.org/t/p/w500/sv1xJUazXeYqALzczSZ3O6nkH75.jpg', 'https://image.tmdb.org/t/p/original/yYrvN5WFeGYjJnRzhY0QXuo4Isw.jpg', 'https://www.youtube.com/watch?v=_Z3QKkl1WyM', 'PG-13', 'now_showing'),
(73, 'Avatar: The Way of Water', 'avatar-way-of-water', 'Jake Sully lives with his new family on Pandora.', 192, '2022-12-16', 'English', 'https://image.tmdb.org/t/p/w500/t6HIqrRAclMCA60NsSmeqe9RmNV.jpg', 'https://image.tmdb.org/t/p/original/s16H6tpK2utvwDtzZ8Qy4qm5Emw.jpg', 'https://www.youtube.com/watch?v=d9MyW72ELq0', 'PG-13', 'now_showing'),
(74, 'Top Gun: Maverick', 'top-gun-maverick', 'Maverick trains a new generation of pilots.', 130, '2022-05-27', 'English', 'https://image.tmdb.org/t/p/w500/62HCnUTziyWcpDaBO2i1DX17ljH.jpg', 'https://image.tmdb.org/t/p/original/odJ4hx6g6vBt4lBWKFD1tI8WS4x.jpg', 'https://www.youtube.com/watch?v=giXco2jaZ_4', 'PG-13', 'now_showing'),
(75, 'The Flash', 'the-flash', 'Barry Allen travels through time to save his mother.', 144, '2023-06-16', 'English', 'https://image.tmdb.org/t/p/w500/rktDFPbfHfUbArZ6OOOKsXcv0Bm.jpg', 'https://image.tmdb.org/t/p/original/yF1eOkaYvwiORauRCPWznV9xVvi.jpg', 'https://www.youtube.com/watch?v=hebWYacbdvc', 'PG-13', 'now_showing'),
(76, 'Doctor Strange in the Multiverse of Madness', 'doctor-strange-multiverse-madness', 'Doctor Strange opens the multiverse.', 126, '2022-05-06', 'English', 'https://image.tmdb.org/t/p/w500/9Gtg2DzBhmYamXBS1hKAhiwbBKS.jpg', 'https://image.tmdb.org/t/p/original/1qIg5KF7DRsS9WQKZ4aQ6t1sWnC.jpg', 'https://www.youtube.com/watch?v=aWzlQ2N6qqg', 'PG-13', 'now_showing'),
(77, 'Thor: Love and Thunder', 'thor-love-and-thunder', 'Thor teams up with Valkyrie to battle Gorr.', 119, '2022-07-08', 'English', 'https://image.tmdb.org/t/p/w500/pIkRyD18kl4FhoCNQuWxWu5cBLM.jpg', 'https://image.tmdb.org/t/p/original/8c4a8kE7PizaGQQnditMmI1xbRp.jpg', 'https://www.youtube.com/watch?v=Go8nTmfrQd8', 'PG-13', 'now_showing'),
(78, 'Black Adam', 'black-adam', 'Nearly 5000 years after being imprisoned, Black Adam is unleashed.', 125, '2022-10-21', 'English', 'https://image.tmdb.org/t/p/w500/pFlaoHTZeyNkG83vxsAJiGzfSsa.jpg', 'https://image.tmdb.org/t/p/original/9zcbqSxdsRMZWHYtyCd1nXPr2xq.jpg', 'https://www.youtube.com/watch?v=X0tOpBuYasI', 'PG-13', 'now_showing'),
(79, 'Shazam! Fury of the Gods', 'shazam-fury-of-the-gods', 'The Shazam family battles the daughters of Atlas.', 130, '2023-03-17', 'English', 'https://image.tmdb.org/t/p/w500/A3ZbZsmsvNGdprRi2lKgGEeVLEH.jpg', 'https://image.tmdb.org/t/p/original/cUe0g0GqKxYgVqvVHTYtY1pQ4G1.jpg', 'https://www.youtube.com/watch?v=AIc671o9yCI', 'PG-13', 'now_showing'),
(80, 'The Super Mario Bros. Movie', 'super-mario-bros-movie', 'Mario and Luigi travel through the Mushroom Kingdom.', 92, '2023-04-05', 'English', 'https://image.tmdb.org/t/p/w500/qNBAXBIQlnOThrVvA6mA2B5ggV6.jpg', 'https://image.tmdb.org/t/p/original/9n2tJBplPbgR2ca05hS5CKXwP2c.jpg', 'https://www.youtube.com/watch?v=TnGl01FkMMo', 'PG', 'now_showing');

-- --------------------------------------------------------

--
-- Table structure for table `movie_cast`
--

CREATE TABLE `movie_cast` (
  `id` int(11) NOT NULL,
  `movie_id` int(11) NOT NULL,
  `actor_id` int(11) NOT NULL,
  `character_name` varchar(255) DEFAULT NULL,
  `role_type` enum('ACTING','VOICE') NOT NULL,
  `is_main` tinyint(1) DEFAULT 0,
  `cast_order` int(11) DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `movie_cast`
--

INSERT INTO `movie_cast` (`id`, `movie_id`, `actor_id`, `character_name`, `role_type`, `is_main`, `cast_order`, `created_at`) VALUES
(1, 51, 1, 'Paul Atreides', 'ACTING', 1, 1, '2026-03-24 09:16:11'),
(2, 51, 2, 'Chani', 'ACTING', 1, 2, '2026-03-24 09:16:11'),
(3, 51, 3, 'Lady Jessica', 'ACTING', 0, 3, '2026-03-24 09:16:11'),
(4, 51, 4, 'Gurney Halleck', 'ACTING', 0, 4, '2026-03-24 09:16:11'),
(5, 51, 5, 'Feyd-Rautha', 'ACTING', 0, 5, '2026-03-24 09:16:11'),
(6, 52, 6, 'Deadpool', 'ACTING', 1, 1, '2026-03-24 09:16:11'),
(7, 52, 7, 'Wolverine', 'ACTING', 1, 2, '2026-03-24 09:16:11'),
(8, 52, 8, 'Villain', 'ACTING', 0, 3, '2026-03-24 09:16:11'),
(9, 52, 9, 'Vanessa', 'ACTING', 0, 4, '2026-03-24 09:16:11'),
(10, 52, 10, 'Paradox', 'ACTING', 0, 5, '2026-03-24 09:16:11'),
(11, 54, 16, 'Joy', 'VOICE', 1, 1, '2026-03-24 09:16:11'),
(12, 54, 17, 'Sadness', 'VOICE', 1, 2, '2026-03-24 09:16:11'),
(13, 54, 18, 'Anger', 'VOICE', 0, 3, '2026-03-24 09:16:11'),
(14, 54, 19, 'Fear', 'VOICE', 0, 4, '2026-03-24 09:16:11'),
(15, 54, 20, 'Anxiety', 'VOICE', 0, 5, '2026-03-24 09:16:11'),
(16, 55, 11, 'Po', 'VOICE', 1, 1, '2026-03-24 09:16:11'),
(17, 55, 12, 'Zhen', 'VOICE', 1, 2, '2026-03-24 09:16:11'),
(18, 55, 13, 'Villain', 'VOICE', 0, 3, '2026-03-24 09:16:11'),
(19, 55, 14, 'Shifu', 'VOICE', 0, 4, '2026-03-24 09:16:11'),
(20, 55, 15, 'Mr. Ping', 'VOICE', 0, 5, '2026-03-24 09:16:11'),
(21, 64, 21, 'Ethan Hunt', 'ACTING', 1, 1, '2026-03-24 09:16:11'),
(22, 64, 22, 'Grace', 'ACTING', 1, 2, '2026-03-24 09:16:11'),
(23, 64, 23, 'Luther', 'ACTING', 0, 3, '2026-03-24 09:16:11'),
(24, 64, 24, 'Benji', 'ACTING', 0, 4, '2026-03-24 09:16:11'),
(25, 64, 3, 'Ilsa', 'ACTING', 0, 5, '2026-03-24 09:16:11'),
(26, 65, 25, 'John Wick', 'ACTING', 1, 1, '2026-03-24 09:16:11'),
(27, 65, 26, 'Caine', 'ACTING', 1, 2, '2026-03-24 09:16:11'),
(28, 65, 27, 'Marquis', 'ACTING', 0, 3, '2026-03-24 09:16:11'),
(29, 65, 28, 'Bowery King', 'ACTING', 0, 4, '2026-03-24 09:16:11'),
(30, 65, 29, 'Shimazu', 'ACTING', 0, 5, '2026-03-24 09:16:11');

-- --------------------------------------------------------

--
-- Table structure for table `movie_genres`
--

CREATE TABLE `movie_genres` (
  `id` int(11) NOT NULL,
  `movie_id` int(11) DEFAULT NULL,
  `genre_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `movie_genres`
--

INSERT INTO `movie_genres` (`id`, `movie_id`, `genre_id`) VALUES
(1, 51, 5),
(2, 51, 2),
(3, 52, 1),
(4, 52, 3),
(5, 52, 11),
(6, 53, 1),
(7, 53, 15),
(8, 53, 5),
(9, 54, 7),
(10, 54, 8),
(11, 54, 3),
(12, 55, 7),
(13, 55, 1),
(14, 55, 3),
(15, 56, 1),
(16, 56, 4),
(17, 56, 12),
(18, 57, 4),
(19, 57, 10),
(20, 57, 9),
(21, 58, 14),
(22, 58, 5),
(23, 58, 9),
(24, 59, 1),
(25, 59, 3),
(26, 60, 4),
(27, 60, 9),
(28, 61, 1),
(29, 61, 2),
(30, 61, 5),
(31, 62, 5),
(32, 62, 2),
(33, 63, 1),
(34, 63, 10),
(35, 63, 11),
(36, 64, 1),
(37, 64, 9),
(38, 65, 1),
(39, 65, 10),
(40, 66, 4),
(41, 66, 13),
(42, 67, 3),
(43, 67, 6),
(44, 73, 5),
(45, 73, 2),
(46, 71, 7),
(47, 71, 11),
(48, 72, 1),
(49, 72, 2),
(50, 72, 11),
(51, 73, 5),
(52, 73, 2),
(53, 73, 6),
(54, 74, 1),
(55, 74, 4),
(56, 75, 1),
(57, 75, 5),
(58, 75, 11),
(59, 76, 1),
(60, 76, 6),
(61, 76, 11),
(62, 77, 1),
(63, 77, 6),
(64, 77, 11),
(65, 78, 1),
(66, 78, 6),
(67, 78, 11),
(68, 79, 1),
(69, 79, 3),
(70, 79, 11),
(71, 80, 7),
(72, 80, 2),
(73, 80, 8);

-- --------------------------------------------------------

--
-- Table structure for table `offers`
--

CREATE TABLE `offers` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `discount_value` varchar(50) NOT NULL,
  `code` varchar(50) NOT NULL,
  `icon` varchar(50) DEFAULT NULL,
  `color` varchar(50) DEFAULT NULL,
  `terms` text DEFAULT NULL,
  `start_date` datetime DEFAULT NULL,
  `end_date` datetime DEFAULT NULL,
  `usage_limit` int(11) DEFAULT NULL,
  `usage_count` int(11) DEFAULT 0,
  `is_active` tinyint(1) DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ;

--
-- Dumping data for table `offers`
--

INSERT INTO `offers` (`id`, `title`, `description`, `discount_value`, `code`, `icon`, `color`, `terms`, `start_date`, `end_date`, `usage_limit`, `usage_count`, `is_active`, `created_at`) VALUES
(1, 'Student Monday', 'Get 50% off on all movie tickets every Monday. Valid student ID required.', '50% OFF', '', 'Percent', 'bg-blue-500', 'Valid only on Mondays for 2D movies.', NULL, NULL, NULL, 0, 1, '2026-03-30 14:24:36'),
(2, 'Family Bundle', 'Special price for families of 4 or more. Includes large popcorn and drinks.', 'SAVE $20', '', 'Users', 'bg-purple-500', 'Minimum 2 adults and 2 children.', NULL, NULL, NULL, 0, 1, '2026-03-30 14:24:36'),
(3, 'Bank Card Promo', 'Buy 1 Get 1 Free when you pay with your Premiere Platinum Card.', 'B1G1 FREE', '', 'CreditCard', 'bg-amber-500', 'Available for Premiere Platinum cardholders only.', NULL, NULL, NULL, 0, 1, '2026-03-30 14:24:36'),
(4, 'Birthday Special', 'Watch a movie for free on your birthday! Bring a friend along.', 'FREE TICKET', '', 'Gift', 'bg-pink-500', 'Valid on the day of your birthday only.', NULL, NULL, NULL, 0, 1, '2026-03-30 14:24:36'),
(8, 'New User Discount', 'Get $5 off on your first booking', '5', 'FIRST10', NULL, NULL, NULL, NULL, NULL, NULL, 0, 1, '2026-03-30 14:33:56'),
(9, 'Weekend Special', '15% discount on weekend shows', '3.5', 'WEEKEND15', NULL, NULL, NULL, NULL, NULL, NULL, 0, 1, '2026-03-30 14:33:56'),
(10, 'Combo Deal', 'Free small popcorn with this booking', '0', 'FREEPOP', NULL, NULL, NULL, NULL, NULL, NULL, 0, 1, '2026-03-30 14:33:56');

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `showtime_id` int(11) NOT NULL,
  `total_price` decimal(10,2) NOT NULL CHECK (`total_price` >= 0),
  `status` enum('PENDING','PAID','FAILED') NOT NULL DEFAULT 'PENDING',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `payments`
--

CREATE TABLE `payments` (
  `id` int(11) NOT NULL,
  `order_id` int(11) NOT NULL,
  `provider` enum('momo','vnpay','cash') DEFAULT NULL,
  `amount` decimal(10,2) DEFAULT NULL,
  `status` enum('PENDING','SUCCESS','FAILED') DEFAULT 'PENDING',
  `transaction_code` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `reset_tokens`
--

CREATE TABLE `reset_tokens` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `token` varchar(250) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `expires_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `rooms`
--

CREATE TABLE `rooms` (
  `id` int(11) NOT NULL,
  `cinema_id` int(11) DEFAULT NULL,
  `name` varchar(50) DEFAULT NULL,
  `total_seats` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `rooms`
--

INSERT INTO `rooms` (`id`, `cinema_id`, `name`, `total_seats`) VALUES
(3, 21, 'Room 1 - Standard', 120),
(4, 12, 'Room 2 - IMAX', 150),
(5, 10, 'Room 1 - Premium', 110),
(9, 9, 'Room 1 - Standard', 100),
(10, 10, 'Room 2 - VIP', 80),
(11, 11, 'Room 1 - Premium', 110),
(12, 18, 'Room 1 - Premium', 110),
(13, 26, 'Room 2 - VIP', 80),
(14, 12, 'Room 2 - VIP', 80),
(15, 13, 'Room 1 - Standard', 120),
(16, 13, 'Room 1 - Premium', 110),
(17, 14, 'Room 2 - IMAX', 150),
(18, 14, 'Room 1 - Premium', 110),
(19, 15, 'Room 2 - VIP', 80),
(20, 9, 'Room 1 - Standard', 120),
(21, 19, 'Room 1 - Standard', 120),
(22, 18, 'Room 1 - Standard', 120),
(23, 22, 'Room 2 - VIP', 80),
(24, 23, 'Room 1 - Premium', 110),
(25, 25, 'Room 2 - VIP', 80),
(26, 26, 'Room 1 - Premium', 110);

-- --------------------------------------------------------

--
-- Table structure for table `seats`
--

CREATE TABLE `seats` (
  `id` int(11) NOT NULL,
  `room_id` int(11) DEFAULT NULL,
  `seat_row` char(1) DEFAULT NULL,
  `seat_number` int(11) DEFAULT NULL,
  `type` enum('normal','vip','couple') DEFAULT 'normal'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `seat_bookings`
--

CREATE TABLE `seat_bookings` (
  `id` int(11) NOT NULL,
  `show_time_id` int(11) NOT NULL,
  `seat_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `status` enum('HOLD','BOOKED') DEFAULT 'HOLD',
  `expires_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `showtimes`
--

CREATE TABLE `showtimes` (
  `id` int(11) NOT NULL,
  `movie_id` int(11) DEFAULT NULL,
  `room_id` int(11) DEFAULT NULL,
  `start_time` datetime DEFAULT NULL,
  `end_time` datetime DEFAULT NULL,
  `price` decimal(10,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `showtimes`
--

INSERT INTO `showtimes` (`id`, `movie_id`, `room_id`, `start_time`, `end_time`, `price`) VALUES
(1, 51, 9, '2026-03-25 09:00:00', '2026-03-25 11:46:00', 120000.00),
(2, 51, 9, '2026-03-19 13:00:00', '2026-03-19 15:46:00', 140000.00),
(3, 52, 10, '2026-03-20 10:00:00', '2026-03-20 12:07:00', 130000.00),
(4, 52, 10, '2026-03-21 15:00:00', '2026-03-21 17:07:00', 150000.00),
(5, 53, 12, '2026-03-22 09:30:00', '2026-03-22 11:25:00', 110000.00),
(6, 53, 13, '2026-03-18 14:00:00', '2026-03-18 15:55:00', 130000.00),
(7, 54, 14, '2026-03-19 08:30:00', '2026-03-19 10:06:00', 90000.00),
(8, 54, 15, '2026-03-20 11:00:00', '2026-03-20 12:36:00', 100000.00),
(9, 55, 16, '2026-03-21 09:00:00', '2026-03-21 10:34:00', 90000.00),
(10, 55, 17, '2026-03-22 13:00:00', '2026-03-22 14:34:00', 100000.00),
(11, 56, 9, '2026-03-18 18:00:00', '2026-03-18 20:28:00', 150000.00),
(12, 57, 10, '2026-03-19 19:00:00', '2026-03-19 21:18:00', 150000.00),
(13, 58, 18, '2026-03-20 20:00:00', '2026-03-20 21:59:00', 140000.00),
(14, 59, 19, '2026-03-21 16:00:00', '2026-03-21 18:06:00', 130000.00),
(15, 60, 20, '0000-00-00 00:00:00', '2026-03-22 18:49:00', 130000.00),
(16, 61, 9, '2026-03-18 21:00:00', '2026-03-18 23:28:00', 150000.00),
(17, 62, 10, '2026-03-19 18:30:00', '2026-03-19 20:55:00', 140000.00),
(18, 64, 21, '2026-03-20 19:00:00', '2026-03-20 21:43:00', 150000.00),
(19, 65, 22, '2026-03-21 20:00:00', '2026-03-21 22:49:00', 150000.00),
(20, 66, 22, '2026-03-23 18:00:00', '2026-03-23 21:00:00', 150000.00),
(21, 67, 9, '2026-03-18 10:00:00', '2026-03-18 11:54:00', 110000.00),
(22, 68, 10, '2026-03-19 12:00:00', '2026-03-19 13:45:00', 120000.00),
(23, 69, 23, '2026-03-20 14:00:00', '2026-03-20 16:04:00', 130000.00),
(24, 70, 24, '2026-03-21 15:00:00', '2026-03-21 17:07:00', 130000.00),
(25, 71, 25, '2026-03-23 16:00:00', '2026-03-23 18:20:00', 140000.00),
(26, 72, 9, '2026-03-24 17:00:00', '2026-03-24 19:41:00', 140000.00),
(27, 73, 10, '2026-03-24 19:00:00', '2026-03-24 22:12:00', 150000.00),
(28, 74, 26, '2026-03-25 11:00:00', '2026-03-25 13:10:00', 120000.00),
(29, 75, 26, '2026-03-23 13:00:00', '2026-03-23 15:24:00', 120000.00);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `fullname` varchar(100) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `role` enum('user','admin') DEFAULT 'user',
  `is_active` tinyint(1) DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `fullname`, `email`, `password`, `phone`, `avatar`, `role`, `is_active`, `created_at`) VALUES
(2, 'Tran Thi Binh', 'binh.tran@example.com', '$2b$10$KIXID3Y2ZJ3mQ5mYh6gCjeKjz2qvYQ8FQwZ9WzQn2f4J0p1K3V7aG', '0987654321', 'https://i.pravatar.cc/300?img=32', 'user', 0, '2026-03-12 16:32:42'),
(8, 'Lê Bật Hoàng', 'lebathoang1177@gmail.com', '$2b$10$UsFdFn4.kDNw.p.uVwSb8.y9zdmAkI7hWug4yWX47LTd9rkX5hHxS', NULL, NULL, 'user', 1, '2026-03-13 15:54:16');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `actors`
--
ALTER TABLE `actors`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `bookings`
--
ALTER TABLE `bookings`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `showtime_id` (`showtime_id`);

--
-- Indexes for table `cinemas`
--
ALTER TABLE `cinemas`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `cinema_features`
--
ALTER TABLE `cinema_features`
  ADD PRIMARY KEY (`cinema_id`,`feature_id`),
  ADD KEY `feature_id` (`feature_id`);

--
-- Indexes for table `features`
--
ALTER TABLE `features`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `genres`
--
ALTER TABLE `genres`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `movies`
--
ALTER TABLE `movies`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `movie_cast`
--
ALTER TABLE `movie_cast`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_movie_cast_movie` (`movie_id`),
  ADD KEY `fk_movie_cast_actor` (`actor_id`);

--
-- Indexes for table `movie_genres`
--
ALTER TABLE `movie_genres`
  ADD PRIMARY KEY (`id`),
  ADD KEY `movie_id` (`movie_id`),
  ADD KEY `genre_id` (`genre_id`);

--
-- Indexes for table `offers`
--
ALTER TABLE `offers`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_orders_user` (`user_id`),
  ADD KEY `fk_orders_showtime` (`showtime_id`);

--
-- Indexes for table `payments`
--
ALTER TABLE `payments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_payment_order` (`order_id`);

--
-- Indexes for table `reset_tokens`
--
ALTER TABLE `reset_tokens`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `rooms`
--
ALTER TABLE `rooms`
  ADD PRIMARY KEY (`id`),
  ADD KEY `cinema_id` (`cinema_id`);

--
-- Indexes for table `seats`
--
ALTER TABLE `seats`
  ADD PRIMARY KEY (`id`),
  ADD KEY `room_id` (`room_id`);

--
-- Indexes for table `seat_bookings`
--
ALTER TABLE `seat_bookings`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `unique_seat_booking` (`show_time_id`,`seat_id`),
  ADD KEY `fk_seat` (`seat_id`),
  ADD KEY `fk_user` (`user_id`);

--
-- Indexes for table `showtimes`
--
ALTER TABLE `showtimes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `movie_id` (`movie_id`),
  ADD KEY `showtimes_ibfk_2` (`room_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `actors`
--
ALTER TABLE `actors`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT for table `bookings`
--
ALTER TABLE `bookings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `cinemas`
--
ALTER TABLE `cinemas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT for table `features`
--
ALTER TABLE `features`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `genres`
--
ALTER TABLE `genres`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `movies`
--
ALTER TABLE `movies`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=81;

--
-- AUTO_INCREMENT for table `movie_cast`
--
ALTER TABLE `movie_cast`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT for table `movie_genres`
--
ALTER TABLE `movie_genres`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=74;

--
-- AUTO_INCREMENT for table `offers`
--
ALTER TABLE `offers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `payments`
--
ALTER TABLE `payments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `reset_tokens`
--
ALTER TABLE `reset_tokens`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `rooms`
--
ALTER TABLE `rooms`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT for table `seats`
--
ALTER TABLE `seats`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `seat_bookings`
--
ALTER TABLE `seat_bookings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `showtimes`
--
ALTER TABLE `showtimes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `bookings`
--
ALTER TABLE `bookings`
  ADD CONSTRAINT `bookings_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `bookings_ibfk_2` FOREIGN KEY (`showtime_id`) REFERENCES `showtimes` (`id`);

--
-- Constraints for table `cinema_features`
--
ALTER TABLE `cinema_features`
  ADD CONSTRAINT `cinema_features_ibfk_1` FOREIGN KEY (`cinema_id`) REFERENCES `cinemas` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `cinema_features_ibfk_2` FOREIGN KEY (`feature_id`) REFERENCES `features` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `movie_cast`
--
ALTER TABLE `movie_cast`
  ADD CONSTRAINT `fk_movie_cast_actor` FOREIGN KEY (`actor_id`) REFERENCES `actors` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_movie_cast_movie` FOREIGN KEY (`movie_id`) REFERENCES `movies` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `movie_genres`
--
ALTER TABLE `movie_genres`
  ADD CONSTRAINT `movie_genres_ibfk_1` FOREIGN KEY (`movie_id`) REFERENCES `movies` (`id`),
  ADD CONSTRAINT `movie_genres_ibfk_2` FOREIGN KEY (`genre_id`) REFERENCES `genres` (`id`);

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `fk_orders_showtime` FOREIGN KEY (`showtime_id`) REFERENCES `showtimes` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_orders_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `payments`
--
ALTER TABLE `payments`
  ADD CONSTRAINT `fk_payment_order` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `reset_tokens`
--
ALTER TABLE `reset_tokens`
  ADD CONSTRAINT `reset_tokens_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `rooms`
--
ALTER TABLE `rooms`
  ADD CONSTRAINT `rooms_ibfk_1` FOREIGN KEY (`cinema_id`) REFERENCES `cinemas` (`id`);

--
-- Constraints for table `seats`
--
ALTER TABLE `seats`
  ADD CONSTRAINT `seats_ibfk_1` FOREIGN KEY (`room_id`) REFERENCES `rooms` (`id`);

--
-- Constraints for table `seat_bookings`
--
ALTER TABLE `seat_bookings`
  ADD CONSTRAINT `fk_seat` FOREIGN KEY (`seat_id`) REFERENCES `seats` (`id`),
  ADD CONSTRAINT `fk_show_time` FOREIGN KEY (`show_time_id`) REFERENCES `showtimes` (`id`),
  ADD CONSTRAINT `fk_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `showtimes`
--
ALTER TABLE `showtimes`
  ADD CONSTRAINT `showtimes_ibfk_1` FOREIGN KEY (`movie_id`) REFERENCES `movies` (`id`),
  ADD CONSTRAINT `showtimes_ibfk_2` FOREIGN KEY (`room_id`) REFERENCES `rooms` (`id`) ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
