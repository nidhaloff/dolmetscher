const {GoogleTranslator, MymemoryTranslator} = require('../../src/dolmetscher');

const mymemory = new MymemoryTranslator("fr", "en");

mymemory.translateText("keep it up, you are awesome")
.then(res => console.log("mymemory result: ", res));