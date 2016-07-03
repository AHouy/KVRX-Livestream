//Updates song, artist, album, and album art tags from KVRX website
function updateTags() {
	//console.log("updated")
	$("#song").load("http://kvrx.org #track-name:eq(0)");
	$("#artist").load("http://kvrx.org #artist-name:eq(0)");
	$("#album").load("http://kvrx.org #album-name:eq(0)");
	$("#albumart").load("http://kvrx.org #album-artwork");
	/*
	var strSongName = $('#song').contents().unwrap().contents().unwrap().text();
	var strArtistName = $('#artist').contents().unwrap().contents().unwrap().text();
	var strAlbumName = $('#album').contents().unwrap().contents().unwrap().text();
	console.log("Info:", strSongName, strArtistName, strAlbumName);
	*/
}

//Runs scripts once main page is loaded
document.addEventListener('DOMContentLoaded', function() {
	//Update tags and proceed to do it every five seconds
	updateTags()
	setInterval(updateTags, 5000)

	//Create variables for play and pause buttons
    var playButton = document.getElementById('livestreamlisten'),
    	stopButton = document.getElementById('livestreamstop');
    
   	//If play button is pressed, send to background.js via message
    playButton.addEventListener('click', function() {
    	//console.log("play button pressed");
    	chrome.extension.sendMessage({action: "play"})
    });
    
    //If pause button is pressed, send to background.js via message
    stopButton.addEventListener('click', function () {
    	//console.log("stop button pressed");
    	chrome.extension.sendMessage({action: "pause"})
    })

});