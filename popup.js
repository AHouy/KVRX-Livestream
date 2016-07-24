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
    var page = $.get("http://kvrx.org/", function(data) {
            var song = data.substring(data.indexOf('<span id="track-name">') + 22, data.indexOf('</span><span id="artist-name">')),
                artist = data.substring(data.indexOf('<span id="artist-name">') + 23, data.indexOf('</span><span id="album-name">')),
                album = strip(data.substring(data.indexOf('<span id="album-name">') + 22, data.indexOf('</span><span id="album-id">'))),
                endString = 'alt="' + album + '" title="' + album + '" />',
                albumart = data.substring(data.indexOf('<div id="album-artwork">') + 24, data.indexOf(endString) + endString.length);
            document.getElementById('song').innerText = song;
            document.getElementById('artist').innerText = artist;
            document.getElementById('album').innerText = album;
            document.getElementById('albumart').innerHTML = albumart;
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
    	//console.log("stop button pressed");
    	chrome.extension.sendMessage({action: "pause"})
    })

});