$(document).ready(function () {
    if (page_name == 'order-confirmation') {
        ga4Purchase();
    }
});
function ga4Purchase()
{
    if (typeof ga4OrderId == 'undefined') {
        return;
    }
    let items = [];
    let item = {};
    $.each(ga4OrderProducts, function (i, v) {
        let discount = 0;
        let price = parseFloat(this['product_price_wt'])
        if (parseFloat(this['reduction_amount_tax_included']) > 0) {
            discount = this['reduction_amount_tax_included'];
            price = price + discount;
        }
        if (parseFloat(this['reduction_percent']) > 0) {
            price = price / (1 - (this['reduction_percent'] / 100));
            discount = price - parseFloat(this['product_price_wt']);
        }
        item = {};
        item = {
            item_id : this['product_id'],
            currency: "EUR",
            item_name: this['product_name'],
            price: price,
            quantity: this['product_quantity'],
            discount: discount,
            item_brand: this['brand'],
            item_category: this['category']
        };
        items.push(item);
    });
    
    gtag("event", "purchase", {
        debug: true,
        transaction_id: ga4OrderId,
        value: ga4OrderTotal,
        tax: ga4OrderTaxAmount,
        shipping: ga4ShippingTotal,
        currency: "EUR",
        items: items
    });
    
    if (typeof (fbq) !== 'undefined') {
        fbq('track', 'Purchase', {
            value: ga4OrderTotal,
            currency: 'EUR'
        });
    }
}