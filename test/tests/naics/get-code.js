var assert = chai.assert;

describe('Get Code', function () {
  it('2017 code', function (done) {
    askKodiak.getNaicsCode('01af53f8b78e7ca6fa95fe39ab4cab90', {}, function (res) {
      var expect = {
        'code': '112930',
        'description': 'Rabbit production',
        'hash': '01af53f8b78e7ca6fa95fe39ab4cab90'
      };

      assert.deepEqual(res, expect);
      done();
    });
  });
  it('2012 code (upgraded)', function (done) {
    askKodiak.getNaicsCode('01c8c29c137b420d8fb507e1444cc7a2', {}, function (res) {
      var expect = {
        'code': '452210',
        'description': 'Department stores',
        'hash': 'c3fb1221af20f63fa368ee60e5d72568'
      };

      assert.deepEqual(res, expect);
      done();
    });
  });
});
