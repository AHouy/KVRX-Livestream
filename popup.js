function slugify(text) {
    return text.toString().toLowerCase()
        .replace(/\s+/g, '-')           // Replace spaces with -
        .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
        .replace(/\-\-+/g, '-')         // Replace multiple - with single -
        .replace(/^-+/, '')             // Trim - from start of text
        .replace(/-+$/, '');            // Trim - from end of text
}

var getJSON = function (url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'json';
    xhr.onload = function () {
        var status = xhr.status;
        if (status === 200) {
            callback(null, xhr.response);
        } else {
            callback(status, xhr.response);
        }
    };
    xhr.send();
};

//Updates song, artist, album, and album art tags from KVRX website
function updateTags() {
    var homepage = getJSON("https://kvrx.org/now_playing/track", function (err, data) {
        document.getElementById('song').innerText = data.track;
        document.getElementById('artist').innerText = data.artist;
        document.getElementById('album').innerText = data.album;
        if (data.show != 'Automation')
            document.getElementById('show').innerHTML = "<a href='http://www.kvrx.org/show/" + slugify(data.show) + "'>" + data.show + "</a>";
        else
            document.getElementById('show').innerHTML = "";
    });
}

//Runs scripts once main page is loaded
document.addEventListener('DOMContentLoaded', function () {
    //Update tags on load
    updateTags();

    setInterval(function () {
        updateTags();
    }, 3000);

    //Create variables for play and pause buttons
    var playButton = document.getElementById('livestreamlisten'),
        stopButton = document.getElementById('livestreamstop');

    //If play button is pressed, send to background.js via message
    playButton.addEventListener('click', function () {
        playButton.style.display = 'none';
        stopButton.style.display = 'block';
        chrome.extension.sendMessage({ action: "play" })
    });

    //If pause button is pressed, send to background.js via message
    stopButton.addEventListener('click', function () {
        playButton.style.display = 'block';
        stopButton.style.display = 'none';
        chrome.extension.sendMessage({ action: "pause" })
    });

    var player = chrome.extension.getBackgroundPage().player.audioElement;
    // check if currently playing
    if (player.paused != undefined && !player.paused) {
        playButton.style.display = 'none';
        stopButton.style.display = 'block';
    }
});