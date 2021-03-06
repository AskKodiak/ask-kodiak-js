# Ask Kodiak JS

## Table of Contents

 * [Overview](#overview)
 * [Installation](#installation)
 * [Basic Usage](#basic-usage) 
 * [Contributing](#contributing)
 * [Supported Environments](#supported-environments) 
 * [Upgrading](#upgrading)
 * [Documentation](#documentation)

## Overview 

Ask Kodiak JS is a dependency free implementation of the [Ask Kodiak API](https://api.askKodiak.com/doc/v2) for browser environments. API Keys are required to use, you can obtain those keys from Company Settings once you've created an account.

## Installation

Ask Kodiak JS is available on npm as `ask-kodiak-js`.

```bash
$ npm install --save ask-kodiak-js
```

## Basic Usage

To use Ask Kodiak JS, include the JavaScript file in your page, instantiate, and go.

Ask Kodiak JS supports using either Promises or callback functions (default). 

Promises are not supported natively in any version of Internet Explorer, so if you choose to enable promises in your implementation and want to support IE, you'll need to implement a polyfill like https://github.com/taylorhakes/promise-polyfill. 

### Use Callbacks

```html
<script src="ask-kodiak-js/dist/ask-kodiak-js-min.js"></script>
<script>
  var askKodiak= new AskKodiak('GROUP_ID', 'KEY'), //instantiate using your key and group id. get these from company settings in Ask Kodiak.
      callback = function (response) {
        console.log(response);
      };

  askKodiak.productsForCode('44-45', {}, callback); // get all products for the retail NAICS sector
  askKodiak.productsForCode('44-45', {'productCodes': 'BOP'}, callback); // get all products for the retail NAICS sector that are BOP
  askKodiak.productsForCode('44-45', {'entityTypes': 'AS+CCORP', 'productCodes': 'BOP'}, callback); // get all BOP products for the retail NAICS sector that accept Associations and C Corps as entity types
  askKodiak.trackEvent('test', {foo: 'bar'}, callback); // track an event called 'test' with one property, foo, that has a value of bar.

</script>
```

### Or, Use Promises

```html
<script src="ask-kodiak-js/dist/ask-kodiak-js-min.js"></script>
<script>
  var askKodiak = new AskKodiak('GROUP_ID', 'KEY', true); //instantiate using your key and group id. get these from company settings in Ask Kodiak. Third boolean parameter enables promises

  // get all BOP products for the retail NAICS sector
  askKodiak.productsForCode('44-45', {'productCodes': 'BOP'}).then(function (response) {
    // handle response here
  }).catch(function (error) {
    // handle error here
  });

</script>

```

### API Key Security

Your API keys give read access to your content on Ask Kodiak. Be sure to keep them safe. If you consider the information your company has added to Ask Kodiak sensitive, be sure to keep these keys behind a login screen in your app. 

### Request Parameters

For any API request that supports optional request parameters, pass an `options` object to the method with those values. For example, if making a request where it's important to filter by geography and owner, you would pass the following `options` object to the method: 

```js
{
  'geos': 'US-MN+US-HI',
  'owners': 'ABC123'
}
```

## Contributing

Please refer to the [CONTRIBUTING page](./CONTRIBUTING.md) for more information
about how you can contribute to this project. We welcome bug reports, feature
requests, code review feedback, and also pull requests.

## Supported Environments

Ask Kodiak JS supports all major modern browsers. If you choose to enable Ask Kodiak JS Promise support in your implementation and intend to support Internet Explorer, you'll need to implement a polyfill like https://github.com/taylorhakes/promise-polyfill. 

## Upgrading

Version 2 brings with it breaking changes. Make sure to review the [Ask Kodiak API Upgrade Guide](https://api.askkodiak.com/doc/v2/#api-Upgrade_Guides) before upgrading.

Changes to this library:

  * added **Product** method [`getConditionalRules`](#get-conditional-rules).
  * removed **Company** method `getCompanyProfile`.
  * added **Company** method [`getCompany`](#get-company) (replaces the above).
  * added **Analytics** method [`getReferrals`](#get-referrals).
  * added **Analytics** method [`getReferral`](#get-referral).
  * removed **Reference Data** method `getRefDataStates`.
  * added **Reference Data** method [`getRefDataGeos`](#geographies) (replaces the above).

## Documentation 

For a full list of options supported by each interface, see the [Ask Kodiak API](https://api.askKodiak.com/doc/) documentation.

----

### Products

#### Products for Code

Get products eligible for a given NAICS code. https://api.askkodiak.com/doc/v2/#api-Products-GetProductsForNAICSCode


##### Using Callbacks
```js

//return all products for the retail sector
askKodiak.productsForCode('44-45', options, callback);

// alternative example, all products for the retail sector for companies with 1,000,000 in annual revenue
// any valid optional request parameter for this interface can be passed in the options object.
askKodiak.productsForCode('44-45', {'annualRevenue':1000000}, callback);

```
##### Using Promises

```js
//return all products for the retail sector
askKodiak.productsForCode('44-45').then(function (response) {
  //handle response
}).catch(function (error) {
  // handle error
});
```

#### Products for Company

Get products for a given Company. https://api.askkodiak.com/doc/v2/#api-Products-GetProductsForCompany

##### Using Callbacks
```js

//return all products owned by the company with id -Nj840c1sd9nnByho
askKodiak.productsForCompany('-Nj840c1sd9nnByho', options, callback)

//return all BOP products owned by the company with id -Nj840c1sd9nnByho
askKodiak.productsForCompany('-Nj840c1sd9nnByho', {'productCodes': 'BOP'}, callback);

```

##### Using Promises
```js
//return all BOP products owned by the company with id -Nj840c1sd9nnByho
askKodiak.productsForCompany('-Nj840c1sd9nnByho', {'productCodes': 'BOP'}).then(function (response) {
  //handle response
}).catch(function (error) {
  // handle error
});
```

----

### Product

#### Get Product

Return a product with the specified id. https://api.askkodiak.com/doc/v2/#api-Product-GetProduct

##### Using Callbacks
```js

askKodiak.getProduct('-Kv9s36or1XZKVHvlYwx', options, callback);

```

##### Using Promises
```js
askKodiak.getProduct('-Kv9s36or1XZKVHvlYwx').then(function (product) {
  // handle response
}).catch(function (error) {
  // handle error
});
```

#### Check Eligibility for NAICS Code

Check the eligibility of a product for any valid 2-6 digit NAICS code or computed NAICS Hash. https://api.askkodiak.com/doc/v2/#api-Product-ProductIsEligibleForNAICSCode

##### Using Callbacks
```js
askKodiak.isProductEligibleForNaics('-Kv9s36or1XZKVHvlYwx', '44-45', options, callback);

```

##### Using Promises
```js
askKodiak.isProductEligibleForNaics('-Kv9s36or1XZKVHvlYwx', '44-45').then(function (response) {
  // handle response
}).catch(function (error) {
  // handle error
});
```

#### Get Eligibility By NAICS Group Type

Get the eligibility of a product at a given NAICS group level (`sector`, `subsector`, etc).https://api.askkodiak.com/doc/v2/#api-Product-ProductEligibilityByNAICSGroupType

##### Using Callbacks
```js
askKodiak.getEligibilityByNaicsGroupType('-Kv9s36or1XZKVHvlYwx', 'sector', options, callback);

```

##### Using Promises
```js
askKodiak.getEligibilityByNaicsGroupType('-Kv9s36or1XZKVHvlYwx', 'sector').then(function (response) {

}).catch(function (error) {
  // handle error
});
```

#### Render Conditional Content

Render conditional content for the product associated with the specified conditions. https://api.askkodiak.com/doc/v2/#api-Product-RenderConditionalContent

##### Using Callbacks
```js

askKodiak.renderConditionalContent('-Kv9s36or1XZKVHvlYwx', { naicsGroups: '44-45', geos: 'US-MA' }, callback);
```

##### Using Promises
```js

askKodiak.renderConditionalContent('-Kv9s36or1XZKVHvlYwx', { naicsGroups: '44-45', geos: 'US-MA' }).then(function (response) {
  // handle response
}).catch(function (error) {
  // handle error
});

```

#### Get Conditional Rules

Get unprocessed conditional rules for the requested product. **Please note, this interface exists primarily for debugging**. The rules expressed in the response are automatically applied to other product interfaces based on the parameters of the specific request. This interface simply provides a getter for all the rules that have been specified for a product.
https://api.askkodiak.com/doc/v2/#api-Product-GetConditionalRulesForProduct

##### Using Callbacks
```js

askKodiak.getConditionalRules('-Kv9s36or1XZKVHvlYwx', {}, callback);
```

##### Using Promises
```js

askKodiak.getConditionalRules('-Kv9s36or1XZKVHvlYwx', {}).then(function (response) {
  // handle response
}).catch(function (error) {
  // handle error
});

```

----

### Company

#### Get Companies

Get the basic information about companies with storefronts on Ask Kodiak, including their name, website, and other descriptive information as available. https://api.askkodiak.com/doc/v2/#api-Company-GetCompanies

##### Using Callbacks
```js

askKodiak.getCompanies(options, callback)

```

##### Using Promises
```js
askKodiak.getCompanies().then(function (companies) {
  //handle response
}).catch(function (error) {
  //handle error
});
```

#### Get Company

Get the basic information about a company on Ask Kodiak. https://api.askkodiak.com/doc/v2/#api-Company-GetCompany

##### Using Callbacks
```js
// get the profile of the company by it's id
askKodiak.getCompany('-L635HNnakPWk0QNHat-', options, callback);

```

##### Using Promises
```js
askKodiak.getCompany('-L635HNnakPWk0QNHat-').then(function (company) {
  // handle response
}).catch(function (error) {
  // handle error
});
```

----

### NAICS

#### Get Code

Decode a NAICS MD5 hash into the 6 digit naics code and sub-description it represents. https://api.askkodiak.com/doc/v2/#api-NAICS-GetNaicsCode

##### Using Callbacks
```js
askKodiak.getNaicsCode('0000dc045c872f122d694ef600c394df', options, callback);
/*
  { 
    code: '621511',
    description: 'Pathology laboratories, medical',
    hash: '0000dc045c872f122d694ef600c394df' 
  }
*/
```

##### Using Promises
```js

askKodiak.getNaicsCode('0000dc045c872f122d694ef600c394df').then(function (code) {
  // handle response
  /*

  { code: '621511',
  description: 'Pathology laboratories, medical',
  hash: '0000dc045c872f122d694ef600c394df' }

  */
}).catch(function (error) {
  // handle error
});

```

#### Get Codes

Get all computed NAICS hashes. Heads up, this is a big hunk of data. We recommend that you cache a copy on your end for best performance.
https://api.askkodiak.com/doc/v2/#api-NAICS-GetNaicsCodes

##### Using Callbacks
```js
askKodiak.getNaicsCodes(options, callback);
```

##### Using Promises
```js

askKodiak.getNaicsCodes().then(function (code) {
  //big wad-o-data
}).catch(function (error) {
  // handle error
});

```

#### Get Description

Get a description for a NAICS group. https://api.askkodiak.com/doc/v2/#api-NAICS-GetNaicsDescription

##### Using Callbacks
```js
askKodiak.getNaicsDescription('811310', options, callback);
```

##### Using Promises
```js
askKodiak.getNaicsDescription('811310').then(function (response) {
  // handle response
}).catch(function (error) {
  // handle error
});
```

#### Get Group

Get any given NAICS group using its numerical group number. https://api.askkodiak.com/doc/v2/#api-NAICS-GetNaicsGroup

##### Using Callbacks
```js
askKodiak.getNaicsGroup('8113', options, callback);
```

##### Using Promises
```js
askKodiak.getNaicsGroup('8113').then(function (response) {
  // handle response
}).catch(function (error) {
  // handle error
});
```

#### Get Path

Given a code, return it's NAICS parentage. https://api.askkodiak.com/doc/v2/#api-NAICS-GetNaicsGroupPath

##### Using Callbacks
```js
//As Array...
askKodiak.getNaicsPath('488190', {}, callback); //{ path: [ '48-49', '488', '4881', '48819', '488190' ] 

// As Object...
askKodiak.getNaicsPath('488190', {'asObject': true}, callback);
/*

{ 
  sector: '48-49',
  subsector: '488',
  industryGroup: '4881',
  internationalIndustry: '48819',
  nationalIndustry: '488190' 
}

*/

```

##### Using Promises
```js
//As Array...
askKodiak.getNaicsPath('488190').then(function (response) {
  // handle response
  //{ path: [ '48-49', '488', '4881', '48819', '488190' ] }
}).catch(function (error) {
  // handle error
});

// As Object...
askKodiak.getNaicsPath('488190', {'asObject': true}).then(function (response) {
  // handle response
  /*

    { sector: '48-49',
      subsector: '488',
      industryGroup: '4881',
      internationalIndustry: '48819',
      nationalIndustry: '488190' }

  */
}).catch(function (error) {
  // handle error
});
```

#### Get Sectors

Get detailed information about all NAICS sectors.  Heads up, this is a big hunk of data. We recommend that you cache a copy on your end for best performance. https://api.askkodiak.com/doc/v2/#api-NAICS-GetNaicsSectors

##### Using Callbacks
```js
askKodiak.getNaicsSectors(options, callback);
```

##### Using Promises
```js

askKodiak.getNaicsSectors().then(function (response) {
  // handle response
}).catch(function (error) {
  // handle errors
});

```

#### Get Summary for Group Type

Get a comprehensive list of all valid naics groups of the requested type.  https://api.askkodiak.com/doc/v2/#api-NAICS-GetNAICSSummaryForGroupType

##### Using Callbacks
```js
askKodiak.getNaicsSummaryForGroupType('sector', options, callback);
/*
  {
    '11': 'Agriculture, Forestry, Fishing and Hunting',
    '21': 'Mining, Quarrying, and Oil and Gas Extraction',
    '22': 'Utilities',
    '23': 'Construction',
    '42': 'Wholesale Trade',
    '51': 'Information',
    '52': 'Finance and Insurance',
    '53': 'Real Estate and Rental and Leasing',
    '54': 'Professional, Scientific, and Technical Services',
    '55': 'Management of Companies and Enterprises',
    '56': 'Administrative and Support and Waste Management and Remediation Services',
    '61': 'Educational Services',
    '62': 'Health Care and Social Assistance',
    '71': 'Arts, Entertainment, and Recreation',
    '72': 'Accommodation and Food Services',
    '81': 'Other Services (except Public Administration)',
    '92': 'Public Administration',
    '31-33': 'Manufacturing',
    '44-45': 'Retail Trade',
    '48-49': 'Transportation and Warehousing'
  }

*/

```

##### Using Promises
```js

askKodiak.getNaicsSummaryForGroupType('sector').then(function (response) {
  // handle response
  /*
  {
    '11': 'Agriculture, Forestry, Fishing and Hunting',
    '21': 'Mining, Quarrying, and Oil and Gas Extraction',
    '22': 'Utilities',
    '23': 'Construction',
    '42': 'Wholesale Trade',
    '51': 'Information',
    '52': 'Finance and Insurance',
    '53': 'Real Estate and Rental and Leasing',
    '54': 'Professional, Scientific, and Technical Services',
    '55': 'Management of Companies and Enterprises',
    '56': 'Administrative and Support and Waste Management and Remediation Services',
    '61': 'Educational Services',
    '62': 'Health Care and Social Assistance',
    '71': 'Arts, Entertainment, and Recreation',
    '72': 'Accommodation and Food Services',
    '81': 'Other Services (except Public Administration)',
    '92': 'Public Administration',
    '31-33': 'Manufacturing',
    '44-45': 'Retail Trade',
    '48-49': 'Transportation and Warehousing'
  }

  */
}).catch(function (error) {
  // handle error
});

```

#### Get Summary

Get a comprehensive list of all valid naics groups indexed by type (e.g. sector, subsector, industry-group, international-industry, or national-industry). https://api.askkodiak.com/doc/v2/#api-NAICS-GetNAICSSummary

##### Using Callbacks
```js
askKodiak.getNaicsSummary(options, callback);
  
```

##### Using Promises
```js

askKodiak.getNaicsSummary().then(function (response) {
  // handle response
}).catch(function (error) {
  // handle error
});

```

----

### Admin

#### Products

Get products owned by your your group regardless of their permission. https://api.askkodiak.com/doc/v2/#api-Admin-AdminGetProducts.

##### Using Callbacks
```js
// all products
askKodiak.adminGetProducts(options, callback);

// all products with eligibility in VA
askKodiak.adminGetProducts({geos: 'US-VA'}, callback);
```

##### Using Promises
```js
// all products
askKodiak.adminGetProducts().then(function (response) {
  // handle response
}).catch(function (error) {
  // handle error
});

// all products with eligibility in VA
askKodiak.adminGetProducts({geos: 'US-VA'}).then(function (response) {
  // handle response
}).catch(function (error) {
  // handle error
});
```
----

### Analytics

#### Track Event

Track an event (for example a search or a user action). https://api.askkodiak.com/doc/v2/#api-Analytics-TrackEvent

##### Using Callbacks
```js
// track an event with the name 'inbound-referral' and pass it the specified data
askKodiak.trackEvent('inbound-referral', {'referrer': 'https://www.google.com'}, callback);

```

##### Using Promises
```js
// track an event with the name 'inbound-referral' and pass it the specified data
askKodiak.trackEvent('inbound-referral', {'referrer': 'https://www.google.com'}).then(function (response) {
  // handle response
  //{ created: true }
}).catch(function (error) {
  // handle error
});
```

#### Get Referrals

Retrieve all of your groups referrals from Ask Kodiak. https://api.askkodiak.com/doc/v2/#api-Analytics-GetReferrals

##### Using Callbacks
```js

askKodiak.getReferrals(options, callback)

```

##### Using Promises
```js
askKodiak.getReferrals().then(function (companies) {
  //handle response
}).catch(function (error) {
  //handle error
});
```

#### Get Referral

Retrieve the details of a referral using it's id. https://api.askkodiak.com/doc/v2/#api-Analytics-GetReferral

##### Using Callbacks
```js

askKodiak.getReferral('-L876NNhjuPWk0QNTay-', options, callback);

```

##### Using Promises
```js
askKodiak.getReferral('-L876NNhjuPWk0QNTay-d').then(function (company) {
  // handle response
}).catch(function (error) {
  // handle error
});
```

----

### Reference Data

#### Business Entity Types

Get a list of business entity types for use decoding the coded values associated with a product. https://api.askkodiak.com/doc/v2/#api-Reference_Data-BusinessEntityTypes

##### Using Callbacks
```js
askKodiak.getRefDataEntityTypes(options, callback);
/*
  {
    AS: 'Association',
    CA: 'Condo Association',
    CC: 'City Commission',
    CCORP: 'C Corporation',
    ...
  }
*/
```

##### Using Promises
```js
askKodiak.getRefDataEntityTypes().then(function (response) {
  // handle response
  /*
  {
    AS: 'Association',
    CA: 'Condo Association',
    CC: 'City Commission',
    CCORP: 'C Corporation',
    ...
  */
}).catch(function (error) {
  // handle error
});
```

#### Product Codes

Get a list of product codes for use decoding the coded values associated with a product.  https://api.askkodiak.com/doc/v2/#api-Reference_Data-ProductCodes

##### Using Callbacks
```js
askKodiak.getRefDataProductCodes(options, callback);  
/*
{
  ACCT: 'Accountants Professional',
  ACHE: 'Accident and Health',
  AGENTS: 'Insurance Agents',
  AGLIA: 'Agriculture Liability',
  ...
}
*/

```

##### Using Promises
```js
askKodiak.getRefDataProductCodes().then(function (response) {
  // handle response
  /*
  {
    ACCT: 'Accountants Professional',
    ACHE: 'Accident and Health',
    AGENTS: 'Insurance Agents',
    AGLIA: 'Agriculture Liability',
    ...
  }
  */
}).catch(function (error) {
  // handle error
});
```

#### Geographies

Get geographies supported by Ask Kodiak as objects indexed by an ISO 3166-2 code. For more information on the ISO 3166 standard, see https://www.iso.org/iso-3166-country-codes.html. https://api.askkodiak.com/doc/v2/#api-Reference_Data-Geographies

##### Using Callbacks
```js
askKodiak.getRefDataGeos(options, callback);

```

##### Using Promises
```js
askKodiak.getRefDataGeos().then(function (response) {
  // handle response
}).catch(function (error) {
  // handle error
});
```

----

### Suggest

If your application has a scenario where the user needs to type in a NAICS code, these interfaces are great for making suggestions in a type-ahead control.

#### Naics Codes

Get suggested hashes associated with a search term. https://api.askkodiak.com/doc/v2/#api-Suggest-NAICSCodes

##### Using Callbacks
```js
// returns 20 hits...
askKodiak.suggestNaicsCodes('ro', {}, callback);

// returns 100 hits...
askKodiak.suggestNaicsCodes('ro', { hitsPerPage: '100' } callback);
```

##### Using Promises
```js
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
```

#### Naics Groups

Get suggested 2-6 digit NAICS groups for a search term.
https://api.askkodiak.com/doc/v2/#api-Suggest-NAICSGroups

##### Using Callbacks
```js
// returns 20 hits...
askKodiak.suggestNaicsGroups('ro', {}, callback);

// page three of results 5 pages at a time..
askKodiak.suggestNaicsGroups('ro', { hitsPerPage: 5, page: 3 }, callback);
```

##### Using Promises
```js
// returns 20 hits...
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
```
