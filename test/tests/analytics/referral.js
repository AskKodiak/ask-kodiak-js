var assert = chai.assert;

describe('Referrals', function () {
  var referralId,
      referralVal;

  it('all', function (done) {
    askKodiak.getReferrals({}, function (res) {
      var rids = Object.keys(res),
          numReferrals = rids.length;

      referralId = rids[0];
      referralVal = res[referralId];

      assert.isAtLeast(numReferrals, 1);
      done();
    });
  });
  it('by id', function (done) {
    askKodiak.getReferral(referralId, {}, function (res) {

      assert.deepEqual(res, referralVal);
      done();
    });
  });
});
