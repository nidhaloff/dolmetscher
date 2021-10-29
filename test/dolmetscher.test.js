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
});