import chai from 'chai';
import { dbInit, dbClose, dropCollections } from '../src/lib/db.js';
import { get, put, post, del } from './util/index.js';

const { expect } = chai;

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

    it('should insert a document and return its id', async () => {
        const doc = { name: 'teapot' };

        const { status, json } = await post('/test', doc);

        expect(status).to.equal(201);
        expect(json.sessionId).to.exist();
    });

});