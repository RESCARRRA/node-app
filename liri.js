// Here we include the modules so to use in our LIRI-Node application.
var fs = require("fs");
var request = require("request");
var Spotify = require('node-spotify-api');
var liriCommand = process.argv[2];
// LIRI | Command List
// =================================================================================
// The switch-case will direct which command function to run based on user command input
switch (liriCommand) {
	case "my-tweets":
		myTweets();
		break;
	case "spotify-this-song":
		spotifySong();
		break;
	case "movie-this":
		movieThis();
		break;
	case "do-what-it-says":
		doWhatItSays();
		break;
		// Instructions for user
	default:
		console.log("");
		console.log("");
		console.log("");
		console.log("");
		console.log("");
		console.log(
			"*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*"
			+ "\n" +
			"*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*"
				+ "\n" + "     *****    WELCOME to LIRI   *****" + "\n" + 	
			"*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*" 
			+ "\n" +
			"*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*"
			+ "\n" +
			"Please read the following instructions about how to structure & format " + "\n" +
			"your command, so LIRI can process your request." + "\n" + "\n" + "\n" +
			"To start, preface each request with 'node liri.js' followed by your <command> " + "\n" +
			"plus <specifics to your search>'" + "\n" + "\n" +
			"Check out the list of LIRI commands with properly formatted examples below! " + "\n" +
			"\n" + "*******************" + "\n" + "\n" + "1. Twitter Command" + "\n" +
			"Get the last 20 tweets by using 'my-tweets'" + "\n" +
			"    --> ex. request = 'node liri.js my-tweets '<your twitter name>' " + "\n" + "\n" +
			"2. Spotify Command" + "\n" +
			"Search for a song & get 3 matching titles by using 'spotify-this-song'" + "\n" +
			"    --> ex. request = 'node liri.js spotify-this-song '<song name here>' " + "\n" + "\n" +
			"3. Movie Command" + "\n" +
			"Search a movie title & get details matching your search by using 'movie-this'" + "\n" +
			"    --> ex. request = 'node liri.js movie-this '<movie name here>' " + "\n" + "\n" +
			"4. Random Command" + "\n" +
			"Give LIRI control and type 'do-what-it-says' and see what comes up! " + "\n" +
			"    --> ex. request = 'node liri.js do-what-it-says" + "\n" + "\n" +
			"*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*");
		console.log("");

};
// Twitter | Command: 'my-tweets'
// =================================================================================
function myTweets() {
	var moment = require('moment');
	var keys = require("./keys.js");
	var Twitter = require('twitter');
	"user strict";
	var client = new Twitter(keys);
	var twitterUsername = process.argv[3];
	if (!twitterUsername) {
		twitterUsername = "oprah__rynfrey";
	}
	params = {
		screen_name: twitterUsername,
	};
	client.get("statuses/user_timeline/", params, function(err, data, response) {
		if (!err) {
			for (var i = 0; i < data.length; i++) {
				// console.log(response); 
				var j = (i + 1);
				var twitterResults = "\n" + " *-------------------------  TWEET No." + j +
					"  --------------------------*" + "\n" +
					"*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*" + "\n\n" +
					// Date of Tweet
					moment(data[i].created_at)
					.format('MMMM Do YYYY, h:mm:ss a') + "\n" + "\n" +
					// Author of Tweet
					"@" + data[i].user.screen_name + ": " +
					// Context of Tweet
					data[i].text + "\n\n";
				console.log(twitterResults);
				logtxt(twitterResults);
			}
		} else {
			console.log("Error: " + err);
		};
	});
};
// OMDB | Command: 'movie-this'
// =================================================================================
// 	(Don't forget to run "npm install request" in this folder first!)
function movieThis() {
	var movieArgv = process.argv[3];
	if (!movieArgv) {
		movieArgv = "Mr Nobody";
	}
	var movieQuery = encodeURIComponent(movieArgv);
	// console.log(movieQuery);
	var movieRequest = ("http://www.omdbapi.com/?&apikey=40e9cece&t=" + movieQuery)
	// console.log(movieRequest);
	// Then run a request to the OMDB API with the movie specified
	request(movieRequest, function(err, response, body) {
		// If the request is successful (i.e. if the response status code is 200)
		if (!err && response.statusCode === 200) {
			var movie = JSON.parse(body);
			// console.log(movie);
			// Parse the body for movie data
			var movieResults = "\n" +
				"*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*" + "\n" +
				"*-----------------------------  MOVIE  ------------------------------*" + "\n" +
				//  Title of the movie.
				"* Title: " + movie.Title + "\n\n" +
				//  Year the movie came out.
				"* Release Date: " + movie.Year + "\n\n" +
				//  Actors in the movie.
				"* Actors: " + movie.Actors + "\n\n" +
				//  IMDB Rating of the movie.
				"* IMDB Rating: " + movie.imdbRating + "\n\n" +
				//  Rotten Tomatoes Rating of the movie.
				"* Rotten Tomatoes Rating: " + movie.Ratings[1].Value + "\n\n" +
				//  Country where the movie was produced.
				"* Countries: " + movie.Country + "\n\n" +
				//  Language of the movie.
				"* Language: " + movie.Language + "\n\n" +
				//  Plot of the movie.
				"* Plot: " + movie.Plot + " \n\n" +
				"*--------------------------------------------------------------------*" + "\n";
			console.log(movieResults);
			logtxt(movieResults);
		} else {
			console.log(err);
			return;
		}
	});
};
//  Spotify | Command: 'spotify-this-song'
// ============================================================================
function spotifySong(dWISRequest) {
	var codes = require('./ids.js');
	var spotify = new Spotify(codes);
	var songName = process.argv[3] || dWISRequest;
	if (!songName) {
		songName = "Brand New Key";
	}
	var tune = songName;
	spotify.search({
		type: 'track',
		query: tune
	}, function(err, data) {
		var songInfo = data.tracks.items
		for (var i = 0; i < 3; i++) {
			var j = (i + 1);
			var spotifyResults = "\n\n" + "*------------------------   * SONG # " + j +
				" *   --------------------------*" + "\n" +
				"*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*" + "\n\n" +
				//  Artist / Band Name
				"* Artist: " + songInfo[i].artists[0].name + "\n\n" +
				//  Song / Track Title
				"* Track: " + songInfo[i].name + "\n\n" +
				//  Album / Record Title
				"* Album: " + songInfo[i].album.name + "\n\n" +
				//  Link to Preview Track
				"* Preview: " + songInfo[i].preview_url + "\n";
			console.log(spotifyResults);
			logtxt(spotifyResults);
		};
		if (err) {
			return console.log('Error occurred: ' + err);
		};
	});
};
// FS | Command: 'do-what-it-says'
// =================================================================================
function doWhatItSays() {
	fs.readFile("random.txt", "utf8", function(err, data) {
		if (!err) {
			dWISResults = data.split(",");
			var dWISRequest = dWISResults[1];
			// console.log(dWISRequest);			
			spotifySong(dWISRequest);
		} else {
			console.log("Error: " + err);
		}
	});
};
// LOGTXT | appends logresults to log.txt file
// =================================================================================
function logtxt(logResults) {
	fs.appendFile("log.txt", logResults, (err) => {
		if (err) {
			throw err;
		}
	});
};