var url_self="https://api.instagram.com/v1/users/self/",exis_accesstoken;$(function(){if(exis_accesstoken=localStorage.getItem("access_token"),!exis_accesstoken||"undefined"==exis_accesstoken){console.log(exis_accesstoken);for(var e=new Object,s=location.hash.substring(1).split("#"),c=0;s[c];c++){var o=s[c].split("=");e[o[0]]=o[1]}localStorage.setItem("access_token",e.access_token)}$.ajax({url:url_self+"?access_token="+exis_accesstoken+"&scope=likes+comments+relationships+likes+public_content+basic",method:"get",dataType:"jsonp",success:function(e){console.log(e),void 0!==e&&$("#name").append(e.data.full_name)}}),$("#search-btn").on("click",function(){$.ajax({url:url_self+"?access_token="+exis_accesstoken,method:"get",dataType:"jsonp",success:function(e){e&&$("#name").append(e.data.full_name)}})}),$("#follow-btn").on("click",function(){$.ajax({url:url_self+"follows?access_token="+exis_accesstoken,method:"get",dataType:"jsonp",success:function(e){console.log(e)}})})});