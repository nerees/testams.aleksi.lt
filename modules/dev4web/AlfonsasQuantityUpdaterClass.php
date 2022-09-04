<?php
include_once('../../config/config.inc.php');

class AlfonsasQuantityUpdaterClass
{
    public $doc;
    public $shopProducts;

    public function __construct()
    {
        $this->doc = new DOMDocument();
        $this->doc->load('newalfonsas.xml');
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

    public function compareReferenceAndId($idBegin, $idEnd)
    {
        $docProducts = $this->doc->getElementsByTagName("product");

        foreach ($this->shopProducts as $shopProduct){
            if ((int)$shopProduct['id_product'] > (int)$idBegin && (int)$shopProduct['id_product'] < (int)$idEnd){

                foreach ($docProducts as $dpr) {
                    $barcodes = $dpr->getElementsByTagName("barcode");
                    $barcode = $barcodes[0]->nodeValue;
                    if ($barcode == $shopProduct['reference']){
                        $qnts = $dpr->getElementsByTagName("quantity");
                        $qnt = $qnts[0]->nodeValue;
                        //echo "Keiciam quantity: " . $shopProduct['id_product'] . "barcode: " . $shopProduct['reference'] . " <=> " . $barcode . "naujas kiekis: " .(int)$qnt. "<br>";
                        $this->saveQuantity((int)$shopProduct['id_product'], (int)$qnt);
                    }
                }
            }
        }
        echo ("fin");
        exit;
    }
    public function saveQuantity($id, $quantity)
    {
        $db = \Db::getInstance();
        $result = $db->update('stock_available', array(
            'quantity' => $quantity,
        ), 'id_product = '.$id.'', 1, true);
    }
}