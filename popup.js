function updateTags() {
	var kvrxSongTag = 'test';
	var content = ("http://kvrx.org").html();
	console.log(content);


}

document.addEventListener('DOMContentLoaded', function() {

	var songTag = document.getElementById('song'),
		artistTag = document.getElementById('artist'),
		albumTag = document.getElementById('album');

	setInterval(updateTags, 1000)


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