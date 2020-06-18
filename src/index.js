
const RestHeartSDKFactory = require('./sdkFactory');
const getHTTPClient = require('./httpClient');
module.exports = function getDBClient (url, username, password) {
    const authorization = `Basic ${Buffer.from(`${username}:${password}`).toString('base64')}`;

    const httpClient = getHTTPClient(url, { Authorization: authorization });

    return RestHeartSDKFactory(httpClient);
}