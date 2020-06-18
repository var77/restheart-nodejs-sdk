const fetch = require('node-fetch')

const { mergeURL } = require('./utils');

const defaultHeaders = {
    'Content-Type': 'application/json'
};

module.exports = getHTTPClient = (url, headers) => {


    const get = async (path) => {
        try {
            const res = await fetch(mergeURL(url, path), { headers: { ...defaultHeaders, ...headers } });

            return res.json();
        } catch(err) {
            return null;
        }
    };

    const put = async (path, body) => {
        const res = await fetch(mergeURL(url, path), { 
            method: 'POST',
            body: JSON.stringify(body),
            headers: { ...defaultHeaders, ...headers }
         });
        return true;
    };

    const patch = async (path, body) => {
        const res = await fetch(mergeURL(url, path), { 
            method: 'PATCH',
            body: JSON.stringify(body),
            headers: { ...defaultHeaders, ...headers }
         });

        return true;
    };

    const deleteRequest = async (path) => {
        const res = await fetch(mergeURL(url, path), { 
            method: 'DELETE',
            headers: { ...defaultHeaders, ...headers }
         });

        return true;
    };

    return {
        get,
        patch,
        put,
        deleteRequest
    }
}