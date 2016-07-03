//Creates audio element
var audioElement = document.createElement('audio');
audioElement.setAttribute("preload", "auto");
audioElement.autobuffer = true;

var source1 = document.createElement('source');
source1.type = 'audio/mpeg';
source1.src = 'http://tstv-stream.tsm.utexas.edu:8000/kvrx_livestream';
audioElement.appendChild(source1);

//Listens for messages
chrome.extension.onMessage.addListener(
    function(request, sender, sendResponse) {
        //Plays audio element if message is play
        if (request.action == "play"){
            audioElement.load;
            audioElement.play();
        //Pauses audio element if message is pause
        } else if (request.action == "pause") {
            audioElement.pause();
        }
});