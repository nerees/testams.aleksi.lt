<?php
use PrestaShop\PrestaShop\Adapter\ServiceLocator;

class Cart extends CartCore
{
//    /** BEGIN PrestaChamps Override fix Unfortunately, there are no carriers available for your delivery address **/
//    public function updateAddressId($id_address, $id_address_new)
//    {
//        $to_update = false;
//        if (!isset($this->id_address_invoice) || $this->id_address_invoice == $id_address) {
//            $to_update = true;
//            $this->id_address_invoice = $id_address_new;
//        }
//        if (!isset($this->id_address_delivery) || $this->id_address_delivery == $id_address) {
//            $to_update = true;
//            $this->id_address_delivery = $id_address_new;
//        }
//        if ($to_update) {
//            $this->update();
//        }
//
//        $sql = 'UPDATE `' . _DB_PREFIX_ . 'cart_product`
//        SET `id_address_delivery` = ' . (int) $id_address_new . '
//        WHERE  `id_cart` = ' . (int) $this->id
//            // . ' AND `id_address_delivery` = ' . (int) $id_address
//        ;
//        Db::getInstance()->execute($sql);
//
//        $sql = 'UPDATE `' . _DB_PREFIX_ . 'customization`
//            SET `id_address_delivery` = ' . (int) $id_address_new . '
//            WHERE  `id_cart` = ' . (int) $this->id
//            // . ' AND `id_address_delivery` = ' . (int) $id_address
//        ;
//        Db::getInstance()->execute($sql);
//    }
//    /** END PrestaChamps Override fix Unfortunately, there are no carriers available for your delivery address **/

//    /**
//     * Get all deliveries options available for the current cart.
//     *
//     * @param Country $default_country
//     * @param bool $flush Force flushing cache
//     *
//     * @return array array(
//     *               0 => array( // First address
//     *               '12,' => array(  // First delivery option available for this address
//     *               carrier_list => array(
//     *               12 => array( // First carrier for this option
//     *               'instance' => Carrier Object,
//     *               'logo' => <url to the carriers logo>,
//     *               'price_with_tax' => 12.4,
//     *               'price_without_tax' => 12.4,
//     *               'package_list' => array(
//     *               1,
//     *               3,
//     *               ),
//     *               ),
//     *               ),
//     *               is_best_grade => true, // Does this option have the biggest grade (quick shipping) for this shipping address
//     *               is_best_price => true, // Does this option have the lower price for this shipping address
//     *               unique_carrier => true, // Does this option use a unique carrier
//     *               total_price_with_tax => 12.5,
//     *               total_price_without_tax => 12.5,
//     *               position => 5, // Average of the carrier position
//     *               ),
//     *               ),
//     *               );
//     *               If there are no carriers available for an address, return an empty  array
//     */
//    public function getDeliveryOptionList(Country $default_country = null, $flush = false)
//    {
//        if (isset(static::$cacheDeliveryOptionList[$this->id]) && !$flush) {
//            return static::$cacheDeliveryOptionList[$this->id];
//        }
//
//        $delivery_option_list = [];
//        $carriers_price = [];
//        $carrier_collection = [];
//        $package_list = $this->getPackageList($flush);
//
//        // Foreach addresses
//        foreach ($package_list as $id_address => $packages) {
//            // Initialize vars
//            $delivery_option_list[$id_address] = [];
//            $carriers_price[$id_address] = [];
//            $common_carriers = null;
//            $best_price_carriers = [];
//            $best_grade_carriers = [];
//            $carriers_instance = [];
//
//            // Get country
//            if ($id_address) {
//                $address = new Address($id_address);
//                $country = new Country($address->id_country);
//            } else {
//                $country = $default_country;
//            }
//
//            // Foreach packages, get the carriers with best price, best position and best grade
//            foreach ($packages as $id_package => $package) {
//                // No carriers available
//                if (count($package['carrier_list']) == 1 && current($package['carrier_list']) == 0) {
//                    $cache[$this->id] = [];
//
//                    return $cache[$this->id];
//                }
//
//                $carriers_price[$id_address][$id_package] = [];
//
//                // Get all common carriers for each packages to the same address
//                if (null === $common_carriers) {
//                    $common_carriers = $package['carrier_list'];
//                } else {
//                    $common_carriers = array_intersect($common_carriers, $package['carrier_list']);
//                }
//
//                $best_price = null;
//                $best_price_carrier = null;
//                $best_grade = null;
//                $best_grade_carrier = null;
//
//                // Foreach carriers of the package, calculate his price, check if it the best price, position and grade
//                foreach ($package['carrier_list'] as $id_carrier) {
//                    if (!isset($carriers_instance[$id_carrier])) {
//                        $carriers_instance[$id_carrier] = new Carrier($id_carrier);
//                    }
//
//                    $price_with_tax = $this->getPackageShippingCost((int) $id_carrier, true, $country, $package['product_list']);
//                    $price_without_tax = $this->getPackageShippingCost((int) $id_carrier, false, $country, $package['product_list']);
//                    if (null === $best_price || $price_with_tax < $best_price) {
//                        $best_price = $price_with_tax;
//                        $best_price_carrier = $id_carrier;
//                    }
//                    $carriers_price[$id_address][$id_package][$id_carrier] = [
//                        'without_tax' => $price_without_tax,
//                        'with_tax' => $price_with_tax,
//                    ];
//
//                    $grade = $carriers_instance[$id_carrier]->grade;
//                    if (null === $best_grade || $grade > $best_grade) {
//                        $best_grade = $grade;
//                        $best_grade_carrier = $id_carrier;
//                    }
//                }
//
//                $best_price_carriers[$id_package] = $best_price_carrier;
//                $best_grade_carriers[$id_package] = $best_grade_carrier;
//            }
//
//            // Reset $best_price_carrier, it's now an array
//            $best_price_carrier = [];
//            $key = '';
//
//            // Get the delivery option with the lower price
//            foreach ($best_price_carriers as $id_package => $id_carrier) {
//                $key .= $id_carrier . ',';
//                if (!isset($best_price_carrier[$id_carrier])) {
//                    $best_price_carrier[$id_carrier] = [
//                        'price_with_tax' => 0,
//                        'price_without_tax' => 0,
//                        'package_list' => [],
//                        'product_list' => [],
//                    ];
//                }
//                $best_price_carrier[$id_carrier]['price_with_tax'] += $carriers_price[$id_address][$id_package][$id_carrier]['with_tax'];
//                $best_price_carrier[$id_carrier]['price_without_tax'] += $carriers_price[$id_address][$id_package][$id_carrier]['without_tax'];
//                $best_price_carrier[$id_carrier]['package_list'][] = $id_package;
//                $best_price_carrier[$id_carrier]['product_list'] = array_merge($best_price_carrier[$id_carrier]['product_list'], $packages[$id_package]['product_list']);
//                $best_price_carrier[$id_carrier]['instance'] = $carriers_instance[$id_carrier];
//                $real_best_price = !isset($real_best_price) || $real_best_price > $carriers_price[$id_address][$id_package][$id_carrier]['with_tax'] ?
//                    $carriers_price[$id_address][$id_package][$id_carrier]['with_tax'] : $real_best_price;
//                $real_best_price_wt = !isset($real_best_price_wt) || $real_best_price_wt > $carriers_price[$id_address][$id_package][$id_carrier]['without_tax'] ?
//                    $carriers_price[$id_address][$id_package][$id_carrier]['without_tax'] : $real_best_price_wt;
//            }
//
//            // Add the delivery option with best price as best price
//            $delivery_option_list[$id_address][$key] = [
//                'carrier_list' => $best_price_carrier,
//                'is_best_price' => true,
//                'is_best_grade' => false,
//                'unique_carrier' => (count($best_price_carrier) <= 1),
//            ];
//
//            // Reset $best_grade_carrier, it's now an array
//            $best_grade_carrier = [];
//            $key = '';
//
//            // Get the delivery option with the best grade
//            foreach ($best_grade_carriers as $id_package => $id_carrier) {
//                $key .= $id_carrier . ',';
//                if (!isset($best_grade_carrier[$id_carrier])) {
//                    $best_grade_carrier[$id_carrier] = [
//                        'price_with_tax' => 0,
//                        'price_without_tax' => 0,
//                        'package_list' => [],
//                        'product_list' => [],
//                    ];
//                }
//                $best_grade_carrier[$id_carrier]['price_with_tax'] += $carriers_price[$id_address][$id_package][$id_carrier]['with_tax'];
//                $best_grade_carrier[$id_carrier]['price_without_tax'] += $carriers_price[$id_address][$id_package][$id_carrier]['without_tax'];
//                $best_grade_carrier[$id_carrier]['package_list'][] = $id_package;
//                $best_grade_carrier[$id_carrier]['product_list'] = array_merge($best_grade_carrier[$id_carrier]['product_list'], $packages[$id_package]['product_list']);
//                $best_grade_carrier[$id_carrier]['instance'] = $carriers_instance[$id_carrier];
//            }
//
//            // Add the delivery option with best grade as best grade
//            if (!isset($delivery_option_list[$id_address][$key])) {
//                $delivery_option_list[$id_address][$key] = [
//                    'carrier_list' => $best_grade_carrier,
//                    'is_best_price' => false,
//                    'unique_carrier' => (count($best_grade_carrier) <= 1),
//                ];
//            }
//            $delivery_option_list[$id_address][$key]['is_best_grade'] = true;
//
//            // Get all delivery options with a unique carrier
//            foreach ($common_carriers as $id_carrier) {
//                $key = '';
//                $package_list = [];
//                $product_list = [];
//                $price_with_tax = 0;
//                $price_without_tax = 0;
//
//                foreach ($packages as $id_package => $package) {
//                    $key .= $id_carrier . ',';
//                    $price_with_tax += $carriers_price[$id_address][$id_package][$id_carrier]['with_tax'];
//                    $price_without_tax += $carriers_price[$id_address][$id_package][$id_carrier]['without_tax'];
//                    $package_list[] = $id_package;
//                    $product_list = array_merge($product_list, $package['product_list']);
//                }
//
//                if (!isset($delivery_option_list[$id_address][$key])) {
//                    $delivery_option_list[$id_address][$key] = [
//                        'is_best_price' => false,
//                        'is_best_grade' => false,
//                        'unique_carrier' => true,
//                        'carrier_list' => [
//                            $id_carrier => [
//                                'price_with_tax' => $price_with_tax,
//                                'price_without_tax' => $price_without_tax,
//                                'instance' => $carriers_instance[$id_carrier],
//                                'package_list' => $package_list,
//                                'product_list' => $product_list,
//                            ],
//                        ],
//                    ];
//                } else {
//                    $delivery_option_list[$id_address][$key]['unique_carrier'] = (count($delivery_option_list[$id_address][$key]['carrier_list']) <= 1);
//                }
//            }
//        }
//
//        $cart_rules = CartRule::getCustomerCartRules(Context::getContext()->cookie->id_lang, Context::getContext()->cookie->id_customer, true, true, false, $this, true);
//
//        $result = false;
//        if ($this->id) {
//            $result = Db::getInstance()->executeS('SELECT * FROM ' . _DB_PREFIX_ . 'cart_cart_rule WHERE id_cart = ' . (int) $this->id);
//        }
//
//        $cart_rules_in_cart = [];
//
//        if (is_array($result)) {
//            foreach ($result as $row) {
//                $cart_rules_in_cart[] = $row['id_cart_rule'];
//            }
//        }
//
//        $total_products_wt = $this->getOrderTotal(true, Cart::ONLY_PRODUCTS);
//        $total_products = $this->getOrderTotal(false, Cart::ONLY_PRODUCTS);
//
//        $free_carriers_rules = [];
//
//        $context = Context::getContext();
//        foreach ($cart_rules as $cart_rule) {
//            $total_price = $cart_rule['minimum_amount_tax'] ? $total_products_wt : $total_products;
//            $total_price += $cart_rule['minimum_amount_tax'] && $cart_rule['minimum_amount_shipping'] ? $real_best_price : 0;
//            $total_price += !$cart_rule['minimum_amount_tax'] && $cart_rule['minimum_amount_shipping'] ? $real_best_price_wt : 0;
//            if ($cart_rule['free_shipping'] && $cart_rule['carrier_restriction']
//                && in_array($cart_rule['id_cart_rule'], $cart_rules_in_cart)
//                && $cart_rule['minimum_amount'] <= $total_price) {
//                $cr = new CartRule((int) $cart_rule['id_cart_rule']);
//                if (Validate::isLoadedObject($cr) &&
//                    $cr->checkValidity($context, in_array((int) $cart_rule['id_cart_rule'], $cart_rules_in_cart), false, false)) {
//                    $carriers = $cr->getAssociatedRestrictions('carrier', true, false);
//                    if (is_array($carriers) && count($carriers) && isset($carriers['selected'])) {
//                        foreach ($carriers['selected'] as $carrier) {
//                            if (isset($carrier['id_carrier']) && $carrier['id_carrier']) {
//                                $free_carriers_rules[] = (int) $carrier['id_carrier'];
//                            }
//                        }
//                    }
//                }
//            }
//        }
//
//        // For each delivery options :
//        //    - Set the carrier list
//        //    - Calculate the price
//        //    - Calculate the average position
//        foreach ($delivery_option_list as $id_address => $delivery_option) {
//            foreach ($delivery_option as $key => $value) {
//                $total_price_with_tax = 0;
//                $total_price_without_tax = 0;
//                $position = 0;
//                foreach ($value['carrier_list'] as $id_carrier => $data) {
//                    $total_price_with_tax += $data['price_with_tax'];
//                    $total_price_without_tax += $data['price_without_tax'];
//                    $total_price_without_tax_with_rules = (in_array($id_carrier, $free_carriers_rules)) ? 0 : $total_price_without_tax;
//
//                    if (!isset($carrier_collection[$id_carrier])) {
//                        $carrier_collection[$id_carrier] = new Carrier($id_carrier);
//                    }
//                    $delivery_option_list[$id_address][$key]['carrier_list'][$id_carrier]['instance'] = $carrier_collection[$id_carrier];
//
//                    if (file_exists(_PS_SHIP_IMG_DIR_ . $id_carrier . '.jpg')) {
//                        $delivery_option_list[$id_address][$key]['carrier_list'][$id_carrier]['logo'] = _THEME_SHIP_DIR_ . $id_carrier . '.jpg';
//                    } else {
//                        $delivery_option_list[$id_address][$key]['carrier_list'][$id_carrier]['logo'] = false;
//                    }
//
//                    $position += $carrier_collection[$id_carrier]->position;
//                }
//                $delivery_option_list[$id_address][$key]['total_price_with_tax'] = $total_price_with_tax;
//                $delivery_option_list[$id_address][$key]['total_price_without_tax'] = $total_price_without_tax;
//                $delivery_option_list[$id_address][$key]['is_free'] = !$total_price_without_tax_with_rules ? true : false;
//                $delivery_option_list[$id_address][$key]['position'] = $position / count($value['carrier_list']);
//            }
//        }
//
//        // Sort delivery option list
//        foreach ($delivery_option_list as &$array) {
//            uasort($array, ['Cart', 'sortDeliveryOptionList']);
//        }
//
//        static::$cacheDeliveryOptionList[$this->id] = $delivery_option_list;
//
//        return static::$cacheDeliveryOptionList[$this->id];
//    }
}