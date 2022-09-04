/**
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
 * needs please contact us for extra customization service at an affordable price
 *
 *  @author ETS-Soft <etssoft.jsc@gmail.com>
 *  @copyright  2007-2022 ETS-Soft
 *  @license    Valid for 1 website (or project) for each purchase of license
 *  International Registered Trademark & Property of ETS-Soft
 */
 $(document).ready(function(){
    if($('input.color').length)
    {
        setTimeout(function(){
            $('input.color').each(function(){
                if($(this).val())
                    $(this).css('background',$(this).val()); 
            });  
        },1000);
        
    }    
    $('.adminetsblogcategory .page-title').html('Categories');
    $('.category-blog-parent').click(function(){
        $(this).toggleClass('active');
       $(this).next().toggleClass('active'); 
    });
    $('.ets-blog-tab-basic').addClass('active');
    $('.ets-blog-tab-general').addClass('active');
    $('.confi_tab').click(function(){
        $('.ets-form-group').removeClass('active');
        $('.ets-blog-tab-'+$(this).data('tab-id')).addClass('active');  
        $('.confi_tab').removeClass('active');
        $(this).addClass('active');           
    });
    $(document).on('change','input.title',function(){
        EtsBlog_updateFriendlyURL();
    });
    $(document).on('change','select[name="ETS_BLOG_CAPTCHA_TYPE"]',function(){
        EtsBlogdisplayFormSettings();
    }); 
    EtsBlogdisplayFormSettings();
 });
 function EtsBlogdisplayFormSettings()
 {
    if($('select[name="ETS_BLOG_CAPTCHA_TYPE"]').length && $('select[name="ETS_BLOG_CAPTCHA_TYPE"]').val()=='google')
    {
        $('select[name="ETS_BLOG_CAPTCHA_TYPE"]').closest('.ets-form-group').next('.ets-form-group').addClass('active');
        $('select[name="ETS_BLOG_CAPTCHA_TYPE"]').closest('.ets-form-group').next('.ets-form-group').next('.ets-form-group').addClass('active');
    }
    else
    {
        $('select[name="ETS_BLOG_CAPTCHA_TYPE"]').closest('.ets-form-group').next('.ets-form-group').removeClass('active');
        $('select[name="ETS_BLOG_CAPTCHA_TYPE"]').closest('.ets-form-group').next('.ets-form-group').next('.ets-form-group').removeClass('active');
    }
    if($('select[name="ETS_BLOG_CAPTCHA_TYPE"]').length && $('select[name="ETS_BLOG_CAPTCHA_TYPE"]').val()=='google3')
    {
        $('select[name="ETS_BLOG_CAPTCHA_TYPE"]').closest('.ets-form-group').next('.ets-form-group').next('.ets-form-group').next('.ets-form-group').addClass('active');
        $('select[name="ETS_BLOG_CAPTCHA_TYPE"]').closest('.ets-form-group').next('.ets-form-group').next('.ets-form-group').next('.ets-form-group').next('.ets-form-group').addClass('active');
    }
    else
    {
        $('select[name="ETS_BLOG_CAPTCHA_TYPE"]').closest('.ets-form-group').next('.ets-form-group').next('.ets-form-group').next('.ets-form-group').removeClass('active');
        $('select[name="ETS_BLOG_CAPTCHA_TYPE"]').closest('.ets-form-group').next('.ets-form-group').next('.ets-form-group').next('.ets-form-group').next('.ets-form-group').removeClass('active');
    }
 }
 function etsblog_str2url(str)
 {
    var ok=true;
    while(ok)
    {
        var first_char = str.charAt(0);
        if(!isNaN(first_char))
        {
            str =str.slice(1);
        }
        else
            return str;
        
    }
 }
 function EtsBlog_updateFriendlyURL()
 {
    if($('input[name="itemId"]').val()==0)
    {
        $('#url_alias_'+id_language).val(str2url(etsblog_str2url($('#title_'+id_language).val()), 'UTF-8')); 
    }        
    else
        if($('#url_alias_'+id_language).val() == '')
            $('#url_alias_'+id_language).val(str2url(etsblog_str2url($('#title_'+id_language).val()), 'UTF-8')); 
 }