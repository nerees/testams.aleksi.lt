/**
 * 2015-2021 Bonpresta
 *
 * Bonpresta Instagram Carousel Social Feed Photos
 *
 * NOTICE OF LICENSE
 *
 * This source file is subject to the General Public License (GPL 2.0)
 * that is bundled with this package in the file LICENSE.txt.
 * It is also available through the world-wide-web at this URL:
 * http://opensource.org/licenses/GPL-2.0
 *
 * DISCLAIMER
 *
 * Do not edit or add to this file if you wish to upgrade the module to newer
 * versions in the future.
 *
 *  @author    Bonpresta
 *  @copyright 2015-2021 Bonpresta
 *  @license   http://opensource.org/licenses/GPL-2.0 General Public License (GPL 2.0)
 */

$(document).ready(function () {
    var data = {};
    let i = 1;
    var imgName;

    BonInstSlick();

    $('.form-group.display').hide();
    $(document).on('click', '#BONINSTAGRAMSLICK_DISPLAY_CAROUSEL_off', function () {
        $('.form-group.display').hide();
    });

    $(document).on('click', '#BONINSTAGRAMSLICK_DISPLAY_CAROUSEL_on', function () {
        $('.form-group.display').show();
    });

    if ($('input[name="BONINSTAGRAMSLICK_DISPLAY_CAROUSEL"]:checked').val() == 1) {
        $('.form-group.display').show();
    }

    $( "#bon-upload" ).click(function() {
        if (BONINSTAGRAMSLICK_TYPE == 'tagged') {
            $.get("https://images" + ~~(Math.random() * 9999) + "-focus-opensocial.googleusercontent.com/gadgets/proxy?container=none&url=https://www.instagram.com/explore/tags/" + user_tag + "/", function (json) {
                if (json) {
                    var pattern = /_sharedData = ({.*);<\/script>/m,
                        json = JSON.parse(pattern.exec(json)[1]),
                        edges = json.entry_data.TagPage[0].graphql.hashtag.edge_hashtag_to_media.edges;
                    var count = 0;

                    $.each(edges, function name(j, examp) {
                        if (count >= BONINSTAGRAMSLICK_LIMIT) {
                            return false;
                        }
                        count++;
                        let img = encodeURI(examp.node.thumbnail_src);
                        imgName = "sample-";
                        imgName = imgName + i;
                        i++;
                        $('img.pull-left').removeClass('hidden');
                        data = {
                            url: img,
                            imgName: imgName
                        }
                        $.ajax({
                            type: "POST",
                            data: JSON.stringify(data),
                            dataType: "JSON",
                            url: base_dir + 'controllers/back/insta_parser.php',

                            success: function(msg) {
                                 console.log(msg);
                            },
                            failure : function(msg) {
                                console.log(msg);
                            }
                        });

                        $('.boninsta.alert-success').removeClass('hidden');
                        $('.boninsta.alert-warning').addClass('hidden');
                    });
                    setTimeout(() => {
                        setTimeInst();
                    }, 1500);
                } else {
                    $('.boninsta.alert-success').addClass('hidden');
                    $('.boninsta.alert-warning').removeClass('hidden');
                }
            });
        } else if (BONINSTAGRAMSLICK_TYPE == 'user') {
            $.get(
                'https://images' +
                ~~(Math.random() * 9999) +
                '-focus-opensocial.googleusercontent.com/gadgets/proxy?container=none&url=https://www.instagram.com/'+ user_id + '/',
                function (json) {
                    console.log(json);
                    var pattern = /_sharedData = ({.*);<\/script>/m,
                        json = JSON.parse(pattern.exec(json)[1]),
                        edges =
                            json.entry_data.ProfilePage[0].graphql.user
                                .edge_owner_to_timeline_media.edges;
                    var count = 0;

                    $.each(edges, function name(j, examp) {
                        let img = encodeURI(examp.node.thumbnail_src);
                        imgName = "sample-";
                        imgName = imgName + i;
                        i++;
                        $('img.pull-left').removeClass('hidden');
                        data = {
                            url: img,
                            imgName: imgName
                        }
                        $.ajax({
                            type: "POST",
                            data: JSON.stringify(data),
                            dataType: "JSON",
                            url: base_dir + 'controllers/back/insta_parser.php',

                            success: function(msg) {
                                console.log(msg)
                            },
                            failure : function(msg) {
                                console.log(msg)
                            }
                        });

                        $('.boninsta.alert-success').removeClass('hidden');
                        $('.boninsta.alert-warning').addClass('hidden');
                    });
                    setTimeout(() => {
                        setTimeInst();
                    }, 1500);
                }
            );
        }

        $('.boninsta.alert-success').addClass('hidden');
        function setTimeInst() {
            $('img.pull-left').addClass('hidden');
        }
    });
    function BonInstSlick() {
        if (typeof (BONINSTAGRAMSLICK_DISPLAY) != 'undefined' && BONINSTAGRAMSLICK_DISPLAY) {
            console.log("e")
            if (BONINSTAGRAMSLICK_DOTS == 1) {
                var BONINSTAGRAMSLICK_DOTS_SCRIPT = true;
            } else {
                var BONINSTAGRAMSLICK_DOTS_SCRIPT = false;
            }
            if (BONINSTAGRAMSLICK_NAV == 1) {
                var BONINSTAGRAMSLICK_NAV_SCRIPT = true;
            } else {
                var BONINSTAGRAMSLICK_NAV_SCRIPT = false;
            }
            if (BONINSTAGRAMSLICK_LOOP == 1) {
                var BONINSTAGRAMSLICK_LOOP_SCRIPT = true;
            } else {
                var BONINSTAGRAMSLICK_LOOP_SCRIPT = false;
            }
            $('.slick-carousel-instagram').slick({
                slidesToShow: BONINSTAGRAMSLICK_NB,
                infinite: BONINSTAGRAMSLICK_LOOP_SCRIPT,
                autoplaySpeed: BONINSTAGRAMSLICK_MARGIN,
                draggable: true,
                dots: BONINSTAGRAMSLICK_DOTS_SCRIPT,
                arrows: BONINSTAGRAMSLICK_NAV_SCRIPT,
                autoplay: true,
                slidesToShow: BONINSTAGRAMSLICK_NB,
                slidesToScroll: 1,
                responsive: [{
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: BONINSTAGRAMSLICK_NB,
                    }

                }, {
                    breakpoint: 800,
                    settings: {
                        slidesToShow: 3,
                    }


                }, {
                    breakpoint: 600,
                    settings: {
                        slidesToShow: 2,
                    }
                }, {
                    breakpoint: 480,
                    settings: {
                        slidesToShow: 1,
                    }
                }]
            });
            $('.instagram-carousel-container .slick-list').wrap('<div class="slick-list-wrap"></div>');
        }
    }

});