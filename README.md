# LIRI Bot

### Overview

The following will provide an overview of how to create a '_Language_ _Interpretation_ _and_ _Recognition_ _Interface_' command line node app that takes in parameters and gives you back data.

### Getting started

1. To retrieve the data that will power this app, you'll need to send requests to the Twitter, Spotify and OMDB APIs. 
It's recommended that you look over the documentation provided and create your own access keys/token/etc.

2. Clone repo

3. Run 'npm install'

4. Run command 'node liri.js' followed by one of the LIRI command prompts below

**_See list of technologies used below..._**

### Tech Used
     
 _LIRI will display your latest tweets and have access to your spotify account. Again, PLEASE use your own accounts or make an alias!_

- [Node.js](https://nodejs.org/en/)- Download the latest version of Node 

- [Twitter](https://www.npmjs.com/package/twitter) - NPM Package

- [Spotify](https://www.npmjs.com/package/node-spotify-api) - NPM Package

- [Request](https://www.npmjs.com/package/request) - NPM Package
    - _Request is used to grab movie data from the [OMDB API](http://www.omdbapi.com)_

### LIRI Command List
#### _LIRI is designed to take in one of the following commands:_


_`my-tweets`_

_`spotify-this-song`_

_`movie-this`**_

_`do-what-it-says`_


__1. ```node liri.js my-tweets```__

* This will show the user their most recent 10-20 tweets and the timestamp upon submission (currently set to output dummy tweets) and when they were created in the user's terminal/bash window.

__2. ```node liri.js spotify-this-song '<song name here>'```__

* This will show the following information about the first 3 songs that generate from the user's search term

* Artist(s) Name.

* Album name.

* Track title.

* A link to where the user can preview the song.

* _If no song is provided then the program will default to "Brand New Key" by Melanie_


__3. ```node liri.js movie-this '<movie name here>'```__

* This will output the following information to the user's terminal/bash window:

```
* Movie Title
* Released Date
* Actors
* Country (origin production)
* Language
* IMDB Rating
* Rotten Tomatoes Rating
* Plot
```

* If the user doesn't type a movie in, LIRI will output data for the movie 'Mr. Nobody.'

__4. ```node liri.js do-what-it-says```__

* Using the `fs` Node package, LIRI will take the text inside of random.txt and then use it to call one of the above mentioned commands.

* ICurrently, it is set to run `spotify-this-song` for "I Want it That Way,".


### Logging

* In addition to logging the data to the user's terminal/bash window, the data is output to `log.txt`.





