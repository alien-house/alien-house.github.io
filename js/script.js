
$(function(){
		$('body').glassyWorms({
			colors: ['#fff'],
			useStyles  :true,
			numParticles  :90, //250
			tailLength :6, //12
			maxForce   :5, // Moving force 8
			gravity    :6, // 9.81
			friction   :0.7 //0.75
			// interval   :10
		});


	// var windowHeight = $(window).height();
	// $(".sec-intro").outerHeight(windowHeight);
	// $(window).on('resize orientationchange', function(e) {
	// 	$(".sec-intro").outerHeight($(window).height());
	// });

//https://github.com/mattboldt/typed.js/
	$("#typed").typed({
      strings: ["TO BUILD WEB SITE.",
			"TO CREATE WEB SITE.",
			"TO MAKE LOGO.",
			"PURSUING my IDEAL."],
      typeSpeed  : 0,
			loop       :1
  });


});
