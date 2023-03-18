const http = require('http');
const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');

const {city, apiKey} = require('../config');
const argv = yargs(hideBin(process.argv))
  .option('c', {
    alias: 'city',
    type: 'string',
    default: city,
    description: 'Город',
  })
  .argv;
const url = `http://api.weatherstack.com/current?access_key=${apiKey}&query=${argv.c}`;

console.log("🚀 ~ file: index.js:9 ~ argv:", argv)

http
  .get(url, (res) => {
    const {statusCode, statusMessage} = res;

    // if error
    if (statusCode !== 200) {
      console.log('error status :>> ', statusCode, statusMessage);
      return;
    }

    // if success
    res.setEncoding('utf-8');

    let response = '';

    res.on('data', (chunk) => response += chunk);
    res.on('end', () => {
      let parsed = JSON.parse(response);
      console.log(`Погода в вашем городе (${argv.c}): `, parsed)
    })
    .on('error', (error) => {
      console.log('error :>> ', error);
    });
});
