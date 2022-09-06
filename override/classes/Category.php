<?php

class Category extends CategoryCore
{
    public static function getCategoryProducts($idCategory)
    {
        $sql = '
            SELECT p.`id_product` FROM '._DB_PREFIX_.'product p  
                LEFT JOIN '._DB_PREFIX_.'category_product cp ON (cp.`id_product` = p.`id_product`) 
                LEFT JOIN '._DB_PREFIX_.'stock_available sa ON (sa.`id_product` = p.`id_product`) 
            WHERE cp.`id_category` = '.(int)$idCategory.' 
                AND p.`active` = 1 AND sa.`quantity` > 0 
            GROUP BY p.`id_product`
        ';

        $result = DB::getInstance()->executeS($sql);

        return array_column($result, 'id_product');
    }

    public static function getDiscountedProducts($idCategory)
    {
        $sql = '
            SELECT p.`id_product` FROM '._DB_PREFIX_.'product p 
                LEFT JOIN '._DB_PREFIX_.'specific_price sp ON (p.`id_product` = sp.`id_product`) 
                LEFT JOIN '._DB_PREFIX_.'category_product cp ON (cp.`id_product` = p.`id_product`) 
                LEFT JOIN '._DB_PREFIX_.'stock_available sa ON (sa.`id_product` = p.`id_product`) 
            WHERE sp.`id_specific_price` IS NOT NULL
                AND (NOW() BETWEEN sp.`from` AND sp.`to`) OR (sp.`to` = "'.pSQL('0000-00-00 00:00:00').'") 
                AND cp.`id_category` = '.(int)$idCategory.' 
                AND p.`active` = 1 AND sa.`quantity` > 0 
            GROUP BY p.`id_product`
        ';

        $result = DB::getInstance()->executeS($sql);
        return array_column($result, 'id_product');
    }

    public static function getDiscountedProductsFront($categories)
    {
        $sql = '
            SELECT p.`id_product` FROM '._DB_PREFIX_.'product p 
                LEFT JOIN '._DB_PREFIX_.'specific_price sp ON (p.`id_product` = sp.`id_product`) 
                LEFT JOIN '._DB_PREFIX_.'category_product cp ON (cp.`id_product` = p.`id_product`) 
            WHERE sp.`id_specific_price` IS NOT NULL
                AND (NOW() BETWEEN sp.`from` AND sp.`to`) OR (sp.`to` = "'.pSQL('0000-00-00 00:00:00').'") 
                AND cp.`id_category` IN ('.implode(',', $categories).') 
                AND p.`active` = 1 
            GROUP BY p.`id_product`
        ';

        $result = DB::getInstance()->executeS($sql);

        return array_column($result, 'id_product');
    }
}