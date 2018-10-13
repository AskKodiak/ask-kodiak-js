/* eslint-disable no-unused-vars */
function AskKodiak(gid, key, useURL) {

  var auth = btoa(gid + ':' + key),
      baseURL = useURL || 'https://api.askkodiak.com/v1'; //use the default url unless otherwise requested

  //returns request params as a string, or any empty string if none
  function paramsToString(paramsObj) {
    var params,
        requestParams = '',
        i,
        paramName;

    paramsObj = paramsObj || {};
    params = Object.keys(paramsObj);

    if (params.length > 0) {
      requestParams += '?';
    }

    for (i = 0; i < params.length; i++) {
      paramName = params[i];
      requestParams += encodeURI(paramName); //parameter name
      requestParams += '=';
      requestParams += encodeURI(paramsObj[paramName]); // parameter value
      requestParams += '&';
    }

    if (requestParams.length > 0) {
      requestParams = requestParams.substring(0, requestParams.length - 1);//chop of the trailing ampersand
    }

    return requestParams;

  }

  function post(relativeUrl, data, callback) {
    var uri = baseURL + relativeUrl,
        req = new XMLHttpRequest();

    req.open('POST', uri, true);
    req.setRequestHeader('Authorization', 'Basic ' + auth);
    req.setRequestHeader('Content-Type', 'text/json');
    req.onload = function () {
      var data = JSON.parse(this.response);
      if (req.status === 200) {
        callback(data);
      } else {
        throw new Error(req);
      }
    };
    req.send(data);

    return req;

  }

  function get(relativeUrl, opts, callback) {

    var params = paramsToString(opts), //turn the options object into a string of request parameters
        uri = baseURL + relativeUrl + params,
        req = new XMLHttpRequest();

    req.open('GET', uri, true);
    req.setRequestHeader('Authorization', 'Basic ' + auth);
    req.onload = function () {
      var data = JSON.parse(this.response);
      if (req.status === 200) {
        callback(data);
      } else {
        throw new Error(req);
      }
    };
    req.send();

    return req;

  }

  // PRODUCTS
  this.productsForCode = function (code, opts, callback) {
    return get('/products/class-code/naics/' + code, opts, callback);
  };
  this.productsForCompany = function (gid, opts, callback) {
    return get('/products/company/' + gid, opts, callback);
  };

  // PRODUCT
  this.getProduct = function (pid, opts, callback) {
    return get('/product/' + pid, opts, callback);
  };

  // COMPANY
  this.getCompanies = function (opts, callback) {
    return get('/companies/', opts, callback);
  };
  this.getCompanyProfile = function (gid, opts, callback) {
    return get('/company/' + gid, opts, callback);
  };

  // NAICS
  this.getNaicsCode = function (hash, opts, callback) {
    return get('/naics/code/' + hash, opts, callback);
  };
  this.getNaicsCodes = function (opts, callback) {
    return get('/naics/codes/', opts, callback);
  };
  this.getNaicsDescription = function (groupNum, opts, callback) {
    return get('/naics/description/' + groupNum, opts, callback);
  };
  this.getNaicsGroup = function (groupNum, opts, callback) {
    return get('/naics/group/' + groupNum, opts, callback);
  };
  this.getNaicsPath = function (groupNum, opts, callback) {
    return get('/naics/utils/get-path/' + groupNum, opts, callback);
  };
  this.getNaicsSectors = function (opts, callback) {
    return get('/naics/sectors/', opts, callback);
  };
  this.getNaicsSummaryForGroupType = function (type, opts, callback) {
    return get('/naics/summary/' + type, opts, callback);
  };
  this.getNaicsSummary = function (opts, callback) {
    return get('/naics/summary/', opts, callback);
  };

  // ADMIN
  this.adminGetProducts = function (opts, callback) {
    return get('/admin/products/', opts, callback);
  };

  // ANALYTICS
  this.trackEvent = function (eventName, eventData, callback) {
    return post('/analytics/track/' + eventName, eventData, callback);
  };

  // PRODUCT UTILS
  this.isProductEligibleForNaics = function (pid, code, opts, callback) {
    return get('/product-utils/' + pid  + '/is-eligible-for/' + code, opts, callback);
  };
  this.renderConditionalContent = function (pid, opts, callback) {
    return get('/product-utils/conditional-content/' + pid, opts, callback);
  };
  // REF DATA
  this.getRefDataEntityTypes = function (opts, callback) {
    return get('/ref-data/business-entity-types/', opts, callback);
  };
  this.getRefDataProductCodes = function (opts, callback) {
    return get('/ref-data/product-codes/', opts, callback);
  };
  this.getRefDataStates = function (opts, callback) {
    return get('/ref-data/states/', opts, callback);
  };
  // SUGGEST
  this.suggestNaicsCodes = function (term, opts, callback) {
    return get('/suggest/naics-codes/' + term, opts, callback);
  };
  this.suggestNaicsGroups = function (term, opts, callback) {
    return get('/suggest/naics-groups/' + term, opts, callback);
  };

}
