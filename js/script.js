
$(function(){
	$('body').glassyWorms({
		colors: ['#fff'],
		useStyles  :true,
		numParticles  :100, //250
		tailLength :8, //12
		maxForce   :5, // Moving force 8
		gravity    :6, // 9.81
		friction   :0.7 //0.75
		// interval   :10
	});
});


$(function(){
	var windowHeight = $(window).height();
	$(".intro-box").outerHeight(windowHeight);
	$(window).on('resize orientationchange', function(e) {
		$(".intro-box").outerHeight($(window).height());
	});
});

$(function(){
//https://github.com/mattboldt/typed.js/
	$("#typed").typed({
		strings: ["TO BUILD WEB SITE.",
			"TO CREATE WEB SITE.",
			"TO DESIGN A LOGO.",
			"something do related web."],
		typeSpeed  : 0,
		loop       :1
	});
});


jQuery.easing.easeInOutCubic = function (e,f,a,h,g) {
	if((f/=g/2)<1){return h/2*f*f*f+a}return h/2*((f-=2)*f*f+2)+a
};
$(function(){
	$(".link_dmt").click(function(){
		$('body,html').animate({
			scrollTop: $(this.hash).offset().top
		}, 1000,'easeInOutCubic');
		return false;
	});
});
