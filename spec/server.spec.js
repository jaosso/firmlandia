var request = require('supertest');
// eslint-disable-next-line no-global-assign
require = require('really-need');

describe('Starting express server', function () {
  var server;
  beforeEach(function () {
    server = require('../app/server', { bustCache: true });
  });
  afterEach(function () {
    return server.close();
  });

  test('Server responses to /, ', function (done) {
    request(server).get('/').expect(200, done);
  });

  test('404 everything else, ', function (done) {
    request(server).get('/foo/bar').expect(404, done);
  });
});
