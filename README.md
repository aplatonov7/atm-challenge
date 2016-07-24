# ATM challenge

Based on [this boilerplate](https://github.com/heartless7/react-redux-boilerplate).

Developed and tested in chrome 51.0.2704.103 m.

## Setup instructions

1. To install dependencies run "npm i"
2. To run the project use on of the following commands:
  * "npm run dev" to run in development mode
  * "npm start" to build and run in production mode

## Main idea and how to use this thing

The app structure is pretty straightforward - I used 1 container and 4 components to represent the ATM UI, and one
"duck" to represent the data flow of the ATM simulation. To start using the app, just click on the INSERT CARD button
on the right part of the ATM and follow the instructions on the screen. The PIN is set to 1234 (and could be
configured through the app/config.js file, as well as the preset withdraw options)

## Where would i go from there

I would definitely give the UI some love - it's pretty "spartan" as of now, since I was a little bit short on time
on this weekends. Also, tests for both React components and Redux module would be probably a great idea.