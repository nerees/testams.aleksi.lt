CREATE TABLE IF NOT EXISTS `PREFIX_dpd_courier_request` (
  `id_dpd_courier_request` INT(11) UNSIGNED AUTO_INCREMENT,
  `shipment_date` DATETIME NOT NULL,
  `sender_name` VARCHAR(255) NOT NULL,
  `sender_phone_code` VARCHAR(255) NOT NULL,
  `sender_phone` VARCHAR(255) NOT NULL,
  `sender_id_ws_country` INT(11) NOT NULL,
  `country` VARCHAR(255) NOT NULL,
  `sender_postal_code` VARCHAR(255) NOT NULL,
  `sender_city` VARCHAR(255) NOT NULL,
  `sender_address` VARCHAR(255) NOT NULL,
  `sender_additional_information` VARCHAR(255) NOT NULL,
  `order_nr` VARCHAR(255) NOT NULL DEFAULT '',
  `pick_up_time` VARCHAR(255) NOT NULL,
  `sender_work_until` VARCHAR(255) NOT NULL,
  `weight` FLOAT(11) UNSIGNED NOT NULL,
  `parcels_count` INT(11) NOT NULL,
  `pallets_count` INT(11) NOT NULL,
  `comment_for_courier` VARCHAR(255) NOT NULL,
  `id_shop` INT(11) UNSIGNED NOT NULL,
  `date_add` DATETIME,
  `date_upd` DATETIME,
  PRIMARY KEY (`id_dpd_courier_request`)
) ENGINE=ENGINE_TYPE DEFAULT CHARSET=utf8;