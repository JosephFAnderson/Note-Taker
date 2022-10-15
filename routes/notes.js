const notes = require('express').Router();
const {v4 : uuidv4} = require('uuid');
const { readFromFile, writeToFile, readAndWriteFile } = require('../helpers/fsutils');

// Return db.json data to client side to allow population of stored notes
notes.get('/notes', (req, res) => {
    readFromFile('db/db.json').then(data => res.json(JSON.parse(data)));
})

// Add newly saved note to db.json
notes.post('/notes', (req, res) => {
    const {title, text} = req.body;

    if (req.body){
        const newNote = {
            title: title,
            text: text,
            id: uuidv4()
        }

        readAndWriteFile('db/db.json', newNote);
        res.json('New note added')
    } else {
        res.errored('Error adding note');
    }
})

// Remove requested note from db.json
notes.delete('/notes/:id', (req, res) => {
    const id = req.params.id;

    if (req.params) {
        readFromFile('db/db.json')
            .then (data => {
                const noteArray = JSON.parse(data)
                for(let i = 0; i < noteArray.length; i++){
                    if(noteArray[i].id === id){
                        noteArray.splice(i, 1);
                        writeToFile('db/db.json', noteArray);
                        res.json('Note deleted');
                    }
                }
                
            })
    }
})

module.exports = notes;