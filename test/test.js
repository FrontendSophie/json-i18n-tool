const fs = require('fs');
const expect = require('chai').expect;
const translator = require('../lib/translate');

describe('json-i18n-tool', function () {
    it("should have an original test json file", function () {
        const testFile = fs.existsSync('./test/test.json');
        const testContent = fs.readFileSync('./test/test.json', 'utf8');
        expect(testFile).to.be.ok;
        expect(testContent).to.be.equal('{"class": "三年级二班","students": {"sophie": {"interest": ["编程", "音乐"],"note": "技术改变世界"}}}');
    });

    it("should generate a translated json file for en", function (done) {
        this.timeout(5000);
        const testPromise = new Promise(function (resolve, reject) {
            translator.translate('./test/test.json', 'en', './test/en-test.json');
            done();
        });
        testPromise.then(function () {
            const enTestFile = fs.existsSync('./test/en-test.json');
            const enTestContent = fs.readFileSync('./test/en-test.json', 'utf8');
            expect(enTestFile).to.be.ok;
            expect(enTestContent).to.be.equal('{"class": "Class 2, grade 3","students": {"sophie": {"interest": ["programming","music"],"note": "Technology changes the world"}}}');
        });
    });

    it("should do nothing for not enough parameters", function (done) {
        const testPromise = new Promise(function (resolve, reject) {
            translator.translate('./test/test.json');
            done();
        });
        testPromise.then(function () {
            const enTestFile = fs.existsSync('./test/en-test.json');
            expect(enTestFile).to.not.be.ok;
        });
    });
});