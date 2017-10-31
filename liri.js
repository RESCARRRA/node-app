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
		console.log("==================================" + "\r\n" + " *****    WELCOME to LIRI   *****" +
			"\r\n" + "==================================" + "\r\n" + "\r\n" +
			"Please read the following instructions about how to structure & format " + "\r\n" +
			"your command, so LIRI can process your request." + "\r\n" + "\r\n" + "\r\n" +
			"To start, preface each request with 'node liri.js' followed by your <command> " + "\r\n" +
			"plus <specifics to your search>'" + "\r\n" + "\r\n" +
			"Check out the list of LIRI commands with properly formatted examples below! " + "\r\n" +
			"\r\n" + "~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~" + "\r\n" + "\r\n" + "1. Twitter Command" + "\r\n" +
			"Get the last 20 tweets by using 'my-tweets'" + "\r\n" +
			"    --> ex. request = 'node liri.js my-tweets '<your twitter name>' " + "\r\n" + "\r\n" +
			"2. Spotify Command" + "\r\n" +
			"Search a song title & get 3 songs matching your search by using 'spotify-this-song'" + "\r\n" +
			"    --> ex. request = 'node liri.js spotify-this-song '<song name here>' " + "\r\n" + "\r\n" +
			"3. Movie Command" + "\r\n" +
			"Search a movie title & get details matching your search by using 'movie-this'" + "\r\n" +
			"    --> ex. request = 'node liri.js movie-this '<movie name here>' " + "\r\n" + "\r\n" +
			"4. Random Command" + "\r\n" +
			"Give LIRI control and type 'do-what-it-says' and see what comes up! " + "\r\n" +
			"    --> ex. request = 'node liri.js do-what-it-says" + "\r\n" + "\r\n" +
			"==================================");
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
				var twitterResults = "\r\n" + " *-------------------------  TWEET No." + j +
					"  --------------------------*" + "\r\n" +
					"*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*" + "\r\n\r\n" +
					// Date of Tweet
					moment(data[i].created_at)
					.format('MMMM Do YYYY, h:mm:ss a') + "\r\n" + "\r\n" +
					// Author of Tweet
					"@" + data[i].user.screen_name + ": " +
					// Context of Tweet
					data[i].text + "\r\n\r\n";
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
			var movieResults = "\r\n" +
				"*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*" + "\r\n" +
				"*-----------------------------  MOVIE  ------------------------------*" + "\r\n" +
				//  Title of the movie.
				"* Title: " + movie.Title + "\r\n\r\n" +
				//  Year the movie came out.
				"* Release Date: " + movie.Year + "\r\n\r\n" +
				//  Actors in the movie.
				"* Actors: " + movie.Actors + "\r\n\r\n" +
				//  IMDB Rating of the movie.
				"* IMDB Rating: " + movie.imdbRating + "\r\n\r\n" +
				//  Rotten Tomatoes Rating of the movie.
				"* Rotten Tomatoes Rating: " + movie.Ratings[1].Value + "\r\n\r\n" +
				//  Country where the movie was produced.
				"* Countries: " + movie.Country + "\r\n\r\n" +
				//  Language of the movie.
				"* Language: " + movie.Language + "\r\n\r\n" +
				//  Plot of the movie.
				"* Plot: " + movie.Plot + " \r\n\r\n" +
				"*--------------------------------------------------------------------*" + "\r\n";
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
	var spot = require('./keys.js');
	var spotify = new Spotify({
		id: '1f1b3ecb9cd2456d87e63bdd81078f4a',
		secret: 'b1a723f8159c4b0ea6ec3e03511c33a2'
		// id: spot.id,
		// secret: spot.secret
	});
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
			var spotifyResults = "\r\n\r\n" + "*------------------------   * SONG # " + j +
				" *   --------------------------*" + "\r\n" +
				"*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*" + "\r\n\r\n" +
				//  Artist / Band Name
				"* Artist: " + songInfo[i].artists[0].name + "\r\n\r\n" +
				//  Song / Track Title
				"* Track: " + songInfo[i].name + "\r\n\r\n" +
				//  Album / Record Title
				"* Album: " + songInfo[i].album.name + "\r\n\r\n" +
				//  Link to Preview Track
				"* Preview: " + songInfo[i].preview_url + "\r\n";
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