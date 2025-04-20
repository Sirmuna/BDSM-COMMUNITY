/*
 * %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
 *
 * Template Name: Dialia - Registered Massage Therapy HTML Template   
 * Template URI: https://thememarch.com/demo/html/dialia/
 * Description: Dialia is a registered massage therapy HTML template which comes with the unique and clean design. It helps you to create a beautiful massage therapy HTML website. It's a fully responsive website template. It has also e-commerce support. E-commerce pages are included on this template.
 * Author: Thememarch
 * Author URI: https://thememarch.com
 * Version: 2.0
 *
 * %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
 */


/*
===========================================================
    INDEX
===========================================================

    01) Custom Functions
    02) Preloader
    03) Meanmenu Activation
    04) Inline Background Image
    05) Header Search Form
    06) Heroslider Height
    07) Slider Activations
        07.01) Heroslider Activation
        07.02) Feature Slider Activation
        07.03) Testimonial Slider
        07.04) Product Slider 
        07.05) Team Slider 
        07.06) Blog Slider Activation
        07.07) Blog Gallery Slider
        07.08) Product Details Gallery
        07.09) Similliar Product Slider
        07.10) Slider Activations Initializer
    08) CounterUp Activation
    09) Wowjs Activation
    10) Blog Masonry Active
    11) Range Slider Active
    12) Nice Select Active
    13) Product Quantitybox
    14) Product Details Color & Size Active
    15) Product Rating Input
    16) Different Address Form
    17) Checkout Payment Method
    18) Scroll Up Active
    19) Sticky Header
    20) Parallax Active
    21) Video Background Active
    22) Ajax Mailchimp
    23) Menu Overflow
    24) Ripple Js Active
    25) Turncate Active
    26) Dropdown Children 
    27) Fancybox Active
    28) Sticky Sidebar Active
    29) Datepicker Active
    30) Login Password Shower
    31) Initializer

===========================================================
    END INDEX
===========================================================
*/



(function ($) {
    'use strict';

    /* Custom Functions */
    jQuery.fn.exists = function () {
        return this.length > 0;
    };

    var dialia = {

        /* Preloader */
        preloaderActivation: function () {
            $('.tm-preloader').css({
                'transform': 'translateX(-100%)'
            });
            $('.tm-preloader svg').delay(300).fadeOut('slow');
        },
        preloaderCancel: function () {
            $('.tm-preloader').find('.tm-button').on('click', function () {
                $('.tm-preloader').css({
                    'transform': 'translateX(-100%)'
                });
                $('.tm-preloader').fadeOut('slow');
            });
        },

        /* Meanmenu Activation */
        meanmenuActivation: function () {
            $('nav.tm-navigation').meanmenu({
                meanMenuContainer: '.tm-mobilenav',
                meanScreenWidth: '991',
                meanMenuOpen: '<i class="zmdi zmdi-menu"></i>',
                meanMenuClose: '<i class="zmdi zmdi-close"></i>'
            });
        },

        /* Inline Background Image */
        dataBgImage: function () {
            $('[data-bgimage]').each(function () {
                var imageUrl = $(this).data('bgimage');
                $(this).css({
                    'background-image': 'url(' + imageUrl + ')'
                });
            });
        },

        /* Header Search Form */
        haderSearchForm: function () {
            $('.header-searchtrigger').on('click', function (e) {
                e.preventDefault();
                $('.header-searchbox').toggleClass('is-visible');
            });

            $('.header-searchbox .search-close').on('click', function (e) {
                e.preventDefault();
                $(this).parents('.header-searchbox').removeClass('is-visible');
            });
        },

        /* Heroslider Height */
        herosliderHeight: function () {
            var headerHeight = $('.header').innerHeight();

            $('.heroslider-singleslider').css({
                'min-height': 'calc(100vh - ' + headerHeight + 'px)',
            });
        },

        /* Slider Activations */
        sliderActivations: {

            /* Heroslider Activation */
            heroSliderActivation: function () {
                $('.heroslider-slider').slick({
                    infinite: true,
                    autoplay: true,
                    autoplaySpeed: 10000,
                    speed: 500,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    fade: true,
                    arrows: false,
                    dots: true,
                    adaptiveHeight: true,
                    responsive: [{
                        breakpoint: 1201,
                        settings: {
                            adaptiveHeight: true
                        }
                    }]
                });
            },

            /* Feature Slider Activation */
            priceboxSliderActivation: function () {
                $('.tm-pricing-priceboxes').slick({
                    infinite: true,
                    autoplay: true,
                    autoplaySpeed: 5000,
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    arrows: false,
                    dots: true,
                    responsive: [{
                            breakpoint: 1200,
                            settings: {
                                slidesToShow: 2,
                                slidesToScroll: 2,
                            }
                        },
                        {
                            breakpoint: 992,
                            settings: {
                                slidesToShow: 3,
                                slidesToScroll: 3
                            }
                        },
                        {
                            breakpoint: 768,
                            settings: {
                                slidesToShow: 2,
                                slidesToScroll: 2
                            }
                        },
                        {
                            breakpoint: 576,
                            settings: {
                                slidesToShow: 1,
                                slidesToScroll: 1
                            }
                        }
                    ]
                });
            },

            /* Testimonial Slider */
            testimonialSliderActivation: function () {
                $('.testimonial-slider-active').slick({
                    infinite: true,
                    autoplay: true,
                    autoplaySpeed: 5000,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    arrows: true,
                    prevArrow: '<button class="tm-slider-arrow-prev"><i class="zmdi zmdi-long-arrow-left"></i></button>',
                    nextArrow: '<button class="tm-slider-arrow-next"><i class="zmdi zmdi-long-arrow-right"></i></button>',
                    dots: false,
                    fade: true,
                    adaptiveHeight: true,
                });
            },

            /* Product Slider */
            productSliderActivation: function () {
                $('.product-slider-active').slick({
                    infinite: true,
                    autoplay: true,
                    speed: 500,
                    autoplaySpeed: 5000,
                    slidesToShow: 4,
                    slidesToScroll: 4,
                    arrows: true,
                    prevArrow: '<button class="tm-slider-arrow-prev"><i class="zmdi zmdi-arrow-left"></i></button>',
                    nextArrow: '<button class="tm-slider-arrow-next"><i class="zmdi zmdi-arrow-right"></i></button>',
                    dots: false,
                    responsive: [{
                            breakpoint: 992,
                            settings: {
                                slidesToShow: 3,
                                slidesToScroll: 1
                            }
                        },
                        {
                            breakpoint: 768,
                            settings: {
                                slidesToShow: 2,
                                slidesToScroll: 2
                            }
                        },
                        {
                            breakpoint: 576,
                            settings: {
                                slidesToShow: 1,
                                slidesToScroll: 1
                            }
                        }
                    ]
                });
            },

            /* Team Slider */
            teamSliderActivation: function () {
                $('.team-slider-activation').slick({
                    infinite: true,
                    autoplay: true,
                    speed: 500,
                    autoplaySpeed: 5000,
                    slidesToShow: 4,
                    slidesToScroll: 4,
                    arrows: true,
                    prevArrow: '<button class="tm-slider-arrow-prev"><i class="zmdi zmdi-arrow-left"></i></button>',
                    nextArrow: '<button class="tm-slider-arrow-next"><i class="zmdi zmdi-arrow-right"></i></button>',
                    dots: false,
                    responsive: [{
                            breakpoint: 992,
                            settings: {
                                slidesToShow: 3,
                                slidesToScroll: 1
                            }
                        },
                        {
                            breakpoint: 768,
                            settings: {
                                slidesToShow: 2,
                                slidesToScroll: 2
                            }
                        },
                        {
                            breakpoint: 576,
                            settings: {
                                slidesToShow: 1,
                                slidesToScroll: 1
                            }
                        }
                    ]
                });
            },

            /* Blog Slider Activation */
            blogSliderActivation: function () {
                $('.blog-slider-active').slick({
                    infinite: true,
                    autoplay: true,
                    autoplaySpeed: 5000,
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    arrows: false,
                    dots: true,
                    responsive: [{
                            breakpoint: 992,
                            settings: {
                                slidesToShow: 2,
                                slidesToScroll: 2
                            }
                        },
                        {
                            breakpoint: 768,
                            settings: {
                                slidesToShow: 1,
                                slidesToScroll: 1
                            }
                        }
                    ]
                });
            },

            /* Blog Gallery Slider */
            blogGallerySliderActivation: function () {
                $('.blogitem-imageslider').slick({
                    infinite: true,
                    autoplay: true,
                    autoplaySpeed: 5000,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    arrows: true,
                    prevArrow: '<button class="tm-slider-arrow-prev"><i class="zmdi zmdi-arrow-left"></i></button>',
                    nextArrow: '<button class="tm-slider-arrow-next"><i class="zmdi zmdi-arrow-right"></i></button>',
                    dots: false,
                });
            },

            /* Product Details Gallery */
            productDetailsGallery: function () {
                $('.tm-prodetails-largeimages').slick({
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    arrows: false,
                    fade: true,
                    loop: false,
                    asNavFor: '.tm-prodetails-thumbnails'
                });
                $('.tm-prodetails-thumbnails').slick({
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    loop: false,
                    asNavFor: '.tm-prodetails-largeimages',
                    dots: false,
                    centerMode: true,
                    arrows: true,
                    prevArrow: '<button class="tm-slider-arrow-prev"><i class="zmdi zmdi-arrow-left"></i></button>',
                    nextArrow: '<button class="tm-slider-arrow-next"><i class="zmdi zmdi-arrow-right"></i></button>',
                    focusOnSelect: true
                });
            },

            /* Similliar Product Slider */
            similliarProductSlider: function () {
                $('.tm-similliar-products-slider').slick({
                    infinite: true,
                    autoplay: true,
                    autoplaySpeed: 5000,
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    arrows: true,
                    prevArrow: '<button class="tm-slider-arrow-prev"><i class="zmdi zmdi-arrow-left"></i></button>',
                    nextArrow: '<button class="tm-slider-arrow-next"><i class="zmdi zmdi-arrow-right"></i></button>',
                    dots: false,
                    responsive: [{
                            breakpoint: 992,
                            settings: {
                                slidesToShow: 3,
                                slidesToScroll: 1,
                            }
                        },
                        {
                            breakpoint: 768,
                            settings: {
                                slidesToShow: 2,
                                slidesToScroll: 1
                            }
                        },
                        {
                            breakpoint: 576,
                            settings: {
                                slidesToShow: 1,
                                slidesToScroll: 1
                            }
                        }
                    ]
                });
            },

            /* Slider Activations Initializer ( Just Remove a single line if you want to disable any slider ) */
            init: function () {
                dialia.sliderActivations.heroSliderActivation();
                dialia.sliderActivations.priceboxSliderActivation();
                dialia.sliderActivations.testimonialSliderActivation();
                dialia.sliderActivations.productSliderActivation();
                dialia.sliderActivations.teamSliderActivation();
                dialia.sliderActivations.blogSliderActivation();
                dialia.sliderActivations.blogGallerySliderActivation();
                dialia.sliderActivations.productDetailsGallery();
                dialia.sliderActivations.similliarProductSlider();
            }

        },

        /* CounterUp Activation */
        counterupActivation: function () {
            if ($('.odometer').length) {
                $(window).on('scroll', function () {
                    function winScrollPosition() {
                        var scrollPos = $(window).scrollTop(),
                            winHeight = $(window).height();
                        var scrollPosition = Math.round(scrollPos + (winHeight / 1.2));
                        return scrollPosition;
                    }
                    var elemOffset = $('.odometer').offset().top;
                    if (elemOffset < winScrollPosition()) {

                        $('.odometer').each(function () {
                            $(this).html($(this).data('count-to'));
                        });
                    }
                });
            }
        },

        /* Wowjs Activation */
        wowJsActive: function () {
            var wow = new WOW({
                boxClass: 'wow',
                animateClass: 'animated',
                offset: 0,
                mobile: true,
                live: true
            });
            wow.init();
        },

        /* Blog Masonry Active */
        blogMasonryActive: function () {
            $('.blog-masonry-active').masonry({
                itemSelector: '.blog-masonry-item'
            });
        },

        /* Range Slider Active */
        rangeSlider: function () {
            $('.tm-rangeslider').nstSlider({
                'left_grip_selector': '.tm-rangeslider-leftgrip',
                'right_grip_selector': '.tm-rangeslider-rightgrip',
                'value_bar_selector': '.tm-rangeslider-bar',
                'value_changed_callback': function (cause, leftValue, rightValue) {
                    $(this).parent().find('.tm-rangeslider-leftlabel').text(leftValue);
                    $(this).parent().find('.tm-rangeslider-rightlabel').text(rightValue);
                }
            });
        },

        /* Nice Select Active */
        niceSelectActive: function () {
            $('select').niceSelect();
        },


        /* Product Quantitybox */
        productQuantityBox: function () {
            $('.tm-quantitybox').append('<div class="decrement-button tm-quantitybox-button">-</i></div><div class="increment-button tm-quantitybox-button">+</div>');
            $('.tm-quantitybox-button').on('click', function () {
                var button = $(this);
                var quantityOldValue = button.parent().find('input').val();
                var quantityNewVal;
                if (button.text() == "+") {
                    quantityNewVal = parseFloat(quantityOldValue) + 1;
                } else {
                    if (quantityOldValue > 1) {
                        quantityNewVal = parseFloat(quantityOldValue) - 1;
                    } else {
                        quantityNewVal = 1;
                    }
                }
                button.parent().find('input').val(quantityNewVal);
            });
        },

        /* Product Details Color & Size Active */
        productDetailsColorSize: function () {
            $('.tm-prodetails-color ul li, .tm-prodetails-size ul li').on('click', 'span', function (e) {
                e.preventDefault();
                $(this).parent('li').addClass('is-checked').siblings().removeClass('is-checked');
            });
        },

        /* Product Rating Input */
        productRatingInput: function () {
            $('.tm-rating-input').each(function () {
                $(this).find('span').on('mouseenter', function () {
                    $('.tm-rating-input span').addClass('active');
                    $(this).nextAll('span').removeClass('active');
                });

            });
        },

        /* Different Address Form */
        differentAddressFormToggle: function () {
            $('#billform-dirrentswitch').on('change', function () {
                if ($(this).is(':checked')) {
                    $('.tm-checkout-differentform').slideDown();
                } else {
                    $('.tm-checkout-differentform').slideUp();
                }
            });
        },

        /* Checkout Payment Method */
        checkoutPaymentMethod: function () {
            $('.tm-checkout-payment input[type="radio"]').each(function () {
                if ($(this).is(':checked')) {
                    $(this).siblings('.tm-checkout-payment-content').slideDown();
                }
                $(this).siblings('label').on('click', function () {
                    $('.tm-checkout-payment input[type="radio"]').prop('checked', false).siblings('.tm-checkout-payment-content').slideUp();
                    $(this).prop('checked', true).siblings('.tm-checkout-payment-content').slideDown();
                });
            });
        },

        /* Scroll Up Active */
        scrollUpActive: function () {
            $.scrollUp({
                scrollName: 'scrollUp',
                topDistance: '300',
                topSpeed: 1000,
                animation: 'fade',
                animationInSpeed: 1000,
                animationOutSpeed: 1000,
                scrollText: '<i class="zmdi zmdi-long-arrow-up"></i>',
                activeOverlay: false,
            });
        },

        /* Sticky Header */
        stickyHeader: function () {
            $(window).on('scroll', function () {
                var scrollPos = $(this).scrollTop();
                if (scrollPos > 220) {
                    $('.header').addClass('sticky-active');
                } else {
                    $('.header').removeClass('sticky-active');
                }
            });
        },

        /* Parallax Active */
        parallaxActive: function () {
            $('.tm-parallax').jarallax({
                speed: 0.2
            });
        },

        /* Video Background Active */
        videoBackgroundActive: function () {

            var winWidth = $(window).width();

            if ($('.tm-videobg').exists() && winWidth > 991) {

                $('.tm-videobg').YTPlayer({
                    autoplay: true,
                    onReady: function () {
                        $('.tm-video-controls button').on('click', function () {
                            $(this).toggleClass('play pause');
                            $(this).find('.zmdi').toggleClass('zmdi-play zmdi-pause');

                            if ($(this).hasClass('play')) {
                                $('.tm-videobg').YTPPause();
                            } else {
                                $('.tm-videobg').YTPPlay();
                            };
                        });
                    }
                });
            }
        },


        /* Ajax Mailchimp */
        ajaxMailchimp: function () {
            $('#tm-mailchimp-form').ajaxChimp({
                language: 'en',
                callback: mailChimpResponse,
                // ADD YOUR MAILCHIMP URL BELOW HERE!
                url: 'YOUR_MAILCHIMP_URL_HERE'
            });

            function mailChimpResponse(resp) {
                if (resp.result === 'success') {
                    $('.tm-mailchimp-success').html('' + resp.msg).fadeIn(900);
                    $('.tm-mailchimp-error').fadeOut(400);
                } else if (resp.result === 'error') {
                    $('.tm-mailchimp-error').html('' + resp.msg).fadeIn(900);
                }
            }
        },


        /* Menu Overflow */
        menuOverflow: function () {
            $('.tm-navigation ul li').on('mouseenter mouseleave', function (e) {
                if ($('ul', this).length) {
                    var listElem = $('ul:first', this);
                    var listElemOffset = listElem.offset();
                    var leftValue = listElemOffset.left - $('body').offset().left;
                    var widthValue = listElem.width();

                    if (listElem.find('ul').length) {
                        widthValue = listElem.width() * 2;
                    }

                    var docW = $('body').width();
                    var isEntirelyVisible = (leftValue + widthValue <= docW);

                    if (!isEntirelyVisible) {
                        $(this).addClass('overflow-element');
                    } else {
                        $(this).removeClass('overflow-element');
                    }
                }
            });
        },

        /* Ripple Js Active */
        rippleJsActive: function () {
            if ($('.tm-rippple-active').exists()) {
                $('.tm-rippple-active').ripples();
            }
        },

        /* Turncate Active */
        turncateLines: function () {
            $('.tm-service h5').shave(28, {
                classname: 'd-none',
                character: '...'
            });
            $('.tm-service p').shave(75, {
                classname: 'd-none',
                character: '...'
            });
        },

        /* Dropdown Children */
        dropdownHasChildren: function () {
            $('.tm-navigation-dropdown ul li').each(function () {
                if ($(this).children('ul').length) {
                    $(this).addClass('has-child');
                }
            });
        },

        /* Fancybox Active */
        fancyboxActive: function () {
            $('[data-fancybox]').fancybox({
                beforeShow: function () {
                    $('.tm-product-quickview .tm-prodetails-largeimages').slick('slickNext');
                }
            });
        },


        /* Sticky Sidebar Active */
        stickySidebarActive: function () {
            var winWidth = $(window).width();
            if (winWidth > 991) {
                $('.sticky-sidebar').stickySidebar({
                    topSpacing: 30,
                    bottomSpacing: 30
                });
            }
        },

        /* Datepicker Active */
        datepickerActivation: function () {
            $('[data-toggle="datepicker"]').datepicker();
        },

        /* Login Password Shower */
        loginPassShower: function () {
            $('input[name="register-pass-show"]').on('change', function () {
                var type = $('input[name="register-pass"]').attr('type');
                if (type == 'password') {
                    $('input[name="register-pass"]').attr('type', 'text');
                } else {
                    $('input[name="register-pass"]').attr('type', 'password');
                }
            });
        },

        /* Initializer */
        init: function () {
            dialia.meanmenuActivation();
            dialia.dataBgImage();
            dialia.haderSearchForm();
            dialia.herosliderHeight();
            dialia.sliderActivations.init();
            dialia.counterupActivation();
            dialia.wowJsActive();
            dialia.blogMasonryActive();
            dialia.rangeSlider();
            dialia.niceSelectActive();
            dialia.productQuantityBox();
            dialia.productDetailsColorSize();
            dialia.productRatingInput();
            dialia.differentAddressFormToggle();
            dialia.checkoutPaymentMethod();
            dialia.scrollUpActive();
            dialia.stickyHeader();
            dialia.parallaxActive();
            dialia.videoBackgroundActive();
            dialia.ajaxMailchimp();
            dialia.menuOverflow();
            dialia.rippleJsActive();
            dialia.turncateLines();
            dialia.dropdownHasChildren();
            dialia.fancyboxActive();
            dialia.stickySidebarActive();
            dialia.datepickerActivation();
            dialia.loginPassShower();
            dialia.preloaderActivation();
            dialia.preloaderCancel();
        }
    };

    dialia.init();


})(jQuery);