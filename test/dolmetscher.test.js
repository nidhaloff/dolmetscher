const assert = require('assert');
const expect = require('chai').expect;
const {GoogleTranslator, MymemoryTranslator} = require('../src/dolmetscher');

const google = new GoogleTranslator(to="en", from="auto");
const mymemory = new MymemoryTranslator(to="en", from="de");


describe('Google translate tests', () => {
    describe('empty text exception', () => {

        it('should throw err', async () => {
    try {
        await google.translateText('');
    } catch(err) {
        expect(err).to.equal(
            `The input text length must be of type string between ${google.minChars} and ${google.maxChars} characters`
          );
    }
    });

    it('should throw err', async () => {
        try {
            await google.translateText(123);
        } catch(err) {
            expect(err).to.equal(
                `The input text length must be of type string between ${google.minChars} and ${google.maxChars} characters`
              );
        }
        });

        it('should translate text', async () => {
            
               const res = await google.translateText('hallo');
                expect(res.toLowerCase()).to.equal("hello");
            });

            it('should trim and translate text', async () => {
            
                const res = await google.translateText('          hallo    ');
                 expect(res.toLowerCase()).to.equal("hello");
             });             
    });
    describe('translateFile', () => {
        it('should translate content of file', async () => {
            const res = await google.translateFile(`${__dirname}/example.txt`);
            expect(res.toLowerCase()).to.equal("hello how are you");
        });
        it('fails with empty file', async () => {
            try {
                const res = await google.translateFile(`${__dirname}/empty.txt`);
            } catch (err) {
                expect(err).to.equal(`translation file error: The input text length must be of type string between ${mymemory.minChars} and ${mymemory.maxChars} characters`);
            }
        });
        it('fails with non existing file', async () => {
            try {
                const res = await google.translateFile(`${__dirname}/nonExistFile.txt`);
            } catch (err) {
                expect(err).to.contain(`translation file error:`);
            }
        });
    });
});



/* MyMemory Translator Tests*/

describe('Mymemory translate tests', () => {
    describe('empty text exception', () => {

        it('should throw err', async () => {
    try {
        await mymemory.translateText('');
    } catch(err) {
        expect(err).to.equal(
            `The input text length must be of type string between ${mymemory.minChars} and ${mymemory.maxChars} characters`
          );
    }
    });

    it('should throw err', async () => {
        try {
            await mymemory.translateText(123);
        } catch(err) {
            expect(err).to.equal(
                `The input text length must be of type string between ${mymemory.minChars} and ${mymemory.maxChars} characters`
              );
        }
        });

        it('should translate text', async () => {
            
               const res = await mymemory.translateText('welt');
                expect(res.toLowerCase()).to.equal("world");
            });

            it('should trim and translate text', async () => {
            
                const res = await mymemory.translateText('          welt    ');
                 expect(res.toLowerCase()).to.equal("world");
             });
    });
    describe('translateFile', () => {
        it('should translate content of file', async () => {
            const res = await mymemory.translateFile(`${__dirname}/example.txt`);
            expect(res.toLowerCase()).to.equal("hello, how are you?")
        })
        it('fails with empty file', async () => {
            try {
                const res = await mymemory.translateFile(`${__dirname}/empty.txt`);
            } catch (err) {
                expect(err).to.equal(`translation file error: The input text length must be of type string between ${mymemory.minChars} and ${mymemory.maxChars} characters`)
            }
        })
        it('fails with non existing file', async () => {
            try {
                const res = await mymemory.translateFile(`${__dirname}/nonExistFile.txt`);
            } catch (err) {
                expect(err).to.contain(`translation file error:`)
            }
        })
    })
});