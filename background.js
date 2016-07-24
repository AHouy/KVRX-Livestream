class KVRXPlayer {
	constructor() {
		this.scrobbling = false;

		console.log("Creating player element");
		this.audioElement = document.createElement('audio');
		this.audioElement.setAttribute("preload", "auto");
		this.audioElement.autobuffer = true;
		
		console.log("Adding player source");
		var source1 = document.createElement('source');
		source1.type = 'audio/mpeg';
		source1.src = 'http://tstv-stream.tsm.utexas.edu:8000/kvrx_livestream';
		this.audioElement.appendChild(source1);
		
		console.log("Loading player");
		this.audioElement.load;
	}
	play() {
		console.log("Playing the tunes");
		this.scrobbling = true;
		this.audioElement.play();
		setInterval(scrobble, 10000)
	}
	pause() {
		console.log("Pausing the tunes");
		this.scrobbling = false;
		this.audioElement.pause();
	}
}

function getTags() {
	var	song =		$("#song").load("http://kvrx.org #track-name:eq(0)"),
		artist =	$("#artist").load("http://kvrx.org #artist-name:eq(0)"),
		album =		$("#album").load("http://kvrx.org #album-name:eq(0)"),
		albumArt = 	$("#albumart").load("http://kvrx.org #album-artwork");
}

console.log("Instantiating new player class");
var player = new KVRXPlayer();

var lastTrack = {};
function scrobble() {
	console.log("Scrobbling...")
	var currTrack = {};
	if (KVRXPlayer.scrobbling && currTrack != lastTrack) {
		console.log("Scrobble: ", song, " - ", artist);
		scrobble();
		lastTrack = currTrack;
	} else {
		console.log("Either player is not active or the current track is the same as the last track.")
	}
}

//Listens for messages
chrome.extension.onMessage.addListener(
    function(request, sender, sendResponse) {
        //Plays audio element if message is play
        if (request.action == "play"){
        	console.log("Play button pressed");
            player.play();
        //Pauses audio element if message is pause
        } else if (request.action == "pause") {
        	console.log("Pause button pressed");
            player.pause();
        } else if (request.action == "scrobble") {
        	console.log("Scrobble received");
        	scrobbleCheck(request.song, request.artist);
        }
});