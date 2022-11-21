# React Pokedex

A single page app that lists all first generation Pokemon (ie: the first 150). The app communicates with the open source [PokeApi](https://pokeapi.co/) for all Pokemon-related data. All data requests are facilitated by [pokeapi-typescript](https://www.npmjs.com/package/pokeapi-typescript). Sprites are installed from [PokeAPI/sprites](https://github.com/PokeAPI/sprites).

Current Features:

- Pokemon are lazilly loaded as they scroll into view
- Clicking on any Pokemon card will open a modal with further details
- Users are able to filter Pokemon
- Users are able to favourite Pokemon

## Setup

1. `npm install` Please note that this can take some time as a large number of assets are downloaded. Download times vary, but can be up to 6 minutes.
2. `npm start`
   Runs the app in the development mode.\
   Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
