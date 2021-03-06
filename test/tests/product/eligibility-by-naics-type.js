var assert = chai.assert;

describe('Eligibility by NAICS Group Type', function () {
  it('Returns expected object properties', function (done) {
    askKodiak.getEligibilityByNaicsGroupType(pid, 'sector', {}, function (res) {
      var ok = true,
          keys = Object.keys(res),
          key,
          expected = [
            'coverage',
            'eligibleCodes'
          ],
          testSector = res[keys[0]],
          testSectorKeys = Object.keys(testSector),
          i;

      for (i = 0; i < testSectorKeys.length; i++) {
        key = testSectorKeys[i];
        if (expected.indexOf(key) === -1) {
          ok = false;
        }
      }

      assert.equal(ok, true);
      done();
    });
  });
  it('Returns expected object properties (sector)', function (done) {
    askKodiak.getEligibilityByNaicsGroupType(pid, 'sector', {}, function (res) {
      var ok = true,
          keys = Object.keys(res),
          key,
          i;

      for (i = 0; i < keys.length; i++) {

        key = keys[i].split('-')[0];

        if (key.length > 2) {
          ok = false;
        }
      }

      assert.equal(ok, true);
      done();
    });
  });
  it('Returns expected object properties (subsector)', function (done) {
    askKodiak.getEligibilityByNaicsGroupType(pid, 'subsector', {}, function (res) {
      var ok = true,
          keys = Object.keys(res),
          key,
          i;

      for (i = 0; i < keys.length; i++) {

        key = keys[i];

        if (key.length > 3) {
          ok = false;
        }
      }

      assert.equal(ok, true);
      done();
    });
  });
  it('Returns expected object properties (industry-group)', function (done) {
    askKodiak.getEligibilityByNaicsGroupType(pid, 'industry-group', {}, function (res) {
      var ok = true,
          keys = Object.keys(res),
          key,
          i;

      for (i = 0; i < keys.length; i++) {

        key = keys[i];

        if (key.length > 4) {
          ok = false;
        }
      }

      assert.equal(ok, true);
      done();
    });
  });
  it('Returns expected object properties (international-industry)', function (done) {
    askKodiak.getEligibilityByNaicsGroupType(pid, 'international-industry', {}, function (res) {
      var ok = true,
          keys = Object.keys(res),
          key,
          i;

      for (i = 0; i < keys.length; i++) {

        key = keys[i];

        if (key.length > 5) {
          ok = false;
        }
      }

      assert.equal(ok, true);
      done();
    });
  });
  it('Returns expected object properties (national-industry)', function (done) {
    askKodiak.getEligibilityByNaicsGroupType(pid, 'national-industry', {}, function (res) {
      var ok = true,
          keys = Object.keys(res),
          key,
          i;

      for (i = 0; i < keys.length; i++) {

        key = keys[i];

        if (key.length > 6) {
          ok = false;
        }
      }

      assert.equal(ok, true);
      done();
    });
  });
});
