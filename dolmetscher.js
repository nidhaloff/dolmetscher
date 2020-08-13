const axios = require('axios');
const fs = require('fs');


class BaseTranslator {

  constructor(baseUrl) {
    this.configs = {
      google: {
        url: "https://translate.google.com/m?",
        pattern: "class=\"t0\">", 
        key: "q",
        minChars: 1,
        maxChars: 5000
      },
      mymemory: {}
             
          }
  }

  isValid(text, min, max) {
    
    if ( text && (typeof text == 'string' || text instanceof String)) {
      const l = text.length;
      return (l <= max && l >= min) ? true: false;
    }

    else {
      throw new Error("You need to provide a string input!");
    }

  }

}

class GoogleTranslator extends BaseTranslator {

  constructor(to, from="auto") {
    super();
    this.to = to;
    this.from = from;
    this.url = this.configs.google.url;
    this.minChars = this.configs.google.minChars;
    this.maxChars = this.configs.google.maxChars;
    this.params = {
      sl: from,
      hl: to,
      q: ''
  };

  }

  async _request(url, params) {

    try {
     const response = await axios.get(url, {params: params});
    return response.data;
    }
    catch(err) {
      throw new Error("HTTP Error occured while requesting the translation");
    }
    
  }
  
  async translateText(text) {

    if (this.isValid(text, this.minChars, this.maxChars)) {
      this.params.q = text;
    }
    else {
      throw new Error(`The input text length must be between ${this.minChars} and ${this.maxChars}`);
    }

    try {
      const html = await this._request(this.url, this.params);
      const idx = html.search(this.configs.google.pattern) + this.configs.google.pattern.length;
      const body = html.slice(idx);
      const translated = body.substring(
          0, body.indexOf('<')
      );

      return translated;

    } catch (error) {
      console.log("translation error : ", error);
    }
  }

  async translateBatch(texts) {
    
    const arr = [];
    
    try { 
      for (const text of texts) {
        const res = await this.translateText(text)
        arr.push(res);
      }
            
    }
    catch(err) {
      console.log("error translating batch: ", err);
    }
    
    return arr;
  }

  async translateFile(f, ASYNC=false) {

    try {
        const text = ASYNC ? await fs.promises.readFile(f, 'utf8') : fs.readFileSync(f, 'utf-8');
        const result = await this.translateText(text);
        return result;
    }
    catch(err) {
      console.error("translation file error: ", err);
    }
   
  }
}



module.exports = {GoogleTranslator}