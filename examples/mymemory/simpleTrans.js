const {GoogleTranslator, MymemoryTranslator} = require('../../src/dolmetscher');

const mymemory = new MymemoryTranslator("fr", "en");

// you can check the supported languages first 
console.log("mymemory supported languages are: ", mymemory.getSupportedLanguages());
mymemory.translateText("keep it up, you are awesome")
.then(res => console.log("mymemory result: ", res));