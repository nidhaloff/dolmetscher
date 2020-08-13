const {GoogleTranslator} = require('../dolmetscher');


const google = new GoogleTranslator('en', 'auto');


function batchTranslation() {
    const texts = ['bonsoir le monde', 'Hallo Welt', 'guten morgen']
    google.translateBatch(texts)
                .then(res => console.log("batch translation: ", res));
}

batchTranslation()