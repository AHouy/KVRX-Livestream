function updateTags() {
	$("#song").load("http:/kvrx.org #track-name");
	$("#artist").load("http:/kvrx.org #artist-name");
	$("#album").load("http:/kvrx.org #album-name");
	$("#albumart").load("http:/kvrx.org #album-artwork");
}

document.addEventListener('DOMContentLoaded', function() {

	updateTags()
	//setInterval(updateTags, 1000)


    var playButton = document.getElementById('livestreamlisten'),
    	stopButton = document.getElementById('livestreamstop')
    

    playButton.addEventListener('click', function() {
    	console.log("play button pressed");
    	chrome.extension.sendMessage({action: "play"})
    });
    
    stopButton.addEventListener('click', function () {
    	console.log("stop button pressed");
    	chrome.extension.sendMessage({action: "pause"})
    })

});