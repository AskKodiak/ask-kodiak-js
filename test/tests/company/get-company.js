var assert = chai.assert;

describe('Get Company', function () {
  it('Has expected properties', function (done) {
    askKodiak.getCompany(gid, {}, function (res) {
      var keys = [
        'id',
        'description',
        'location',
        'logo',
        'name',
        'website',
        'isCarrier'
      ];
      assert.containsAllKeys(res, keys);
      done();
    });
  });
});
