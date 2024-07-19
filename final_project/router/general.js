const express = require('express');
const db = require('./booksdb.js');
const { default: axios } = require('axios');
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

function search(col, it, res) {
    if (col === '/') return res.status(200).json({ books: db });
    else if (col === 'review' && db.hasOwnProperty(it))
        return res.status(200).json(db[it].reviews);
    else {
        let result = {};
        if (col === 'isbn') Object.keys(db)
            .filter(id => String(id).indexOf(it) > -1)
            .forEach(id => result[id] = db[id])
            ;
        else {
            for (const id in db) {
                if (Object.hasOwnProperty.call(db, id)) {
                    if (String(db[id][col]).indexOf(it) > -1) {
                        result[id] = db[id]
                    }
                }
            }
        }
        if (Object.keys(result).length)
            return res.status(200).json(result);
        else return res.status(404).json({ message: 'Not Found' })
    }
}

public_users.post("/register", (req, res) => {
    //Write your code here
    const db = isValid(req.body.username);
    let note = 'is not valid (2 to 8 characters, lowercase or numbers)'
        , code = 401
        ;
    if (db === 0) note = 'is unavailable';
    else if (db === 1) {
        code = 200;
        users.push({
            username: req.body.username,
            password: req.body.password
        });
        note = 'successfully registered, you can login'
    }
    return res.status(code).json({ message: `${req.body.username} ${note}` })
});

// Get the book list available in the shop
public_users.get('/', async function (req, res) {
    //Write your code here
    return await search('/', null, res)
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn', function (req, res) {
    //Write your code here
    const request = new Promise((resolve) => {
        (async function () {
            const response = await search('isbn', req.params['isbn'], res);
            resolve(response)
        })()
    });
    request.then(result => { return result })
});

// Get book details based on author
public_users.get('/author/:author', function (req, res) {
    //Write your code here
    const request = new Promise((resolve) => {
        (async function () {
            const response = await search('author', req.params['author'], res);
            resolve(response)
        })()
    });
    request.then(result => { return result })
});

// Get all books based on title
public_users.get('/title/:title', function (req, res) {
    //Write your code here
    const request = new Promise((resolve) => {
        (async function () {
            const response = await search('title', req.params['title'], res);
            resolve(response)
        })()
    });
    request.then(result => { return result })
});

//  Get book review
public_users.get('/review/:isbn', function (req, res) {
    //Write your code here
    return search('review', req.params['isbn'], res)
});

module.exports.general = public_users;
