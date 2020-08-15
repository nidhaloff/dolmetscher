const {GoogleTranslator, MymemoryTranslator} = require('../../src/dolmetscher');

const mymemory = new MymemoryTranslator("en", "de");

// you can check the supported languages first 
//console.log("mymemory supported languages are: ", mymemory.getSupportedLanguages());

mymemory.translateFile("examples/example.txt")
.then(res => console.log("mymemory result: ", res));