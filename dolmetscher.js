'use strict'

const axios = require('axios')
const config = require('./config.json')

console.log(config, typeof config)

async function translate(from, to, text) {
  const params = {
    sl: from,
    hl: to,
    q: text,
  }

  try {
    const response = await axios.get(config.host, { params })
    const html = response.data
    const idx = html.search(config.pattern) + config.pattern.length
    const body = html.slice(idx)
    const translated = body.substring(0, body.indexOf('<'))

    return translated
  } catch (error) {
    console.log(error)
  }
}
