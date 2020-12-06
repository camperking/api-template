import request from 'supertest';

process.env.TESTING = 'true';
process.env.DB_URL = 'localhost:27017';
process.env.DB_NAME = 'testing';
process.env.DB_USERNAME = 'test';
process.env.DB_PASSWORD = 'test';

import app from '../../src/app.js';

export async function get(route) {
    const res = await request(app.handler)
        .get(route);

    return parse(res);
}

export async function put(route, body) {
    const res = await request(app.handler)
        .put(route)
        .send(body)
        .set('Content-Type', 'application/json');

    return parse(res);
}

export async function post(route, body) {
    const res = await request(app.handler)
        .post(route)
        .send(body)
        .set('Content-Type', 'application/json');

    return parse(res);
}

export async function del(route) {
    const res = await request(app.handler)
        .delete(route)
        .send(body)
        .set('Content-Type', 'application/json');

    return parse(res);
}

function parse(res) {
    try {
        res.json = JSON.parse(res.text);
    } catch {
        res.json = {};
    }

    return {
        json: res.json, 
        text: res.text,
        status: res.statusCode,
        res
    };
}