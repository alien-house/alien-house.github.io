var windowHeight,navpos;$(function(){$("body.top").size()&&$("body").glassyWorms({colors:["#fff"],useStyles:!0,numParticles:100,tailLength:8,maxForce:5,gravity:6,friction:.7})}),$(function(){windowHeight=$(window).height(),navpos=$("body.top").size()?$(window).height()/2:$(".intro-box").outerHeight(),$("body.top").size()&&$(".intro-box").outerHeight(windowHeight),$(window).on("resize orientationchange",function(o){windowHeight=$(window).height(),navpos=$("body.top").size()?$(window).height()/2:$(".intro-box").outerHeight(),$("body.top").size()&&$(".intro-box").outerHeight(windowHeight)})}),$(function(){$("#typed").size()&&$("#typed").typed({strings:["TO BUILD WEBSITES.","TO CREATE WEBSITES.","TO DESIGN A LOGO."],typeSpeed:0,loop:1})}),jQuery.easing.easeInOutCubic=function(o,i,t,e,n){return(i/=n/2)<1?e/2*i*i*i+t:e/2*((i-=2)*i*i+2)+t},$(function(){$(".link_dmt").click(function(){return $("body,html").animate({scrollTop:$(this.hash).offset().top},1e3,"easeInOutCubic"),!1})}),$(function(){var o=$(".top-nav"),i=$(".foot-nav");$(window).scroll(function(){$(this).scrollTop()>navpos?o.addClass("fixed"):o.removeClass("fixed"),scrollHeight=$(document).height(),scrollPosition=$(window).height()+$(this).scrollTop(),(scrollHeight-scrollPosition)/scrollHeight<=.05?i.addClass("end"):i.removeClass("end")})});var url_self="https://api.instagram.com/v1/users/self/?access_token=4401932064.ba9768d.a658dfd9cfbe490a85e170ad07592b01";$(function(){$.getJSON(url_self,function(o){console.log(o)})});