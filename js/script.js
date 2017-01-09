var windowHeight;
var navpos;

$(function(){
	if($("body.top").size()){
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
	}
});


$(function(){
	windowHeight = $(window).height();
	if($("body.top").size()){
		navpos = $(window).height()/2;
	}else{
		navpos = $(".intro-box").outerHeight();
	}
	if($("body.top").size()){
		$(".intro-box").outerHeight(windowHeight);
	}
	$(window).on('resize orientationchange', function(e) {

		windowHeight = $(window).height();
		if($("body.top").size()){
			navpos = $(window).height()/2;
		}else{
			navpos = $(".intro-box").outerHeight();
		}
		if($("body.top").size()){
			$(".intro-box").outerHeight(windowHeight);
		}
	});
});


$(function(){
	//https://github.com/mattboldt/typed.js/
	if($("#typed").size()){
		$("#typed").typed({
			strings: [
				"TO BUILD WEBSITES.",
				"TO CREATE WEBSITES.",
				"TO DESIGN A LOGO."
			],
			typeSpeed  : 0,
			loop       :1
		});
	}
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


$(function() {
	var topBtn = $('.top-nav');
	var footerNav = $('.foot-nav');
	// topBtn.hide();
	$(window).scroll(function () {
		//
		if ($(this).scrollTop() > navpos) {
			topBtn.addClass("fixed");
		} else {
			topBtn.removeClass("fixed");
		}
		//footer
		scrollHeight = $(document).height();
		scrollPosition = $(window).height() + $(this).scrollTop();
		if ( (scrollHeight - scrollPosition) / scrollHeight <= 0.05) {
			footerNav.addClass("end");
		} else {
			footerNav.removeClass("end");
		}


	});

});


var url_self = "https://api.instagram.com/v1/users/self/";

$(function(){

    // $.getJSON(url_self, function(data){
    // 	console.log(data);
    // });

    //get a info from insta
	var arg = new Object;
	var pair=location.hash.substring(1).split('#');
	for(var i=0;pair[i];i++) {
	    var kv = pair[i].split('=');
	    arg[kv[0]]=kv[1];
	}


    $.ajax({
        url: url_self +"?access_token="+arg['access_token'],
        method: 'get',
        dataType: 'jsonp',
        success: function(data) {
    	$("#name").append(data.data.full_name);
        }
    });



});










