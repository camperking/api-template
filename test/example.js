import chai from 'chai';
import mongo from 'mongodb';
import { dbInit, dbClose, dropCollections, db } from '../src/lib/db.js';
import { get, put, post, del } from './util/index.js';

const { expect } = chai;
const { ObjectID } = mongo;

before(async () => {
    await dbInit();
});

after(async () => {
    await dropCollections();
    await dbClose();
});

describe('/test GET', () => {

    it('should return 418 and I\'m a teapot', async () => {
        const { text, status } = await get('/test');

        expect(status).to.equal(418);
        expect(text).to.equal('I\'m a teapot');
    });

});

describe('/test POST', () => {
    let users;

    before(() => {
        users = db.collection('test');
    });

    it('should insert a document and return its id', async () => {

        const doc = { name: 'teapot' };

        const { status, json } = await post('/test', doc);

        expect(status).to.equal(201);
        expect(typeof json.id).to.equal('string');
        
        const _id = new ObjectID(json.id);        
        const user = await users.findOne({_id});

        expect(user.name).to.equal(doc.name);
    });


});
