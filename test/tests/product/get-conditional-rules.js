var assert = chai.assert;

describe('Get Conditional Rules', function () {
  it('Returns Rules', function (done) {
    askKodiak.getConditionalRules(pid, {}, function (res) {
      assert.equal(Object.keys(res).length > 0, true);
      done();
    });
  });
  it('Rules are well formed', function (done) {
    askKodiak.getConditionalRules(pid, {}, function (res) {
      var rids = Object.keys(res),
          rule,
          i,
          ok = true;

      for (i = 0; i < rids.length; i++) {
        rule = res[rids[i]];
        if (!rule.when) {
          ok = false;
        }
        if (!(rule.include || rule.exclude)) {
          ok = false;
        }
      }
      assert.equal(ok, true);
      done();
    });
  });
});
