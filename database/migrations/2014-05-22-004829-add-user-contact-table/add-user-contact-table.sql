CREATE TABLE `user_contact` (
  `user_id` int(11) unsigned NOT NULL,
  `contact_description` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `address` text,
  `postcode` varchar(32) DEFAULT NULL,
  `country` char(2) DEFAULT NULL,
  `telephone` varchar(32) DEFAULT NULL,
  `trading_name` varchar(255) DEFAULT NULL,
  `eu_vat_number` varchar(32) DEFAULT NULL,
  `alternative_email` varchar(255) DEFAULT NULL,
  KEY `user_id` (`user_id`),
  CONSTRAINT `user_contact_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
