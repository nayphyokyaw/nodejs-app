var expect = require('expect');

var {generateMessage, generateLocationMessage} = require('./message');

describe('generateMessage', () => {
  it('should genereate correct message object', () => {
    var from = 'Jen';
    var text = 'Some message';
    var message = generateMessage(from, text);

    expect(message.createdAt).toBeA('number');
    expect(message).toInclude({from,text});
    //store res in variable
    //assert from match
    //assert text match
    //assert createAt is number
  });
});

describe('generateLocationMessage', () =>{
    it('should generate correct location object', () => {
        var from = 'Del';
        var latitide = '15';
        var longitude = '19';
        var url = 'https://www.google.com/maps?q=15,19';
        var message = generateLocationMessage(from, latitide, longitude);

        expect(message.createdAt).toBeA('number');
        expect(message).toInclude({from, url});
    });
});
