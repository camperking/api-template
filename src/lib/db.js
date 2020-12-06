import mongodb from 'mongodb';
const { MongoClient } = mongodb;

export let db;      // import this to access database

export function dbInit() {
    const { DB_URL, DB_NAME, DB_USERNAME, DB_PASSWORD } = process.env;
    const url = `mongodb://${DB_USERNAME}:${DB_PASSWORD}@${DB_URL}/${DB_NAME}`;

    const dbClient = new MongoClient(url, {useUnifiedTopology: true});

    return new Promise((resolve, reject) => {
        dbClient.connect(err => {
            if (err) reject(err);
            db = dbClient.db(DB_NAME);
            if (process.env.TESTING === 'true') dropCollections(resolve);
            resolve();
        })
    });
}

export async function dropCollections() {
    const dbCollections = await db.listCollections().toArray();
    
    dbCollections.forEach(item => {
            db.collection(item).drop();
    });
}
