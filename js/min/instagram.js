function adduserInfo(e){console.log("datajson:"+e.username);var o=(e.username,"<li>");o+='<a href="https://www.instagram.com/'+e.username+'/">',o+="<p>"+e.full_name+"</p>",o+="<span>"+e.username+"</span>",o+="<img src='"+e.profile_picture+"' width='100' height='100' >",o+="</a>",o+="</li>",$("#followed-list").append(o)}var url_self="https://api.instagram.com/v1/users/self/",url_users="https://api.instagram.com/v1/users/",exis_accesstoken;$(function(){if(exis_accesstoken=localStorage.getItem("access_token"),!exis_accesstoken||"undefined"==exis_accesstoken){console.log(exis_accesstoken);for(var e=new Object,o=location.hash.substring(1).split("#"),a=0;o[a];a++){var s=o[a].split("=");e[s[0]]=s[1]}localStorage.setItem("access_token",e.access_token)}$.ajax({url:url_self+"?access_token="+exis_accesstoken,method:"get",dataType:"jsonp",success:function(e){console.log(e),void 0!==e?($("#username").append(e.data.username),$("#name").append(e.data.full_name),$("#bio").append(e.data.bio),$(".profile-img").find("img").attr("src",e.data.profile_picture),$("#followed").append(e.data.counts.followed_by),$("#follows").append(e.data.counts.follows),$("#media").append(e.data.counts.media)):$(".profile-box").remove()}}),$.ajax({url:url_self+"followed-by?access_token="+exis_accesstoken,method:"get",dataType:"jsonp",success:function(e){if(console.log(e),e.data.length>=1){$("<h2>FOLLOWED USERS</h2>").prependTo("#followed-box");for(var o=0;e.data.length>=o;o++)adduserInfo(e.data[o])}}}),$("#sinofool-btn").on("click",function(){$.ajax({url:url_users+"1474272023/?access_token="+exis_accesstoken,method:"get",dataType:"jsonp",success:function(e){void 0!==e&&($(".profile-box").clone().addClass("sinofool").appendTo("#test-detail"),$("#username",".sinofool").html(e.data.username),$("#name",".sinofool").html(e.data.full_name),$("#bio",".sinofool").html(e.data.bio),$(".profile-img",".sinofool").find("img").attr("src",e.data.profile_picture),$("#followed",".sinofool").html(e.data.counts.followed_by),$("#follows",".sinofool").html(e.data.counts.follows),$("#media",".sinofool").html(e.data.counts.media))}})}),$("#followed-btn").on("click",function(){})});