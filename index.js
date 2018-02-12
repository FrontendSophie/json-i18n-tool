const argv = require('minimist')(process.argv.slice(2));
const translator = require('./lib/translate');

translator.translate(argv.src, argv.lang, argv.dst);