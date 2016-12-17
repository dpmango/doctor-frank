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

    if( scrollTop >= 500 ){
      $('.header').addClass('header--floating');
    } else {
      $('.header').removeClass('header--floating');
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

});
