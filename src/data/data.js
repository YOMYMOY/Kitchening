const path = require('path');
const fs = require('fs');

module.exports = {
    readJSON : (json) => {
        return JSON.parse(fs.readFileSync(path.join(__dirname, json)));
    },
    writeJSON : (json, array) => {
        return fs.writeFileSync(path.join(__dirname, json), JSON.stringify(array, null, 3), 'utf-8');
    }
}

