var url_self = "https://api.instagram.com/v1/users/self/";
var url_users = "https://api.instagram.com/v1/users/";
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
        url: url_self +"?access_token=" + exis_accesstoken,
        method: 'get',
        dataType: 'jsonp',
        success: function(datajson) {
        	console.log(datajson);
        	if(datajson !== undefined){
    			$("#username").append(datajson.data.username);
    			$("#name").append(datajson.data.full_name);
    			$("#bio").append(datajson.data.bio);
    			$(".profile-img").find("img").attr("src",datajson.data.profile_picture);
    			$("#followed").append(datajson.data.counts.followed_by);
    			$("#follows").append(datajson.data.counts.follows);
    			$("#media").append(datajson.data.counts.media);
        	}else{
        		$(".profile-box").remove();
        	}
        }
    });

	$("#sinofool-btn").on("click", function(){
	    $.ajax({
        	url: url_users+"1474272023" +"/?access_token=" + exis_accesstoken,
	        method: 'get',
	        dataType: 'jsonp',
	        success: function(datajson) {
	        	if(datajson !== undefined){
		        	$(".profile-box").clone().addClass("sinofool").appendTo( "#test-detail" );
	    			$("#username",".sinofool").html(datajson.data.username);
	    			$("#name",".sinofool").html(datajson.data.full_name);
	    			$("#bio",".sinofool").html(datajson.data.bio);
	    			$(".profile-img",".sinofool").find("img").attr("src",datajson.data.profile_picture);
	    			$("#followed",".sinofool").html(datajson.data.counts.followed_by);
	    			$("#follows",".sinofool").html(datajson.data.counts.follows);
	    			$("#media",".sinofool").html(datajson.data.counts.media);
	        	}
	        }
	    });
	});

	$("#search-btn").on("click", function(){
	    $.ajax({
	        url: url_self +"?access_token=" + exis_accesstoken,
	        method: 'get',
	        dataType: 'jsonp',
	        success: function(data) {
	        	console.log(data);
	        }
	    });
	});

	$("#follow-btn").on("click", function(){
	    $.ajax({
	        url: url_self +"followed-by?access_token=" + exis_accesstoken,
	        method: 'get',
	        dataType: 'jsonp',
	        success: function(data) {
	        	console.log(data);
	        }
	    });
	});


});










