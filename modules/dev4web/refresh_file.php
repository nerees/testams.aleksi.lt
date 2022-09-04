<?php
if (isset($_GET['token']) && $_GET['token'] === 'brooklyn99') {
    $map_url = 'https://inbeauty.lt/produktai/aleksi/aleksi_xml.php?token=xQpSscbqLY93';

    if (($response_xml_data = file_get_contents($map_url)) === false) {
        echo "Error fetching XML\n";
    } else {
        $file = file_put_contents('new.xml',$response_xml_data);
        echo "file saved";
    }
}

