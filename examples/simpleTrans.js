const { GoogleTranslator } = require("../dolmetscher");

const google = new GoogleTranslator("en", "auto");

google
  .translateText("bonjour la vie")
  .then(res => console.log("translatedText: ", res));
