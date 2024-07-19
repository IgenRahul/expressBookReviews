const express = require('express');
const db = require('./booksdb.js');
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req, res) => {
    //Write your code here
    return res.status(300).json({ message: "Yet to be implemented" });
});

// Get the book list available in the shop
public_users.get('/', async function (req, res) {
    //Write your code here
    return res.status(200).json({ books: db });
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn', function (req, res) {
    //Write your code here
    let isbn = req.params.isbn;
    if (db.hasOwnProperty(isbn)) {

        let result = db[isbn];
        return res.status(200).json({
            result: result
        })
    }
    res.status(404).json({ message: 'Not Found' });
});

// Get book details based on author
public_users.get('/author/:author', function (req, res) {
    //Write your code here
    let author = req.params.author;
    let result;
    for(id in db){
        if(db[id]["author"] === author){
            result = db[id];
        }
    }
    if (result) {
        return res.status(200).json({
            result: result
        })
    }
    res.status(404).json({ message: 'Not Found' });
});

// Get all books based on title
public_users.get('/title/:title', function (req, res) {
    //Write your code here
    let title = req.params.title;
    let result;
    for(id in db){
        if(db[id]["title"] === title){
            result = db[id];
        }
    }
    if (result) {
        return res.status(200).json({
            result: result
        })
    }
    res.status(404).json({ message: 'Not Found' });
});

//  Get book review
public_users.get('/review/:isbn', function (req, res) {
    //Write your code here
    return res.status(300).json({ message: "Yet to be implemented" });
});

module.exports.general = public_users;
