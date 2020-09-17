const db = require("./db");
require('dotenv').config();

// Mongo connection
// "houses" stores the houses available, their names, images, points, and owl status
// "users" stores any users that can login
// "log" stores any individual point changes -- LOG IS NOT SEEDED
// "challenge" stores the current challenge

// HOUSES
const houseGH = {
    "house" : "GitHufflePuff",
    "master" : "",
    "points" : 0,
    "weekpoints" : 0,
    "owl" : false,
    "image" : "gh.png",
    "owlimage" : "gh_owl.png"
};
const houseRC = {
    "house" : "RavenClosure",
    "master" : "",
    "points" : 0,
    "weekpoints" : 0,
    "owl" : false,
    "image" : "rc.png",
    "owlimage" : "rc_owl.png"
};
const houseSI = {
    "house" : "SlytherIndent",
    "master" : "",
    "points" : 0,
    "weekpoints" : 0,
    "owl" : false,
    "image" : "siyc.png",
    "owlimage" : "siyc_owl.png"
};
const houseGD = {
    "house" : "GryffinDOM",
    "master" : "",
    "points" : 0,
    "weekpoints" : 0,
    "owl" : false,
    "image" : "gd.png",
    "owlimage" : "gd_owl.png"
};

db.houses.save(houseGH, (err, results) => {
    if (err) throw err;
    console.log("House Githufflepuff written");
});
db.houses.save(houseRC, (err, results) => {
    if (err) throw err;
    console.log("House Ravenclosure written");
});
db.houses.save(houseSI, (err, results) => {
    if (err) throw err;
    console.log("House Slytherindent written");
});
db.houses.save(houseGD, (err, results) => {
    if (err) throw err;
    console.log("House GryffinDOM written");
});

// USERS -- Desire to REMOVE Users from project. Use .env w/ basic password
// ?? TOKEN ??
// Default username is "user"
// Default password is "MERNmaster90"
const defaultUser = {
    "user" : "user",
    "password" : "password",
}
db.users.save(defaultUser, (err, results) => {
    if (err) throw err;
    console.log("Default user written");
});
