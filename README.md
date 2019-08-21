# liri-node-app
Liri App

This app is a LIRI (Language Interpretation and Recognition Interface). It will use a command line requests and give back data.  
This app will be able to:
search Spotify to "spotify-this-song" which will give you title, artist and album information and a preview link.
search OMDB to "movie-this" which will give you a summary, language, release year, and rating information about a movie you choose,
search Bands in Town to "concert-this" which will give you concert date and location information about a band you choose,
and "do-what-it-says" which will read a separate text file, and pull the information contained in it to Spotify a song title.

To do this, this app uses node packages such as Node-Spotify-API, Axios, Moment, and DotEnv.

To run the app, the user must enter the following on the command line...
**node liri.js command choice** 
*(where command will be either "spotify-this-song", "movie-this", "concert-this" or "do-what-it-says" and choice will be the name of the movie/artist/song you choose.*

The entire code was authored by me. A demo of the app is located here:

https://drive.google.com/file/d/1dX0K5Gpu8WxOioX14ZcH_mrLO0Y0kAoS/view
