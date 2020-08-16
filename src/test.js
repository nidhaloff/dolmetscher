const {GoogleTranslator, MymemoryTranslator, Linguee} = require('./dolmetscher');


const l = new Linguee(to="de", from="en");

l.translateWord("good").then(res => console.log(res));