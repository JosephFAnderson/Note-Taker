const notes = require('express').Router();
const {v4 : uuidv4} = require('uuid');
const fs = require('fs');
const noteData = require('../db/db.json');

notes.get('/notes', (req, res) => {    
    fs.readFile('db/db.json', 'utf-8', (err, data) => {
        if(err){
            console.log(err);
        }
        res.send(data);
    })
})

notes.post('/notes', (req, res) => {
    const newNote = {
        title: req.body.title,
        text: req.body.text,
        id: uuidv4()
    }

    fs.readFile('db/db.json', 'utf-8', (err, data) => {
        if(err){
            console.log(err);
        }
        const noteArray = JSON.parse(data);
        noteArray.push(newNote);
        fs.writeFile('db/db.json', JSON.stringify(noteArray, null, 4), err => {
            err ? console.log(err) : console.log("File written successfully");
        })
    })
})

module.exports = notes;