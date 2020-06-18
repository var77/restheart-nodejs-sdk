require('dotenv').config();
const { assert } = require('chai');

const getDBClient = require('../src');

const DBClient = getDBClient(process.env.RESTHEART_URL, process.env.DB_USERNAME, process.env.DB_PASSWORD);
const testCollection = 'restheart_sdk_test';

const testObj = { name: 'Test obj', description: 'Test description' };

afterEach(async () => {
    await DBClient.remove(testCollection);
});

describe('RESTHart SDK Tests', () => {
    it ('should create an object in test DB', async () => {
        const dbObject = await DBClient.create(testCollection, { ...testObj, _id: 'testId' });
        const readDbObject = await DBClient.findById(testCollection, 'testId');

        assert.equal(readDbObject.name, testObj.name);
        assert.equal(readDbObject.description, testObj.description);
    });

    it ('should get the created object by name', async () => {
        await DBClient.create(testCollection, { ...testObj });
        const dbObject = await DBClient.findOne(testCollection, { name: 'Test obj' });
        assert.equal(dbObject.name, testObj.name);
        assert.equal(dbObject.description, testObj.description);
    });

    it ('should update the object\'s name', async () => {
        await DBClient.create(testCollection, { ...testObj });
        await DBClient.update(testCollection, { name: testObj.name }, { name: 'updated' });
        const dbObject = await DBClient.findOne(testCollection, { name: 'updated' });
        assert.equal(dbObject.name, 'updated');
        assert.equal(dbObject.description, testObj.description);
    });

    it ('should update the object\'s name by id', async () => {
        await DBClient.create(testCollection, { ...testObj, _id: 'test2' });
        await DBClient.updateById(testCollection, 'test2', { name: 'updated' });
        const dbObject = await DBClient.findOne(testCollection, { name: 'updated' });
        assert.equal(dbObject.name, 'updated');
        assert.equal(dbObject.description, testObj.description);
    });

    it ('should remove the object name by id', async () => {
        await DBClient.create(testCollection, { ...testObj, _id: 'test2' });
        await DBClient.removeById(testCollection, 'test2');
        const dbObject = await DBClient.findOne(testCollection, { name: 'updated' });
        assert.equal(dbObject, undefined);
    });
})