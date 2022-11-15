<?php
//die('nene');
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Check if _PS_ADMIN_DIR_ is defined
if (!defined('_PS_ADMIN_DIR_')) {
    // if _PS_ADMIN_DIR_ is not defined, define.
    define('_PS_ADMIN_DIR_', getcwd());
}
include_once('../../config/config.inc.php');

///findDublicates();
//die('ieskojom');

//getIdsToClean();
//die('cleaned');

$objXmlDocument = simplexml_load_string(file_get_contents("prekes_zenklai_produktai_.xml"));

if ($objXmlDocument === FALSE) {
    echo "There were errors parsing the XML file.\n";
    foreach(libxml_get_errors() as $error) {
        echo $error->message;
    }
    exit;
}


$objJsonDocument = json_encode($objXmlDocument);
$arrOutput = json_decode($objJsonDocument);

$manufacturers = ['WetBrush', 'MIO', 'Mama Mio', 'Delilah', 'MKS eco (Marrakesh)', 'HH Simonsen'];
$manufacturersIds = [
    'WetBrush' => 67,
    'MIO' => 68,
    'Mama Mio' => 69,
    'Delilah' => 70,
    'MKS eco (Marrakesh)' => 71,
    'HH Simonsen' => 72
];

//combinations
foreach ($arrOutput->product as $productXml) {
    $productArray = (array)$productXml;
    if (!in_array(trim($productArray['manufacturer']), $manufacturers))   {
        continue;
    }
    $brand_id = $manufacturersIds[trim($productArray['manufacturer'])];

    if ($brand_id && is_object($productArray['product.ean13'])) {

        $arYraRef = arYraRef(trim($productArray['product.Id']));
        if (!$arYraRef) {

            $images = explode(',', $productArray['images']);
            $description = $productArray['product.longdescription'];
            $description .= !is_object($productArray['extra-tabs-naudojimas']) ?: "";
            $description .= !is_object($productArray['extra-tabs-sudetis']) ?: "";

            addProduct(
                $brand_id,
                "",
                trim($productArray['product.Id']),
                trim($productArray['product.name']),
                trim($productArray['product.quantity']) ?: 0,
                $description,
                trim($productArray['product.description']) ?: '',
                trim($productArray['sale-price-with-vat']),
                $images[0], //kitos is kombinaciju
                2,
                131,
                'combinations',
                $productArray['combinations']
            );

            die('uno');
        }

    }
    echo "skip..  ::  " . $productArray['product.Id'] . "<br>";
}

function checkCombinations($product, $combinations)
{
    $default_language = (int)Configuration::get('PS_LANG_DEFAULT');
    //$productCombinations = $product->getAttributeCombinations($default_language);


    foreach ($combinations as $combination) {
        $idProductAttributes = [];
        $combinationArray = (array)$combination;
        $attributeGroup = (int)getAttributeGroupFromName($combinationArray['full-name']);
        $attribute = (int)getAttributeFromName($combinationArray['full-name'], $attributeGroup);
        $idProductAttributes [] = $attribute;
        if (!$product->productAttributeExists($idProductAttributes)) {
            $price = str_replace(' EUR', '', $combinationArray['price']);

            if (is_string($combinationArray['image'])) {
                $shops = Shop::getShops(true, null, true);
                $image = new Image();
                $image->id_product = $product->id;
                $image->position = Image::getHighestPosition($product->id) + 1;
                $image->cover = false;
                if (($image->validateFields(false, true)) === true && ($image->validateFieldsLang(false, true)) === true && $image->add()) {
                    $image->associateTo($shops);
                    if (!uploadImage($product->id, $image->id, $combinationArray['image'])) {
                        $image->delete();
                    }
                }
            }

            var_dump($image->id);

            $id_product_attribute = $product->addCombinationEntity(
                0,
                number_format(((float)$price / 1.21), 6, '.', ''),
                0,
                0,
                0,
                (int)$combinationArray['quantity'],
                (int)$image->id,
                '',
                0,
                (string)$combinationArray['ean13'],
                0,
                0,
                '',
                1,
                array(1),
                0,
                '',
                0,
                0
            );

            StockAvailable::setQuantity($product->id, $id_product_attribute, (int)$combinationArray['quantity']);

            Db::getInstance()->execute('
                            INSERT IGNORE INTO ' . _DB_PREFIX_ . 'product_attribute_combination (id_attribute, id_product_attribute)
                            VALUES (' . (int)$attribute . ',' . (int)$id_product_attribute . ')', false);

        }
    }

}

function getAttributeGroupFromName($name)
{

    $default_language = (int)Configuration::get('PS_LANG_DEFAULT');

    $split1 = explode(':', $name);
    $split2 = explode('-', $split1[1]);

    $exists =(int) DB::getInstance()->getValue(
        'SELECT id_attribute_group FROM '._DB_PREFIX_.'attribute_group_lang WHERE `name` = "'.pSQL(trim($split2[0])).'" '
    );

    if ($exists > 0) {
        return $exists;
    } else{
        //create attribute group
        $attributeGroup = new AttributeGroup();
        $attributeGroup->name[$default_language] = trim($split2[0]);
        $attributeGroup->public_name[$default_language] = trim($split2[0]);
        $attributeGroup->group_type = 'radio';
        $attributeGroup->add();
        return $attributeGroup->id;
    }
}

function getAttributeFromName($name, $attributeGroup)
{
    $default_language = (int)Configuration::get('PS_LANG_DEFAULT');
    $split1 = explode(':', $name);
    $split2 = explode('-', $split1[1]);

    $exists =(int) DB::getInstance()->getValue(
        'SELECT id_attribute FROM '._DB_PREFIX_.'attribute_lang WHERE `name` = "'.pSQL(trim($split2[1])).'" '
    );

    if ($exists > 0) {
        return $exists;
    } else{
        //create attribute group
        $attribute = new Attribute();
        $attribute->name[$default_language] = trim($split2[1]);
        $attribute->id_attribute_group = (int) $attributeGroup;
        $attribute->add();
        return $attribute->id;
    }
}

//end combinations

$eanCounter = 0;
die('combinacijos');

//simple products
foreach ($arrOutput->product as $productXml) {
    $productArray = (array)$productXml;
    if (!in_array(trim($productArray['manufacturer']), $manufacturers))   {
        continue;
    }
    $brand_id = $manufacturersIds[trim($productArray['manufacturer'])];

    if ($brand_id && !is_object($productArray['product.ean13'])) {
        $arYra = arYra(trim($productArray['product.ean13']));

        if (!$arYra) {

            //var_dump($productArray['product.ean13']) . "<br>";
            // echo trim($productArray['product.Id']) . "<br>"; //goes as a reference
            // echo trim($productArray['product.name']) . "<br>";
            // echo trim($productArray['product.quantity']) . "<br>";
            //echo preg_replace("/<a[^>]+\>[a-z]+/i", "", ($productArray['product.longdescription'])) . "<br>";
            //  echo removeLinks($productArray['product.longdescription']) . "<br>";
            //  echo trim($productArray['manufacturer']) . "<br>";
            $images = explode(',', $productArray['images']);
            $description = $productArray['product.longdescription'];
            $description .= !is_object($productArray['extra-tabs-naudojimas']) ?: "";
            $description .= !is_object($productArray['extra-tabs-sudetis']) ?: "";
            //  var_dump($images);
            //echo trim($productArray['images']);
            //   var_dump($productArray['reference']) . "<br>";
            //  echo trim($productArray['regular-price-with-vat']) . "<br>";
            addProduct(
                $brand_id,
                trim($productArray['product.ean13']),
                trim($productArray['product.Id']),
                trim($productArray['product.name']),
                trim($productArray['product.quantity']) ?: 0,
                $description,
                trim($productArray['product.description']) ?: '',
                trim($productArray['sale-price-with-vat']),
                $images,
                2,
                217
            );
            //exit;
        }
    }
    //die('po viena');
}
echo "ean empty:" . $eanCounter . "<br>";
die('fin');

function addProduct($brand_id, $ean13, $ref, $name, $qty, $description, $description_short, $price, $imgUrl, $catDef, $catAll, $product_type = '', $combinations = null) {
    $product = new Product();              // Create new product in prestashop
    $product->id_manufacturer = (int)$brand_id;
    //$product->weight = $weight;
    //$product->width = $width;
    //$product->height = $height;
    //$product->depth = $depth;
    $product->ean13 = $ean13;
    $product->reference = $ref;
    $product->name = $name;
    $product->description = removeLinks($description);
    //$product->description = htmlspecialchars($description);
    $product->description_short = $description_short;
    //$product->description_short = htmlspecialchars($description_short);
    $product->id_category_default = $catDef;
    $product->redirect_type = '301';
    if ($product_type == '')
        $product->price = number_format(((float)$price / 1.21), 6, '.', '');
    //$product->wholesale_price = number_format(((float)$base_price / 1.21), 6, '.', '');
    $product->minimal_quantity = 1;
    $product->show_price = 1;
    $product->on_sale = 0;
    $product->online_only = 0;
    $product->meta_description = '';
    $product->active = false;
    $product->id_tax_rules_group = 1;
    $product->link_rewrite = Tools::str2url($name); // Contribution credits: mfdenis
    $product->product_type = $product_type;
    $product->add();                        // Submit new product
    if ($product_type == '')
        StockAvailable::setQuantity($product->id, null, $qty); // id_product, id_product_attribute, quantity
    $product->addToCategories($catAll);     // After product is submitted insert all categories

    // Insert "feature name" and "feature value"
    /*if (is_array($features)) {
        foreach ($features as $feature) {
            $attributeName = $feature['name'];
            $attributeValue = $feature['value'];

            // 1. Check if 'feature name' exist already in database
            $FeatureNameId = Db::getInstance()->getValue('SELECT id_feature FROM ' . _DB_PREFIX_ . 'feature_lang WHERE name = "' . pSQL($attributeName) . '"');
            // If 'feature name' does not exist, insert new.
            if (empty($FeatureNameId)) {
                Db::getInstance()->execute('INSERT INTO `' . _DB_PREFIX_ . 'feature` (`id_feature`,`position`) VALUES (0, 0)');
                $FeatureNameId = Db::getInstance()->Insert_ID(); // Get id of "feature name" for insert in product
                Db::getInstance()->execute('INSERT INTO `' . _DB_PREFIX_ . 'feature_shop` (`id_feature`,`id_shop`) VALUES (' . $FeatureNameId . ', 1)');
                Db::getInstance()->execute('INSERT INTO `' . _DB_PREFIX_ . 'feature_lang` (`id_feature`,`id_lang`, `name`) VALUES (' . $FeatureNameId . ', ' . Context::getContext()->language->id . ', "' . pSQL($attributeName) . '")');
            }

            // 1. Check if 'feature value name' exist already in database
            $FeatureValueId = Db::getInstance()->getValue('SELECT id_feature_value FROM ' . _DB_PREFIX_ . 'feature_value WHERE id_feature_value IN (SELECT id_feature_value FROM `' . _DB_PREFIX_ . 'feature_value_lang` WHERE value = "' . pSQL($attributeValue) . '") AND id_feature = ' . $FeatureNameId);
            // If 'feature value name' does not exist, insert new.
            if (empty($FeatureValueId)) {
                Db::getInstance()->execute('INSERT INTO `' . _DB_PREFIX_ . 'feature_value` (`id_feature_value`,`id_feature`,`custom`) VALUES (0, ' . $FeatureNameId . ', 0)');
                $FeatureValueId = Db::getInstance()->Insert_ID();
                Db::getInstance()->execute('INSERT INTO `' . _DB_PREFIX_ . 'feature_value_lang` (`id_feature_value`,`id_lang`,`value`) VALUES (' . $FeatureValueId . ', ' . Context::getContext()->language->id . ', "' . pSQL($attributeValue) . '")');
            }
            Db::getInstance()->execute('INSERT INTO `' . _DB_PREFIX_ . 'feature_product` (`id_feature`, `id_product`, `id_feature_value`) VALUES (' . $FeatureNameId . ', ' . $product->id . ', ' . $FeatureValueId . ')');
        }
    }*/


    if (is_string($imgUrl)) {
        $shops = Shop::getShops(true, null, true);
        $image = new Image();
        $image->id_product = $product->id;
        $image->position = Image::getHighestPosition($product->id) + 1;
        $image->cover = true;
        if (($image->validateFields(false, true)) === true && ($image->validateFieldsLang(false, true)) === true && $image->add()) {
            $image->associateTo($shops);
            if (!uploadImage($product->id, $image->id, $imgUrl)) {
                $image->delete();
            }
        }
    }
    else {
        $img_count = 0;
        var_dump($imgUrl);
        foreach ($imgUrl as $img){
            var_dump($img);
            $shops = Shop::getShops(true, null, true);
            $image = new Image();
            $image->id_product = $product->id;
            $image->position = Image::getHighestPosition($product->id) + 1;
            if ($img_count == 0) {
                $image->cover = true;
            }else {
                $image->cover = false;
            }
            if (($image->validateFields(false, true)) === true && ($image->validateFieldsLang(false, true)) === true && $image->add()) {
                $image->associateTo($shops);
                if (!uploadImage($product->id, $image->id, $img)) {
                    $image->delete();
                }
            }
            $img_count ++;
        }
    }
    if ($combinations)
        checkCombinations($product, $combinations);
    echo 'Product added successfully (ID: ' . $product->id . ')';
}

function uploadImage($id_entity, $id_image = null, $imgUrl) {
    $tmpfile = tempnam(_PS_TMP_IMG_DIR_, 'ps_import');
    $watermark_types = explode(',', Configuration::get('WATERMARK_TYPES'));
    $image_obj = new Image((int)$id_image);
    $path = $image_obj->getPathForCreation();
    $imgUrl = str_replace(' ', '%20', trim($imgUrl));
    // Evaluate the memory required to resize the image: if it's too big we can't resize it.
    if (!ImageManager::checkImageMemoryLimit($imgUrl)) {
        return false;
    }
    if (copy($imgUrl, $tmpfile)) {
        ImageManager::resize($tmpfile, $path . '.jpg');
        $images_types = ImageType::getImagesTypes('products');
        foreach ($images_types as $image_type) {
            ImageManager::resize($tmpfile, $path . '-' . stripslashes($image_type['name']) . '.jpg', $image_type['width'], $image_type['height']);
            if (in_array($image_type['id_image_type'], $watermark_types)) {
                Hook::exec('actionWatermark', array('id_image' => $id_image, 'id_product' => $id_entity));
            }
        }
    } else {
        unlink($tmpfile);
        return false;
    }
    unlink($tmpfile);
    return true;
}

function arYra($prod){
    $sql = new DbQuery();
    $sql->select('id_product');
    $sql->from('product');
    $sql->where('ean13 = "' . psql((string)$prod) . '"');
    $atsakymas = Db::getInstance(_PS_USE_SQL_SLAVE_)->executeS($sql);

    if (is_array($atsakymas) && count($atsakymas)) {
        //echo "YRA: " . $prod->isbn . "<==>" . $prod->N17_KODAS_PS . " <br> ";
        return true;
    }else{
        //echo "<br>----RADAU === nauja preke: " . $prod->N17_KODAS_PS . " " . $prod->N17_PAV . "<br>";
        return false;
    }

}

function arYraRef($prod){
    $sql = new DbQuery();
    $sql->select('id_product');
    $sql->from('product');
    $sql->where('reference = "' . psql((string)$prod) . '"');
    $atsakymas = Db::getInstance(_PS_USE_SQL_SLAVE_)->executeS($sql);

    if (is_array($atsakymas) && count($atsakymas)) {
        //echo "YRA: " . $prod->isbn . "<==>" . $prod->N17_KODAS_PS . " <br> ";
        return true;
    }else{
        //echo "<br>----RADAU === nauja preke: " . $prod->N17_KODAS_PS . " " . $prod->N17_PAV . "<br>";
        return false;
    }

}

function findDublicates()
{
    $sql = new DbQuery();
    $sql->select('id_product');
    $sql->from('product');
    $sql->where('active = 0');
    $atsakymas = Db::getInstance(_PS_USE_SQL_SLAVE_)->executeS($sql);

    foreach ($atsakymas as $pr) {
        $product = new Product((int)$pr['id_product']);

        $sql = new DbQuery();
        $sql->select('id_product');
        $sql->from('product');
        $sql->where('ean13 = '.$product->ean13);
        $result = Db::getInstance(_PS_USE_SQL_SLAVE_)->executeS($sql);

        if (is_array($result) && count($result) > 1) {
            echo "YRA: " . $product->id . "<==>" . $product->reference . " <br> ";
            var_dump($result);
            echo "<br>----<br>";
        }

    }
}

function getIdsToClean()
{
    $sql = new DbQuery();
    $sql->select('id_product, description');
    $sql->from('product_lang');
    $sql->where('id_product > 3334');
    //$sql->where('id_product = 4028');
    $atsakymas = Db::getInstance(_PS_USE_SQL_SLAVE_)->executeS($sql);

    foreach ($atsakymas as $pr) {

        $newDescription = removeLinks($pr['description']);
        //echo "<br><br> " . $newDescription;
        $product = new Product((int)$pr['id_product']);
        $product->description = $newDescription;
        $product->save();
        // $sql2 = '
        // UPDATE '._DB_PREFIX_.'product_lang SET
        // `description` = "'.pSQL($newDescription).'"
        // WHERE id_product = '.(int)$pr['id_product'].'
        // ';

        // echo "<br><br> " . $sql2;

        //  if(DB::getInstance(_PS_USE_SQL_SLAVE_)->execute($sql2)){
        //      echo "<br>success<br>";
        //  }
    }
}

function removeLinks($s){
    while(TRUE){
        @list($pre,$mid) = explode('<a',$s,2);
        @list($mid,$post) = explode('</a>',$mid,2);
        $s = $pre.$post;
        if (is_null($post))return $s;
    }
}
