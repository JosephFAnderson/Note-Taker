const express = require('express');
const path = require('path');
const api = require('./routes/notes');

const app = express();
const PORT = 4123;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', api);

app.use(express.static('public'));


app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/notes.html'))
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'))
});

app.listen(PORT, () => 
    console.log(`Example app listening at http://localhost:${PORT}`)
    );