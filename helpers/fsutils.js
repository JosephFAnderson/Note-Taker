const fs = require('fs');
const util = require('util');

const readFromFile = util.promisify(fs.readFile);

const writeToFile = (file, data) => {
    fs.writeFile(file, JSON.stringify(data, null, 4), err => 
        err ? console.log(err) : console.log("File written successfully")
    )
}

const readAndWriteFile = (file, note) => {
    fs.readFile(file, 'utf8', (err, data) => {
        if(err){
            console.info(err);
        }else{
            const noteArray = JSON.parse(data)
            noteArray.push(note);
            writeToFile( file, noteArray);
        }
    })
}

module.exports = {
    readFromFile,
    writeToFile,
    readAndWriteFile
}