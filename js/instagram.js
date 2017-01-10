var url_self = "https://api.instagram.com/v1/users/self/";
var exis_accesstoken;
$(function(){

    exis_accesstoken = localStorage.getItem("access_token")
	if(!exis_accesstoken || exis_accesstoken == "undefined"){
		console.log(exis_accesstoken);
		//get a info from insta
		var arg = new Object;
		var pair = location.hash.substring(1).split('#');
		for(var i = 0; pair[i]; i++) {
		    var kv = pair[i].split('=');
		    arg[kv[0]] = kv[1];
		}
		localStorage.setItem("access_token", arg['access_token']);
	}else{
	}
	// console.log(exis_accesstoken);

    $.ajax({
        url: url_self +"?access_token=" + exis_accesstoken +"&scope=likes+comments+relationships+likes+public_content+basic",
        method: 'get',
        dataType: 'jsonp',
        success: function(data) {
        	console.log(data);
        	if(data !== undefined){
    			$("#name").append(data.data.full_name);
        	}
        }
    });

	$("#search-btn").on("click", function(){
	    $.ajax({
	        url: url_self +"?access_token=" + exis_accesstoken,
	        method: 'get',
	        dataType: 'jsonp',
	        success: function(data) {
	        	if(data){
	    			$("#name").append(data.data.full_name);
	        	}
	        }
	    });
	});

	$("#follow-btn").on("click", function(){
	    $.ajax({
	        url: url_self +"follows?access_token=" + exis_accesstoken,
	        method: 'get',
	        dataType: 'jsonp',
	        success: function(data) {
	        	console.log(data);
	        }
	    });
	});


});










