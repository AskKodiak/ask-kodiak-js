var assert = chai.assert;

describe('Track (callback)', function () {
  it('event', function (done) {
    askKodiak.trackEvent('test event', {foo: true, bar: false}, function (res) {
      assert.equal(res.created, true);
      done();
    });
  });
});
describe('Track (promise)', function () {
  it('event', function (done) {
    askKodiakPromises.trackEvent('test event', {foo: true, bar: false}).then(function (res) {
      assert.equal(res.created, true);
      done();
    });
  });
});
