require("dotenv").config();
var Spotify = require('node-spotify-api');
var keys = require("./keys.js");
var spotify =  new Spotify(keys.spotify);
var axios = require("axios");
var moment = require("moment");

// --------------SPOTIFY------------
function searchSpotify() {
if (process.argv.slice(3).join(" ") === "undefined") {
    spotify
    .search({ type: 'track,artist', query: "the sign base", limit: 1 })
    .then(function(response) {
        console.log(response.tracks.items[0].artists[0].name);
            console.log(response.tracks.items[0].album.artists[0].name);
        })
        .catch(function(err) {
            console.log(err);
        });
    }
    else {
        spotify
        .search({ type: 'track,artist', query: process.argv[3], limit: 1 })
        .then(function(response) {
            console.log(response.tracks.items[0].artists[0].name);
            console.log(response.tracks.items[0].album.artists[0].name);
        })
        .catch(function(err) {
            console.log(err);
        }); 
    }
}
  // --------BANDS IN TOWN---------
function searchBandsInTown() {
        axios.get("https://rest.bandsintown.com/artists/" + process.argv[3] + "/events?app_id=codingbootcamp")
        .then(function(response) {
            console.log("Venue: " + response.data[0].venue.name);
            console.log("Location: " + response.data[0].venue.city + ", " + response.data[0].venue.region + ", " + response.data[0].venue.country);
            console.log("Date: " + moment(response.data[0].datetime).format("MM/DD/YYYY"));
        })
        .catch(function(error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log("---------------Data---------------");
                console.log(error.response.data);
                console.log("---------------Status---------------");
                console.log(error.response.status);
                console.log("---------------Status---------------");
                console.log(error.response.headers);
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an object that comes back with details pertaining to the error that occurred.
                console.log(error.request);
            }
        });
}
    //  ------------OMBD------------
function searchOmdb() {

    if (process.argv[3] === "undefined") {
        axios.get("http://www.omdbapi.com/?i=tt0485947&y=&plot=short&apikey=trilogy")
        .then(
            function(response) {
                console.log(response.data);
                console.log("Movie name: " + response.data.Title);
                console.log("Release Year: " + response.data.Year);
                console.log("IMDB rating: " + response.data.imdbRating);
                console.log("Rotten Tomatoes rating: " + response.data.Ratings[1].Value);
                console.log("Country of production: " + response.data.Country);
                console.log("Language: " + response.data.Language);
                console.log("Plot summary: " + response.data.Plot);
                console.log("Actors: " + response.data.Actors);
            })
            .catch(function(error) {
                if (error.response) {
                    // The request was made and the server responded with a status code
                    // that falls out of the range of 2xx
                    console.log("---------------Data---------------");
                    console.log(error.response.data);
                    console.log("---------------Status---------------");
                    console.log(error.response.status);
                    console.log("---------------Status---------------");
                    console.log(error.response.headers);
                } else if (error.request) {
                    // The request was made but no response was received
                    // `error.request` is an object that comes back with details pertaining to the error that occurred.
                    console.log(error.request);
                }
            });
    } 
    else {      
        axios.get("http://www.omdbapi.com/?t=" +process.argv.slice(3).join(" ") + "&y=&plot=short&apikey=trilogy")
            .then(function(response) {
                console.log("Movie name: " + response.data.Title);
                console.log("Release Year: " + response.data.Year);
                console.log("IMDB rating: " + response.data.imdbRating);
                console.log("Rotten Tomatoes rating: " + response.data.Ratings[1].Value);
                console.log("Country of production: " + response.data.Country);
                console.log("Language: " + response.data.Language);
                console.log("Plot summary: " + response.data.Plot);
                console.log("Actors: " + response.data.Actors);
            })
            .catch(function(error) {
                if (error.response) {
                    // The request was made and the server responded with a status code
                    // that falls out of the range of 2xx
                    console.log("---------------Data---------------");
                    console.log(error.response.data);
                    console.log("---------------Status---------------");
                    console.log(error.response.status);
                    console.log("---------------Status---------------");
                    console.log(error.response.headers);
                } else if (error.request) {
                    // The request was made but no response was received
                    // `error.request` is an object that comes back with details pertaining to the error that occurred.
                    console.log(error.request);
                }
    });
    }
}
        //   ------------Other----------------
function searchFs() {
            spotify
            .search({ type: 'track', query: process.argv[3]})
            .then(function(response) {
                console.log(response);
            })
            .catch(function(err) {
                console.log(err);
            });
        }
    
if (process.argv[2] === "spotify-this-song") {
    searchSpotify();
}
else if (process.argv[2] === "concert-this") {
    searchBandsInTown();
}
else if (process.argv[2] === "movie-this") {
    searchOmdb();
}
else if (process.argv[2] === "do-what-it-says") {
    searchFs();
}
else {
    console.log("Please choose something to do");
}
