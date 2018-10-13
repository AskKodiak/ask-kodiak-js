/* eslint-disable no-console */

// a gid and key value are required for these tests to work.
var gid = '',
    key = '',
    askKodiak = new AskKodiak(gid, key, false),
    callback = function (results) {
      console.log(results);
    };

askKodiak.productsForCode('44-45', {}, callback);
askKodiak.productsForCode('44-45', {'productCodes': 'BOP'}, callback);
askKodiak.productsForCode('44-45', {'entityTypes': 'AS+CCORP', 'productCodes': 'BOP'}, callback);
askKodiak.trackEvent('test', {foo: 'bar'}, callback);
askKodiak.getProduct('-L4vFpeXhe5qBlWU7EUS', {}, callback);
askKodiak.getCompanies({}, callback);
askKodiak.getCompanies({type: 'carriers'}, callback);
askKodiak.getCompanyProfile(gid, {}, callback);
askKodiak.getNaicsGroup('11', {}, callback);
askKodiak.getNaicsCode('050826f5dcd358c1390f5daf27e91bfa', {}, callback);
askKodiak.getNaicsPath('115', {}, callback);
askKodiak.getNaicsPath('115', {asObject: true}, callback);
