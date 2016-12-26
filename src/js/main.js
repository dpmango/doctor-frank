( function( window ) {

'use strict';

// class helper functions from bonzo https://github.com/ded/bonzo

function classReg( className ) {
  return new RegExp("(^|\\s+)" + className + "(\\s+|$)");
}

// classList support for class management
// altho to be fair, the api sucks because it won't accept multiple classes at once
var hasClass, addClass, removeClass;

if ( 'classList' in document.documentElement ) {
  hasClass = function( elem, c ) {
    return elem.classList.contains( c );
  };
  addClass = function( elem, c ) {
    elem.classList.add( c );
  };
  removeClass = function( elem, c ) {
    elem.classList.remove( c );
  };
}
else {
  hasClass = function( elem, c ) {
    return classReg( c ).test( elem.className );
  };
  addClass = function( elem, c ) {
    if ( !hasClass( elem, c ) ) {
      elem.className = elem.className + ' ' + c;
    }
  };
  removeClass = function( elem, c ) {
    elem.className = elem.className.replace( classReg( c ), ' ' );
  };
}

function toggleClass( elem, c ) {
  var fn = hasClass( elem, c ) ? removeClass : addClass;
  fn( elem, c );
}

var classie = {
  // full names
  hasClass: hasClass,
  addClass: addClass,
  removeClass: removeClass,
  toggleClass: toggleClass,
  // short names
  has: hasClass,
  add: addClass,
  remove: removeClass,
  toggle: toggleClass
};

// transport
if ( typeof define === 'function' && define.amd ) {
  // AMD
  define( classie );
} else {
  // browser global
  window.classie = classie;
}

})( window );

// Sidebar effects

$(document).ready(function(){
  var SidebarMenuEffects = (function() {

   function hasParentClass( e, classname ) {
     if(e === document) return false;
     if( classie.has( e, classname ) ) {
       return true;
     }
     return e.parentNode && hasParentClass( e.parentNode, classname );
   }

   // http://coveroverflow.com/a/11381730/989439
   function mobilecheck() {
     var check = false;
     (function(a){if(/(android|ipad|playbook|silk|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4)))check = true})(navigator.userAgent||navigator.vendor||window.opera);
     return check;
   }

   function init() {

     var container = document.getElementById( 'st-container' ),
       buttons = Array.prototype.slice.call( document.querySelectorAll( '#st-trigger-effects > button' ) ),
       // event type (if mobile use touch events)
       eventtype = mobilecheck() ? 'touchstart' : 'click',
       resetMenu = function() {
         classie.remove( container, 'st-menu-open' );
         $("#show-me-menu").css('opacity', '0');
         //$("#show-me-menu").removeClass('is-active');
         $('.header').removeClass('header--move');
       },
       bodyClickFn = function(evt) {
         if( !hasParentClass( evt.target, 'st-menu' ) ) {
           resetMenu();
           document.removeEventListener( eventtype, bodyClickFn );
         }
       };

     buttons.forEach( function( el, i ) {
       var effect = el.getAttribute( 'data-effect' );

       el.addEventListener( eventtype, function( ev ) {
         ev.stopPropagation();
         ev.preventDefault();
         container.className = 'st-container'; // clear
         classie.add( container, effect );
         setTimeout( function() {
           classie.add( container, 'st-menu-open' );
           $("#show-me-menu").hide();
           //$("#show-me-menu").addClass('is-active');
           $('.header').addClass('header--move');
         }, 25 );
         document.addEventListener( eventtype, bodyClickFn );
       });
     } );

   }

   // init();

  })();

  $('#close-sidebar').on("click", function(){
    $('.st-container').removeClass( 'st-menu-open' ).removeClass( 'st-effect-8' );
    $("#show-me-menu").removeClass('is-active').removeClass('hidden-xs-up');
    $('.header').removeClass('header--move');
    $('html, body, .st-container, .st-pusher').css('height', "auto");
  });
  // hamburger
  $("#show-me-menu").on("click", function(){
    if ( $(this).hasClass('is-active') ) {
      $(this).removeClass('is-active');
      $(this).removeClass('hidden-xs-up');
      $('#st-container').removeClass( 'st-menu-open' ).removeClass( 'st-effect-8' );
      $('.header').removeClass('header--move');
      $('html, body, .st-container, .st-pusher').css('height', "auto");
      // SidebarMenuEffects();
    } else {
      $(this).addClass('is-active');
      $(this).addClass('hidden-xs-up');
      $('#st-container').addClass( 'st-menu-open' ).addClass( 'st-effect-8' );
      $('.header').addClass('header--move');
      $('html, body, .st-container, .st-pusher').css('height', "100%");
      // SidebarMenuEffects();
    }
  });

  $("#show-mobile-menu").on("click", function(){
    if ( $(this).hasClass('is-active') ) {
      $(this).removeClass('is-active');
      $(this).find('.hamburger-label').text('Меню');
      $('.mobile-menu').fadeOut();
      $('.mobile-menu-active-bg').fadeOut('fast');
      // $('.hero').removeClass('active-mobile');
      // SidebarMenuEffects();
    } else {
      $(this).addClass('is-active');
      $(this).find('.hamburger-label').text('Меню');
      $('.mobile-menu').fadeIn();
      $('.mobile-menu-active-bg').fadeIn('fast');
      // $('.hero').addClass('active-mobile');
    }
  });

  // Parallax and scrolling
  $(window).scroll(function(){
    var headerTop = $('.header').offset().top;
    var scrollTop = $(window).scrollTop();
    var scrollBottom = $(document).height() - $(window).height() - $(window).scrollTop();

    if( scrollTop >= 500 ){
      $('.header').addClass('header--floating');
      $('.toggleHambColor').removeClass('hamburger--white');
    } else {
      $('.header').removeClass('header--floating');
      $('.toggleHambColor').addClass('hamburger--white');
    }
    if( scrollBottom <= 300 ){
      $('.scroll-up').addClass('visible');
    } else {
      $('.scroll-up').removeClass('visible');
    }

  });


 	// Prevent # errors
	$('[href="#"]').click(function (e) {
		e.preventDefault();
	});

	// smoth scroll
	$('a[href^="#section"]').click(function(){
        var el = $(this).attr('href');
        $('body').animate({
            scrollTop: $(el).offset().top}, 1000);
        return false;
	});

  $.scrollify({
  		section : ".section",
  		sectionName : "section-name",
  		interstitialSection : "",
  		easing: "easeOutExpo",
  		scrollSpeed: 1000,
  		offset : 0,
  		scrollbars: false,
  		standardScrollElements: "#section2",
  		setHeights: true,
  		overflowScroll: true,
  		updateHash: false,
  		touchScroll: false,
  		before:function(index, sections) {
        $('.section').removeClass('active');
        $('#section' + index).addClass('active');
      },
  		after:function() {},
  		afterResize:function() {},
  		afterRender:function() {}
  	});

  // alway stay on top at upload
  setTimeout(moveTop, 500)
  function moveTop(){
    $.scrollify.instantMove("#section0");
    $('body').animate({scrollTop: $('body').offset().top}, 500);
  }


  $('.popup-with-zoom-anim').magnificPopup({
		type: 'inline',
		fixedContentPos: false,
		fixedBgPos: true,
		overflowY: 'auto',
		closeBtnInside: true,
		preloader: false,
		midClick: true,
		removalDelay: 0,
		mainClass: 'my-mfp-zoom-in',
    // fixedContentPos: true,
    callbacks: {
      open: function() {
        $('body, html').css('overflow-y', 'hidden');
        $.scrollify.disable();
      },
      close: function() {
        $('body, html').css('overflow-y', 'scroll');
        $.scrollify.enable();
      }
    }
	});

  $('.popup-with-zoom-anim.overflow-fix').magnificPopup({
    type: 'inline',
		fixedContentPos: false,
		fixedBgPos: true,
		overflowY: 'auto',
		closeBtnInside: true,
		preloader: false,
		midClick: true,
		removalDelay: 0,
		mainClass: 'my-mfp-zoom-in',
    callbacks: {
      open: function() {
        $('body, html').css('overflow-y', 'hidden');
        $.scrollify.disable();
      },
      close: function() {
        $('body, html').css('overflow-y', 'scroll');
        $.scrollify.enable();
      }
    }
	});

  // sidebar menu 2lvl handler
  // $('.st-menu li > a').click(function(e){
	// 	if($(this).closest("li").children("ul").length) {
	// 		e.preventDefault();
  //     $(this).closest('.have-ul').toggleClass('active');
	// 		$(this).closest('li').find('.sublvl').toggleClass('active');
	// 	}
	// });
  $('.st-menu li.have-ul').click(function(e){
    e.preventDefault();
    $('.st-menu').addClass('opened-sublvl');
		$('.sublvl').addClass('active');
	});
  $('.sublvl__back').click(function(e){
    $('.st-menu').removeClass('opened-sublvl');
    $('.sublvl').removeClass('active');
  });


  //tabs
  $('.content__tabs').on('click', 'a:not(.active)', function() {
		$(this).addClass('active').siblings().removeClass('active')
		.closest('.container').find('.content__tabs__content').fadeOut('middle').eq($(this).index()).fadeIn('middle');
	});

  var putVal = ""
  //modal select handler
  $('.modal__form__input.selector').on('click', function(){
    $(this).find('.select').toggleClass('is-active');
  });
  $('.modal__form__input.selector .option').click(function(){
    putVal = $(this).data('name');
    $(this).closest('.modal__form__input').find('input').val(putVal);
  })

  $(document).mouseup(function (e) {
	    var container = new Array();
	    container.push($('.modal__form__input.selector .select'));

	    $.each(container, function(key, value) {
	        if (!$(value).is(e.target) && $(value).has(e.target).length === 0) {
	            $(value).removeClass('is-active');
	        }
	    });
    });

  // Custom form click handler
  $('.modal__form__input label').click(function(event){
	    $(this).parent('.modal__form__input').find('input').focus();
	    $(this).parent('.modal__form__input').find('textarea').focus();
	});

  //masked input
  $("input[name=phone]").mask("+7 (999) 999-9999");
  $("input[name=time]").mask("99 : 99");

  // datarange

	var daterangepicker_locale = {
	        "format": "DD.MM.YYYY",
	        "separator": " - ",
	        "applyLabel": "Применить",
	        "cancelLabel": "Отменить",
	        "fromLabel": "От",
	        "toLabel": "До",
	        "customRangeLabel": "Custom",
	        "weekLabel": "W",
	        "daysOfWeek": [
	            "Вс",
	            "Пн",
	            "Вт",
	            "Ср",
	            "Чт",
	            "Пт",
	            "Сб"
	        ],
	        "monthNames": [
	            "Январь",
	            "Февраль",
	            "Март",
	            "Апрель",
	            "Май",
	            "Июнь",
	            "Июль",
	            "Август",
	            "Сентябрь",
	            "Октбрь",
	            "Ноябрь",
	            "Декабрь"
	        ],
	        "firstDay": 1
	}
  $('input[name="daterange"]').daterangepicker({
	    "showWeekNumbers": false,
	    "singleDatePicker": true,
	    "showCustomRangeLabel": false,
      "autoUpdateInput": false,
	    "autoApply": true,
	    "startDate": new Date(),
	    "opens": "right",
	    "locale": daterangepicker_locale
	}, function(start, end, label) {
		// $('#calc__select-startdate input').val(start.format('DD.MM.YYYY'));
		// console.log("New date range selected: ' + start.format('YYYY-MM-DD') + ' to ' + end.format('YYYY-MM-DD') + ' (predefined range: ' + label + ')");
	});
  $('input[name="daterange"]').on('apply.daterangepicker', function(ev, picker) {
      $(this).val(picker.startDate.format('DD.MM.YYYY'));
  });

  $('input[name="daterange"]').on('cancel.daterangepicker', function(ev, picker) {
      $(this).val('');
  });


});

$(window).load(function() {
  $(".portfolio__item__image").twentytwenty();
});
