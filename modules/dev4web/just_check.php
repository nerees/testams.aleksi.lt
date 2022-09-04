<?php
@ini_set('max_execution_time', 900);
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
include_once('../../config/config.inc.php');
die('nei');
$sql = new DbQuery();
$sql->select('id_product');
$sql->from('category_product');
$sql->where('id_category = 142');
$products = Db::getInstance(_PS_USE_SQL_SLAVE_)->executeS($sql);


//$products = [2180,
//2283,
//2284,
//2285,
//2286,
//2287,
//2288,
//2289,
//2290,
//2291,
//2313,
//2314,
//2327,
//2328,
//2329,
//2330,
//2331,
//2332,
//2333
//];

$catAll = [137];
$notInterestingCats = [2,137,138,3,126,88,6,92,132,95,135,107,121,139,142,86,25,134,133, 4, 5, 103, 124, 141, 93, 82, 89, 104, 94,91,122,17];
$usedCats = [];

if (!($languages = Language::getLanguages()))
    return false;

foreach ($products as $p) {
    echo $p['id_product'];
    echo "<br>";
    $product = new Product((int)$p['id_product']);
    $categories = $product->getCategories();
    foreach ($categories as $category) {
        //echo $p['id_product'] . " :: " . $category;
        //echo "<br>";
        if (!in_array($category, $notInterestingCats) && !in_array($category, $usedCats)){
            $usedCats [] = $category;
            $cat = new Category((int)$category);
            echo $category . " : " . getCategoryLevelDepth($category) . " - ";
            var_dump($cat->name[1]);
            echo "<br>";

        }
    }
    echo "<br>--<br>";
    //$product->addToCategories($catAll);
}



foreach ($products as $pr) {
    $product = new Product($pr['id_product']);
    $pr_cats = $product->getCategories();
    if (in_array(25, $pr_cats)) {
        $product->addToCategories(array(171));
        echo "added " . $product->id . "<br>";
    }
}

var_dump($usedCats);
die("fin");


function getCategoryLevelDepth($category)
{
    $q = new DbQuery();
    $q->select('level_depth');
    $q->from('category');
    $q->where('id_category = '.(int)$category);
    $r = Db::getInstance(_PS_USE_SQL_SLAVE_)->executeS($q);
    //var_dump($r);
    return (int)$r[0]['level_depth'];
}
//
//$count = 0;
//echo "<table>";
//echo "<tr>";
//echo "<td>";
//echo "Prekės ID";
//echo "</td>";
//echo "<td>";
//echo "Prekės kodas";
//echo "</td>";
//echo "<td>";
//echo "Pavadinimas";
//echo "</td>";
//echo "</tr>";
//foreach ($atsakymas as $ats) {
//    if ((int)$ats['id_product'] > 1696 && (int)$ats['id_product'] < 2334){
//        $count++;
//        $product = new Product((int)$ats['id_product']);
//            echo "<tr>";
//                echo "<td>";
//                echo $ats['id_product'];
//                echo "</td>";
//                echo "<td>";
//                echo $ats['reference'];
//                echo "</td>";
//                echo "<td>";
//                echo $product->name[1];
//                echo "</td>";
//            echo "</tr>";
//            unset($product);
//
//    }
//}
//echo "</table>";
//echo $count;
//die("linkejmai");
//$check_same = array();
//
//foreach ($atsakymas as $a) {
//    if ((int)$a['id_product'] > 1311){
//        $check_same[] = $a['ean13'];
//    }
//}
//
//foreach ($atsakymas as $b) {
//    $count = 0;
//    foreach ($check_same as $check) {
//        if ($check === $b['ean13']){
//            $count++;
//        }
//    }
//    if ($count > 1) {
//        $sql = new DbQuery();
//        $sql->select('*');
//        $sql->from('product');
//        $sql->where('ean13 = "' . psql($b['ean13']) . '"');
//        $result = Db::getInstance(_PS_USE_SQL_SLAVE_)->executeS($sql);
//        echo $b['ean13'];
//        echo "<br>";
//        echo $b['id_product'];
//        echo "<br> --- <br>";
//        var_dump($result);
//        exit;
//    }
//}
//
//exit;

//$krinona_url = 'http://images.krinona.lt/Eksport_NETRINTI/Aleksi/Prekes.xml';
//if (($response_xml_data = file_get_contents($krinona_url)) === false) {
//   echo "Error fetching XML\n";
//} else {
//    $file = file_put_contents('krinona.xml', $response_xml_data);
//}
//    $doc = new DOMDocument();
//    $doc->load('krinona.xml');
//    $docProducts = $doc->getElementsByTagName("product");
?>
<!--<html>-->
<!--<body>-->
<!--<table>-->
<!--    <thead>-->
<!--    <th>Preke</th>-->
<!--    <th>kategorija</th>-->
<!--    </thead>-->
<!--    <tbody>-->
<?php
//    foreach ($docProducts as $pr) {
//        $cat = $pr->getElementsByTagName("category_name");
//        $c = $cat[0]->nodeValue;
//        $title = $pr->getElementsByTagName("title");
//        $t = $title[0]->nodeValue;
//        echo "
//        <tr>
//            <td>". $t ."</td>
//            <td>". $c ."</td>
//        </tr>
//        ";
//    }
//?>
<!--    </tbody>-->
<!--</table>-->
<!--</body>-->
<!--</html>-->
<?php
//    foreach ($docProducts as $pr) {
//        $cat = $pr->getElementsByTagName("category_name");
//        $c = $cat[0]->nodeValue;
//        $title = $pr->getElementsByTagName("title");
//        $t = $title[0]->nodeValue;
//    }
//

//$map_url = 'https://inbeauty.lt/produktai/aleksi/aleksi_xml.php?token=xQpSscbqLY93';
//
//if (($response_xml_data = file_get_contents($map_url)) === false) {
//    echo "Error fetching XML\n";
//} else {
//    $file = file_put_contents('new.xml',$response_xml_data);
//}


//$barcodes = [];
//$prices = [];
//$i=0;
//$row = 1;
//kainu failas
    /*if (($handle = fopen("kainos.csv", "r")) !== FALSE) {
        while (($data = fgetcsv($handle, 1000, ",")) !== FALSE) {

                array_push($barcodes, $data[0]);
                array_push($prices, $data[1]);
                echo $data[0] . "<br />\n";
                echo $data[1] . "<br />\n";

            $i++;
        }
        fclose($handle);
    }*/

//kategoriju failas
//$id = [];
//$categories = [[]];

//if (($handle = fopen("id_kategorijos.csv", "r")) !== FALSE) {
//    $i=0;
//    while (($data = fgetcsv($handle, 1000, ",")) !== FALSE) {
//            $temp = [];
//            array_push($id, $data[0]);
//            if ($data[1]) {
//                array_push($temp, $data[1]);
//            }
//            if ($data[2]) {
//                array_push($temp, $data[2]);
//            }
//            if ($data[3]) {
//                array_push($temp, $data[3]);
//            }
//            if ($data[4]) {
//                array_push($temp, $data[4]);
//            }
//            if ($data[5]) {
//                array_push($temp, $data[5]);
//            }
//            if ($data[6]) {
//                array_push($temp, $data[6]);
//            }
//            $categories[$i] = $temp;
//            echo $data[0] . "<br />\n";
//            echo var_dump($categories[$i]) . "<br />\n";
//
//        $i++;
//    }
//    fclose($handle);
//}


//$file = readfile("aleksi_xml.xml");
    /*try {
        $data = simplexml_load_file("aleksi_xml.xml");
    } catch (Exception $e) {
        echo "error";
    }*/

//echo "labas";
//echo $data->root->products;
//var_dump($data->products->product[4]);
//$doc = new DOMDocument();
//$doc->load('aleksi_xml.xml');
//$categories = $doc->getElementsByTagName("category");
//$ids = $doc->getElementsByTagName("id");
//$titles = $doc->getElementsByTagName("title");
//$descriptions = $doc->getElementsByTagName("description");
//$manufacturers = $doc->getElementsByTagName("manufacturer");
//$barcodes = $doc->getElementsByTagName("barcode");
//$images = $doc->getElementsByTagName("images");
//$products = $doc->getElementsByTagName("product");

//echo $ids->item(0)->nodeValue . "\n";

    /*for ($i = 0; $i < $products->length; $i++) {
        echo $products->item($i)->nodeValue . "\n";
    }*/

    /*foreach($products as $key => $product) {
        //echo $ids->item($key)->nodeValue . "::" . count($images->item($key)->getElementsByTagName('image')) . "<br>";
        if (count($images->item($key)->getElementsbyTagName("image")) > 1 ) {
            $oplia = $images->item($key)->getElementsbyTagName("image");
            echo "one image ::" . $oplia->item(0)->nodeValue  . "<br>";
            echo "two image ::" . $oplia->item(1)->nodeValue  . "<br>";
        }
    }*/

//foreach($categories as $key => $category) {
//    $temp_cat = getCategories($category->nodeValue);
//    /*if ($temp_cat[1] === "Kūno priežiūros priemonės") {
//        echo ("ou yes");
//    }*/
//    //echo (getCategories($category->nodeValue));
//    echo $category->nodeValue . "<br>";
//    //die("fsio");
//}

    function getCategories($value)
    {
        $cats = [];
        $x = preg_split("/\//", $value);
        if (!empty($x[0])) {
            //$cats = $x[0];
            array_push($cats, $x[0]);
        }
        if (!empty($x[1])) {
            //$cats = $x[1];
            array_push($cats, $x[1]);
        }
        if (!empty($x[2])) {
            //$cats = $x[2];
            array_push($cats, $x[2]);
        }
        //echo $cats;
        return $cats;
    }

    function getCatId($name)
    {
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
        }
    }


/*foreach($products as $key => $product){

    echo $key ."--" . $product[$key]->getElementsByTagName('id')->nodeValue . "<br>";
    echo $key ."--" . $product[$key]->getElementsByTagName('title')->nodevalue . "<br>";
}*/

/*foreach($images as $key => $img){
    echo $key ."--" . count($img->getElementsByTagName('image')) . "<br>";
}*/
//var_dump($products_array);



/*foreach ($barcodes as $barcode) {
    echo $barcode->nodeValue . "<br>";
}

foreach ($manufacturers as $manufacturer) {
    echo $manufacturer->nodeValue . "<br>";
}

foreach ($descriptions as $description) {
    echo $description->nodeValue . "<br>";
}

foreach ($titles as $title) {
    echo $title->nodeValue . "<br>";
}



foreach ($ids as $id) {
    echo $id->nodeValue . "<br>";
}*/

//$cat0 = array();
//$cat1 = array();
//$cat2 = array();

/*foreach ($categories as $category) {
    //if ((string)$category->nodeName === "category"){
        $x = preg_split("/\//", $category->nodeValue);
        if (!empty($x[0])){
            array_push($cat0, $x[0]);
        }
        if (!empty($x[1])){
            array_push($cat1, $x[1]);
        }
        if (!empty($x[2])){
            array_push($cat2, $x[2]);
        }
}*/
//var_dump(count($cat0));
//echo "<br><hr>";
//var_dump(count($cat1));
//echo "<br><hr>";
//var_dump(count($cat2));
//echo "<br><hr>";

/*foreach ($cat2 as $cat) {
	echo $cat . "<br>";
}*/
