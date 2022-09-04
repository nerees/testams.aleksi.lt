<?php
include_once('../../config/config.inc.php');

class QuantityUpdaterClass
{
    public $doc;
    public $shopProducts;

    public function __construct()
    {
        $this->doc = new DOMDocument();
        $this->doc->load('new.xml');
        $this->shopProducts = $this->getShopProducts();
    }

    public function getShopProducts()
    {
        $sql = new DbQuery();
        $sql->select('*');
        $sql->from('product');
        $result = Db::getInstance(_PS_USE_SQL_SLAVE_)->executeS($sql);
        return $result;
    }

    public function compareReferenceAndId()
    {
        $docProducts = $this->doc->getElementsByTagName("product");

        foreach ($this->shopProducts as $shopProduct){
            foreach ($docProducts as $dpr) {
                $ids = $dpr->getElementsByTagName("id");
                $id = $ids[0]->nodeValue;
                if ($id == $shopProduct['reference'] && (int)$shopProduct['id_manufacturer'] !== 24){
                    $qnts = $dpr->getElementsByTagName("quantity");
                    $qnt = $qnts[0]->nodeValue;
                    echo "Keiciam quantity: " . $shopProduct['id_product'] . "ids: " . $shopProduct['reference'] . " <=> " . $id . "<br>";
                    $this->saveQuantity((int)$shopProduct['id_product'], (int)$qnt);
                }
            }
        }
        echo ("fin");
    }
    public function saveQuantity($id, $quantity)
    {
        $db = \Db::getInstance();
        $result = $db->update('stock_available', array(
            'quantity' => $quantity,
        ), 'id_product = '.$id.'', 1, true);
    }
}