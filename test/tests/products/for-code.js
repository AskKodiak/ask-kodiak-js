var assert = chai.assert;

function areSummaryOnly(products) {
  var actualProps,
      expectedProps = ['id', 'name', 'ownerId', 'coverageType', 'logo'],
      i,
      ix,
      ok = true;

  for (i = 0; i < products.length; i++) {
    actualProps = Object.keys(products[i]);
    for (ix = 0; ix < actualProps.length; ix++) {
      if (expectedProps.indexOf(actualProps[ix]) === -1) {
        // make sure the unexpected property is not a response specific value
        // as indicated by an '_'
        if (actualProps[ix].indexOf('_') !== 0) {
          ok = false;
        }
      }
    }
  }

  return ok;

}

describe('Products For Code (Callbacks)', function () {
  it('Returns expected object properties', function (done) {
    askKodiak.productsForCode('44-45', {}, function (res) {
      var ok = true,
          expected = [
            'code',
            'count',
            'description',
            'filters',
            'includeEligibility',
            'page',
            'pages',
            'products',
            'productsPerPage',
            'seq',
            'summaryOnly',
            'type'],
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
  it('Returns expected code description', function (done) {
    askKodiak.productsForCode('44-45', {}, function (res) {
      // is the right naics group?
      assert.equal(res.description, 'Retail Trade');
      done();
    });
  });
  it('Returns expected NAICS group type', function (done) {
    askKodiak.productsForCode('44-45', {}, function (res) {
      // is the right naics group?
      assert.equal(res.type, 'sector');
      done();
    });
  });
  it('Returns expected eligibility (default)', function (done) {
    askKodiak.productsForCode('44-45', {}, function (res) {
      assert.equal(res.includeEligibility, false);
      done();
    });
  });
  it('Returns expected eligibility (include)', function (done) {
    askKodiak.productsForCode('44-45', {'includeEligibility': true}, function (res) {
      assert.equal(res.includeEligibility, true);
      done();
    });
  });
  it('Returns summary only results', function (done) {
    askKodiak.productsForCode('44-45', {'summaryOnly': true}, function (res) {
      var products = res.products;

      assert.isTrue(areSummaryOnly(products));
      done();
    });
  });
  it('Returns expected filters (unfiltered)', function (done) {
    askKodiak.productsForCode('44-45', {}, function (res) {
      // no filters should be applied, thusly no keys on that object
      assert.equal(Object.keys(res.filters).length, 0);
      done();
    });
  });
  it('Returns expected filters (owner)', function (done) {
    askKodiak.productsForCode('44-45', {'owners': 'ABC123'}, function (res) {
      var filters = res.filters;
      assert.equal(filters.owners.length, 1);
      done();
    });
  });
  it('Returns expected filters (owners)', function (done) {
    askKodiak.productsForCode('44-45', {'owners': 'ABC123+DEF456'}, function (res) {
      var filters = res.filters;
      assert.equal(filters.owners.length > 1, true);
      done();
    });
  });
  it('Returns expected filters (geo)', function (done) {
    askKodiak.productsForCode('44-45', {'geos': 'CA-ON'}, function (res) {
      var filters = res.filters;
      assert.equal(filters.geos.length, 1);
      done();
    });
  });
  it('Returns expected filters (geos)', function (done) {
    askKodiak.productsForCode('44-45', {'geos': 'US-MA+CA-BC'}, function (res) {
      var filters = res.filters;
      assert.equal(filters.geos.length, 2);
      done();
    });
  });
  it('Returns expected filters (geos with invalid val)', function (done) {
    askKodiak.productsForCode('44-45', {'geos': 'US-MA+CA-BC+TACO'}, function (res) {
      var filters = res.filters;
      assert.equal(filters.geos.length, 2);
      done();
    });
  });
  it('Returns expected filters (coverage)', function (done) {
    askKodiak.productsForCode('44-45', {'productCodes': 'BOP'}, function (res) {
      var filters = res.filters;
      assert.equal(filters.coverages.length, 1);
      done();
    });
  });
  it('Returns expected filters (coverages)', function (done) {
    askKodiak.productsForCode('44-45', {'productCodes': 'BOP+WORK'}, function (res) {
      var filters = res.filters;
      assert.equal(filters.coverages.length, 2);
      done();
    });
  });
  it('Returns expected filters (entity type)', function (done) {
    askKodiak.productsForCode('44-45', {'entityTypes': 'AS'}, function (res) {
      var filters = res.filters;
      assert.equal((filters.entityTypes.length === 1 && filters.entityTypes.indexOf('AS') !== -1), true);
      done();
    });
  });
  it('Returns expected filters (entity types)', function (done) {
    askKodiak.productsForCode('44-45', {'entityTypes': 'AS+CCORP'}, function (res) {
      var filters = res.filters;
      assert.equal(filters.entityTypes.length, 2);
      done();
    });
  });
  it('Returns expected filters (tag)', function (done) {
    askKodiak.productsForCode('44-45', {'tags': 'external-website'}, function (res) {
      var filters = res.filters;
      assert.equal((filters.tags.length === 1 && filters.tags.indexOf('external-website') !== -1), true);
      done();
    });
  });
  it('Returns expected filters (tags)', function (done) {
    askKodiak.productsForCode('44-45', {'tags': 'external-website+internal-portal'}, function (res) {
      var filters = res.filters;
      assert.equal(filters.tags.length, 2);
      done();
    });
  });
  it('Returns expected filters (annualPayroll)', function (done) {
    askKodiak.productsForCode('44-45', {'annualPayroll': 1000000}, function (res) {
      var filters = res.filters;
      assert.equal(filters.annualPayroll === 1000000, true);
      done();
    });
  });
  it('Returns expected filters (annualRevenue)', function (done) {
    askKodiak.productsForCode('44-45', {'annualRevenue': 5000000}, function (res) {
      var filters = res.filters;
      assert.equal(filters.annualRevenue === 5000000, true);
      done();
    });
  });
  it('Returns expected filters (fullTimeEmployees)', function (done) {
    askKodiak.productsForCode('44-45', {'fullTimeEmployees': 25}, function (res) {
      var filters = res.filters;
      assert.equal(filters.fullTimeEmployees === 25, true);
      done();
    });
  });
  it('Returns expected filters (partTimeEmployees)', function (done) {
    askKodiak.productsForCode('44-45', {'partTimeEmployees': 10}, function (res) {
      var filters = res.filters;
      assert.equal(filters.partTimeEmployees === 10, true);
      done();
    });
  });
  it('Returns expected filters (yearsInBusiness)', function (done) {
    askKodiak.productsForCode('44-45', {'yearsInBusiness': 5}, function (res) {
      var filters = res.filters;
      assert.equal(filters.yearsInBusiness === 5, true);
      done();
    });
  });
  it('Returns expected filters (yearsInIndustry)', function (done) {
    askKodiak.productsForCode('44-45', {'yearsInIndustry': 1}, function (res) {
      var filters = res.filters;
      assert.equal(filters.yearsInIndustry === 1, true);
      done();
    });
  });
  it('Returns expected products per page (default)', function (done) {
    askKodiak.productsForCode('44-45', {}, function (res) {
      assert.equal((res.productsPerPage === res.count), true);
      done();
    });
  });
  it('Returns expected products per page (2)', function (done) {
    askKodiak.productsForCode('44-45', {'productsPerPage': 2}, function (res) {
      assert.equal((res.productsPerPage === 2), true);
      done();
    });
  });
  it('Returns expected page (default)', function (done) {
    askKodiak.productsForCode('44-45', {}, function (res) {
      assert.equal((res.page === 0), true);
      done();
    });
  });
  it('Returns expected page (p2)', function (done) {
    askKodiak.productsForCode('44-45', {'productsPerPage': 1, 'page': 2}, function (res) {
      assert.equal((res.page === 2), true);
      done();
    });
  });
});
describe('Products For Code (Promises)', function () {
  it('Returns expected object properties', function (done) {
    askKodiakPromises.productsForCode('44-45', {}).then(function (res) {
      var ok = true,
          expected = [
            'code',
            'count',
            'description',
            'filters',
            'includeEligibility',
            'page',
            'pages',
            'products',
            'productsPerPage',
            'seq',
            'summaryOnly',
            'type'],
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
  it('Returns expected code description', function (done) {
    askKodiakPromises.productsForCode('44-45', {}).then(function (res) {
      // is the right naics group?
      assert.equal(res.description, 'Retail Trade');
      done();
    });
  });
  it('Returns expected NAICS group type', function (done) {
    askKodiakPromises.productsForCode('44-45', {}).then(function (res) {
      // is the right naics group?
      assert.equal(res.type, 'sector');
      done();
    });
  });
  it('Returns expected eligibility (default)', function (done) {
    askKodiakPromises.productsForCode('44-45', {}).then(function (res) {
      assert.equal(res.includeEligibility, false);
      done();
    });
  });
  it('Returns expected eligibility (include)', function (done) {
    askKodiakPromises.productsForCode('44-45', {'includeEligibility': true}).then(function (res) {
      assert.equal(res.includeEligibility, true);
      done();
    });
  });
  it('Returns summary only results', function (done) {
    askKodiakPromises.productsForCode('44-45', {'summaryOnly': true}).then(function (res) {
      var products = res.products;

      assert.isTrue(areSummaryOnly(products));
      done();
    });
  });
  it('Returns expected filters (unfiltered)', function (done) {
    askKodiakPromises.productsForCode('44-45', {}).then(function (res) {
      // no filters should be applied, thusly no keys on that object
      assert.equal(Object.keys(res.filters).length, 0);
      done();
    });
  });
  it('Returns expected filters (owner)', function (done) {
    askKodiakPromises.productsForCode('44-45', {'owners': 'ABC123'}).then(function (res) {
      var filters = res.filters;
      assert.equal(filters.owners.length, 1);
      done();
    });
  });
  it('Returns expected filters (owners)', function (done) {
    askKodiakPromises.productsForCode('44-45', {'owners': 'ABC123+DEF456'}).then(function (res) {
      var filters = res.filters;
      assert.equal(filters.owners.length > 1, true);
      done();
    });
  });
  it('Returns expected filters (geo)', function (done) {
    askKodiakPromises.productsForCode('44-45', {'geos': 'CA-ON'}).then(function (res) {
      var filters = res.filters;
      assert.equal(filters.geos.length, 1);
      done();
    });
  });
  it('Returns expected filters (geos)', function (done) {
    askKodiakPromises.productsForCode('44-45', {'geos': 'US-MA+CA-BC'}).then(function (res) {
      var filters = res.filters;
      assert.equal(filters.geos.length, 2);
      done();
    });
  });
  it('Returns expected filters (geos with invalid val)', function (done) {
    askKodiakPromises.productsForCode('44-45', {'geos': 'US-MA+CA-BC+TACO'}).then(function (res) {
      var filters = res.filters;
      assert.equal(filters.geos.length, 2);
      done();
    });
  });
  it('Returns expected filters (coverage)', function (done) {
    askKodiakPromises.productsForCode('44-45', {'productCodes': 'BOP'}).then(function (res) {
      var filters = res.filters;
      assert.equal(filters.coverages.length, 1);
      done();
    });
  });
  it('Returns expected filters (coverages)', function (done) {
    askKodiakPromises.productsForCode('44-45', {'productCodes': 'BOP+WORK'}).then(function (res) {
      var filters = res.filters;
      assert.equal(filters.coverages.length, 2);
      done();
    });
  });
  it('Returns expected filters (entity type)', function (done) {
    askKodiakPromises.productsForCode('44-45', {'entityTypes': 'AS'}).then(function (res) {
      var filters = res.filters;
      assert.equal((filters.entityTypes.length === 1 && filters.entityTypes.indexOf('AS') !== -1), true);
      done();
    });
  });
  it('Returns expected filters (entity types)', function (done) {
    askKodiakPromises.productsForCode('44-45', {'entityTypes': 'AS+CCORP'}).then(function (res) {
      var filters = res.filters;
      assert.equal(filters.entityTypes.length, 2);
      done();
    });
  });
  it('Returns expected filters (tag)', function (done) {
    askKodiakPromises.productsForCode('44-45', {'tags': 'external-website'}).then(function (res) {
      var filters = res.filters;
      assert.equal((filters.tags.length === 1 && filters.tags.indexOf('external-website') !== -1), true);
      done();
    });
  });
  it('Returns expected filters (tags)', function (done) {
    askKodiakPromises.productsForCode('44-45', {'tags': 'external-website+internal-portal'}).then(function (res) {
      var filters = res.filters;
      assert.equal(filters.tags.length, 2);
      done();
    });
  });
  it('Returns expected filters (annualPayroll)', function (done) {
    askKodiakPromises.productsForCode('44-45', {'annualPayroll': 1000000}).then(function (res) {
      var filters = res.filters;
      assert.equal(filters.annualPayroll === 1000000, true);
      done();
    });
  });
  it('Returns expected filters (annualRevenue)', function (done) {
    askKodiakPromises.productsForCode('44-45', {'annualRevenue': 5000000}).then(function (res) {
      var filters = res.filters;
      assert.equal(filters.annualRevenue === 5000000, true);
      done();
    });
  });
  it('Returns expected filters (fullTimeEmployees)', function (done) {
    askKodiakPromises.productsForCode('44-45', {'fullTimeEmployees': 25}).then(function (res) {
      var filters = res.filters;
      assert.equal(filters.fullTimeEmployees === 25, true);
      done();
    });
  });
  it('Returns expected filters (partTimeEmployees)', function (done) {
    askKodiakPromises.productsForCode('44-45', {'partTimeEmployees': 10}).then(function (res) {
      var filters = res.filters;
      assert.equal(filters.partTimeEmployees === 10, true);
      done();
    });
  });
  it('Returns expected filters (yearsInBusiness)', function (done) {
    askKodiakPromises.productsForCode('44-45', {'yearsInBusiness': 5}).then(function (res) {
      var filters = res.filters;
      assert.equal(filters.yearsInBusiness === 5, true);
      done();
    });
  });
  it('Returns expected filters (yearsInIndustry)', function (done) {
    askKodiakPromises.productsForCode('44-45', {'yearsInIndustry': 1}).then(function (res) {
      var filters = res.filters;
      assert.equal(filters.yearsInIndustry === 1, true);
      done();
    });
  });
  it('Returns expected products per page (default)', function (done) {
    askKodiakPromises.productsForCode('44-45', {}).then(function (res) {
      assert.equal((res.productsPerPage === res.count), true);
      done();
    });
  });
  it('Returns expected products per page (2)', function (done) {
    askKodiakPromises.productsForCode('44-45', {'productsPerPage': 2}).then(function (res) {
      assert.equal((res.productsPerPage === 2), true);
      done();
    });
  });
  it('Returns expected page (default)', function (done) {
    askKodiakPromises.productsForCode('44-45', {}).then(function (res) {
      assert.equal((res.page === 0), true);
      done();
    });
  });
  it('Returns expected page (p2)', function (done) {
    askKodiakPromises.productsForCode('44-45', {'productsPerPage': 1, 'page': 2}).then(function (res) {
      assert.equal((res.page === 2), true);
      done();
    });
  });
});
