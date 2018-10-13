# Ask Kodiak JS

## Table of Contents

 * [Overview](#overview)
 * [Installation](#installation)
 * [Contributing](#contributing)
 * [Documentation](#documentation)

## Overview 

Ask Kodiak JS is a dependency free implementation of the [Ask Kodiak API](https://api.askkodiak.com/doc/) for browser environments. API Keys are required to use, you can obtain those keys from Company Settings once you've created an account.

## Installation

Ask Kodiak JS is available on npm as `ask-kodiak-js`.

```bash
$ npm install --save ask-kodiak-js
```

To use Ask Kodiak JS, include the JavaScript file in your page, instantiate, and go.

```html
<script src="ask-kodiak-js/dist/ask-kodiak-js.js"></script>
<script>
  var askKodiak = new AskKodiak('GROUP_ID', 'KEY'), //instantiate using your key and group id. get these from comapny settings in Ask Kodiak.
      callback = function (response) {
        console.log(response);
      };

  askKodiak.productsForCode('44-45', {}, callback); // get all products for the retail NAICS sector
  askKodiak.productsForCode('44-45', {'productCodes': 'BOP'}, callback); // get all products for the retail NAICS sector that are BOP
  askKodiak.productsForCode('44-45', {'entityTypes': 'AS+CCORP', 'productCodes': 'BOP'}, callback); // get all BOP products for the retail NAICS sector that accept Associations and C Corps as entity types
  askKodiak.trackEvent('test', {foo: 'bar'}, callback); // track an event called 'test' with one property, foo, that has a value of bar.
  
</script>

Your API keys give read access to your content on Ask Kodiak. Be sure to keeep them safe. If you consider the information your company has added to Ask Kodiak sensitive, be sure to keep these keys behind a login screen in your app. 

```

## Contributing

Please refer to the [CONTRIBUTING page](./CONTRIBUTING.md) for more information
about how you can contribute to this project. We welcome bug reports, feature
requests, code review feedback, and also pull requests.

## Supported Environments

Ask Kodiak JS supports all major modern browsers (yes, including Internet Explorer although we can argue the word 'modern' in that case) and uses XMLHTTPRequest with callbacks. 

## Documentation 

**For a full list of options supported by each interface, see the [Ask Kodiak API](https://api.askkodiak.com/doc/) documentation. **

### Basic Usage

