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
	        url: "https://api.instagram.com/v1/users/1474272023/?access_token=4401932064.ba9768d.a658dfd9cfbe490a85e170ad07592b01",
	        method: 'get',
	        dataType: 'jsonp',
	        success: function(data) {
	        	console.log(data);
	        }
	    });
	});
https://api.instagram.com/v1/users/{user-id}/?access_token=ACCESS-TOKEN


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
	        url: url_self +"follows?access_token=" + exis_accesstoken,
	        method: 'get',
	        dataType: 'jsonp',
	        success: function(data) {
	        	console.log(data);
	        }
	    });
	});


});










