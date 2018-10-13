/* eslint-disable no-console */

// a gid and key value are required for these tests to work.
var gid = '',
    key = '',
    askKodiak = new AskKodiak(gid, key, true);

askKodiak.productsForCode('44-45').then(function (response) {
  console.log('all:', response.count);
}).catch(function (error) {
  console.error(error);
});

askKodiak.productsForCode('44-45', {'annualRevenue': 1000000}).then(function (response) {
  console.log('big:', response.count);
}).catch(function (error) {
  console.error(error);
});

askKodiak.productsForCompany(gid).then(function (response) {
  console.log('all', response.products.length);
}).catch(function (error) {
  console.error(error);
});

askKodiak.productsForCompany(gid, {'productCodes': 'BOP'}).then(function (response) {
  console.log('bop', response.products.length);
}).catch(function (error) {
  console.error(error);
});

askKodiak.getNaicsDescription('811310').then(function (response) {
  console.log(response); //long form description from the class
}).catch(function (error) {
  console.error(error);
});

askKodiak.getNaicsSummaryForGroupType('sector').then(function (response) {
  console.log(response);
}).catch(function (error) {
  console.error(error);
});

askKodiak.adminGetProducts({states: 'VA'}).then(function (response) {
  console.log(response.products);
}).catch(function (error) {
  console.error(error);
});

askKodiak.isProductEligibleForNaics('-L636YRpeUmRUEnFdYrq', '44-45').then(function (response) {
  console.log(response); //{ isEligible: true, percentOfCodesEligible: 1 }
}).catch(function (error) {
  console.error(error);
});

askKodiak.trackEvent('inbound-referral', {'referer': 'https://www.google.com'}).then(function (response) {
  console.log(response); //{ created: true }
}).catch(function (error) {
  console.error(error);
});

askKodiak.getNaicsPath('488190').then(function (response) {
  console.log(response); //{ path: [ '48-49', '488', '4881', '48819', '488190' ] }
}).catch(function (error) {
  console.error(error);
});

askKodiak.suggestNaicsGroups('ro', { hitsPerPage: 5, page: 3 }).then(function (response) {
  console.log(response.hits);
}).catch(function (error) {
  console.error(error);
});
/*

askKodiak.getProduct('-Kv9s36or1XZKVHvlYwx').then(function (product) {
  console.log(product.name);
}).catch(function (error) {
  console.error(error);
});

askKodiak.getCompanies().then(function (companies) {
  console.log(companies);
}).catch(function (error) {
  console.error(error);
});

askKodiak.getCompanyProfile('-L635HNnakPWk0QNHat-').then(function (company) {
  console.log(company.name)
}).catch(function (error) {
  console.error(error);
});

askKodiak.getNaicsCode('0000dc045c872f122d694ef600c394df').then(function (code) {
  console.log(code);

}).catch(function (error) {
  console.error(error);
});

askKodiak.getNaicsCodes().then(function (code) {
  console.log(code); //big wad-o-data
}).catch(function (error) {
  console.error(error);
});

askKodiak.getNaicsDescription('811310').then(function (response) {
  console.log(response); //long form description from the class
}).catch(function (error) {
  console.error(error);
});

askKodiak.getNaicsGroup('8113').then(function (response) {
  console.log(response);
}).catch(function (error) {
  console.error(error);
});

askKodiak.getNaicsPath('488190').then(function (response) {
  console.log(response); //{ path: [ '48-49', '488', '4881', '48819', '488190' ] }
}).catch(function (error) {
  console.error(error);
});

// As Object...
askKodiak.getNaicsPath('488190', {'asObject': true}).then(function (response) {
  console.log(response);
}).catch(function (error) {
  console.error(error);
});

askKodiak.getNaicsSectors().then(function (response) {
  console.log(response);
}).catch(function (error) {
  console.error(error);
});

askKodiak.getNaicsSummaryForGroupType('sector').then(function (response) {
  console.log(response);
}).catch(function (error) {
  console.error(error);
});

askKodiak.getNaicsSummary().then(function (response) {
  console.log(response);
}).catch(function (error) {
  console.error(error);
});

// all products
askKodiak.adminGetProducts().then(function (response) {
  console.log(response.products.length);
}).catch(function (error) {
  console.error(error);
});

// all products with eligibility in VA
askKodiak.adminGetProducts({states: 'VA'}).then(function (response) {
  console.log(response.products.length);
}).catch(function (error) {
  console.error(error);
});

askKodiak.trackEvent('inbound-referral', {'referer': 'https://www.google.com'}).then(function (response) {
  console.log(response); //{ created: true }
}).catch(function (error) {
  console.error(error);
});

askKodiak.isProductEligibleForNaics('-Kv9s36or1XZKVHvlYwx', '44-45').then(function (response) {
  console.log(response); //{ isEligible: true, percentOfCodesEligible: 1 }
}).catch(function (error) {
  console.error(error);
});

askKodiak.renderConditionalContent('-Kv9s36or1XZKVHvlYwx', { naicsGroups: '44-45', states: 'MA' }).then(function (response) {
  console.log(response);
}).catch(function (error) {
  console.error(error);
});

askKodiak.getRefDataEntityTypes().then(function (response) {
  console.log(response);
}).catch(function (error) {
  console.error(error);
});

askKodiak.getRefDataProductCodes().then(function (response) {
  console.log(response);
}).catch(function (error) {
  console.error(error);
});

askKodiak.getRefDataStates().then(function (response) {
  console.log(response);
}).catch(function (error) {
  console.error(error);
});

// returns 20 hits...
askKodiak.suggestNaicsCodes('ro').then(function (response) {
  console.log(response.hits.length);
}).catch(function (error) {
  console.error(error);
});

// returns 100 hits...
askKodiak.suggestNaicsCodes('ro', { hitsPerPage: '100' }).then(function (response) {
  console.log(response.hits.length);
}).catch(function (error) {
  console.error(error);
});

askKodiak.suggestNaicsGroups('ro').then(function (response) {
  console.log(response.hits.length);
}).catch(function (error) {
  console.error(error);
});

// page three of results 5 pages at a time..
askKodiak.suggestNaicsGroups('ro', { hitsPerPage: 5, page: 3 }).then(function (response) {
  console.log(response.hits.length);
}).catch(function (error) {
  console.error(error);
});

*/

