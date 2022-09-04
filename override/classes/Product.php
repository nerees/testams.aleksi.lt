<?php
/**
*  @author    Amazzing <mail@amazzing.ru>
*  @copyright Amazzing
*  @license   http://opensource.org/licenses/afl-3.0.php  Academic Free License (AFL 3.0)
*
*  INFO: This override is used for better performance on native Search results page
*/
class Product extends ProductCore
{
    /*
    * module: amazzingfilter
    * date: 2022-09-02 14:37:41
    * version: 3.1.9
    */
    public static function getProductsProperties($id_lang, $query_result)
    {
        if (!empty(Context::getContext()->properties_not_required)) {
            return $query_result;
        } else {
            return parent::getProductsProperties($id_lang, $query_result);
        }
    }
}
