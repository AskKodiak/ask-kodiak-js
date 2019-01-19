var assert = chai.assert;

describe('Suggest NAICS Codes', function () {
  it('Has expected properties', function (done) {
    askKodiak.suggestNaicsCodes('restaurant', {}, function (res) {
      var keys = [
        'hits',
        'nbHits',
        'page',
        'nbPages',
        'hitsPerPage',
        'processingTimeMS',
        'exhaustiveNbHits',
        'query'
      ];
      assert.hasAllKeys(res, keys);
      done();
    });
  });
  it('Is expected page (default)', function (done) {
    askKodiak.suggestNaicsCodes('res', {}, function (res) {
      assert.equal(res.page, 0);
      done();
    });
  });
  it('Is expected page (2)', function (done) {
    askKodiak.suggestNaicsCodes('res', {'page': 2}, function (res) {
      assert.equal(res.page, 2);
      done();
    });
  });
  it('Has expected hits per page (default)', function (done) {
    askKodiak.suggestNaicsCodes('res', {}, function (res) {
      assert.equal(res.hitsPerPage, 20);
      done();
    });
  });
  it('Has expected hits per page (5)', function (done) {
    askKodiak.suggestNaicsCodes('res', {hitsPerPage: 5}, function (res) {
      assert.equal(res.hitsPerPage, 5);
      done();
    });
  });
});
