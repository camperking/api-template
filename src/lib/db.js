import mongodb from 'mongodb';
const { MongoClient } = mongodb;

export let db;      // import this to access database

let dbClient;

export function dbInit() {
    const { DB_URL, DB_NAME, DB_USERNAME, DB_PASSWORD } = process.env;
    const url = `mongodb://${DB_USERNAME}:${DB_PASSWORD}@${DB_URL}/${DB_NAME}`;

    dbClient = new MongoClient(url, {useUnifiedTopology: true});

    return new Promise((resolve, reject) => {
        dbClient.connect(err => {
            if (err) reject(err);
            db = dbClient.db(DB_NAME);
            resolve();
        })
    });
}

export async function dbClose() {
    await dbClient.close();
}

export async function dropCollections() {
    const dbCollections = await db.listCollections().toArray();
    
    const drop = dbCollections.map(item => {
        return db.collection(item.name).drop();
    });

    await Promise.all(drop);
}

