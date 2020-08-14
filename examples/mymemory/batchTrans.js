const {GoogleTranslator, MymemoryTranslator} = require('../../src/dolmetscher');

const mymemory = new MymemoryTranslator("fr");

mymemory.translateText("übersetzen").then(res => console.log("mymemory result: ", res));