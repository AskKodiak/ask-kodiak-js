var assert = chai.assert;

describe('Get Path', function () {
  it('as array', function (done) {
    askKodiak.getNaicsPath('451110', {}, function (res) {
      var expect = {
        'path': [
          '44-45',
          '451',
          '4511',
          '45111',
          '451110'
        ]
      };

      assert.deepEqual(res, expect);
      done();
    });
  });
  it('as object', function (done) {
    askKodiak.getNaicsPath('451110', {asObject: true}, function (res) {
      var expect = {
        'sector': '44-45',
        'subsector': '451',
        'industryGroup': '4511',
        'internationalIndustry': '45111',
        'nationalIndustry': '451110'
      };

      assert.deepEqual(res, expect);
      done();
    });
  });
});
