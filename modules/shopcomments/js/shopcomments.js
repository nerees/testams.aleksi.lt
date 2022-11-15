$(document).ready(function () {

   if (window.location.href.indexOf("#openCommentWindow") > -1) {
    $('.open-comment-form').click();
   }

    $('input.star').rating();
    $('.auto-submit-star').rating();

    $('.open-comment-form').fancybox({
        'hideOnContentClick': false
    });

    url_options = '?';

    if (typeof(shopcomments_url_rewrite) !== 'undefined'){
        if (shopcomments_url_rewrite == '0') {
            url_options = '&';
        }
    }

    $('button.usefulness_btn').click(function () {
        var id_product_comment = $(this).data('id-product-comment');
        var is_usefull = $(this).data('is-usefull');
        var parent = $(this).parent();

        $.ajax({
            url: shopcomments_controller_url + url_options + 'rand=' + new Date().getTime(),
            data: {
                id_product_comment: id_product_comment,
                action: 'comment_is_usefull',
                value: is_usefull
            },
            type: 'POST',
            headers: {"cache-control": "no-cache"},
            success: function (result) {
                parent.fadeOut('slow', function () {
                    parent.remove();
                });
            }
        });
    });

    $('span.report_btn').click(function () {
        if (confirm(confirm_report_message)) {
            var idMyprestaComment = $(this).data('id-product-comment');
            var parent = $(this).parent();

            $.ajax({
                url: shopcomments_controller_url + url_options + 'rand=' + new Date().getTime(),
                data: {
                    id_product_comment: idMyprestaComment,
                    action: 'report_abuse'
                },
                type: 'POST',
                headers: {"cache-control": "no-cache"},
                success: function (result) {
                    parent.fadeOut('slow', function () {
                        parent.remove();
                    });
                }
            });
        }
    });

    $('#module-shopcomments-feedback ul.page-list li a').removeClass('js-search-link');
    $('#module-shopcomments-feedback ul.page-list li a').off();

    rebindClickButton();
    
    $('.star').mouseenter(function () {
        let starId = $(this).data('star');
        $('.star').each(function () {
            if ($(this).data('star') <= starId) {
                $(this).addClass('star_on');
            }else {
                $(this).removeClass('star_on');
            }
        });
        
    });
    $('.star').mouseleave(function () {
        if ($('#grade').val() == 0) {
            $('.star').removeClass('star_on');
        }
    });
    $('.star_content').mouseleave(function () {
        if ($('#grade').val() == 0) {
            $('.star').removeClass('star_on');
        }else{
            $('.star').each(function () {
                if ($(this).data('star') <= $('#grade').val()) {
                    $(this).addClass('star_on');
                }else {
                    $(this).removeClass('star_on');
                }
            });
        }
    });
});

function rebindClickButton()
{
    $('#submitNewMessage').off('click');
    $('#submitNewMessage').click(function (e) {
        // Kill default behaviour
        e.preventDefault();

        var formData = new FormData($('#id_new_comment_form')[0]);

        $.ajax({
            url: shopcomments_controller_url + url_options + 'action=add_comment&secure_key=' + secure_key + '&rand=' + new Date().getTime(),
            contentType: false, //THIS IS MANDATORY
            processData: false, //THIS IS MANDATORY
            data: formData,
            type: 'POST',
            headers: {"cache-control": "no-cache"},
            dataType: "json",
            success: function (data) {
                if (data.result) {
                    $.fancybox.close();
                    fancyChooseBox(moderation_active ? ShopComment_added_moderation : ShopComment_added);
                }
                else {
                    $('#new_comment_form_error ul').html('');
                    $.each(data.errors, function (index, value) {
                        $('#new_comment_form_error ul').append('<li>' + value + '</li>');
                    });
                    $('#new_comment_form_error').slideDown('slow');
                }
            }
        });
        return false;
    });
}

function fancyChooseBox(msg) {
    $('#new_comment_form_ok').html(msg).show();
}

function MyprestaCommentRefreshPage() {
    window.location.reload();
}