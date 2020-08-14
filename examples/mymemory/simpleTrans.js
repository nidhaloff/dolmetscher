const {GoogleTranslator, MymemoryTranslator} = require('../../src/dolmetscher');

const mymemory = new MymemoryTranslator("en");

mymemory.translateText("Weiter so, du bist unglaublich")
.then(res => console.log("mymemory result: ", res));