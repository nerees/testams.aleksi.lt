<?php
/**
*  @author    Amazzing <mail@amazzing.ru>
*  @copyright Amazzing
*  @license   http://opensource.org/licenses/afl-3.0.php  Academic Free License (AFL 3.0)
*
*  INFO: This override is used for better performance on Best Sellers page
*/

class ProductSale extends ProductSaleCore
{
    public static function getBestSales(
        $id_lang,
        $page_number = 0,
        $nb_products = 10,
        $order_by = null,
        $order_way = null
    ) {
        $context = Context::getContext();
        if (isset($context->filtered_result) && $context->filtered_result['controller'] == 'bestsales') {
            return $context->filtered_result['products'];
        } else {
            return parent::getBestSales($id_lang, $page_number, $nb_products, $order_by, $order_way);
        }
    }
}
