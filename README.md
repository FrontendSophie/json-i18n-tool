# json-i18n-tool

[![Build Status](https://travis-ci.org/FrontendSophie/json-i18n-tool.svg?branch=master)](https://travis-ci.org/FrontendSophie/json-i18n-tool)
[![npm: version](https://img.shields.io/npm/v/json-i18n-tool.svg)](https://www.npmjs.com/package/json-i18n-tool)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![Maintainability](https://api.codeclimate.com/v1/badges/33e078b7a8e19484ac3e/maintainability)](https://codeclimate.com/github/FrontendSophie/json-i18n-tool/maintainability)

> Translate JSON File into Other Languages

## Installation
``` bash
npm install json-i18n-tool
```

## Usage
``` bash
# generate translated json file
node index.js --src=... --lang=... --dst=...

# e.g.
node index.js --src=./test/test.json --lang=en --dst=./test/en-test.json
```