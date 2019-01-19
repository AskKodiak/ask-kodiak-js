var assert = chai.assert;

describe('Get Companies', function () {
  it('Has expected properties', function (done) {
    askKodiak.getCompanies({}, function (res) {
      var keys = [
        'count',
        'companiesPerPage',
        'page',
        'pages',
        'filters',
        'companies'
      ];
      assert.hasAllKeys(res, keys);
      done();
    });
  });
  it('Is expected page (default)', function (done) {
    askKodiak.getCompanies({}, function (res) {
      assert.equal(res.page, 0);
      done();
    });
  });
  it('Has expected companies per page (default)', function (done) {
    askKodiak.getCompanies({}, function (res) {
      assert.equal(res.companiesPerPage, res.count);
      done();
    });
  });
  it('Has expected companies per page (5)', function (done) {
    askKodiak.getCompanies({companiesPerPage: 5}, function (res) {
      assert.equal(res.companiesPerPage, 5);
      done();
    });
  });
  it('Carriers Only', function (done) {
    askKodiak.getCompanies({companyType: 'carrier'}, function (res) {
      var companies = res.companies,
          ok = true,
          i;

      for (i = 0; i < companies.length; i++) {
        if (!companies[i].isCarrier) {
          ok = false;
        }
      }
      assert.equal(ok, true);
      done();
    });
  });
  it('Others Only', function (done) {
    askKodiak.getCompanies({companyType: 'other'}, function (res) {
      var companies = res.companies,
          ok = true,
          i;

      for (i = 0; i < companies.length; i++) {
        if (companies[i].isCarrier) {
          ok = false;
        }
      }
      assert.equal(ok, true);
      done();
    });
  });
});
