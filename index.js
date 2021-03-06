/* eslint-disable no-unused-vars */
function AskKodiak(gid, key, usePromises, url) {

  var auth = btoa(gid + ':' + key),
      baseURL = url || 'https://api.askkodiak.com/v2'; //use the default url unless otherwise requested

  usePromises = usePromises || false; //by default, do not use promises since IE does not support them.

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

  function makeRequest(req, callback, data) {
    data = data || null;
    if (data) {
      data = JSON.stringify(data);
    }
    // add authentication headers.
    req.setRequestHeader('Authorization', 'Basic ' + auth);

    // if promises requested, create one and return.
    if (usePromises === true) {
      return new Promise(function (resolve, reject) {
        req.onload = function () {
          if (req.status === 200) {
            return resolve(JSON.parse(this.response));
          } else {
            return reject(req);
          }
        };
        req.onerror = function () {
          return reject(req);
        };
        req.send(data);
      });
    } else {
      // promises not requested.
      req.onload = function () {
        if (req.status === 200) {
          callback(JSON.parse(this.response));
        } else {
          throw new Error(req);
        }
      };

      req.onerror = function () {
        throw new Error(req);
      };

      req.send(data);
      return req;
    }
  }

  function post(relativeUrl, data, callback) {
    var uri = baseURL + relativeUrl,
        req = new XMLHttpRequest();

    req.open('POST', uri);
    req.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');

    return makeRequest(req, callback, data);

  }

  function get(relativeUrl, opts, callback) {

    var params = paramsToString(opts), //turn the options object into a string of request parameters
        uri = baseURL + relativeUrl + params,
        req = new XMLHttpRequest();

    req.open('GET', uri, true);

    return makeRequest(req, callback);

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
  this.isProductEligibleForNaics = function (pid, code, opts, callback) {
    return get('/product/' + pid  + '/is-eligible-for/' + code, opts, callback);
  };
  this.getEligibilityByNaicsGroupType = function (pid, type, opts, callback) {
    return get('/product/' + pid  + '/eligibility-by-naics-type/' + type, opts, callback);
  };
  this.getConditionalRules = function (pid, opts, callback) {
    return get('/product/' + pid  + '/conditional-rules/', opts, callback);
  };
  this.renderConditionalContent = function (pid, opts, callback) {
    return get('/product/' + pid  + '/conditional-content/', opts, callback);
  };

  // COMPANY
  this.getCompanies = function (opts, callback) {
    return get('/companies/', opts, callback);
  };
  this.getCompany = function (gid, opts, callback) {
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
  this.getReferrals = function (opts, callback) {
    return get('/analytics/referrals/', opts, callback);
  };
  this.getReferral = function (id, opts, callback) {
    return get('/analytics/referral/' + id, opts, callback);
  };
  this.trackEvent = function (eventName, eventData, callback) {
    return post('/analytics/track/' + eventName, eventData, callback);
  };

  // REF DATA
  this.getRefDataEntityTypes = function (opts, callback) {
    return get('/ref-data/business-entity-types/', opts, callback);
  };
  this.getRefDataProductCodes = function (opts, callback) {
    return get('/ref-data/product-codes/', opts, callback);
  };
  this.getRefDataGeos = function (opts, callback) {
    return get('/ref-data/geos/', opts, callback);
  };
  // SUGGEST
  this.suggestNaicsCodes = function (term, opts, callback) {
    return get('/suggest/naics-codes/' + term, opts, callback);
  };
  this.suggestNaicsGroups = function (term, opts, callback) {
    return get('/suggest/naics-groups/' + term, opts, callback);
  };

}
