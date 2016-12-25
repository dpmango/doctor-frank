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
      $('.hero').removeClass('active-mobile');
      // SidebarMenuEffects();
    } else {
      $(this).addClass('is-active');
      $(this).find('.hamburger-label').text('Свернуть');
      $('.mobile-menu').fadeIn();
      $('.hero').addClass('active-mobile');
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
  		standardScrollElements: "#section4",
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


  // FCK DAT SHIT

  // $('#fullpage').fullpage({
  //     //Navigation
  //     menu: '#menu',
  //     lockAnchors: false,
  //     anchors:['firstPage', 'secondPage', 'thirdPage'],
  //     navigation: false,
  //     // false
  //     navigationPosition: 'right',
  //     navigationTooltips: ['firstSlide', 'secondSlide'],
  //     showActiveTooltip: false,
  //     slidesNavigation: true,
  //     //false
  //     slidesNavPosition: 'bottom',
  //     white: false,
  //
  //     //Scrolling
  //     css3: true,
  //     scrollingSpeed: 700,
  //     autoScrolling: true,
  //     fitToSection: true,
  //     fitToSectionDelay: 1000,
  //     scrollBar: false,
  //     easing: 'easeInOutCubic',
  //     easingcss3: 'ease',
  //     loopBottom: false,
  //     loopTop: false,
  //     loopHorizontal: true,
  //     continuousVertical: false,
  //     continuousHorizontal: false,
  //     scrollHorizontally: false,
  //     interlockedSlides: false,
  //     dragAndMove: false,
  //     offsetSections: false,
  //     resetSliders: true,
  //     //false
  //     fadingEffect: false,
  //     normalScrollElements: '#element1, .element2',
  //     scrollOverflow: false,
  //     scrollOverflowOptions: null,
  //     touchSensitivity: 15,
  //     normalScrollElementTouchThreshold: 5,
  //     bigSectionsDestination: top,
  //
  //     //Accessibility
  //     keyboardScrolling: true,
  //     animateAnchor: true,
  //     recordHistory: true,
  //
  //     //Design
  //     controlArrows: true,
  //     verticalCentered: false,
  //     sectionsColor : ['transparent', 'transparent'],
  //     paddingTop: '0px',
  //     paddingBottom: '0px',
  //     fixedElements: '.header, .hamburger--spin, .scroll-up',
  //     responsiveWidth: 1200,
  //     responsiveHeight: 0,
  //     responsiveSlides: false,
  //
  //     //Custom selectors
  //     sectionSelector: '.section',
  //     slideSelector: '.slide',
  //
  //     lazyLoading: true,
  //
  //     //events
  //     onLeave: function(index, nextIndex, direction){
  //       if(index == 1 && direction =='down'){
  //           $('.header').addClass('header--floating');
  //       } else if (index == 2 && direction =='up'){
  //         $('.header').removeClass('header--floating');
  //       }
  //
  //       if(index == 2 && direction == 'down' ){
  //         $('.scroll-up').addClass('visible');
  //       } else {
  //         $('.scroll-up').removeClass('visible');
  //       }
  //
  //     },
  //     afterLoad: function(anchorLink, index){},
  //     afterRender: function(){},
  //     afterResize: function(){},
  //     afterResponsive: function(isResponsive){},
  //     afterSlideLoad: function(anchorLink, index, slideAnchor, slideIndex){},
  //     onSlideLeave: function(anchorLink, index, slideIndex, direction, nextSlideIndex){}
  // });



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

  // 3rd screen fancy dropdowns
  // $( '#cd-dropdown' ).dropdown( {
  //   gutter : 0,
  //   stack : false,
  //   slidingIn : 200
  // } );
  // $( '#cd-dropdown2' ).dropdown( {
  //   gutter : 0,
  //   stack : false,
  //   slidingIn : 200
  // } );
  // $( '#cd-dropdown3' ).dropdown( {
  //   gutter : 0,
  //   stack : false,
  //   slidingIn : 200
  // } );
  // $( '#cd-dropdown4' ).dropdown( {
  //   gutter : 0,
  //   stack : false,
  //   slidingIn : 200
  // } );
  // $( '#cd-dropdown5' ).dropdown( {
  //   gutter : 0,
  //   stack : false,
  //   slidingIn : 200
  // } );
  // $( '#cd-dropdown6' ).dropdown( {
  //   gutter : 0,
  //   stack : false,
  //   slidingIn : 200
  // } );
  // $( '#cd-dropdown7' ).dropdown( {
  //   gutter : 0,
  //   stack : false,
  //   slidingIn : 200
  // } );
  // $( '#cd-dropdown8' ).dropdown( {
  //   gutter : 0,
  //   stack : false,
  //   slidingIn : 200
  // } );
  // $('.mansory-grid').masonry({
  //   itemSelector: '.personal__card',
  //   percentPosition: true
  //   columnWidth: 25%,
  //   // gutter: 10
  // });

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

var lastScrollTop = 0;
// $(window).scroll(function(event) {
// 	var wScroll = $(this).scrollTop();
//   var First = $('#sectionFirst');
//   var Second = $('#sectionSecond');
//   var Third = $('#sectionSecond');
//
//   // var sectionFirstContainer = $('#sectionFirst').height();
//   // var sectionSecondContainer = $('#sectionSecond').height();
//   // var sectionThirdContainer = $('#sectionThird').height();
//
//   var FirstTop = First.offset().top;
//   var FirstBottom = First.offset().top + First.outerHeight;
//   var SecondTop = Second.offset().top;
//   var SecondBottom = Second.offset().top + Second.outerHeight;
//   var bottom_of_screen = ($(this).scrollTop()) + ($(this).height());
//
//   console.log(SecondTop);
//   console.log(SecondBottom);
//   console.log(bottom_of_screen);
//
//   var st = $(this).scrollTop();
//
//   if ( (bottom_of_screen > SecondTop) && (bottom_of_screen < SecondBottom) ){
//       $('#trigger-sectionTwo').trigger('click');
//   } else {
//      // upscroll code
//   }
//
//   lastScrollTop = st;
//
// });

});

$(window).load(function() {
  $(".portfolio__item__image").twentytwenty();
});

//mansory grid

//
// // ------------- VARIABLES ------------- //
// var ticking = false;
// var isFirefox = (/Firefox/i.test(navigator.userAgent));
// var isIe = (/MSIE/i.test(navigator.userAgent)) || (/Trident.*rv\:11\./i.test(navigator.userAgent));
// var scrollSensitivitySetting = 30; //Increase/decrease this number to change sensitivity to trackpad gestures (up = less sensitive; down = more sensitive)
// var slideDurationSetting = 600; //Amount of time for which slide is "locked"
// var currentSlideNumber = 0;
// var totalSlideNumber = $(".section").length;
//
// // ------------- DETERMINE DELTA/SCROLL DIRECTION ------------- //
// function parallaxScroll(evt) {
//   if (isFirefox) {
//     //Set delta for Firefox
//     delta = evt.detail * (-120);
//   } else if (isIe) {
//     //Set delta for IE
//     delta = -evt.deltaY;
//   } else {
//     //Set delta for all other browsers
//     delta = evt.wheelDelta;
//   }
//
//   if (ticking != true) {
//     if (delta <= -scrollSensitivitySetting) {
//       //Down scroll
//       ticking = true;
//       if (currentSlideNumber !== totalSlideNumber - 1) {
//         currentSlideNumber++;
//         nextItem();
//       }
//       slideDurationTimeout(slideDurationSetting);
//     }
//     if (delta >= scrollSensitivitySetting) {
//       //Up scroll
//       ticking = true;
//       if (currentSlideNumber !== 0) {
//         currentSlideNumber--;
//       }
//       previousItem();
//       slideDurationTimeout(slideDurationSetting);
//     }
//   }
// }
//
// // ------------- SET TIMEOUT TO TEMPORARILY "LOCK" SLIDES ------------- //
// function slideDurationTimeout(slideDuration) {
//   setTimeout(function() {
//     ticking = false;
//   }, slideDuration);
// }
//
// // ------------- ADD EVENT LISTENER ------------- //
// var mousewheelEvent = isFirefox ? "DOMMouseScroll" : "wheel";
// window.addEventListener(mousewheelEvent, _.throttle(parallaxScroll, 60), false);
// $(window).scroll(function() {
// } );
// // ------------- SLIDE MOTION ------------- //
// function nextItem() {
//   console.log('next');
//   var $previousSlide = $(".section").eq(currentSlideNumber - 1);
//   $previousSlide.removeClass("up-scroll").addClass("down-scroll");
// }
//
// function previousItem() {
//   console.log('prev');
//   var $currentSlide = $(".section").eq(currentSlideNumber);
//   $currentSlide.removeClass("down-scroll").addClass("up-scroll");
// }
