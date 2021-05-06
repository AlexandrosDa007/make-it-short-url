const { readFileSync } = require('fs');
const blackMirrorJSON = readFileSync('./black-mirror.json', 'utf-8');
const blackMirror = JSON.parse(blackMirrorJSON);
const players = [
    {
        name: 'alex',
        age: 25,
    },
    {
        name: 'kwstas',
        age: 27
    }
];
module.exports = {

    players,
    blackMirror,
    asyncError: (res, message) => {
        return res.status(404).send(message);
    },
};


