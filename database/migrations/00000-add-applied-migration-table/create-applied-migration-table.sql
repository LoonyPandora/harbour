CREATE TABLE `applied_migration` (
  `migration` text NOT NULL,
  `applied_timestamp` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`migration`(255))
) ENGINE=InnoDB DEFAULT CHARSET=utf8;