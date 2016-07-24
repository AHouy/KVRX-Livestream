//Updates song, artist, album, and album art tags from KVRX website
function updateTags() {
	var song =		$("#song").load("http://kvrx.org #track-name:eq(0)"),
		artist =	$("#artist").load("http://kvrx.org #artist-name:eq(0)"),
		album =		$("#album").load("http://kvrx.org #album-name:eq(0)"),
		albumArt = 	$("#albumart").load("http://kvrx.org #album-artwork");
	//console.log(track);
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