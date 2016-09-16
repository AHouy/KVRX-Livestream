//Class for KVRX player
class KVRXPlayer {
	constructor() {
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
		console.log("Play message received");
		this.audioElement.play();
	}
	pause() {
		console.log("Stop message received");
		this.audioElement.pause();
	}
}
//Create new instance of the KVRX player
console.log("Instantiating new player class");
var player = new KVRXPlayer();

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
        }
});