var url_self="https://api.instagram.com/v1/users/self/",url_users="https://api.instagram.com/v1/users/",exis_accesstoken;$(function(){if(exis_accesstoken=localStorage.getItem("access_token"),!exis_accesstoken||"undefined"==exis_accesstoken){console.log(exis_accesstoken);for(var o=new Object,e=location.hash.substring(1).split("#"),s=0;e[s];s++){var a=e[s].split("=");o[a[0]]=a[1]}localStorage.setItem("access_token",o.access_token)}$.ajax({url:url_self+"?access_token="+exis_accesstoken,method:"get",dataType:"jsonp",success:function(o){console.log(o),void 0!==o?($("#username").append(o.data.username),$("#name").append(o.data.full_name),$("#bio").append(o.data.bio),$(".profile-img").find("img").attr("src",o.data.profile_picture),$("#followed").append(o.data.counts.followed_by),$("#follows").append(o.data.counts.follows),$("#media").append(o.data.counts.media)):$(".profile-box").remove()}}),$("#sinofool-btn").on("click",function(){$.ajax({url:url_users+"1474272023/?access_token="+exis_accesstoken,method:"get",dataType:"jsonp",success:function(o){void 0!==o&&($(".profile-box").clone().addClass("sinofool").appendTo("#test-detail"),$("#username",".sinofool").html(o.data.username),$("#name",".sinofool").html(o.data.full_name),$("#bio",".sinofool").html(o.data.bio),$(".profile-img",".sinofool").find("img").attr("src",o.data.profile_picture),$("#followed",".sinofool").html(o.data.counts.followed_by),$("#follows",".sinofool").html(o.data.counts.follows),$("#media",".sinofool").html(o.data.counts.media))}})}),$("#search-btn").on("click",function(){$.ajax({url:url_self+"?access_token="+exis_accesstoken,method:"get",dataType:"jsonp",success:function(o){console.log(o)}})}),$("#followed-btn").on("click",function(){$.ajax({url:url_self+"followed-by?access_token="+exis_accesstoken,method:"get",dataType:"jsonp",success:function(o){console.log(o)}})})});