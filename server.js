const express = require('express');
const path = require('path');
const api = require('./routes/notes');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Link api endpoints
app.use('/api', api);

app.use(express.static('public'));

// Provide the notes.html when users goes to /notes endpoint
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/notes.html'))
});

// Provide the index.html as failsafe location
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'))
});

app.listen(PORT, () => 
    console.log(`Example app listening at http://localhost:${PORT}`)
    );