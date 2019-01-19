function AskKodiak(gid, key, usePromises, url) {

  var auth = btoa(gid + ':' + key),
      baseURL = url || 'https://api.askkodiak.com/v2'; 

  usePromises = usePromises || false; 

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
      requestParams += encodeURI(paramName); 
      requestParams += '=';
      requestParams += encodeURI(paramsObj[paramName]); 
      requestParams += '&';
    }

    if (requestParams.length > 0) {
      requestParams = requestParams.substring(0, requestParams.length - 1);
    }

    return requestParams;

  }

  function makeRequest(req, callback, data) {
    data = data || null;
    if (data) {
      data = JSON.stringify(data);
    }
    req.setRequestHeader('Authorization', 'Basic ' + auth);

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

    var params = paramsToString(opts), 
        uri = baseURL + relativeUrl + params,
        req = new XMLHttpRequest();

    req.open('GET', uri, true);

    return makeRequest(req, callback);

  }

  this.productsForCode = function (code, opts, callback) {
    return get('/products/class-code/naics/' + code, opts, callback);
  };
  this.productsForCompany = function (gid, opts, callback) {
    return get('/products/company/' + gid, opts, callback);
  };

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

  this.getCompanies = function (opts, callback) {
    return get('/companies/', opts, callback);
  };
  this.getCompany = function (gid, opts, callback) {
    return get('/company/' + gid, opts, callback);
  };

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

  this.adminGetProducts = function (opts, callback) {
    return get('/admin/products/', opts, callback);
  };

  this.getReferrals = function (opts, callback) {
    return get('/analytics/referrals/', opts, callback);
  };
  this.getReferral = function (id, opts, callback) {
    return get('/analytics/referral/' + id, opts, callback);
  };
  this.trackEvent = function (eventName, eventData, callback) {
    return post('/analytics/track/' + eventName, eventData, callback);
  };

  this.getRefDataEntityTypes = function (opts, callback) {
    return get('/ref-data/business-entity-types/', opts, callback);
  };
  this.getRefDataProductCodes = function (opts, callback) {
    return get('/ref-data/product-codes/', opts, callback);
  };
  this.getRefDataGeos = function (opts, callback) {
    return get('/ref-data/geos/', opts, callback);
  };
  this.suggestNaicsCodes = function (term, opts, callback) {
    return get('/suggest/naics-codes/' + term, opts, callback);
  };
  this.suggestNaicsGroups = function (term, opts, callback) {
    return get('/suggest/naics-groups/' + term, opts, callback);
  };

}
