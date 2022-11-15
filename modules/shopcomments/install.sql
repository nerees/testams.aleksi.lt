CREATE TABLE IF NOT EXISTS `PREFIX_shop_comment` (
  `id_shop_comment` int(10) unsigned NOT NULL auto_increment,
  `id_customer` int(10) unsigned NOT NULL,
  `id_guest` int(10) unsigned NULL,
  `title` varchar(64) NULL,
  `content` text NOT NULL,
  `customer_name` varchar(64) NULL,
  `customer_email` varchar(128) NULL,
  `grade` float unsigned NOT NULL,
  `validate` tinyint(1) NOT NULL,
  `deleted` tinyint(1) NOT NULL,
  `date_add` datetime NOT NULL,
  PRIMARY KEY (`id_shop_comment`),
  KEY `id_customer` (`id_customer`),
  KEY `id_guest` (`id_guest`)
) ENGINE=ENGINE_TYPE  DEFAULT CHARSET=utf8;

