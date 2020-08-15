const { GoogleTranslator } = require("../../src/dolmetscher");

// you can check the supported languages first 
console.log("google translate supported languages are: ", GoogleTranslator.getSupportedLanguages());


const google = new GoogleTranslator("en", "auto");



google.translateText("bonjour la vie")
  .then(res => console.log("translatedText: ", res));
