<?php

use PrestaShop\PrestaShop\Adapter\Category\CategoryProductSearchProvider;
use PrestaShop\PrestaShop\Adapter\Image\ImageRetriever;
use PrestaShop\PrestaShop\Adapter\Manufacturer\ManufacturerProductSearchProvider;
use PrestaShop\PrestaShop\Adapter\Presenter\Product\ProductListingPresenter;
use PrestaShop\PrestaShop\Adapter\Product\PriceFormatter;
use PrestaShop\PrestaShop\Adapter\Product\ProductColorsRetriever;
use PrestaShop\PrestaShop\Core\Product\Search\ProductSearchContext;
use PrestaShop\PrestaShop\Core\Product\Search\ProductSearchQuery;
use PrestaShop\PrestaShop\Core\Product\Search\SortOrder;

class D4wPageController extends FrontController
{
    public $php_self = 'd4wpage';

    public function initContent()
    {
        $products = $this->getProductIds();
        $productIds = array_column($products, 'id_product');

        $this->context->smarty->assign(
            array(
                'h2name' => 'D4w page',
                'variable1' => 'Variable 4',
                'products' => $this->getFrontendProductInformation($productIds, $this->context->language->id),
            )
        );

        $this->setTemplate('d4wpage');

        parent::initContent();
    }

    public function getProductIds()
    {
//        $sql = new DbQuery();
//        $sql->select('id_product');
//        $sql->from('product');
//        $sql->where('id_manufacturer IN (9, 10, 11, 12, 13, 14, 15, 37, 16, 18, 61, 20, 21, 22, 23, 24, 60, 26) AND active = 1');
//        return Db::getInstance(_PS_USE_SQL_SLAVE_)->executeS($sql);

        return Db::getInstance()->executeS('
            SELECT p.`id_product`
            FROM '._DB_PREFIX_.'product p 
            LEFT JOIN '._DB_PREFIX_.'stock_available sa ON sa.`id_product` = p.`id_product`
            WHERE 
                p.`active` = 1
                AND sa.`quantity` > 0
                AND p.`id_manufacturer` IN (9, 10, 11, 12, 13, 14, 15, 37, 16, 18, 61, 20, 21, 22, 23, 24, 60, 26)
            GROUP BY p.`id_product`
        ');
    }

    public function getFrontendProductInformation($allSelectedProductIds, $languageId)
    {
        // set default category Home
        $category = new Category((int)2);

        // create new product search proider
        $searchProvider = new CategoryProductSearchProvider(
            $this->context->getTranslator(),
            $category
        );

        // set actual context
        $context = new ProductSearchContext($this->context);

        // create new search query
        $query = new ProductSearchQuery();
        $query->setResultsPerPage(PHP_INT_MAX)->setPage(1);
        $query->setSortOrder(new SortOrder('product', 'position', 'asc'));

        $result = $searchProvider->runQuery(
            $context,
            $query
        );

        // Product handling - to get relevant data
        $assembler = new ProductAssembler($this->context);
        $presenterFactory = new ProductPresenterFactory($this->context);
        $presentationSettings = $presenterFactory->getPresentationSettings();
        $presenter = new ProductListingPresenter(
            new ImageRetriever(
                $this->context->link
            ),
            $this->context->link,
            new PriceFormatter(),
            new ProductColorsRetriever(),
            $this->context->getTranslator()
        );

        $products = array();
        foreach ($result->getProducts() as $rawProduct) {
            $productId = $rawProduct['id_product'];
            if(in_array($productId, $allSelectedProductIds)) {
                $product = $presenter->present(
                    $presentationSettings,
                    $assembler->assembleProduct($rawProduct),
                    $this->context->language
                );
                array_push($products, $product);
            }
        }

        return $products;
    }

}