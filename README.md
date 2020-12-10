# House Points Dashboard for Coding Bootcamps

## Introduction

The house points dashboard app was developed by Hannah A. Patellis and Cj Jordan for the August 2018 Georgia Institute of Technology Web Application Development Coding Bootcamp. 

This implementation was forked from and updated by Kieran Anthony for use with the University of Minnesota.

Hannah and Cj decided to split the class into Harry Potter-themed "houses" and keep points to give students an incentive to do things like...

* Show up to office hours (+1 point for each student from a house to show up on time for office hours)
* Give an exceptional answer during class
* Help other students
* Form study groups and post photos as proof (+1 point per student to show up, for example)

The idea started to snowball as they gave the houses nerdy coding pun names, house crests, and the addition of a stuffed owl awarded to the house that earned the most points in that week. Originally if they got the owl that house would get a 24 hour extention on their homework for that week.

They have found that this really boosted moral in their class and we hope it does the same for your class.

You are free to use the house crest artwork and our house names. Just attribute if asked, don't try to pass it off as your own, et cetera.

## Setting it up

The application is made to run on Heroku with a Mongo Atlas database.

* Clone this repo
* Run `npm install` or `yarn install`
* Create a local `.env` file with the following values:
  * `MONGODB_URI` (recommended)
    * Consider using Mongo Atlas
  * `PASSCODE` (required)
    * This will be your password on localhost
* Run `node seedDB.js` to generate the database
  * If you provided the `MONGODB_URI` value this should populate the deployed MongoDB.
* Create a Heroku app and provision it with `MONGODB_URI` and `PASSCODE` Config Variables
* Deploy to Heroku

## The Database

The Database is set up to hold 3 collections. `Houses`, `Tokens`, and `Logs`. They are as below:

```
"House": {
    "house" : "House Name",
    "points" : 0,
    "weekpoints" : 0,
    "owl" : false,
    "image" : "house.png",
    "owlimage" : "house_owl.png"
}
```
The `House` collection is designed to create individual houses and keep track of their points, possession of the owl, and other information.
```
"Token": {
    "token" : "Token String",
    "expires" : 123456789.0
}
```
The `Token` collection is designed to keep track of existing token strings, and their converted expiration times.
```
"Log": {
    "points" : 0,
    "house" : "House Name",
    "ts" : "Thu Nov 26 2020 12:00:00 GMT-0600 (Central Daylight Time)"
}
```
The `Log` collection is designed to keep track of changes to House Points.

`seedDB.js` is a file designed to set up all of the information needed to begin a fresh installation of this application. This application will override the current house data with initialized data.

## Features

#### The pages

#### Login and users

##### Hashing a password

There is no create a user feature in this application. If you want to add a user, you need to take a few steps.

1. Uncomment the hashing API route from `server.js` to make the hashing function available

2. Use an application like Postman to make a POST request to `localhost:3001/api/hash` with a `password` field set to the password you want to hash

![Make a POST request to this address with this field in the request body](images/postman_hash.png)

3. Send the POST request and you'll recieve the hashed password in the body of the response in JSON format

##### Add a new user in the database

After you have hashed a password, make a new user document in your Mongo database's "users" collection.

The document should include a `user` field and a `password` field which should contain the hash you got from `localhost:3001/api/hash`.

![Use Robo 3T or something similar to add a new document to the users collection](images/add_user.png)

##### Enable user support

By default the application's login page (`/login` route) does not have a username field and logs in using the default username `user`. So to make multiple accounts available, you need to make a change to the front-end code.

1. In `/client/src/pages/Login/Login.js` first change the state property `username` to a blank string. By default it is set to `user` (the default user account made with the `seedDB.js` file) so that every time the submit button is selected the authentication request is made with the username `user`.

![Change state so username is a blank string](images/login_user_state.png)

2. In the same file, uncomment the username field div so that the user has a place to enter the username.

![Uncomment the username field divs](images/login_commentedout.png)

#### Keeping count of points and house information

#### Keeping count of points in a given timeframe (like a week)

#### Keeping track of who has the owl