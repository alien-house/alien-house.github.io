var url_self = "https://api.instagram.com/v1/users/self/";
var url_users = "https://api.instagram.com/v1/users/";
var url_self_media = "https://api.instagram.com/v1/users/self/media/recent/";
var exis_accesstoken;
var map;

$(function(){

/*=======================================
 Get the Acess Token
=======================================*/
exis_accesstoken = localStorage.getItem("access_token");
if(!exis_accesstoken || exis_accesstoken == "undefined"){
	//get a info from insta
	var arg = new Object;
	var pair = location.hash.substring(1).split('#');
	for(var i = 0; pair[i]; i++) {
	    var kv = pair[i].split('=');
	    arg[kv[0]] = kv[1];
	console.log(pair[0]);
	}
	localStorage.setItem("access_token", arg['access_token']);
}

/*=======================================
 Get Instagram Information of Mine
=======================================*/
$.ajax({
    url: url_self +"?access_token=" + exis_accesstoken,
    method: 'get',
    dataType: 'jsonp',
    success: function(datajson) {
    	// console.log(datajson);
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

/*=======================================
 Get Instagram Data of follower
=======================================*/
$.ajax({
    url: url_self +"followed-by?access_token=" + exis_accesstoken,
    method: 'get',
    dataType: 'jsonp',
    success: function(datajson) {
		// console.log(datajson);
    	if(datajson.data.length >= 1){
    		$("<h2>FOLLOWED USERS</h2>").prependTo("#followed-box");
        	for (var i = 0; datajson.data.length > i; i++) {
        		// console.log(datajson.data.length);
        		// console.log(i);
        		adduserInfo(datajson.data[i]);
        	}
    	}
    }
});

/*=======================================
 Get Instagram Data of My Media
=======================================*/
$.ajax({
    url: url_self_media + "?access_token=" + exis_accesstoken,
    method: 'get',
    dataType: 'jsonp',
    success: function(datajson) {
		for (var i = 0; datajson.data.length > i; i++) {
    		addMediaInfo(datajson.data[i]);
		}
    }
});

/*=======================================
 Get for jsut one person (I haven't used)
=======================================*/
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

});

/*=======================================
 Get Media Info and Create Dom
=======================================*/
function addMediaInfo(datajson){
	var container = '<li>';
	container += '<a href="'+ datajson.link +'" target="_blank">';
	container += '<img src="'+ datajson.images.thumbnail.url +'">';
	container += '<div class="media__des"><div class="media__inner"><div class="media__meta"><p class="media__caption"><small>';
	container += datajson.caption.text;
	container += '</small></p></div></div></div>';
	container += '</a>';
	container += '</li>';
	$("#media-list").append(container);
}

/*=======================================
 Get User Info and Create Dom
=======================================*/
function adduserInfo(datajson){
	var full_name = datajson.username;
	var container = '<li>';
	container += '<a href="https://www.instagram.com/'+datajson.username+'/" target="_blank">';
	container += '<p>'+datajson.full_name+'</p>';
	container += "<img src='"+datajson.profile_picture+"' width='70' height='70' >";
	container += '</a>';
	container += '</li>';
	$("#followed-list").append(container);
}

/*=======================================
 Google Map
=======================================*/
function runFunc() {
	if( navigator.geolocation ){
		getLocation();
	}else{
		alert( "On your divice, you can't get your location." );
	}
}

function getLocation(){
	//parameter
	var optionObj = {
		"enableHighAccuracy": false ,
		"timeout": 8000 ,
		"maximumAge": 5000 ,
	};
	navigator.geolocation.getCurrentPosition( successFunc , errorFunc , optionObj );
}

function successFunc( position ){
	var canvas = document.getElementById( 'map-canvas' );
	var latlng = new google.maps.LatLng( position.coords.latitude, position.coords.longitude );
	var mapOptions = {
		zoom: 15,
		center: latlng,
	};
	map = new google.maps.Map( canvas, mapOptions ) ;
    $.ajax({
        url: "https://api.instagram.com/v1/media/search?lat="+
        position.coords.latitude + "&lng="+
        position.coords.longitude + "&access_token=" + exis_accesstoken,
        method: 'get',
        dataType: 'jsonp',
        success: function(datajson) {
        	console.log(datajson);
        	iconPin(datajson.data, position.coords);
        }
    });
}

function iconPin(data, pos){
	var neighborhoods = [];
	var markers = [];
	var contentString = [];
	var infowindow = [];
	
	for (var i = 0; i < data.length; i++) {
		neighborhoods.push({lat: data[i].location.latitude, lng: data[i].location.longitude});
		var textArray = '<div class="blow"><div class="blow-img"><img src="'+data[i].images.thumbnail.url+'"></div>';
		if(data[i].caption !== null){
			textArray += '<p>' + data[i].caption.text + '</p>';
		}
		textArray += '<span>by: '+ data[i].user.full_name + '</span></div>';
		contentString.push(textArray);
	}

	drop();

	function drop() {
	  clearMarkers();
	  for (var i = 0; i < neighborhoods.length; i++) {
	    addMarkerWithTimeout(neighborhoods[i], i * 80, i);
	    infowindow.push(new google.maps.InfoWindow({
			content: contentString[i]
		}));
	  }
	}

	function addMarkerWithTimeout(position, timeout, i) {
	  window.setTimeout(function() {
	  	 var image = {
		    // url: data[i].images.thumbnail.url,
		    url: data[i].user.profile_picture,
		    // size: new google.maps.Size(50, 50),
  			scaledSize: new google.maps.Size(40, 40)
		  };
	  	var emark = new google.maps.Marker({
			position: position,
			map: map,
			icon: image,
			title: data[i].user.full_name,
			animation: google.maps.Animation.DROP
	    });
	    // emark.css({"border-radius":"4px"});
		emark.addListener('click', function() {
			window.open(data[i].link, '_blank');
		});
		emark.addListener('mouseover', function() {
			infowindow[i].open(map, emark);
		});
		emark.addListener('mouseout', function() {
			infowindow[i].close();
		});
	    markers.push(emark);
	  }, timeout);
	}
	function clearMarkers() {
	  for (var i = 0; i < markers.length; i++) {
	    markers[i].setMap(null);
	  }
	  markers = [];
	}
}

function errorFunc( error ){
	var errorMessage = {
		0: "An unknown error occurred..." ,
		1: "Acquisition of location information was not permitted" ,
		2: "Position information could not be acquired due to radio wave conditions etc..." ,
		3: "time out" ,
	};
	console.log( errorMessage[error.code] ) ;
}