#### RestHEART NodeJS SDK Wrapper

### Usage

```
yarn add 
const getDBClient = require('../src');

const DBClient = getDBClient(process.env.RESTHEART_URL, process.env.DB_USERNAME, process.env.DB_PASSWORD);

await DBClient.create(collection, data);
await DBClient.remove(collection, query);
await DBClient.removeById(collection, id);
await DBClient.update(collection, query, data);
await DBClient.updateById(collection, id, data);
await DBClient.find(collection, query);
await DBClient.findOne(collection, query);
await DBClient.findById(collection, id);
```

> To run tests fill in the env vars in `.env`