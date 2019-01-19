var assert = chai.assert;

describe('Business Entity Types', function () {
  it('all', function (done) {
    askKodiak.getRefDataEntityTypes({}, function (res) {
      var keys = ['AS', 'CA', 'CC', 'CCORP', 'CD', 'CE', 'CH', 'CL', 'CO', 'CP', 'CW', 'CY', 'ES', 'FARM', 'GE', 'GP', 'IN', 'IT', 'JV', 'LC', 'LL', 'LP', 'LU', 'MU', 'NP', 'OT', 'PR', 'PT', 'SB', 'SC', 'SCORP', 'SOLEPRP', 'SS', 'TN', 'TR', 'UA'];

      assert.containsAllKeys(res, keys);
      done();
    });
  });
});
