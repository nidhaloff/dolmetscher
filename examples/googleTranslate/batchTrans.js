const { GoogleTranslator } = require("../../src/dolmetscher");

const google = new GoogleTranslator("en", "auto");

async function alternativeBatchTranslation(texts) {
  const result = []
  
  for(i = 0; i < texts.length; i++) {
    await google
    .translateBatch([texts[i]])
    .then(res => result.push(res.pop()))
    .catch(err => {
      result.push('ERROR: ' + err) 
    })
    if(i == texts.length - 1) {
      console.log("batch translation: ", result)
    }
  }
  
  // await google
  //   .translateBatch([texts[i]])
  //   .then(res => process.stdout.write(' \'' + res.pop() + '\' '))
  //   .catch(err => {
  //     process.stdout.write(' \'' + err + + '\' ') 
  //   })
}
function batchTranslation() {
  const texts = ["", "Hallo Welt", "guten morgen"];
  google
    .translateBatch(texts)
    .then(res => console.log("batch translation: ", res))
    .catch(err => {
      alternativeBatchTranslation(texts)
    })
    // .catch(err => console.log('an error has been occured! ', err));
}

batchTranslation();
