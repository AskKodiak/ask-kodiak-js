var assert = chai.assert;

describe('Get Sectors', function () {
  it('all', function (done) {
    askKodiak.getNaicsSectors({}, function (res) {
      var numSectors = Object.keys(res).length;

      assert.equal(numSectors, 20);
      done();
    });
  });
});
