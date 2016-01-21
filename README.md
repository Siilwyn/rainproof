# rainproof

## Quick start
Get the dependencies:
`npm install` & `npm install --only='dev'`

Get the needed libaries:
`npm run libs`

Fire it up:
`npm start`

## Project Structure
- dist  
*Output from building.*
- src
  - assets  
  *Fonts, images and JSON data.*
  - partials  
  *Re-usable parts that can be included and core styling & helpers.*
  - views  
  *Partials combined to a page.*

## Build process
Using [mustache.js](https://github.com/janl/mustache.js) for templating to enable the use of partials. We wrote our own JS to process all needed files to pass to mustache.js at `mustache-build.js`.
