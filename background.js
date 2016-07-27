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
		
		//Play the audio element, check to scrobble every 16 seconds
		this.audioElement.play();
		setInterval(checkScrobble, 16000)
	}
	pause() {
		//Turn off scrobbling to prevent accidental scrobbles, pause the audio
		console.log("Pausing the tunes");
		this.scrobbling = false;
		this.audioElement.pause();
	}
}

//Class Track holds a track defined by it's artist, song, and album
class Track {
	//Creates track with artist, song, and album
	constructor(artist, title, album) {
		this.artist = artist;
		this.song = title;
		this.album = album;
		//Time created is automatically populated with current time
		//Each track is not scrobbled by default
		this.timeCreated = new Date().getTime();
		this.scrobbled = false;
	}
	//Accessors - Self explanatory
	getSong() {
		return (this.song);
	}
	getArtist() {
		return (this.artist);
	}
	getAlbum() {
		return (this.album);
	}
	//Returns time in seconds since the time passed through to method
	getTimeListened(time) {
		return ((time - this.timeCreated) / 1000);
	}
	getScrobbled() {
		return (this.scrobbled);
	}
	//Changes track status to "scrobbled"
	//Log that track was scrobbled
	scrobbleTrack() {
		console.log("Scrobbled", this.getSong(), "-", this.getArtist())
		this.scrobbled = true;
	}
	//Methods
	//Checks to see if track, artist, and album are the same 
	equal(t2) {
		return (this.getSong() == t2.getSong() && this.getArtist() == t2.getArtist() && this.getAlbum == t2.getAlbum())
	}
}	

//Create new instance of the KVRX player
console.log("Instantiating new player class");
var player = new KVRXPlayer();

//Strips HTML tags from a string
function strip(html) {
   var tmp = document.createElement("DIV");
   tmp.innerHTML = html;
   return tmp.textContent || tmp.innerText || "";
}

//Scrobbles a track
function scrobble(track) {
	track.scrobbleTrack();
	//Check if logged in
	//Send to last.fm
}

//Store current track played to prevent multiple scrobbles
var currTrack = new Track(null, null, null);
//Scrobbles track being played
function checkScrobble() {
	//Gets song name and artist of track playing
	var tempTrack;
    $.get("http://kvrx.org/index.php", function(data) {
        var song = $(data).find("[id=track-name]")[0].innerText;
        	artist = $(data).find("[id=artist-name]")[0].innerText;
        	album = $(data).find("[id=album-name]")[0].innerText;
        	tempTrack = new Track(artist, song, album); //Possible err: scope of tempTrack

    	if (!tempTrack.equal(currTrack)) {
    		console.log("New track: ", tempTrack.song, " - ", tempTrack.artist)
    		currTrack = tempTrack;
    	} else {
    		var timeListened = currTrack.getTimeListened(new Date().getTime());
    		console.log("Listened to ", currTrack.getSong(), "for", timeListened, "seconds");
    		if (timeListened >= 30 && !currTrack.getScrobbled()) {
    			scrobble(currTrack);
    		}
    	}
    });
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