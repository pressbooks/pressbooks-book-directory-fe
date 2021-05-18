import config from './modules/config';

function setFilters(oldFilters, allowedFilters) {
  let fs = [], ns = [], strQuery = '', f = {};
  let query = [], queryExcluded = [], numerics = {}, q =[];
  let qtyAttr = Object.keys(oldFilters).length;
  for (let attribute in oldFilters) {
    q = [];
    for (let i =0; i < oldFilters[attribute].length; i++) {
      f = oldFilters[attribute][i];
      strQuery = ':';
      if (f.exclude) {
        if (allowedFilters[attribute].type !== 'boolean') {
          strQuery = ':-';
        }
        queryExcluded.push(f.attribute + strQuery + f.value);
      } else {
        if (f.operator !== undefined) {
          if (numerics[f.attribute] === undefined) {
            numerics[f.attribute] = [];
          }
          numerics[f.attribute].push(f);
        } else {
          q.push(f.attribute + strQuery + f.value);
        }
      }
    }
    if (q.length > 0) {
      query.push(q);
    }
  }
  if (queryExcluded.length > 0 && query.length > 0) {
    if (qtyAttr === 1) {
      fs.push(query);
    } else {
      fs = query;
    }
    fs = fs.concat(queryExcluded);
  }
  if (query.length > 0 && queryExcluded.length === 0) {
    fs = fs.concat(query);
  }
  if (query.length === 0 && queryExcluded.length > 0) {
    fs = fs.concat(queryExcluded);
  }
  for (let attr in numerics) {
    if (numerics[attr].length > 1) {
      let v1 = numerics[attr][0].value;
      let v2 = numerics[attr][1].value;
      if (attr === 'storageSize') {
        v1 = numerics[attr][0].value * 1024 * 1024;
        v2 = numerics[attr][1].value * 1024 * 1024;
      }
      ns.push(attr + ':' + v1 + ' TO ' + v2);
    } else {
      let v3 = numerics[attr][0].value;
      if (attr === 'storageSize') {
        v3 = numerics[attr][0].value * 1024*1024;
      }
      strQuery = numerics[attr][0].operator;
      ns.push(attr + strQuery + v3);
    }
  }
  return [fs, ns.join(' AND ')];
}

/*
Get all matches string for a value and facet.
  @param facet - String Alias Facet
  @param value - Facet value to search (non case sensitive)
  @param filtersAvailable - Object with all facets and values available
  @param realAttrs - Mapped object alias/Real attribute
  @return Array with all possible values
*/
function getSimilarFacetValues(facet, value, filtersAvailable, realAttrs) {
  value = value.replace(/"/g,'');
  // negative facet value
  if (value[0] === '-') {
    value = value.slice(1, value.length);
  }
  let fAvailable = {};
  let possibleValues = [];
  for (const rAttr in filtersAvailable) {
    fAvailable[rAttr] = [];
    for (let i = 0; i < filtersAvailable[rAttr].length; i++) {
      fAvailable[rAttr].push(filtersAvailable[rAttr][i].facet);
    }
  }
  let matches = fAvailable[realAttrs[facet]].filter(
    function(e) {
      return e.toLowerCase().search(value.toLowerCase()) >= 0;
    }
  );
  if (matches.length > 0) {
    for(let i = 0; i < matches.length; i++) {
      matches[i] = (matches[i].search(' ') >= 0) ? '"' + matches[i] + '"' : matches[i];
      possibleValues.push(matches[i]);
    }
  }
  return possibleValues;
}

/*
Set paramsFilters according to numeric and search filters
  @param numericFilters - String with conditions for numeric filters
  @param searchFilters - String with conditions for filters from search box
*/
function setParamsFilters(numericFilters, searchFilters) {
  let filtersParams = '';
  if (searchFilters.length > 0) {
    if (numericFilters.length > 0) {
      filtersParams = '(' + numericFilters + ') AND (' + searchFilters + ')';
    } else {
      filtersParams = searchFilters;
    }
  } else {
    filtersParams = numericFilters;
  }
  return filtersParams;
}

function unescapeHTML(text) {
  if (text) {
    let domText = document.createElement('textarea');
    domText.innerHTML = text;
    return domText.value;
  }
  return text;
}

function setNumericFilters(filters, state) {
  let nf = setFilters(filters, state.allowedFilters);
  state.notFilters = nf[0];
  state.hasNumeric = (nf[1].length > 0);
  state.numericFilters = nf[1];
  state.filtersParams = setParamsFilters(state.numericFilters, state.searchFilters);
}

function getLowerCaseAlphanumericAndHyphen(str) {
  return str.replaceAll(/[^a-zA-Z0-9_]+/ig,'-').toLowerCase();
}

/**
 * Get Icon file and Alt text for a license given the license name
 * @param licenseName
 * @returns {{image: boolean, alt: boolean}|{image: string, alt: string}}
 */
function getLicenseIconAndAltByLicenseName(licenseName) {
  if (licenseName === undefined) {
    return {image: false, alt: false};
  }

  const key = licenseName.toLowerCase().split(' ').join('-');
  const license = config.state.licenseIcons[key || 'public-domain'] ;

  return {
    image: `${config.state.imagesPath}licenses/${license.image}`,
    alt: license.alt
  };
}

export default {
  functions: {
    setFilters,
    getSimilarFacetValues,
    setParamsFilters,
    unescapeHTML,
    setNumericFilters,
    getLowerCaseAlphanumericAndHyphen,
    getLicenseIconAndAltByLicenseName
  }
};