require("dotenv").config();
var Spotify = require('node-spotify-api');
var keys = require("./keys.js");
var spotify =  new Spotify(keys.spotify);
var axios = require("axios");
var moment = require("moment");
var fs = require('fs');

// --------------SPOTIFY------------
function searchSpotify() {
if (!process.argv[3]) {
    spotify
    .search({ type: 'track,artist', query: "the sign base", limit: 1 })
    .then(function(response) {
            console.log("+++++++++++++");
            console.log("Artist: " +response.tracks.items[0].artists[0].name);
            console.log("Song title: " +response.tracks.items[0].name);
            console.log("Preview link: " +response.tracks.items[0].preview_url);
            console.log("Album: " +response.tracks.items[0].album.name);
        })
        .catch(function(err) {
            console.log(err);
        });
    }
    else {
        spotify
        .search({ type: 'track,artist', query: process.argv.slice(3).join(" "), limit: 1 })
        .then(function(response) {
            console.log("+++++++++++++");
            console.log("Artist: " +response.tracks.items[0].artists[0].name);
            console.log("Song title: " +response.tracks.items[0].name);
            console.log("Preview link: " +response.tracks.items[0].preview_url);
            console.log("Album: " +response.tracks.items[0].album.name);
        })
        .catch(function(err) {
            console.log(err);
        }); 
    }
}
  // --------BANDS IN TOWN---------
function searchBandsInTown() {
        axios.get("https://rest.bandsintown.com/artists/" + process.argv.slice(3).join(" ") + "/events?app_id=codingbootcamp")
        .then(function(response) {
            console.log("+++++++++++++");
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

    if (!process.argv[3]) {
        axios.get("http://www.omdbapi.com/?i=tt0485947&y=&plot=short&apikey=trilogy")
        .then(
            function(response) {
                console.log("+++++++++++++");
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
                console.log("+++++++++++++");
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
        fs.readFile("random.txt", "utf8", function(err, data) {
            if (err) throw err;

            let dataArray = data.split(",");
                console.log(dataArray[1]);
                process.argv[3] = dataArray[1];
                searchSpotify();
            });        
        }

    function writeTextFile() {   
        fs.writeFile('consolefile.txt', console.log, function (err) {
        if (err) throw err;
        console.log("Saved");
});
}

function appendTextFile() {
    fs.appendFile('consolefile.txt', console.log, function (err) {
    if (err) throw err;
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
writeTextFile();
appendTextFile();
