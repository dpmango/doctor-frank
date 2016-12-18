$(document).ready(function(){
  // hamburger
  var click = 1;
  $("#show-me-menu").on("click", clickHamb);
  function clickHamb() {
      if ( click == 1 ) {
          $(this).addClass('is-active');
          $('html, body, .st-container, .st-pusher').css('height', "100%");
          //$('.mobile-nav').slideToggle(300);
          click = 2;
      } else {
      $(this).removeClass('is-active');
      $('html, body, .st-container, .st-pusher').css('height', "auto");
      //$('.mobile-nav').hide();
          click = 1;
      }
  }

  // Parallax and scrolling
  $(window).scroll(function(){
    var headerTop = $('.header').offset().top;
    var scrollTop = $(window).scrollTop();
    var scrollBottom = $(document).height() - $(window).height() - $(window).scrollTop();

    if( scrollTop >= 500 ){
      $('.header').addClass('header--floating');
    } else {
      $('.header').removeClass('header--floating');
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

  $('#fullpage').fullpage({
      //Navigation
      menu: '#menu',
      lockAnchors: false,
      anchors:['firstPage', 'secondPage', 'thirdPage'],
      navigation: false,
      navigationPosition: 'right',
      navigationTooltips: ['firstSlide', 'secondSlide'],
      showActiveTooltip: false,
      slidesNavigation: false,
      slidesNavPosition: 'bottom',

      //Scrolling
      css3: true,
      scrollingSpeed: 700,
      autoScrolling: true,
      fitToSection: true,
      fitToSectionDelay: 1000,
      scrollBar: false,
      easing: 'easeInOutCubic',
      easingcss3: 'ease',
      loopBottom: false,
      loopTop: false,
      loopHorizontal: true,
      continuousVertical: false,
      continuousHorizontal: false,
      scrollHorizontally: false,
      interlockedSlides: false,
      dragAndMove: false,
      offsetSections: false,
      resetSliders: false,
      fadingEffect: false,
      normalScrollElements: '#element1, .element2',
      scrollOverflow: false,
      scrollOverflowOptions: null,
      touchSensitivity: 15,
      normalScrollElementTouchThreshold: 5,
      bigSectionsDestination: top,

      //Accessibility
      keyboardScrolling: true,
      animateAnchor: true,
      recordHistory: true,

      //Design
      controlArrows: true,
      verticalCentered: false,
      sectionsColor : ['transparent', 'transparent'],
      paddingTop: '15px',
      paddingBottom: '0px',
      fixedElements: '.header, .hamburger',
      responsiveWidth: 0,
      responsiveHeight: 0,
      responsiveSlides: false,

      //Custom selectors
      sectionSelector: '.section',
      slideSelector: '.slide',

      lazyLoading: true,

      //events
      onLeave: function(index, nextIndex, direction){
        if(index == 1 && direction =='down'){
            $('.header').addClass('header--floating');
        } else if (index == 2 && direction =='up'){
          $('.header').removeClass('header--floating');
        }
      },
      afterLoad: function(anchorLink, index){},
      afterRender: function(){},
      afterResize: function(){},
      afterResponsive: function(isResponsive){},
      afterSlideLoad: function(anchorLink, index, slideAnchor, slideIndex){},
      onSlideLeave: function(anchorLink, index, slideIndex, direction, nextSlideIndex){}
  });

});
