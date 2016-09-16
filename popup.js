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
    var homepage = $.get("http://kvrx.org/", function(data) {
        document.getElementById('song').innerText = $(data).find("[id=track-name]")[0].innerText;
        document.getElementById('artist').innerText = $(data).find("[id=artist-name]")[0].innerText;
        document.getElementById('album').innerText = $(data).find("[id=album-name]")[0].innerText;
        document.getElementById('albumart').innerHTML = $(data).find("[id=album-artwork]")[0].innerHTML;
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