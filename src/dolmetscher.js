const axios = require("axios");
const fs = require("fs");
const languages = require('./languages');

class BaseTranslator {
  constructor(to, from) {
    
    this.languages = languages;

    if (this.isLangSupported(to) && this.isLangSupported(from)) {
      this.to = to;
      this.from = from;
    }

    this.configs = {
      google: {
        url: "https://translate.google.com/m?",
        pattern: 'class="t0">',
        supportedLanguages: this.languages,
        key: "q",
        minChars: 1,
        maxChars: 5000,
      },
      mymemory: {
        url: "http://api.mymemory.translated.net/get",
        minChars: 1,
        maxChars: 5000,
        supportedLanguages: this.languages,
        key: "q",
      },
    };
  }

  langExists(lang) {
    const exist = Object.keys(languages).includes(lang);
    if (exist || lang === "auto") {
      return true;
    }
    return false;
  }
  isLangSupported(lang) {
    if (this.langExists(lang)) {
      return true;
    }
    else {
      throw `${lang} is not a supported language. Check supported language by calling the getSupportedLanguage function`;
    }
  }

  isValid(text, min, max) {
    if (text && (typeof text == "string" || text instanceof String)) {
      const l = text.trim().length;
      return l <= max && l >= min ? true : false;
    } else {
      throw `The input text length must be of type string between ${this.minChars} and ${this.maxChars} characters`;
    }
  }
        

  async _request(url, params) {
    try {
      const response = await axios.get(url, { params: params });
      return response.data;
    } catch (err) {
      throw `HTTP Error occured while requesting the translation. 
            ${err}`;
    }
  }

  _syncRequest(url, params) {
    const res = axios.get(url, { params: params });
    return res.data;
  }
}

class GoogleTranslator extends BaseTranslator {
  
  constructor(to, from = "auto") {
    super(to, from);
    this.url = this.configs.google.url;
    this.minChars = this.configs.google.minChars;
    this.maxChars = this.configs.google.maxChars;
    this.params = {
      sl: this.from,
      hl: this.to,
      q: "",
    };
  }

  static getSupportedLanguages() {
    return this.configs.google.supportedLanguages;
  }

  async translateText(text) {
    
    if (this.isValid(text, this.minChars, this.maxChars)) {
      this.params.q = text.trim();
    }

    try {
      const html = await this._request(this.url, this.params);
      const idx =
        html.search(this.configs.google.pattern) +
        this.configs.google.pattern.length;
      const body = html.slice(idx);
      const translated = body.substring(0, body.indexOf("<"));

      return translated;
    } catch (err) {
      throw `translation error: ${err} `;
    }
  }

  async translateBatch(texts) {
    const arr = [];

    try {
      for (const text of texts) {
        const res = await this.translateText(text);
        arr.push(res);
      }
    } catch (err) {
      throw `error translating batch: ${err}`;
    }

    return arr;
  }

  async translateFile(f, readAsync = false) {
    try {
      const text = readAsync
        ? await fs.promises.readFile(f, "utf8")
        : fs.readFileSync(f, "utf-8");
      const result = await this.translateText(text);
      return result;
    } catch (err) {
      throw `translation file error: ${err}`;
    }
  }
}

class MymemoryTranslator extends BaseTranslator {
  constructor(to, from = "auto") {
    super(to, from);
    this.to = this.to;
    this.from = this.from === "auto" ? "Lao" : this.from;
    this.url = this.configs.mymemory.url;
    this.minChars = this.configs.mymemory.minChars;
    this.maxChars = this.configs.mymemory.maxChars;
    this.params = {
      langpair: `${this.from}|${this.to}`,
      q: "",
    };
  }

  static getSupportedLanguages() {
    return this.configs.mymemory.supportedLanguages;
  }

  async translateText(text, returnAll = false) {
    if (this.isValid(text, this.minChars, this.maxChars)) {
      this.params.q = text.trim();
    }

    try {
      const response = await this._request(this.url, this.params);

      if (!response) {
        throw `No translation found for ${text}`;
      }

      const data = await response.responseData.translatedText;
      if (data) {
        return data;
      }

      const matches = response.matches;
      if (!returnAll && matches.length === 1) {
        return matches[0].translation;
      }

      const synonyms = [];
      matches.forEach((match) => {
        synonyms.push(match);
      });

      if (!synonyms) {
        throw `No synonyms found for ${text}`;
      }

      return synonyms;
    } catch (err) {
      console.log(err);
    }
  }


  async translateBatch(texts) {
    const arr = [];

    try {
      for (const text of texts) {
        const res = await this.translateText(text);
        arr.push(res);
      }
    } catch (err) {
      throw `error translating batch: ${err}`;
    }

    return arr;
  }

  async translateFile(f, readAsync=false) {
    try {
      const text = readAsync
        ? await fs.promises.readFile(f, "utf8")
        : fs.readFileSync(f, "utf-8");
      const result = await this.translateText(text);
      return result;
    } catch (err) {
      throw `translation file error: ${err}`;
    }
  }
}

module.exports = { GoogleTranslator, MymemoryTranslator };
