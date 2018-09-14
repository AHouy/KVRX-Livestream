//Strips HTML tags from a string
//Credit here:
//http://stackoverflow.com/questions/822452/strip-html-from-text-javascript
function strip(html) {
   var tmp = document.createElement("DIV");
   tmp.innerHTML = html;
   return tmp.textContent || tmp.innerText || "";
}

//Updates song, artist, album, and album art tags from KVRX website
function updateTags() {    
    var homepage = $.getJSON("http://kvrx.org/now_playing/track", function(data) {
        document.getElementById('song').innerText = (new String(data.artist)).toString().replace('null', '');
        document.getElementById('artist').innerText = (new String(data.track)).toString().replace('null', '');
        document.getElementById('album').innerText = (new String(data.album)).toString().replace('null', '');
        // document.getElementById('albumart').innerHTML = $(data).find("[id=album-artwork]")[0].innerHTML;
        }); 
    var album_info = $.getJSON("http://kvrx.org/now_playing/album_info"), function(data) {
        document.getElementById('albumart').innerHTML = data.album_artwork;
        //see if we need to add any links
        if (data.album_href != '') {
		var link = '<a href="' + data.album_href + '">' + $("#albumart").text() + '</a>';
        	$("#album").html(link);
	}
    });
}

//Runs scripts once main page is loaded
document.addEventListener('DOMContentLoaded', function() {
	//Update tags on load
	updateTags()

	//Create variables for play and pause buttons
    var playButton = document.getElementById('livestreamlisten'),
        stopButton = document.getElementById('livestreamstop');
    
   	//If play button is pressed, send to background.js via message
    playButton.addEventListener('click', function() {
    	chrome.extension.sendMessage({action: "play"})
    });
    
    //If pause button is pressed, send to background.js via message
    stopButton.addEventListener('click', function () {
    	chrome.extension.sendMessage({action: "pause"})
    })

});
