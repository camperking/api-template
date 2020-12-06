import expect from 'expect.js';
import { dbInit, dropCollections } from '../src/lib/db.js';
import { get, put, post, del } from './util/index.js';


before(async () => {
    await dbInit();
});

after(async () => {
    await dropCollections();
});

describe('/test GET', () => {

    it('It should return 418 and I\'m a teapot', async () => {
        const { text, status } = await get('/test');

        expect(status).to.be(418);
        expect(text).to.be('I\'m a teapot');
    });

});