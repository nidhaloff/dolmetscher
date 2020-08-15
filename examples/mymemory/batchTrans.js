const {GoogleTranslator, MymemoryTranslator} = require('../../src/dolmetscher');

const mymemory = new MymemoryTranslator("fr", "en");

// you can check the supported languages first 
//console.log("mymemory supported languages are: ", mymemory.getSupportedLanguages());

const texts = ["Hello world", "How are you"]
mymemory.translateBatch(texts)
.then(res => console.log("mymemory result: ", res));