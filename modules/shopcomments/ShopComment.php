<?php

if (!defined('_PS_VERSION_'))
    exit;

class ShopComment extends ObjectModel
{
    public $id;

    /** @var integer Customer's id */
    public $id_customer;

    /** @var integer Guest's id */
    public $id_guest;

    /** @var integer Customer name */
    public $customer_name;

    /** @var string Customer email */
    public $customer_email;

    /** @var string Title */
    public $title;

    /** @var string Content */
    public $content;

    /** @var integer Grade */
    public $grade;

    /** @var boolean Validate */
    public $validate = 0;

    public $deleted = 0;

    /** @var string Object creation date */
    public $date_add;

    /**
     * @see ObjectModel::$definition
     */
    public static $definition = array(
        'table' => 'shop_comment',
        'primary' => 'id_shop_comment',
        'fields' => array(
            'id_customer' => array('type' => self::TYPE_INT, 'validate' => 'isUnsignedId', 'required' => true),
            'id_guest' => array('type' => self::TYPE_INT),
            'customer_name' => array('type' => self::TYPE_STRING),
            'customer_email' => array('type' => self::TYPE_STRING),
            'title' => array('type' => self::TYPE_STRING),
            'content' => array('type' => self::TYPE_STRING, 'validate' => 'isMessage', 'size' => 65535, 'required' => true),
            'grade' => array('type' => self::TYPE_FLOAT, 'validate' => 'isFloat'),
            'validate' => array('type' => self::TYPE_BOOL, 'validate' => 'isBool'),
            'deleted' => array('type' => self::TYPE_BOOL),
            'date_add' => array('type' => self::TYPE_DATE),
        )
    );

    /**
     * Return customer's comment
     *
     */
    public static function getByCustomer($id_customer, $get_last = false, $id_guest = false)
    {

            $results = Db::getInstance()->executeS('
				SELECT *
				FROM `' . _DB_PREFIX_ . 'shop_comment` sc
				WHERE ' . (!$id_guest ? 'sc.`id_customer` = ' . (int)$id_customer : 'sc.`id_guest` = ' . (int)$id_guest) . '
				ORDER BY sc.`date_add` DESC '
                . ($get_last ? 'LIMIT 1' : '')
            );

            if (is_array($results))
                if ($get_last && count($results))
                    $results = array_shift($results);



        return $results;
    }

    /**
     * Get Grade By product
     *
     * @return array Grades
     */
    public static function getGradeByComment($id_shop_comment)
    {
        if (!Validate::isUnsignedId($id_shop_comment))
            return false;
        $validate = Configuration::get('SHOP_COMMENTS_MODERATE');


        return (Db::getInstance(_PS_USE_SQL_SLAVE_)->executeS('
		SELECT sc.`id_shop_comment`, pcg.`grade`
		FROM `' . _DB_PREFIX_ . 'shop_comment` sc
		WHERE sc.`id_shop_comment` = ' . (int)$id_shop_comment .
            ($validate == '1' ? ' AND sc.`validate` = 1' : '')));
    }

    public static function getRatings()
    {
        $validate = Configuration::get('SHOP_COMMENTS_MODERATE');

        $sql = 'SELECT (SUM(sc.`grade`) / COUNT(sc.`grade`)) AS avg,
				MIN(sc.`grade`) AS min,
				MAX(sc.`grade`) AS max
			FROM `' . _DB_PREFIX_ . 'shop_comment` sc
			WHERE sc.`deleted` = 0' .
            ($validate == '1' ? ' AND sc.`validate` = 1' : '');


        return Db::getInstance(_PS_USE_SQL_SLAVE_)->getRow($sql);

    }

    public static function getAverageGrade()
    {
        $validate = Configuration::get('SHOP_COMMENTS_MODERATE');

        return Db::getInstance(_PS_USE_SQL_SLAVE_)->getRow('
		SELECT (SUM(sc.`grade`) / COUNT(sc.`grade`)) AS grade
		FROM `' . _DB_PREFIX_ . 'shop_comment` sc
		WHERE sc.`deleted` = 0' .
            ($validate == '1' ? ' AND sc.`validate` = 1' : ''));
    }

    public static function getCommentNumber()
    {
        $validate = (int)Configuration::get('SHOP_COMMENTS_MODERATE');

        $result = (int)Db::getInstance(_PS_USE_SQL_SLAVE_)->getValue('
        SELECT COUNT(`id_shop_comment`) AS "nbr"
        FROM `' . _DB_PREFIX_ . 'shop_comment` sc
        WHERE '. ($validate == '1' ? '`validate` = 1' : ''));

        return $result;
    }

    /**
     * Get comments by Validation
     *
     * @return array Comments
     */
    public static function getByValidate($validate = '0', $deleted = false)
    {
        $sql = '
			SELECT "" as pictures, sc.`id_shop_comment`, IF(c.id_customer, CONCAT(c.`firstname`, \' \',  c.`lastname`), sc.customer_name) customer_name, sc.`title`, sc.`content`, sc.`grade`, sc.`date_add` 
			FROM `' . _DB_PREFIX_ . 'shop_comment` sc
			LEFT JOIN `' . _DB_PREFIX_ . 'customer` c ON (c.`id_customer` = sc.`id_customer`) 
			WHERE sc.`validate` = ' . (int)$validate;
        $sql .= ' ORDER BY sc.`date_add` DESC';

        return (Db::getInstance()->executeS($sql));
    }

    /**
     * Get all active comments
     *
     * @return array Comments
     */
    public static function getAllActiveCount()
    {
        return (Db::getInstance()->executeS('
		SELECT COUNT(*) as count
		FROM `' . _DB_PREFIX_ . 'shop_comment` sc
		LEFT JOIN `' . _DB_PREFIX_ . 'customer` c ON (c.`id_customer` = sc.`id_customer`) 
		WHERE 1=1 ' . ((int)Configuration::get('SHOP_COMMENTS_MODERATE') == 1 ? ' && sc.`validate` = 1' : '')));
    }


    /**
     * Get all active comments
     *
     * @return array Comments
     */
    public static function getAllActive($page = 0, $nb = 10)
    {
        return (Db::getInstance()->executeS('
		SELECT sc.`title`, sc.`id_shop_comment`, IF(c.id_customer, CONCAT(c.`firstname`, \' \',  c.`lastname`), sc.customer_name) customer_name, sc.`content`, sc.`grade`, sc.`date_add`
		FROM `' . _DB_PREFIX_ . 'shop_comment` sc
		LEFT JOIN `' . _DB_PREFIX_ . 'customer` c ON (c.`id_customer` = sc.`id_customer`) 
		WHERE 1=1 ' . ((int)Configuration::get('SHOP_COMMENTS_MODERATE') == 1 ? ' && sc.`validate` = 1' : '') . '
		ORDER BY sc.`date_add` DESC LIMIT 10'));

        //ORDER BY sc.`date_add` DESC LIMIT ' . (($page - 1) * $nb) . ',' . $nb));
    }

    /**
     * Get all comments
     *
     * @return array Comments
     */
    public static function getAll()
    {
        return (Db::getInstance()->executeS('
		SELECT sc.`id_shop_comment`, IF(c.id_customer, CONCAT(c.`firstname`, \' \',  c.`lastname`), sc.customer_name) customer_name, sc.`content`, sc.`grade`, sc.`date_add` 
		FROM `' . _DB_PREFIX_ . 'shop_comment` sc
		LEFT JOIN `' . _DB_PREFIX_ . 'customer` c ON (c.`id_customer` = sc.`id_customer`) 
		ORDER BY sc.`date_add` DESC'));
    }

    /**
     * Validate a comment
     *
     * @return boolean succeed
     */
    public function validate($validate = '1')
    {
        if (!Validate::isUnsignedId($this->id))
            return false;

        $success = (Db::getInstance()->execute('
		UPDATE `' . _DB_PREFIX_ . 'shop_comment` SET
		`validate` = ' . (int)$validate . '
		WHERE `id_shop_comment` = ' . (int)$this->id));

        Hook::exec('actionObjectShopCommentValidateAfter', array('object' => $this));
        return $success;
    }

    /**
     * Delete a comment, grade and report data
     *
     * @return boolean succeed
     */
    public function delete()
    {
        parent::delete();
    }

}
