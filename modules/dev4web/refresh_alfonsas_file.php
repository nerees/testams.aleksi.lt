<?php
if (isset($_GET['token']) && $_GET['token'] === 'brooklyn99') {
    $map_url = 'http://servisas.freeshop.lt/modules/export/varle/service.php?storeid=02096701&modid=1&password=&method=xml';

    if (($response_xml_data = file_get_contents($map_url)) === false) {
        echo "Error fetching XML\n";
    } else {
        $file = file_put_contents('newalfonsas.xml',$response_xml_data);
        echo "file saved";
    }
}