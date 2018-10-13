/* eslint-disable no-console */

/* All interfaces implemented below. Plug in keys and uncomment a few at a time to test. */

var askKodiak = new AskKodiak('GROUP_ID', 'KEY'),
    callback = function (response) {
      console.log(response);
    };

askKodiak.productsForCode('44-45', {}, callback);
askKodiak.productsForCode('44-45', {'productCodes': 'BOP'}, callback);
askKodiak.productsForCode('44-45', {'entityTypes': 'AS+CCORP', 'productCodes': 'BOP'}, callback);
askKodiak.trackEvent('test', {foo: 'bar'}, callback);
