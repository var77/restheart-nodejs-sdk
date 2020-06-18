const { buildQueryString } = require('./utils');

function RestHeartSDKFactory (httpClient) {
    const { get, deleteRequest, put, patch } = httpClient;

    const find = async (collection, query, options = {}) => {
        const { sort, page, pageSize, keys } = options;
        const queryString = buildQueryString({ filter: query, sort, page, pageSize, keys});
        
        return get(`/${collection}${queryString}`);
    }   

    const findOne = async (collection, query, options) => {
        const docs = await find(collection, query, { ...options, page: 1, pageSize: 1 });
        return docs[0];
    }

    const findById = async (collection, id) => {
        return get(`/${collection}/${id}`);
    }

    const create = async (collection, data) => {
        return put(`/${collection}`, data);
    }

    const update = async (collection, query, update) => {
        return patch(`/${collection}/*${buildQueryString({ filter: query })}`, update);
    }

    const updateById = async (collection, id, update) => {
        return patch(`/${collection}/${id}`, update);
    }

    const remove = async (collection, query = { _id: { $exists: true } }) => {
        return deleteRequest(`/${collection}/*${buildQueryString({ filter: query })}`);
    }

    const removeById = async (collection, id) => {
        return deleteRequest(`/${collection}/${id}`);
    }

    return {
        find,
        findOne,
        findById,
        create,
        update,
        updateById,
        remove,
        removeById
    }
}

module.exports = RestHeartSDKFactory;