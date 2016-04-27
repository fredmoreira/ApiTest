var assert = require('chai').assert,
  request = require('supertest'),
  expect = require('chai').expect;

var url = 'http://localhost:5000';

var contatoCompleto = {
  "name": "Tester Mineiro",
  "mobilephone": "0553188889999",
  "homephone": "0553133332222"
};

var contatoSemNome = {
  "mobilephone": "0553188889999",
  "homephone": "0553133332222"
};

var contatoSemMobilePhone = {
  "name": "Tester Mineiro",
  "homephone": "0553133332222"
};


describe('Testes API PhoneBook - POST', function() {
  it('/POST contato completo', function(done) {
    request(url)
      .post('/contacts/')
      .set('Content-type', 'application/json')
      .send(contatoCompleto)
      .end(function(err, res) {
        var result = JSON.parse(res.text);
        assert.equal(res.status, 201);
        assert.equal(result.name, 'Tester Mineiro', 'Conferindo o name!');
        assert.equal(result.mobilephone, '0553188889999', 'Conferindo o mobilephone!');
        assert.equal(result.homephone, '0553133332222', 'Conferindo o homephone!');
        done();
      });
  });

  it('/POST contato sem nome', function(done) {
    request(url)
      .post('/contacts/')
      .set('Content-type', 'application/json')
      .send(contatoSemNome)
      .end(function(err, res) {
        assert.equal(res.status, 400);
        assert.equal(res.text, 'Missing required property: name', 'Validando mensagem de name obrigatório!');
        done();
      });
  });

  it('/POST contato sem mobilephone', function(done) {
    request(url)
      .post('/contacts/')
      .set('Content-type', 'application/json')
      .send(contatoSemMobilePhone)
      .end(function(err, res) {
        assert.equal(res.status, 400);
        assert.equal(res.text, 'Missing required property: mobilephone', 'Validando mensagem de mobilephone obrigatório!');
        done();
      });
  });
});

describe('Tests API PhoneBook - GET', function() {
  it('/GET contato completo', function(done) {
    request(url)
      .get('/contacts/?name=Tester Mineiro')
      .end(function(err, res) {
        var result = JSON.parse(res.text);
        assert.equal(res.status, 200);
        assert.equal(result[0].name, 'Tester Mineiro', 'Conferindo o name!');
        assert.equal(result[0].mobilephone, '0553188889999', 'Conferindo o mobilephone!');
        assert.equal(result[0].homephone, '0553133332222', 'Conferindo o homephone!');
        done();
      });
  });

  it('/GET contato completo', function(done) {
    request(url)
      .get('/contacts/?name=Testador das galaxias 123')
      .end(function(err, res) {
        assert.equal(res.status, 404);
        done();
      });
  });
});
