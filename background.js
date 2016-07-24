//Class for KVRX player
class KVRXPlayer {
	constructor() {
		//Set scrobbling to false to prevent accidental scrobbles when not listening
		this.scrobbling = false;

		//Create player audio element
		console.log("Creating player element");
		this.audioElement = document.createElement('audio');
		this.audioElement.setAttribute("preload", "auto");
		this.audioElement.autobuffer = true;
		
		//Add player source and properties to element
		console.log("Adding player source");
		var source1 = document.createElement('source');
		source1.type = 'audio/mpeg';
		source1.src = 'http://tstv-stream.tsm.utexas.edu:8000/kvrx_livestream';
		this.audioElement.appendChild(source1);
		
		//Load the player
		console.log("Loading player");
		this.audioElement.load;
	}
	play() {
		//Set scrobbling to true so we can scrobble tracks played.
		console.log("Playing the tunes");
		this.scrobbling = true;
		
		//Play the audio element, scrobble every 10 seconds
		this.audioElement.play();
		setInterval(scrobble, 10000)
	}
	pause() {
		//Turn off scrobbling to prevent accidental scrobbles, pause the audio
		console.log("Pausing the tunes");
		this.scrobbling = false;
		this.audioElement.pause();
	}
}

//Create new instance of the KVRX player
console.log("Instantiating new player class");
var player = new KVRXPlayer();

//Store last track played to prevent multiple scrobbles
var lastTrack = {};
//Scrobbles track being played
function scrobble() {

	//Gets song name and artist of track playing
    var currTrack = {};
    var song = $.get("http://kvrx.org/index.php", function(data) {
        currTrack['song'] = data.substring(data.indexOf('<span id="track-name">') + 22, data.indexOf('</span><span id="artist-name">'));
        currTrack['artist'] = data.substring(data.indexOf('<span id="artist-name">') + 23, data.indexOf('</span><span id="album-name">'));
    });

    //Current issue - lastTrack and currTrack aren't really working??
    //I can console.log(currTrack) but stringifying it returns {}??
    //Setting lastTrack to currTrack only works sometimes??

    /*
    console.log(currTrack, lastTrack)
    console.log(JSON.stringify(currTrack))
    console.log(JSON.stringify(lastTrack))
    console.log(JSON.stringify(currTrack) == JSON.stringify(lastTrack), JSON.stringify(currTrack) === JSON.stringify(lastTrack))
	lastTrack = currTrack;

	//Check to make sure we're scrobbling and that there's a new track going on
	if (KVRXPlayer.scrobbling && currTrack != lastTrack) {
		console.log("Scrobble: ", song, " - ", artist);
		//CODE HERE TO SCROBBLE
		//Set last track to current track
		lastTrack = currTrack;
	}
	*/
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