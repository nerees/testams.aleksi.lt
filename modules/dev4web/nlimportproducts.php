<?php
/**
 * 2007-2013 PrestaShop
 *
 * NOTICE OF LICENSE
 *
 * This source file is subject to the Academic Free License (AFL 3.0)
 * that is bundled with this package in the file LICENSE.txt.
 * It is also available through the world-wide-web at this URL:
 * http://opensource.org/licenses/afl-3.0.php
 * If you did not receive a copy of the license and are unable to
 * obtain it through the world-wide-web, please send an email
 * to license@prestashop.com so we can send you a copy immediately.
 *
 * DISCLAIMER
 *
 * Do not edit or add to this file if you wish to upgrade PrestaShop to newer
 * versions in the future. If you wish to customize PrestaShop for your
 * needs please refer to http://www.prestashop.com for more information.
 *
 *  @license   http://opensource.org/licenses/GPL-3.0  GNU GENERAL PUBLIC LICENSE (GPL-3.0)
 *  International Registered Trademark & Property of PrestaShop SA
 */

@ini_set('max_execution_time', 900);

//define('MAX_LINE_SIZE', 0);

/** Used for validatefields diying without user friendly error or not */
//define('UNFRIENDLY_ERROR', false);

/** this value set the number of columns visible on each page */
//define('MAX_COLUMNS', 6);

/** correct Mac error on eof */
@ini_set('auto_detect_line_endings', '1');

//include_once(_PS_MODULE_DIR_.'/sbpowerimport/helper/curl.php');
//include_once(_PS_MODULE_DIR_.'/sbpowerimport/helper/helperClass.php');
include_once('../../config/config.inc.php');
//include_once(_PS_MODULE_DIR_.'/nlimport/nlgrupes.php');
//include_once('../../init.php');


class NlImportProducts extends Module
{

    private $_mapped_array = array();


    public function __construct()
    {
        $this->name = 'nlgetorders';
        $this->tab = 'back_office_features';
        $this->version = '1.0';
        $this->author = 'nerijus.latakas@gmail.com';
        $this->need_instance = 0;

        $this->bootstrap = true;
        parent::__construct();

        $this->displayName = $this->l('Get Products');
        $this->description = $this->l('Get Products from XML and place to PRESTA');
        $this->ps_versions_compliancy = array('min' => '1.6', 'max' => '1.7.8');

    }

    public static function slugify($text)
    {
        // replace non letter or digits by -
        $text = preg_replace('~[^\pL\d]+~u', '-', $text);

        // transliterate
        $text = iconv('utf-8', 'us-ascii//TRANSLIT', $text);

        // remove unwanted characters
        $text = preg_replace('~[^-\w]+~', '', $text);

        // trim
        $text = trim($text, '-');

        // remove duplicate -
        $text = preg_replace('~-+~', '-', $text);

        // lowercase
        $text = strtolower($text);

        if (empty($text)) {
            return 'n-a';
        }

        return $text;
    }

    public function arYraFoto($kodas){

    }

    public function arYra($prod){
        $sql = new DbQuery();
        $sql->select('id_product');
        $sql->from('product');
        $sql->where('isbn = "' . psql((string)$prod->N17_KODAS_PS) . '"');
        $atsakymas = Db::getInstance(_PS_USE_SQL_SLAVE_)->executeS($sql);

        if (is_array($atsakymas) && count($atsakymas)) {
            //echo "YRA: " . $prod->isbn . "<==>" . $prod->N17_KODAS_PS . " <br> ";
            return true;
        }else{
            //echo "<br>----RADAU === nauja preke: " . $prod->N17_KODAS_PS . " " . $prod->N17_PAV . "<br>";
            return false;
        }

    }

    public function daromEan13($kodas){
        //kiek sansu kad butu trumpesnis bar kodas?
        if (strlen($kodas) < 12){
            $naujasEAN13 = $kodas;
            switch (strlen($naujasEAN13)) {
                default:
                case 11:
                    $naujasEAN13 = "0".$kodas;
                    break;
                case 10:
                    $naujasEAN13 = "00".$kodas;
                    break;
                case 9:
                    $naujasEAN13 = "000".$kodas;
                    break;
                case 8:
                    $naujasEAN13 = "0000".$kodas;
                    break;
                case 7:
                    $naujasEAN13 = "00000".$kodas;
                    break;
                case 6:
                    $naujasEAN13 = "000000".$kodas;
                    break;
                case 5:
                    $naujasEAN13 = "0000000".$kodas;
                    break;
                case 4:
                    $naujasEAN13 = "00000000".$kodas;
                    break;
                case 3:
                    $naujasEAN13 = "000000000".$kodas;
                    break;
            }

        }else{
            $naujasEAN13 = $kodas;
        }
        return $naujasEAN13;
        //grazina ean13
    }

    public function importProduct()
    {
        //if ($token != "letsdavai") die ("ci netu");

        $doc = new DOMDocument();
        $doc->load('kerzon.xml');
        $categories = $doc->getElementsByTagName("categories");
        $ids = $doc->getElementsByTagName("id");
        $titles = $doc->getElementsByTagName("title");
        $descriptions = $doc->getElementsByTagName("description");
        $manufacturers = $doc->getElementsByTagName("manufacturer");
        $barcodes = $doc->getElementsByTagName("barcode");
        $images = $doc->getElementsByTagName("images");
        $products = $doc->getElementsByTagName("product");
        $attributes = $doc->getElementsByTagName("attribute");

        $languages = Language::getIDs();
        $kaina = 9.99;
        $cat = 100;
        $likutis = 10;
$counter = 0;
        foreach($products as $key => $product) {
                //echo $titles->item($key)->nodeValue .PHP_EOL;
                //echo "yra";
            $temp_img_urls = $images->item($key)->getElementsbyTagName("image");
            echo "<img src='".trim($temp_img_urls->item(0)->nodeValue)."'><br>";
            echo "<img src='".trim($temp_img_urls->item(1)->nodeValue)."'><br>";
            echo "<img src='".trim($temp_img_urls->item(2)->nodeValue)."'><br>";


                $product = new Product();
                $product->ean13 = $barcodes->item($key)->nodeValue;
                $product->name = $titles->item($key)->nodeValue;
                //foreach ($languages as $id_lang) {
                $id_lang = 1;
                $product->name[$id_lang] = $titles->item($key)->nodeValue;
                $product->title[$id_lang] = $titles->item($key)->nodeValue;
                $product->description[$id_lang] = $descriptions->item($key)->nodeValue . "<p>" . $attributes->item($key)->nodeValue . "</p>";
                //$product->description_short[$id_lang] = $attributes->item($key)->nodeValue;
                //}
                $product->reference = $ids->item($key)->nodeValue;
                $product->link_rewrite = array((int)Configuration::get('PS_LANG_DEFAULT') => self::slugify($titles->item($key)->nodeValue));
                $product->id_category_default = 2; // Startine Category
                $product->id_category = $cat;
                $product->category = $cat;
                $product->redirect_type = '404';
                $product->price = number_format((float)$kaina, 4, '.', '');
                $product->on_sale = 0;
                $product->minimal_quantity = 1;
                $product->quantity = 10;
                $product->show_price = 1;
                $product->online_only = 0;
                //$product->meta_keywords = $titles->item($key)->nodeValue;
                //$product->meta_description = substr($descriptions->item($key)->nodeValue,0,500);
                $product->is_virtual = 0;
                $product->is_active = true;
                $product->id_tax_rules_group = 1;
//                $product->id_manufacturer = (int)$this->getManufacturerIdFromXml($manufacturers->item($key)->nodeValue);
                $product->id_manufacturer = 37;
                $product->id_supplier = 1; //inbeauty
                //die (var_dump($product));
                if ($product->save()) {
                    StockAvailable::setQuantity($product->id, 0, $likutis);
                    $product->addToCategories(array(2, $cat));
                    //image url

                    if (count($images->item($key)->getElementsbyTagName("image")) > 1) {
                        $temp_img_urls = $images->item($key)->getElementsbyTagName("image");
                        $url1 = trim($temp_img_urls->item(0)->nodeValue);
                        $url2 = trim($temp_img_urls->item(1)->nodeValue);
                        $url3 = trim($temp_img_urls->item(1)->nodeValue);
                        $shops = Shop::getShops(true, null, true);
                        $image = new Image();
                        $image->id_product = $product->id;
                        $image->position = Image::getHighestPosition($product->id) + 1;
                        $image->cover = true; // or false;
                        if (($image->validateFields(false, true)) === true &&
                            ($image->validateFieldsLang(false, true)) === true && $image->add()) {
                            $image->associateTo($shops);
                            if (!AdminImportController::copyImg($product->id, $image->id, $url1, 'products', true)) {
                                $image->delete();
                                echo "KAZKAS BLOGAI SU FOTKE 1: <br>";
                            }
                        }
                        $image = new Image();
                        $image->id_product = $product->id;
                        $image->position = Image::getHighestPosition($product->id) + 1;
                        $image->cover = false; // or false;
                        if (($image->validateFields(false, true)) === true &&
                            ($image->validateFieldsLang(false, true)) === true && $image->add()) {
                            $image->associateTo($shops);
                            if (!AdminImportController::copyImg($product->id, $image->id, $url2, 'products', true)) {
                                $image->delete();
                                echo "KAZKAS BLOGAI SU FOTKE2: <br>";
                            }
                        }
                        $image = new Image();
                        $image->id_product = $product->id;
                        $image->position = Image::getHighestPosition($product->id) + 1;
                        $image->cover = false; // or false;
                        if (($image->validateFields(false, true)) === true &&
                            ($image->validateFieldsLang(false, true)) === true && $image->add()) {
                            $image->associateTo($shops);
                            if (!AdminImportController::copyImg($product->id, $image->id, $url3, 'products', true)) {
                                $image->delete();
                                echo "KAZKAS BLOGAI SU FOTKE3 : <br>";
                            }
                        }
                    } else {
                        $url1 = trim($images->item($key)->nodeValue);
                        //var_dump($url1);
                        $shops = Shop::getShops(true, null, true);
                        $image = new Image();
                        $image->id_product = $product->id;
                        $image->position = Image::getHighestPosition($product->id) + 1;
                        $image->cover = true; // or false;
                        if (($image->validateFields(false, true)) === true &&
                            ($image->validateFieldsLang(false, true)) === true && $image->add()) {
                            $image->associateTo($shops);
                            if (!AdminImportController::copyImg($product->id, $image->id, $url1, 'products', true)) {
                                $image->delete();
                                echo "KAZKAS BLOGAI SU FOTKE : <br>";
                            }
                        }
                    }
                    //biski
                    $product->update();
                    $product->save();
                    unset($product);
                    exit();
                    //return true;
                }
                //var_dump($product);
                //die("ola muchcho");
                echo "TOTAL: " . $counter++ . " <br>";
            }

    }

    public function updateQuantity()
    {
        //$doc = new DOMDocument();
        //$doc->load('new.xml');

        $sql = new DbQuery();
        $sql->select('*');
        $sql->from('product');
        //$sql->where('reference = "' . psql((string)$reference) . '"');
        $atsakymas = Db::getInstance(_PS_USE_SQL_SLAVE_)->executeS($sql);

        foreach ($atsakymas as $product) {
            if ((int)$product['id_product'] > 0 && (int)$product['id_product'] < 9100) {
                //$pr = new Product((int)$product['id_product']);
                $new_quantity = $this->findInXmlQuant($product['reference']);
                echo "Prekės ID: " . $product['id_product'] ." esamas_kiekis = " . $product['quantity'] . " Naujas_kiekis: " . $new_quantity . "<br>";
            }
            //var_dump($product); exit;
        }

    }

    public function findInXmlQuant($id)
    {
        $doc = new DOMDocument();
        $doc->load('new.xml');
        $products = $doc->getElementsByTagName("product");
        $ids = $doc->getElementsByTagName("id");
        $quantity = $doc->getElementsByTagName("quantity");

        foreach($products as $key => $product) {
            //echo $ids->item($key)->nodeValue . "::" . $id . "<br>";

            if (($ids->item($key)->nodeValue) === $id ) {
                echo "ka lyginam? " . $id ." su " . $ids->item($key)->nodeValue. "<br>";
                return $quantity->item($key)->nodeValue  . "<br>";
            }
        }
        return false;
    }

    public function updateNames()
    {
        $sql = new DbQuery();
        $sql->select('*');
        $sql->from('product');
        //$sql->where('reference = "' . psql((string)$reference) . '"');
        $atsakymas = Db::getInstance(_PS_USE_SQL_SLAVE_)->executeS($sql);
        foreach ($atsakymas as $product) {
            if ((int)$product['id_product'] > 9999 && (int)$product['id_product'] < 1100){


            $pr = new Product((int)$product['id_product']);
            //var_dump($pr);
            //if (substr($pr->name[1],0,1) === substr($pr->name[1],1,1)) {

                //echo "radau" . $product['id_product'] . "<br>";
                //var_dump($this->findInXml($product['reference']));
                //echo "<br>";
                //var_dump($pr->name[1]);
                //echo "<br>";
                //var_dump($pr->name);
                //echo "<br>";
                //var_dump($pr->title);
                //echo "<br>";
                //echo "turi but" . $this->findInXml($product['reference']) . "<br>";

                $db = \Db::getInstance();
                $result = $db->update('product_lang', array(
                    'name' => pSQL($this->findInXml($product['reference'])),
                ), 'id_product = '.$product['id_product'].'', 1, true);

                //$pr->name[1] = $this->findInXml($product['reference']);
                //$pr->title = $this->findInXml($product['reference']);
                //$pr->name[1] = $this->findInXml($product['reference']);
                //$pr->title[1] = $this->findInXml($product['reference']);
                //$pr->update();
                //$pr->save();

            }

        }
    }
    public function findInXml($id)
    {
        $doc = new DOMDocument();
        $doc->load('aleksi_xml.xml');
        $products = $doc->getElementsByTagName("product");
        $ids = $doc->getElementsByTagName("id");
        $titles = $doc->getElementsByTagName("title");

        foreach($products as $key => $product) {
            //echo $ids->item($key)->nodeValue . "::" . $id . "<br>";
            if (($ids->item($key)->nodeValue) === $id ) {
            return $titles->item($key)->nodeValue  . "<br>";
            }
        }
        return false;
    }

    public function dedamCategorija() {
        $doc = new DOMDocument();
        $doc->load('aleksi_xml.xml');
        $ids = $doc->getElementsByTagName("id");
        $categories = $doc->getElementsByTagName("category");
        //$product = new Product(215);
        //var_dump($product);
        $counter = 0;
        foreach($categories as $key => $category) {
            $temp_cat = $this->getCategories($category->nodeValue);
            if (isset($temp_cat[1])) {
                if ($temp_cat[1] === "Kūno priežiūros priemonės") {
                    $pr_id = $this->getProductIdByReference($ids->item($key)->nodeValue);
                    //var_dump($pr_id);
                    $temp_product = new Product((int)$pr_id[0]["id_product"]);
                    echo $pr_id[0]["id_product"] . "<br>";
                    //$temp_product->addToCategories(array(2, 40));
                    //$temp_product->save();
                    unset($temp_product);
                    $counter++;
                    PrestaShopLogger::addLog('CATEG ADDED:: pr-ref:' . $ids->item($key)->nodeValue . "cat: " . $temp_cat[2]);
                    //echo $pr_id[0]["id_product"];
                    //die("ok");
                }
            }
            //echo $this->getCategories($category->nodeValue)[0];
            //echo $category->nodeValue . "<br>";
            //die("fsio");
        }
        echo $counter;
    }

    public function getCategories($value) {
        $cats = [];
        $x = preg_split("/\//", $value);
        if (!empty($x[0])){
            //$cats = $x[0];
            array_push($cats, $x[0]);
        }
        if (!empty($x[1])){
            //$cats = $x[1];
            array_push($cats, $x[1]);
        }
        if (!empty($x[2])){
            //$cats = $x[2];
            array_push($cats, $x[2]);
        }
        //echo $cats;
        return $cats;
    }

    public function getProductIdByReference($reference) {
        $sql = new DbQuery();
        $sql->select('id_product');
        $sql->from('product');
        $sql->where('reference = "' . psql((string)$reference) . '"');
        $atsakymas = Db::getInstance(_PS_USE_SQL_SLAVE_)->executeS($sql);
        return $atsakymas;
    }

    public function deactivateProduct() {
        $product = $this->getProductIdByManufacturerId(8);
        var_dump($product);
        /*foreach($product as $p) {
            $pr = new Product((int)$p['id_product']);
            var_dump($pr['id_product']);
            //echo $pr->[0]->name . "<br>";
            //$pr->is_active = false;
            //$pr->save();
            unset($pr);
        }*/

        //echo $product->name . "<br>";
        //$product->is_active = false;
        //$product->save();
        //unset($product);
    }

    public function getProductIdByManufacturerId($manufacturer_id) {
        $sql = new DbQuery();
        $sql->select('id_product');
        $sql->from('product');
        $sql->where('id_manufacturer = "' . psql((int)$manufacturer_id) . '"');
        $atsakymas = Db::getInstance(_PS_USE_SQL_SLAVE_)->executeS($sql);
        return $atsakymas;
    }

    public function getProductIdByCategoryId($category_id) {
        $sql = 'SELECT cp.`id_product` 
					FROM `' . _DB_PREFIX_ . 'product` p
					' . Shop::addSqlAssociation('product', 'p') . '
					LEFT JOIN `' . _DB_PREFIX_ . 'category_product` cp ON p.`id_product` = cp.`id_product`
					WHERE cp.`id_category` = ' . (int) $category_id;

        //return (int) Db::getInstance(_PS_USE_SQL_SLAVE_)->getValue($sql);
        $result = Db::getInstance(_PS_USE_SQL_SLAVE_)->executeS($sql);
        //var_dump($result);
        echo "<table><thead><tr><th>ID</th><th>Pavadinimas</th><th>Kategorija? (ID)</th></tr></thead>";
        echo "<tbody>";
        foreach ($result as $p) {
            //var_dump($p['id_product']);
            $product = new Product((int)$p['id_product']);
            //var_dump($product);
            //break;
            echo "<tr><td>".$p['id_product']."</td><td>".$product->name[1]."</td><td></td></tr>";
            unset($product);
            //exit;
        }
        echo "</tbody></table>";
        echo "FIN";
    }

    public function checkProduct() {
        $product = new Product(215);
        var_dump($product);
    }

    public function getManufacturerIdFromXml($name){
        switch ($name) {
            case "Ach.Brito":
                return 8;
            case "Bloommies":
                return 9;
            case "Captain Fawcett":
                return 10;
            case "Ceriotti":
                return 11;
            case "Dapper Dan":
                return 12;
            case "Edwin Jagger":
                return 13;
            case "Floid":
                return 14;
            case "Marvis":
                return 15;
            case "Men Rock":
                return 16;
            case "moti-co":
                return 17;
            case "Nailmatic KIDS":
                return 18;
            case "Nanogen":
                return 19;
            case "Noah":
                return 20;
            case "nõberu":
                return 21;
            case "Percy Nobleman":
                return 22;
            case "Proraso":
                return 23;
            case "Q+A":
                return 24;
            case "The Bluebeards Revenge":
                return 25;
            case "Yonelle":
                return 26;
            case "Kerzon":
                return 37;
        }
    }
//dummy for now
    public function getCategoryIdFromXml($name){
        switch ($name) {
            case "Kūno priežiūros priemonės":
                return 19;
            case "Muilai":
                return 17;
            case "Captain Fawcett":
                return 10;
            case "Ceriotti":
                return 11;
            case "Dapper Dan":
                return 12;
            case "Edwin Jagger":
                return 13;
            case "Floid":
                return 14;
            case "Marvis":
                return 15;
            case "Men Rock":
                return 16;
            case "moti-co":
                return 17;
            case "Nailmatic KIDS":
                return 18;
            case "Nanogen":
                return 19;
            case "Noah":
                return 20;
            case "nõberu":
                return 21;
            case "Percy Nobleman":
                return 22;
            case "Proraso":
                return 23;
            case "Q+A":
                return 24;
            case "The Bluebeards Revenge":
                return 25;
            case "Yonelle":
                return 26;
        }
    }

    public function priceUpdater(){
        $barcodes = [];
        $prices = [];
        $i=0;

        if (($handle = fopen("kainos.csv", "r")) !== FALSE) {
            while (($data = fgetcsv($handle, 1000, ",")) !== FALSE) {

                array_push($barcodes, $data[0]);
                array_push($prices, $data[1]);
                //echo $data[0] . "<br />\n";
                //echo $data[1] . "<br />\n";

                $i++;
            }
            fclose($handle);
        }
        echo "importuojam...." . "<br>";

        for ($x=0; $x < $i; $x++) {

            $sql = new DbQuery();
            $sql->select('id_product');
            $sql->from('product');
            $sql->where('ean13 = "' . psql((string)$barcodes[$x]) . '"');
            $result = Db::getInstance(_PS_USE_SQL_SLAVE_)->executeS($sql);

            if ($result) {
                //var_dump($result);
                $product = new Product((int)$result[0]['id_product']);
                //echo $product->price . "<br>";
                //echo "keiciam kaina i " . $prices[$x] . "<br>";
                //$product->price = 1.40 * number_format((float)$prices[$x],4,'.','');
                $product->price = number_format((((float)$prices[$x]*100)/60),8,'.','');
                //echo (1.40 * number_format((float)$prices[$x],4,'.','')) . "<br>";
                $product->update();
                $product->save();
                unset($product);
            }
        }
        echo "fin...";

    }

    public function addCategories() {
        $id = [];
        $categories = [[]];

        if (($handle = fopen("id_kategorijos.csv", "r")) !== FALSE) {
            $i=0;
            while (($data = fgetcsv($handle, 1000, ",")) !== FALSE) {
                $temp = [];
                array_push($id, $data[0]);
                if ($data[1]) {
                    array_push($temp, $data[1]);
                }
                if ($data[2]) {
                    array_push($temp, $data[2]);
                }
                if ($data[3]) {
                    array_push($temp, $data[3]);
                }
                if ($data[4]) {
                    array_push($temp, $data[4]);
                }
                if ($data[5]) {
                    array_push($temp, $data[5]);
                }
                if ($data[6]) {
                    array_push($temp, $data[6]);
                }
                $categories[$i] = $temp;
                echo $data[0] . "<br />\n";
                echo var_dump($categories[$i]) . "<br />\n";

                $product = new Product((int)$data[0]);
                $product->addToCategories($temp);
                $product->save();
                unset($product);
                //die('tikrinam');
                $i++;
            }
            fclose($handle);
            echo "finishas" . $i;
        }
    }

    public function getAllProducts()
    {
        $sql = new DbQuery();
        $sql->select('*');
        $sql->from('product');
        //$sql->where('reference = "' . psql((string)$reference) . '"');
        $atsakymas = Db::getInstance(_PS_USE_SQL_SLAVE_)->executeS($sql);
        echo "<table><thead><tr><th>ID</th><th>Pavadinimas</th><th>DOVANOS? +</th></tr></thead>";
        echo "<tbody>";
        foreach ($atsakymas as $p) {
            //var_dump($p['id_product']);
            $product = new Product((int)$p['id_product']);
            //var_dump($product);
            //break;
            echo "<tr><td>".$p['id_product']."</td><td>".$product->name[1]."</td><td></td></tr>";
            unset($product);
            //exit;
        }
        echo "</tbody></table>";
        echo "FIN";
    }

    public function addToDovana() {
        $ids = [2,
9,
14,
15,
16,
17,
20,
21,
22,
23,
26,
28,
29,
32,
33,
34,
57,
58,
63,
64,
65,
66,
67,
68,
69,
70,
71,
72,
78,
79,
80,
81,
82,
83,
84,
89,
90,
91,
92,
93,
94,
95,
96,
97,
99,
100,
102,
103,
105,
106,
107,
108,
112,
113,
114,
115,
117,
119,
120,
121,
124,
125,
127,
128,
129,
130,
177,
178,
187,
189,
190,
191,
192,
193,
194,
195,
196,
197,
198,
200,
201,
202,
203,
204,
205,
206,
207,
208,
209,
210,
211,
212,
213,
214,
215,
293,
296,
297,
298,
301,
302,
305,
306,
317,
323,
325,
326,
327,
328,
331,
396,
397,
398,
399,
404,
405,
442,
455,
456,
512,
530,
531,
532,
534,
537,
541,
543,
544,
545,
546,
555,
556,
557,
558,
559,
560,
561,
562,
563,
564,
572,
573,
574,
575,
576,
577,
578,
579,
580,
581,
582,
583,
584,
585,
586,
731,
732,
733,
734,
735,
736,
751,
753,
754,
759,
760,
763,
764,
770,
771,
796,
797,
798,
845,
846,
847,
1016,
1017,
1018,
1019,
1020,
1021,
1022,
1023,
1024,
1034,
1036,
1037,
1038,
1039,
1040,
1041,
1042,
1044,
1045,
1046,
1048,
1049,
1050,
1051,
1052];
        $i = 0;
        $vaikams = 3;
        $moterims = 4;
        $vyrams = 5;
        $namams = 6;
        foreach ($ids as $id) {

            $product = new Product((int)$id);
            //$product->addToCategories(array(2, 86));
            $all_cats = $product->getCategories();

            if (in_array($vaikams,$all_cats)){
                $product->addToCategories(array(2, 92));
            }
            if (in_array($moterims,$all_cats)){
                $product->addToCategories(array(2, 93));
            }
            if (in_array($vyrams,$all_cats)){
                $product->addToCategories(array(2, 94));
            }
            if (in_array($namams,$all_cats)){
                $product->addToCategories(array(2, 95));
            }

            //var_dump($all_cats);
            echo "added" . $id . "<br>";
            unset($product);
            //exit;
            $i++;
        }
        echo "fin: " . $i;

    }

}
