#!/usr/bin/env node

const fs = require('fs');
const qs = require('querystring');
const request = require('request');
const util = require('util');
const crypto = require('crypto');

let content;
let targetLang;
let targetFile;
let count = 0;

const translate = (sourceFile, _targetLang, _targetFile) => {
  const _content = fs.readFileSync(sourceFile, 'utf8');
  content = JSON.parse(_content);
  targetLang = _targetLang;
  targetFile = _targetFile;
  translateObject(content);
}

const translateObject = inputObject => {
  for (let key in inputObject) {
    checkType(inputObject, key);
  }
}

const checkType = (input, key) => {
  let item = input[key];

  if (util.isObject(item)) {
    translateObject(item);
  } else {
    let chinese = item.toString();
    count++;
    translateString(chinese, input, key);
  }
}

const youdaoTranslate = (chinese, targetLang, callback) => {
  if (chinese && chinese.trim() !== '') { //in case "", " " results in error 
    const options = {
      url: 'http://openapi.youdao.com/api',
      qs: genParams(chinese, targetLang),
      method: 'POST'
    };

    request(options, (error, response, body) => {
      if (error) {
        console.log('problem with request: ' + e.message);
      } else if (response.statusCode == 200) {
        body = JSON.parse(body);
        let result = body.translation[0];
        callback(result);
      }
    });
  } else {
    callback('');
  }
}

const genParams = (chinese, targetLang) => {
  const appKey = '03a15fcc8a34ad93';
  const key = 'Y8o2OkVumZZvqLR2iF00TX76hkbRKc3q';
  const salt = (new Date).getTime();
  const str = appKey + chinese + salt + key;
  const md5 = crypto.createHash('md5');
  const sign = md5.update(str).digest('hex');

  return {
    q: chinese,
    appKey: appKey,
    salt: salt,
    from: '',
    to: targetLang,
    sign: sign
  };
}

const translateString = (chinese, input, key) => {
  youdaoTranslate(chinese, targetLang, function (result) {
    input[key] = result;
    count--;
    if (!count) {
      endTranslate();
    }
  });
}

const endTranslate = () => {
  const targetContent = JSON.stringify(content, null, 2);
  fs.writeFileSync(targetFile, targetContent);
  console.log('Translation done :)');
}

exports.translate = translate;