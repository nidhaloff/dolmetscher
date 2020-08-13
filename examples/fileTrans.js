const {GoogleTranslator} = require('../dolmetscher');


const google = new GoogleTranslator('en', 'auto');

function fileTranslation(f='./example.txt') {
    google.translateFile(f)
                        .then(res => console.log("translated file: ", res))
}

fileTranslation()