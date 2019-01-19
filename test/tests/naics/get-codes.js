var assert = chai.assert;

describe('Get Codes', function () {
  it('all', function (done) {
    askKodiak.getNaicsCodes({}, function (res) {
      var numCodes = Object.keys(res).length;

      assert.strictEqual(numCodes, 20060);
      done();
    });
  });
});
