$(document).ready(function () {

    // sticky header 
    $(window).on('scroll', function () {
        var scrolled = $(window).scrollTop();
        if (scrolled > 100) {
            $('body').addClass('head-fixed');
        } else {
            $('body').removeClass('head-fixed');
        }
    });

    // home slider
    $('.special-slider').slick({
        dots: true,
        arrows: false,
        speed: 500,
        fade: true,
        cssEase: 'linear',
        autoplay: true,
        asNavFor: '.slick-content',
        autoplaySpeed: 6000
    });
    $('.slick-content').slick({        
        arrows: false,
        speed: 500,
        fade: true,
        cssEase: 'linear',
        autoplay: true,
        asNavFor: '.special-slider',
        autoplaySpeed: 6000
    });


    // mobile navigation
    $('.hamburg').on('click', function () {
        $('.mobile-nav .arrow-down').closest('li').removeClass('sub-active');
        $('.mobile-nav .arrow-down').next('ul').slideUp();
        if ($('body').hasClass('nav-active')) {
            $('body').removeClass('nav-active');
        } else {
            $('body').addClass('nav-active');
        }
    });

    $('.mobile-nav li').each(function () {
        if ($(this).find('ul').length > 0) {
            $(this).find('> a').after('<i class="arrow-down"></i>');
        }
    });

    // mobile sub-navigation 
    $('.mobile-nav .arrow-down').on('click', function () {
        var _this = $(this);
        var parent = _this.closest('li');

        $('.mobile-nav .arrow-down').not(_this).closest('li').removeClass('sub-active');
        $('.mobile-nav .arrow-down').not(_this).next('ul').slideUp('slow');
        if (!parent.hasClass('sub-active')) {
            _this.closest('li').addClass('sub-active');
            _this.next('ul').slideDown('slow');
        } else {
            _this.closest('li').removeClass('sub-active');
            _this.next('ul').slideUp('slow');
        }
    });

    // footer links mobile view
    $('.foot-links h3').on('click', function () {
        var _this = $(this);
        $('.foot-links h3').not(_this).removeClass('active');
        $('.foot-links h3').not(_this).next('ul').slideUp('slow');
        if (!_this.hasClass('active')) {
            _this.addClass('active');
            _this.next('ul').slideDown('slow');
        } else {
            _this.removeClass('active');
            _this.next('ul').slideUp('slow');
        }
    });

    // contact form validaton
    // Custom method to validate username
    $.validator.addMethod("usernameRegex", function (value, element) {
        return this.optional(element) || /^[a-zA-Z0-9]*$/i.test(value);
    }, "Username must contain only letters, numbers");
    $.validator.addMethod("matches", function (value, element, params) {
        var re = new RegExp(params);
        return this.optional(element) || re.test(value);
    }, "Phone must contain only numbers");
   
    // add the rule here
    $.validator.addMethod("valueNotEquals", function (value, element, arg) {
        return arg !== value;
    }, "Value must not equal arg.");

    $("#cotactsubmit").click(function () {
        var form = $("#contactForm");
        form.validate({
            errorElement: 'span',
            errorClass: 'invalid-feedback',
            highlight: function (element, errorClass, validClass) {
                $(element).closest('.form-group').addClass("has-error");
                $(element).addClass('is-invalid');
            },
            unhighlight: function (element, errorClass, validClass) {
                $(element).closest('.form-group').removeClass("has-error");
                $(element).removeClass('is-invalid');
            },
            rules: {
                firstname: {
                    required: true,
                    usernameRegex: true,
                    minlength: 4,
                },

                lastname: {
                    required: true,
                    usernameRegex: true,
                    minlength: 1,
                },

                orgname: {
                    required: true,
                },
                phone: {
                    required: true,
                    matches: "^(\\d|\\s)+$",
                    minlength: 10,
                    maxlength: 20
                },
                name: {
                    required: true,
                    minlength: 3,
                },
                email: {
                    required: true,
                    minlength: 3,
                },
                about: {
                    valueNotEquals: "default"
                }

            },
            messages: {
                about: {
                    valueNotEquals: "Please select an item!"
                },
                phone: {
                    required: "please enter valid phone number"
                }
            }

        });
    });
});

var h=$('header').height();
  
$('a[href*="#"]')
// Remove links that don't actually link to anything
.not('[href="#"]')
.not('[href="#0"]')
.click(function(event) {
  // On-page links
  if (
    location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') 
    && 
    location.hostname == this.hostname
  ) {
    // Figure out element to scroll to
    var target = $(this.hash);
    target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
    // Does a scroll target exist?
    if (target.length) {
      // Only prevent default if animation is actually gonna happen
      event.preventDefault();
      $('html, body').animate({
        scrollTop: target.offset().top-h        
      }, 1000, function() {
        // Callback after animation
        // Must change focus!
        var $target = $(target);
        $target.focus();
        if ($target.is(":focus")) { // Checking if the target was focused
          return false;
        } else {
          $target.attr('tabindex','-1'); // Adding tabindex for elements not focusable
          $target.focus(); // Set focus again
        };
      });
    }
  }
});

$(document).ready(function(){
    $('.subnav-icon').click(function(){
        $('.sub-nav').css('transform','translateY(-120%)');
    })
    $('.nav-item').mouseover(function(){
        $(this).find('.sub-nav').css('transform','none');
    })
    $('.nav-item').mouseout(function(){
        $('.nav-item').find('.sub-nav').css('transform','translateY(-120%)');
    })
})


$(function() {
    var h=$('header').height();
    setTimeout(function() {
      if (location.hash) {
        /* we need to scroll to the top of the window first, because the browser will always jump to the anchor first before JavaScript is ready, thanks Stack Overflow: http://stackoverflow.com/a/3659116 */
        window.scrollTo(0, 0);
        target = location.hash.split('#');
        smoothScrollTo($('#'+target[1]));
      }
    }, 1);
    
    // taken from: https://css-tricks.com/snippets/jquery/smooth-scrolling/
    $('.nav a[href*="#"]:not([href="#"])').click(function() {
      if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
        smoothScrollTo($(this.hash));
        return false;
      }
    });
    
    function smoothScrollTo(target) {
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      
      if (target.length) {
        $('html,body').animate({
          scrollTop: target.offset().top-h
        }, 1000);
      }
    }
  });
  
  /********** lazyload ****** */
  $(document).ready(function() {
    $("img.lazy").lazyload();
  });
  
  