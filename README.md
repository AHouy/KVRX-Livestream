#KVRX Livestream Listener

Listen to the KVRX Livestream without having to keep a tab open.
Thank you to Elliott Ashton for HTML/CSS support!

##TODO

###Short-term

* Add Facebook/Twitter/etc sharing
* Live update buttons to reflect whether or not stream is playing
* Add Last.fm scrobbling
* Add Spotify saving
* Add picture to extension description (in Chrome extensions)

###Long-term

* Add link to current playlist and DJ
* Add logging
* KVRX website redesign incoming - going to break extension labels/scrobbling/spotify saving probably
* Restructure into folders

##Changelog

####0.0.4

* Added changelog
* Cleaned up album text hyperlinks
* Added Scrobbling infrastucture
  * Currently logs unique track plays and time listened in background.js, but doesn't send to last.fm
* Restructured popup.js to reduce load on KVRX.org by only querying once per popup
* Restructured background.js to include KVRXPlayer() and Track() classes
* Updated jQuery