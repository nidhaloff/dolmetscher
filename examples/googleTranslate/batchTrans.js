const { GoogleTranslator } = require("../../src/dolmetscher");

const google = new GoogleTranslator("en", "auto");

async function translateTextSafely(google, text) {
  try {
    const translation = await google.translateText(text);
    return { success: true, translation };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

function batchTranslation() {
  const texts = ["bonsoir le monde", "Hallo Welt", "guten morgen", ""]; // Added an empty string to test error handling

  const translationPromises = texts.map(text => translateTextSafely(google, text));

  Promise.all(translationPromises)
    .then(res => console.log("batch translation: ", res))
    .catch(err => console.error("Error in batch translation: ", err));
}

batchTranslation();
