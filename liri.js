require("dotenv").config();
var Spotify = require('node-spotify-api');
var keys = require("./keys.js");
var spotify =  new Spotify(keys.spotify);
var axios = require("axios");
var moment = require("moment");

let doWhat = process.argv[2];

if (doWhat === "spotify-this-song") {
    let withWhat = process.argv.slice(3).join(" ");
            if (withWhat === "undefined" ) {
            withWhat === "The Sign"};
    spotify
        .search({ type: 'track,artist', query: withWhat, limit: 1 })
        .then(function(response) {
            console.log(response);
            console.log(response.tracks);
            console.log("hello");
            console.log(response.tracks.items[0].artists[0].name);
            console.log(response.tracks.items[0].album.artists[0].name);
            // console.log(response.tracks.items);
            // // console.log(response.tracks.items.artists);
      
        })
        .catch(function(err) {
            console.log(err);
        });
}

//     else if (process.argv[2] === "concert-this") {
//         axios.get("https://rest.bandsintown.com/artists/" + process.argv[3] + "/events?app_id=codingbootcamp").then(
//           function() {
//             console.log(response.data);
//             console.log(JSON.parse(body)[0].venue.name);
//         }
//         );
//     }
//     else if (process.argv[2] === "movie-this") {
//         axios.get("http://www.omdbapi.com/?t=process.argv[3]&y=&plot=short&apikey=trilogy").then(
//         function(response) {
//             console.log("The movie's rating is: " + response.data.imdbRating);
//         })
//         .catch(function(error) {
//             if (error.response) {
//             // The request was made and the server responded with a status code
//             // that falls out of the range of 2xx
//             console.log("---------------Data---------------");
//             console.log(error.response.data);
//             console.log("---------------Status---------------");
//             console.log(error.response.status);
//             console.log("---------------Status---------------");
//             console.log(error.response.headers);
//             } else if (error.request) {
//             // The request was made but no response was received
//             // `error.request` is an object that comes back with details pertaining to the error that occurred.
//                 console.log(error.request);
//             }
//         });
//       }
//     else if (process.argv[2] = "do-what-it-says") {
//         spotify
//         .search({ type: 'track', query: process.argv[3]})
//         .then(function(response) {
//             console.log(response);
//         })
//         .catch(function(err) {
//             console.log(err);
//         });
//     }
// }

