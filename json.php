<?php

    // Cross-Origin Resource Sharing Header
    header('Access-Control-Allow-Origin: http://tw.rter.info');
    header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
    header('Access-Control-Allow-Headers: X-Requested-With, Content-Type, Accept');
    header("Content-Type: application/json");

    function debug_to_console($data)
    {
        $output = $data;
        if (is_array($output))
            $output = implode(',', $output);

        echo "<script>console.log('Debug Objects: " . $output . "' );</script>";
    }

    function element_to_obj($element)
    {
        $obj = array("tag" => $element->tagName);
        foreach ($element->attributes as $attribute) {
            $obj[$attribute->name] = $attribute->value;
        }
        foreach ($element->childNodes as $subElement) {
            if ($subElement->nodeType == XML_TEXT_NODE) {
                $obj["html"] = $subElement->wholeText;
            } else {
                $obj["children"][] = element_to_obj($subElement);
            }
        }
        return $obj;
    }

    function html_to_obj($html)
    {
        $dom = new DOMDocument();
        $dom->loadHTML($html);
        return element_to_obj($dom->documentElement);
    }

    $json = '{"a":1,"b":2,"c":3,"d":4,"e":5}';
    var_dump(json_decode($json));

    $url = "http://tw.rter.info/json.php?t=currency&q=check&iso=JPY";
    $html = file_get_contents($url);
    var_dump(json_decode($html));
    
    //$json = json_encode($html, JSON_PRETTY_PRINT);
    //debug_to_console($json);
    ///echo $json;
?>
