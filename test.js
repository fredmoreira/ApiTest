var assert = require('chai').assert,
  request = require('supertest'),
  expect = require('chai').expect;

var url = 'http://localhost:5000';

//Create Before
describe('API PhoneBook Tests', function() {
  it('/get contacts', function(done) {
    request(url)
      .get('/contacts/')
      .end(function(err, res) {
        var result = JSON.parse(res.text);
        console.log(result);
        assert.equal(res.status, 200);
        assert.equal(result[0].name, 'Teste API2', 'Conferindo o name!');
        // console.log('Teste API2'in result[0].n);
        done();
      });
    //Create After
  });
});



//   API PhoneBook Tests
// [ { _id: '546157634f7623481bc4e5ea',
//     name: 'Teste API2',
//     mobilephone: '0553188889000',
//     homephone: '0553133334444',
//     __v: 0 } ]