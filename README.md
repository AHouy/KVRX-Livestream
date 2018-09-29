# KVRX Livestream Listener

Listen to the KVRX Livestream without having to keep a tab open.
Thank you to Elliott Ashton for HTML/CSS support!

## About

This was really my first foray into learning how to make a Chrome extension. All the code is just simple HTML, CSS, and JavaScript, but it was my first time using jQuery and my first time having to structure things in the way Google wanted. The biggest challenge I faced was after I created the extension, I learned Chrome extensions don't allow inline JavaScript - so I had to add event listeners to my `popup.js` file which communicated with my `popup.js` file to create a backgrounded audio element.

## TODO

### Short-term

* Add Facebook/Twitter/etc sharing
* Live update buttons to reflect whether or not stream is playing
* Add Last.fm scrobbling
* Add Spotify saving

### Long-term

* Add link to current playlist and DJ
* Add logging
* ~KVRX website redesign incoming - going to break extension labels/scrobbling/spotify saving probably~
* Restructure into folders

