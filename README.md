# Ask Kodiak JS

## Table of Contents

 * [Overview](#overview)
 * [Installation](#installation)
 * [Basic Usage](#basic-usage) 
 * [Contributing](#contributing)
 * [Supported Enviornments](#supported-environments) 
 * [Documentation](#documentation)

## Overview 

Ask Kodiak JS is a dependency free implementation of the [Ask Kodiak API](https://api.askKodiak.com/doc/) for browser environments. API Keys are required to use, you can obtain those keys from Company Settings once you've created an account.

## Installation

Ask Kodiak JS is available on npm as `ask-kodiak-js`.

```bash
$ npm install --save ask-kodiak-js
```

## Basic Usage

To use Ask Kodiak JS, include the JavaScript file in your page, instantiate, and go.

```html
<script src="ask-kodiak-js/dist/ask-kodiak-js.js"></script>
<script>
  var askKodiak.= new askKodiak.'GROUP_ID', 'KEY'), //instantiate using your key and group id. get these from comapny settings in Ask Kodiak.
      callback = function (response) {
        console.log(response);
      };

  askKodiak.productsForCode('44-45', {}, callback); // get all products for the retail NAICS sector
  askKodiak.productsForCode('44-45', {'productCodes': 'BOP'}, callback); // get all products for the retail NAICS sector that are BOP
  askKodiak.productsForCode('44-45', {'entityTypes': 'AS+CCORP', 'productCodes': 'BOP'}, callback); // get all BOP products for the retail NAICS sector that accept Associations and C Corps as entity types
  askKodiak.trackEvent('test', {foo: 'bar'}, callback); // track an event called 'test' with one property, foo, that has a value of bar.
  
</script>

```

Your API keys give read access to your content on Ask Kodiak. Be sure to keeep them safe. If you consider the information your company has added to Ask Kodiak sensitive, be sure to keep these keys behind a login screen in your app. 

For any API request that supports optional request parameters, pass an `options` object to the method with those values. For example, if making a request where it's important to filter by state and owner, you would pass the following `options` object to the method: 

```js
{
  'states': 'MN+HI',
  'owners': 'ABC123'
}
```

## Contributing

Please refer to the [CONTRIBUTING page](./CONTRIBUTING.md) for more information
about how you can contribute to this project. We welcome bug reports, feature
requests, code review feedback, and also pull requests.

## Supported Environments

Ask Kodiak JS supports all major modern browsers (yes, including Internet Explorer although we can argue the word 'modern' in that case) and uses XMLHTTPRequest with callbacks. 

## Documentation 

**For a full list of options supported by each interface, see the [Ask Kodiak API](https://api.askKodiak.com/doc/) documentation. **


### Products

#### Products for Code

Get products eligible for a given NAICS code. https://api.askKodiak.com/doc/#api-Products-GetProductsForNAICSCode

```js

//return all products for the retail sector
askKodiak.productsForCode('44-45', options, callback);

// alternative example, all products for the retail sector for companies with 1,000,000 in annual revenue
// any valid optional request parameter for this interface can be passed in the options object.
askKodiak.productsForCode('44-45', {'annualRevenue':1000000}, callback);

```

#### Products for Company

Get products for a given Company. https://api.askKodiak.com/doc/#api-Products-GetProductsForCompany

```js

//return all products owned by the company with id -Nj840c1sd9nnByho
askKodiak.productsForCompany('-Nj840c1sd9nnByho', options, callback)

//return all BOP products owned by the company with id -Nj840c1sd9nnByho
askKodiak.productsForCompany('-Nj840c1sd9nnByho', {'productCodes': 'BOP'}, callback);

```

#### Product

#### Get Product

Return a product with the specified id. https://api.askKodiak.com/doc/#api-Product-GetProduct

```js

//return all product with the given id
askKodiak.getProduct('-Kv9s36or1XZKVHvlYwx', options, callback);

```

### Company

#### Get Companies

Get the basic information about companies with storefronts on Ask Kodiak, including their name, website, and other descriptive information as available. https://api.askKodiak.com/doc/#api-Company-GetCompanies

```js

//get all companies on Ask Kodiak
askKodiak.getCompanies(options, callback)

```

#### Get Company Profile

Get the basic information about a company on Ask Kodiak. https://api.askKodiak.com/doc/#api-Company-GetProfile

```js
// get the profile of the company by it's id
askKodiak.getCompanyProfile('-L635HNnakPWk0QNHat-', options, callback);

```

### NAICS

#### Get Code

Decode a NAICS MD5 hash into the 6 digit naics code and sub-description it represents. https://api.askKodiak.com/doc/#api-NAICS-GetNaicsCode

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

#### Get Codes

Get all computed NAICS hashes. Heads up, this is a big hunk of data. We recommend that you cache a copy on your end for best performance.
https://api.askKodiak.com/doc/#api-NAICS-GetNaicsCodes

```js
askKodiak.getNaicsCodes(options, callback);
```

#### Get Description

Get a description for a NAICS group. https://api.askKodiak.com/doc/#api-NAICS-GetNaicsDescription

```js
askKodiak.getNaicsDescription('811310', options, callback);
```

#### Get Group

Get any given NAICS group using its numerical group number. https://api.askKodiak.com/doc/#api-NAICS-GetNaicsGroup

```js
askKodiak.getNaicsGroup('8113', options, callback);
```

#### Get Path

Given a code, return it's NAICS parentage. https://api.askKodiak.com/doc/#api-NAICS-GetNaicsGroupPath

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

#### Get Sectors

Get detailed information about all NAICS sectors.  Heads up, this is a big hunk of data. We recommend that you cache a copy on your end for best performance. https://api.askKodiak.com/doc/#api-NAICS-GetNaicsSectors

```js
askKodiak.getNaicsSectors(options, callback);
```

#### Get Summary for Group Type

Get a comprehensive list of all valid naics groups of the requested type.  https://api.askKodiak.com/doc/#api-NAICS-GetNAICSSummaryForGroupType

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

#### Get Summary

Get a comprehensive list of all valid naics groups indexed by type (e.g. sector, subsector, industry-group, international-industry, or national-industry). https://api.askKodiak.com/doc/#api-NAICS-GetNAICSSummary

```js
askKodiak.getNaicsSummary(options, callback);
  
```

### Admin

#### Products

Get products owned by your your group regardless of their permission. https://api.askKodiak.com/doc/#api-Admin-AdminGetProducts.

```js
// all products
askKodiak.adminGetProducts(options, callback);

// all products with eligibility in VA
askKodiak.adminGetProducts({states: 'VA'}, callback);
```

### Analytics

#### Track Event

Track an event (for example a search or a user action). https://api.askKodiak.com/doc/#api-Analytics-TrackEvent

```js
// track an event with the name 'inbound-referral' and pass it the specified data
askKodiak.trackEvent('inbound-referral', {'referer': 'https://www.google.com'}, callback);

```

### Product Utils

#### Check Eligibility for NAICS Code

Check the eligibility of a product for any valid 2-6 digit NAICS code or computed NAICS Hash. https://api.askKodiak.com/doc/#api-Product_Utils-ProductIsEligibleForHash

```js
askKodiak.isProductEligibleForNaics('-Kv9s36or1XZKVHvlYwx', '44-45', options, callback);

```

#### Render Conditional Content

Render conditional content for the product associated with the specified conditions. https://api.askKodiak.com/doc/#api-Product_Utils-RenderConditionalContentForProduct

```js

askKodiak.renderConditionalContent('-Kv9s36or1XZKVHvlYwx', { naicsGroups: '44-45', states: 'MA' }, callback);
```

### Reference Data

#### Business Entity Types

Get a list of business entity types for use decoding the coded values associated with a product. https://api.askKodiak.com/doc/#api-Reference_Data-BusinessEntityTypes

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

#### Product Codes

Get a list of product codes for use decoding the coded values associated with a product.  https://api.askKodiak.com/doc/#api-Reference_Data-ProductCodes

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

#### States

Get a list of US State name/value pairs. https://api.askKodiak.com/doc/#api-Reference_Data-States

```js
askKodiak.getRefDataStates(options, callback);
/*
{
  AK: 'Alaska',
  AL: 'Alabama',
  AR: 'Arkansas',
  AZ: 'Arizona',
  ...
}
*/
```

### Suggest

If your application has a scenario where the user needs to type in a NAICS code, these interfaces are great for making suggestions in a typeahead control.

#### Naics Codes

Get suggested hashes associated with a search term. https://api.askKodiak.com/doc/#api-Suggest-NAICSCodes

```js
// returns 20 hits...
askKodiak.suggestNaicsCodes('ro', {}, callback);

// returns 100 hits...
askKodiak.suggestNaicsCodes('ro', { hitsPerPage: '100' } callback);
```

#### Naics Groups

Get suggested 2-6 digit NAICS groups for a search term.
https://api.askKodiak.com/doc/#api-Suggest-NAICSGroups

```js
// returns 20 hits...
askKodiak.suggestNaicsGroups('ro', {}, callback);

// page three of results 5 pages at a time..
askKodiak.suggestNaicsGroups('ro', { hitsPerPage: 5, page: 3 }, callback);
```
