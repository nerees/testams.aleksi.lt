<?php
die('fsio');
@ini_set('max_execution_time', 900);
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Check if _PS_ADMIN_DIR_ is defined
if (!defined('_PS_ADMIN_DIR_')) {
    // if _PS_ADMIN_DIR_ is not defined, define.
    define('_PS_ADMIN_DIR_', getcwd());
}
include_once('../../config/config.inc.php');

//$xmlUrl = 'http://servisas.freeshop.lt/modules/export/varle/service.php?storeid=02096701&modid=1&password=&method=xml';
//if (($response_xml_data = file_get_contents($xmlUrl)) === false) {
//    echo "Error fetching XML\n";
//} else {
//    $file = file_put_contents('alfonsas.xml',$response_xml_data);
//    echo "file saved";
//}


$objXmlDocument = simplexml_load_string(file_get_contents("new.xml"), 'SimpleXMLElement', LIBXML_NOCDATA);

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


foreach ($arrOutput->products->product as $product) {

    if (arYra($product->id))
        continue;

    if ($product->manufacturer == "NERA") {
//            var_dump($product->id); //labiau cia reference
//            echo "<br>---<br>";
//            var_dump($product->description);
//            echo "<br>---<br>";
//            var_dump($product->images);
//            echo "<br>---<br>";
//            var_dump($product->title);
//            echo "<br>---<br>";
//            var_dump($product->quantity);
//            echo "<br>---<br>";
//            var_dump($product->title);
//            echo "<br>---<br>";
////            var_dump($product->price);
//            echo "<br>---<br>";
//            var_dump($product->barcode);
//            echo "<br>---<br>";

        addProduct(
            61,
            "",
            0,
            0,
            0,
            0,
            $product->barcode,
            $product->id,
            $product->title,
            $product->quantity,
            $product->description,
            '',
            9.99,
            9.99,
            $product->images,
            2,
            82
        );

    }
}

//foreach ($arrOutput->products->product as $product) {
//
//    if (arYra($product->barcode))
//        continue;
//
//    if (is_array($product->categories->category)){
//        foreach ($product->categories->category as $cat) {
//
//            if (in_array((int)$cat, $smagiai)) {
//                //    if ($product->manufacturer == "SPLAT PLANET"){
////                var_dump($product->barcode); //labiau cia reference
////                echo "<br>---<br>";
////                var_dump($product->description);
////                echo "<br>---<br>";
////                var_dump($product->images);
////                echo "<br>---<br>";
////                var_dump($product->title);
////                echo "<br>---<br>";
////                var_dump($product->quantity);
////                echo "<br>---<br>";
////                var_dump($product->title);
////                echo "<br>---<br>";
////                var_dump($product->price);
////                echo "<br>---<br>";
////                var_dump($product->prime_costs);
////                echo "<br>---<br>";
//                addProduct(
//                    55,
//                    "",
//                    0,
//                    0,
//                    0,
//                    0,
//                    0,
//                    $product->barcode,
//                    $product->title,
//                    $product->quantity,
//                    $product->description,
//                    '',
//                    $product->price,
//                    $product->prime_costs,
//                    $product->images,
//                    2,
//                    107
//                );
//            }
//        }
//    }else{
//        if (in_array((int)$product->categories->category, $smagiai)) {
//            //if ($product->manufacturer == "SPLAT PLANET"){
////            var_dump($product->barcode); //labiau cia reference
////            echo "<br>---<br>";
////            var_dump($product->description);
////            echo "<br>---<br>";
////            var_dump($product->images);
////            echo "<br>---<br>";
////            var_dump($product->title);
////            echo "<br>---<br>";
////            var_dump($product->quantity);
////            echo "<br>---<br>";
////            var_dump($product->title);
////            echo "<br>---<br>";
////            var_dump($product->price);
////            echo "<br>---<br>";
////            var_dump($product->prime_costs);
////            echo "<br>---<br>";
//            addProduct(
//                55,
//                "",
//                0,
//                0,
//                0,
//                0,
//                0,
//                $product->barcode,
//                $product->title,
//                $product->quantity,
//                $product->description,
//                '',
//                $product->price,
//                $product->prime_costs,
//                $product->images,
//                2,
//                107
//            );
//        }
//    }
//}

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
    //$product->description = $description . "<br>" . $youtube;
    $product->description = $description;
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

    if (!is_array($imgUrl->image)) {

        $shops = Shop::getShops(true, null, true);
        $image = new Image();
        $image->id_product = $product->id;
        $image->position = Image::getHighestPosition($product->id) + 1;
        $image->cover = true;
        if (($image->validateFields(false, true)) === true && ($image->validateFieldsLang(false, true)) === true && $image->add()) {
            $image->associateTo($shops);
            if (!uploadImage($product->id, $image->id, $imgUrl->image)) {
                $image->delete();
            }
        }
    }
    else {
        $img_count = 0;
        foreach ($imgUrl->image as $img){

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
    $sql->select('count(id_product)');
    $sql->from('product');
    $sql->where('reference = "' . psql($prod) . '"');
    $atsakymas = Db::getInstance(_PS_USE_SQL_SLAVE_)->getValue($sql);

    return (int)$atsakymas;

    if (is_array($atsakymas)) {
        //echo "YRA: " . $prod->isbn . "<==>" . $prod->N17_KODAS_PS . " <br> ";
        return true;
    }else{
        //echo "<br>----RADAU === nauja preke: " . $prod->N17_KODAS_PS . " " . $prod->N17_PAV . "<br>";
        return false;
    }

}
