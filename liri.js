require("dotenv").config();

let request = require("request");


const moment = require("moment");
const fs = require("fs");

var keys = require("./keys.js");

const Spotify = require("spotify-web-api-node");
var spotify = new Spotify(keys.spotify);

let omdb = (keys.omdb);
let bandsintown = (keys.bandsintown);

let userInput = process.argv[2];
let userQuery = process.argv.slice(3).join(" ");

function userControl(userInput, userQuery) {
    switch (userInput) {
        case "concert-this":
            concertThis();
            break;
        case "spotify-this-song":
            spotifyThisSong();
            break;
          case "movie-this":
                movieThis();
                break;
       case "do-what-it-says":
            doWhatItSays(userQuery);
            break;
            default:
        console.log("This is cool!");
        break;
    }
}

userControl(userInput, userQuery);
function concertThis() {
    console.log ("Searching for shows: ")
    request (`"https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"` + userQuery + bandsintown, function (error, response, body){
        if (!error && response.statusCode === 200) {
            let userBand = JSON.parse(body);
        if (userBand.length > 0) {
            for (i = 0; i < 1; i ++) {
                console.log(`\n\nArtist: ${userBand[i].lineup[0]} \nVenue: ${userband[i].venue.name}\nVenue Location: ${userBand[i].venue.latitude}, ${userBand[i].venue.longitude}\nVenue City: ${userBand[i].venue.city}, ${userBand[i].venue.country}`)
                let concertDate = moment (userBand[i].datetime).format("MM/DD/YYYY hh:00 A");
                console.log(`Date and Time: ${concertDate}\n\n - - - -`);
            };
        } else {
            console.log("Band or concert not found!!");
        };
        };
    });
};
function spotifyThisSong() {
    console.log (`\n Searching for "${userQuery}"`);
    if (!userQuery) {
        userQuery = "the sign ace of base"
    };
    spotify.search({
        type:'track',
        query: userQuery,
        limit: 1
    }, function (error, data){
        if (error) {
            return console.log('Error occured: ' + error);
        }
        let spotifyArr = data.tracks.items;

        for (i=0; i < spotifyArr.length; i++) {
            console.log(`\n\n Artist: ${data.tracks.items[i].album.artists[0].name} \nSong: ${data.tracks.items[i].name}\nAlbum: ${data.tracks.items[i].album.name}\nSpotify link: ${data.tracks.items[i].external_urls.spotify}\n\n`)
        };
    });
}

function movieThis(){
    console.log(`Searching for "${userQuery}"`);
    if (!userQuery){
        userQuery = "her";
    };
    request("http://www.omdbapi.com/?t=" + userQuery + "&apikey=86fe999c", function (error, response, body) {
        let userMovie = JSON.parse(body);
        let ratingsArr = userMovie.Ratings;
        if (ratingsArr.length > 2) {}
        if (!error && response.statusCode === 200) {
            console.log(`\n\n Title: ${userMovie.Title}\n Cast: ${userMovie.Actors}\nReleased: ${userMovie.Year}\nIMDB Rating: ${userMovie.imdbRating}\nRotten Tomatoes Rating: ${userMovie.Ratings[1].Value}\nCountry: ${userMovie.Country}\n Language: ${userMovie.Language}\nPlot: ${userMovie.Plot}\n\n`)
        } else {
            return console.log("Movie unable to be found. Error" + error)
        };
    })
};

function doWhatItSays() {
    fs.readFile("random.txt", "utf8", function (error, data){
        if (error) {
            return console.log(error);
        }
        let dataArr = data.split(",");
        userInput = dataArr[0];
        userQuery = dataArr[1];
        userControl(userInput, userQuery);
    });
};