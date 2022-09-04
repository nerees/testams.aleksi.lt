{*
* 2007-2022 ETS-Soft
*
* NOTICE OF LICENSE
*
* This file is not open source! Each license that you purchased is only available for 1 wesite only.
* If you want to use this file on more websites (or projects), you need to purchase additional licenses.
* You are not allowed to redistribute, resell, lease, license, sub-license or offer our resources to any third party.
*
* DISCLAIMER
*
* Do not edit or add to this file if you wish to upgrade PrestaShop to newer
* versions in the future. If you wish to customize PrestaShop for your
* needs please, contact us for extra customization service at an affordable price
*
*  @author ETS-Soft <etssoft.jsc@gmail.com>
*  @copyright  2007-2022 ETS-Soft
*  @license    Valid for 1 website (or project) for each purchase of license
*  International Registered Trademark & Property of ETS-Soft
*}
<script type="text/javascript">
var ets_blog_link_ajax_comment='{$ets_blog_link_ajax_comment nofilter}';
$(document).ready(function(){
    $.ajax({
        url: ets_blog_link_ajax_comment,
        data: 'action=getCountCommentsNoViewed',
        type: 'post',
        dataType: 'json',                
        success: function(json){ 
            if(parseInt(json.count) >0)
            {
                if($('#subtab-AdminEtsBlogComment span').length)
                    $('#subtab-AdminEtsBlogComment span').append('<span class="count_messages ">'+json.count+'</span>'); 
                else
                    $('#subtab-AdminEtsBlogComment a').append('<span class="count_messages ">'+json.count+'</span>');
            }
            else
            {
                if($('#subtab-AdminEtsBlogComment span').length)
                    $('#subtab-AdminEtsBlogComment span').append('<span class="count_messages hide">'+json.count+'</span>'); 
                else
                    $('#subtab-AdminEtsBlogComment a').append('<span class="count_messages hide">'+json.count+'</span>');
            }
                                                              
        },
    });
});
</script>