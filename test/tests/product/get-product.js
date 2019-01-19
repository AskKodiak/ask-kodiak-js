var assert = chai.assert;

describe('Get Product', function () {
  it('Returns expected object properties', function (done) {
    askKodiak.getProduct(pid, {}, function (res) {
      var ok = true,
          expected = [
            'name',
            'description',
            'coverageType',
            'ownerId',
            'meta',
            'ownerType'
          ],
          i;

      for (i = 0; i < expected.length; i++) {
        if (typeof res[expected[i]] === 'undefined') {
          ok = false;
        }
      }

      assert.equal(ok, true);
      done();
    });
  });
  it('Returns expected eligibility (default)', function (done) {
    askKodiak.getProduct(pid, {}, function (res) {
      assert.equal(typeof res.eligibility === 'undefined', true);
      done();
    });
  });
  it('Returns expected eligibility (include)', function (done) {
    askKodiak.getProduct(pid, {'includeEligibility': true}, function (res) {
      assert.equal(typeof res.eligibility === 'undefined', false);
      done();
    });
  });
});
