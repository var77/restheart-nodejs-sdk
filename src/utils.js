const buildQueryString = (options) => {
    // { filter, sort, page, pageSize, keys } = options;
    return Object.entries(options).reduce((queryString, paramOptions) => {
        if (paramOptions[1] == undefined) return queryString;

        return addToQuery(queryString, ...paramOptions);
    }, '');
}


const addToQuery = (queryStr, paramName, paramValue) => {
    if (queryStr && !queryStr.endsWith('&'))
        queryStr += '&';

    if (!queryStr)
        queryStr += '?';

    queryStr += `${paramName}=`;

    return queryStr += typeof paramValue === 'object' ? JSON.stringify(paramValue) : paramValue;
}


const mergeURL = (url, path) => {
    if (url.endsWith('/'))
        url = url.slice(0, -1);
    if (path.startsWith('/'))
        path = path.slice(1);
    
    return `${url}/${path}`;
}

exports.buildQueryString = buildQueryString;
exports.mergeURL = mergeURL;