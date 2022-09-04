<?php
//https://www.prestashop.com/forums/topic/1032536-tutorialps-17-adding-prestashop-products-programmatically/
die('ne ne');
@ini_set('max_execution_time', 900);
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Check if _PS_ADMIN_DIR_ is defined
if (!defined('_PS_ADMIN_DIR_')) {
    // if _PS_ADMIN_DIR_ is not defined, define.
    define('_PS_ADMIN_DIR_', getcwd());
}
// Setup connection with config.inc.php (required for database connection, ...)
include_once('../../config/config.inc.php');

//$map_url = 'http://images.krinona.lt/Eksport_NETRINTI/Aleksi/Prekes.xml';
//
//if (($response_xml_data = file_get_contents($map_url)) === false) {
//    echo "Error fetching XML\n";
//} else {
//    $file = file_put_contents('krinona_new.xml',$response_xml_data);
//    echo "file saved";
//}
//die('import');
//bandom su simple xml

$objXmlDocument = simplexml_load_string(file_get_contents("krinona_new.xml"));

if ($objXmlDocument === FALSE) {
    echo "There were errors parsing the XML file.\n";
    foreach(libxml_get_errors() as $error) {
        echo $error->message;
    }
    exit;
}

try {
    $objJsonDocument = json_encode($objXmlDocument, JSON_THROW_ON_ERROR);
} catch (JsonException $e) {
}
try {
    $arrOutput = json_decode($objJsonDocument, false, 512, JSON_THROW_ON_ERROR);
} catch (JsonException $e) {
}

//foreach ($arrOutput->list->product as $productXml) {
//    if ($productXml->category_name === "Plaukų tiesintuvai"){
//
//        $sql = new DbQuery();
//        $sql->select('id_product');
//        $sql->from('product');
//        $sql->where('ean13 = "' . psql($productXml->attributes->barcode) . '"');
//        $atsakymas = Db::getInstance(_PS_USE_SQL_SLAVE_)->executeS($sql);
//        echo ($atsakymas[0]['id_product']);
//        echo "<br>";
//        //$product = new Product((int)$atsakymas[0]['id_product']);
//        //$product->addToCategories(array(4, 13, 50));
//        //$product->update();
//    }
//}

//die('nene');
$images_counter = 0;

foreach ($arrOutput->list->product as $productXml) {

    $tmp_prop = $productXml->properties->property;
    if (is_object($tmp_prop)){
        $brand_id = find_brand($tmp_prop->values->value);
    }
    else {
        $brand_id = find_brand($productXml->properties->property[0]->values->value);
    }
    $youtube = "";
    if (isset($productXml->video_youtube)) {
        $youtube = "<iframe width='560' height='315' src='".$productXml->video_youtube."' frameborder='0' allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe>";
    }
    if ($brand_id) {
        $arYra = arYra($productXml->attributes->barcode);
        if (!$arYra) {
                addProduct(
                $brand_id,
                $youtube,
                $productXml->weightbruto,
                $productXml->width,
                $productXml->height,
                $productXml->length,
                $productXml->attributes->barcode,
                $productXml->attributes->supplier_code,
                $productXml->title,
                $productXml->quantity,
                $productXml->long_description,
                $productXml->short_description,
                $productXml->prices->cost_price->value,
                $productXml->prices->base_price->value,
                $productXml->images->image,
                2,
                168
            );
                    //exit;
        }
    }


//    addProduct(
//        $brand_id,
//        $youtube,
//        $productXml->weightbruto,
//        $productXml->width,
//        $productXml->height,
//        $productXml->length,
//        $productXml->attributes->barcode,
//        $productXml->attributes->supplier_code,
//        $productXml->title,
//        $productXml->quantity,
//        $productXml->long_description,
//        $productXml->short_description,
//        $productXml->prices->cost_price->value,
//        $productXml->prices->base_price->value,
//        $productXml->images->image,
//        2,
//        3
//    );
    //exit;
}

//$secure_key = 'ed3fa1ce558e1c2528cfbaa3f99403';

// Check if the client use the correct secure_key, url to use: www.yourstore.com/yourbackoffice/importmyproduct.php?secure_key=ed3fa1ce558e1c2528cfbaa3f99403
//if(!Tools::getValue('secure_key') || Tools::getValue('secure_key') != $secure_key) {
// If the secure_key is not set our not equal the php page will stop running.
//die('UNAUTHORIZED: We dont want you on this page!');
//}
//echo 'Welcome, the secure_key you have used is correct. Now we can start adding product programmatically ... <br>';

//function addProduct($ean13, $ref, $name, $qty, $text, $features, $price, $imgUrl, $catDef, $catAll) {
function addProduct($brand_id, $youtube, $weight, $width, $height, $depth, $ean13, $ref, $name, $qty, $description, $description_short, $price, $base_price, $imgUrl, $catDef, $catAll) {
    $product = new Product();              // Create new product in prestashop
    $product->id_manufacturer = (int)$brand_id;
    $product->weight = $weight;
    $product->width = $width;
    $product->height = $height;
    $product->depth = $depth;
    $product->ean13 = $ean13;
    $product->reference = $ref;
    $product->name = $name;
    $product->description = $description . "<br>" . $youtube;
    //$product->description = htmlspecialchars($description);
    $product->description_short = $description_short;
    //$product->description_short = htmlspecialchars($description_short);
    $product->id_category_default = $catDef;
    $product->redirect_type = '301';
    $product->price = number_format(((float)$price / 1.21), 6, '.', '');
    $product->wholesale_price = number_format(((float)$base_price / 1.21), 6, '.', '');
    $product->minimal_quantity = 1;
    $product->show_price = 1;
    $product->on_sale = 0;
    $product->online_only = 0;
    $product->meta_description = '';
    $product->active = false;
    $product->id_tax_rules_group = 1;
    $product->link_rewrite = Tools::str2url($name); // Contribution credits: mfdenis
    $product->add();                        // Submit new product
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


    if (gettype($imgUrl) == 'object') {

        $shops = Shop::getShops(true, null, true);
        $image = new Image();
        $image->id_product = $product->id;
        $image->position = Image::getHighestPosition($product->id) + 1;
        $image->cover = true;
        if (($image->validateFields(false, true)) === true && ($image->validateFieldsLang(false, true)) === true && $image->add()) {
            $image->associateTo($shops);
            if (!uploadImage($product->id, $image->id, $imgUrl->url)) {
                $image->delete();
            }
        }
    }
    else {
        $img_count = 0;
        foreach ($imgUrl as $img){

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
                if (!uploadImage($product->id, $image->id, $img->url)) {
                    $image->delete();
                }
            }
            $img_count ++;
        }
    }
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

function createMultiLangField($field) {
    $res = array();
    foreach (Language::getIDs(false) as $id_lang) {
        $res[$id_lang] = $field;
    }
    return $res;
}

function find_brand($search) {
    switch ($search){
        case "Casmara" :
            return 40;
        case "OSOM Professional" :
            return 46;
        case "OSOM Oral Care" :
            return 63;
        case "Zyle" :
            return 64;
    }
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

//function find_brand($search) {
//    switch ($search){
//        case "Casmara" :
//            return 40;
//        case "SAPHIRA" :
//            return 41;
//        case "OMG!" :
//            return 42;
//        case "Little Green" :
//            return 43;
//        case "RETINOL" :
//            return 44;
//        case "LAlga" :
//            return 45;
//        case "OSOM Professional" :
//            return 46;
//    }
//}