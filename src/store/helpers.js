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

export default {
    functions: {
        setFilters
    }
};