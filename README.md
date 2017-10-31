# LIRI Bot

### Overview

The following will provide an overview of how to create a '_Language_ _Interpretation_ _and_ _Recognition_ _Interface_' command line node app that takes in parameters and gives you back data.

### Getting started

1. LIRI will display your latest tweets and have access to your spotify account. Please make alias accounts!

2. To retrieve the data that will power this app, you'll need to send requests to the Twitter, Spotify and OMDB APIs. It's recommended that you look over the documentation provided and create your own access keys for/with each service.

* [Twitter](https://www.npmjs.com/package/twitter)

* [Spotify](https://www.npmjs.com/package/node-spotify-api)

* [Request](https://www.npmjs.com/package/request)

* You'll use Request to grab data from the [OMDB API](http://www.omdbapi.com).

3.  The app, liri.js, is designed to take in one of the following commands:

### LIRI Commands

#### COMMAND LIST

_**`my-tweets`**_

_**`spotify-this-song`**_

_**`movie-this`**_

_**`do-what-it-says`**_


1. `node liri.js my-tweets`

* This will show the last 20 tweets and when they were created at in the user's terminal/bash window.

2. `node liri.js spotify-this-song '<song name here>'`

* This will show the following information about the first 3 songs that generate from the user's search term

* Artist(s)

* The song's name

* A preview link of the song from Spotify

* The album that the song is from

* If no song is provided then the program will default to "Brand New Key" by Melanie.


3. `node liri.js movie-this '<movie name here>'`

* This will output the following information to the user's terminal/bash window:

```
* Title of the movie.
* Year the movie came out.
* IMDB Rating of the movie.
* Rotten Tomatoes Rating of the movie.
* Country where the movie was produced.
* Language of the movie.
* Plot of the movie.
* Actors in the movie.
```

* If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'

4. `node liri.js do-what-it-says`

* Using the `fs` Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.

* It should run `spotify-this-song` for "I Want it That Way," as follows from the text in `random.txt`.


### Logging

* In addition to logging the data to the terminal/bash window,  the data is output to `log.txt`.





