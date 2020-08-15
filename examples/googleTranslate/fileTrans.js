const { GoogleTranslator } = require("../../src/dolmetscher");

const google = new GoogleTranslator("en", "auto");

function fileTranslation(f = "examples/example.txt") {
  google.translateFile(f).then(res => console.log("translated file: ", res));
}

fileTranslation();
