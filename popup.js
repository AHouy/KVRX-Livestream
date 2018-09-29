function slugify(text) {
    return text.toString().toLowerCase()
        .replace(/\s+/g, '-')           // Replace spaces with -
        .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
        .replace(/\-\-+/g, '-')         // Replace multiple - with single -
        .replace(/^-+/, '')             // Trim - from start of text
        .replace(/-+$/, '');            // Trim - from end of text
}

//Updates song, artist, album, and album art tags from KVRX website
function updateTags() {
    var homepage = $.getJSON("http://kvrx.org/now_playing/track", function (data) {
        document.getElementById('song').innerText = data.track;
        document.getElementById('artist').innerText = data.artist;
        document.getElementById('album').innerText = data.album;
        if (data.show != 'Automation')
            document.getElementById('show').innerHTML = "<a href='http://www.kvrx.org/show/" + slugify(data.show) + "'>" + data.show + "</a>";
        else
            document.getElementById('show').innerHTML = "";

        document.getElementById('twitter-share').href = "https://twitter.com/home?status=Listening to " + data.track + " by " + data.artist + " on @KVRX!";
    });
    // var album_info = $.getJSON("http://kvrx.org/now_playing/album_info", function(data) {
    //Put default album art, for the time being this is 
    // if (data.album_artwork == '')
    document.getElementById('albumart').innerHTML = "<img src='sites/all/modules/tsm_kvrx_now_playing/images/default_album_art.png'></img>";
    // else
    // document.getElementById('albumart').innerHTML = data.album_artwork;

    //see if we need to add any links
    // if (data.album_href != '') {
    // var link = '<a href="' + data.album_href + '">' + $("#albumart").text() + '</a>';
    // $("#album").html(link);
    // }
    // });
}

//Runs scripts once main page is loaded
document.addEventListener('DOMContentLoaded', function () {
    //set up a timeout to check for new tracks
    setInterval(function () {
        trackUpdate();
    }, 3000);

    //helper function that actually does the work
    function trackUpdate() {
        //grab the tracks
        var n = new Track;
        n.getNewTrack();
    };

    //object for the tracks
    function Track(title, artist, album, show) {
        this.Title = title;
        this.Artist = artist;
        this.Album = album;
        this.Show = show;

        Track.prototype.sameAs = function (other) {
            //make sure its not a track
            if (!(other instanceof Track))
                return false;

            var titleSame = false;
            var artistSame = false;
            var albumSame = false;
            var showSame = false;

            //perform the checks
            if (this.Title == other.Title)
                titleSame = true;

            if (this.Artist == other.Artist)
                artistSame = true;

            if (this.Album == other.Album)
                albumSame = true;

            if (this.Show == other.Show)
                showSame = true;

            return (titleSame && artistSame && albumSame && showSame);
        };

        //setter functions
        Track.prototype.setArtist = function (s) {
            this.Artist = s;
        };
        Track.prototype.setTitle = function (s) {
            this.Title = s;
        };
        Track.prototype.setAlbum = function (s) {
            this.Album = s;
        };
        Track.prototype.setShow = function (s) {
            this.Show = s;
        };

        //getter functions
        Track.prototype.getArtist = function () {
            return this.Artist;
        };
        Track.prototype.getTitle = function () {
            return this.Title;
        };
        Track.prototype.getAlbum = function () {
            return this.Album;
        };
        Track.prototype.getShow = function () {
            return this.Show;
        };

        Track.prototype.getNewTrack = function () {
            var n = this;
            $.getJSON('http://kvrx.org/now_playing/track', function (data) {
                //build out the object
                n.Artist = data.artist;
                n.Title = data.track;
                n.Album = data.album;
                n.Show = data.show;

                //get the current one
                var c = new Track;
                c.getCurrentTrack();

                //only display the update if they aren't the same
                if (!n.sameAs(c)) {
                    $(".nowplaying").fadeOut(400, function () {
                        setTimeout(function () {
                        }, 400);

                        //swap the variables
                        n.fillTracks();

                        $(".nowplaying").fadeIn(400);
                    });
                }
            });
        };

        Track.prototype.getCurrentTrack = function () {
            this.setTitle($("#song").text());
            this.setArtist($("#artist").text());
            this.setAlbum($("#album").text());
            this.setShow($("#show").text());
        };

        //helper function to replace the tracks
        Track.prototype.fillTracks = function () {
            //action bar
            document.getElementById('song').innerText = this.Title;
            document.getElementById('artist').innerText = this.Artist;
            document.getElementById('album').innerText = this.Album;
            if (this.Show != 'Automation')
                document.getElementById('show').innerHTML = "<a href='http://www.kvrx.org/show/" + slugify(this.Show) + "'>" + this.Show + "</a>";
            else
                document.getElementById('show').innerHTML = "<a href='http://kvrx.org'>KVRX</a>";

            //flip the image
            // $.getJSON('/now_playing/album_info', function (data) {
            //     $("div#now-playing-badge div#album-artwork").html(data.album_artwork);
            //
            //     //see if we need to add any links
            //     if (data.album_href != '') {
            //         var link = '<a href="' + data.album_href + '">' + $("div#now-playing span#album-name").text() + '</a>';
            //         $("div#now-playing span#album-name").html(link);
            //         $("div#now-playing-badge div#album-name").html(link);
            //     }
            // });
        };
    };

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

});
