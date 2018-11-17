const request = require('supertest');
const app = require('./app')
describe('Test the aqi path', () => {
    test('It should response the GET method', (done) => {
        request(app).get('/aqi').then((response) => {
            expect(response.statusCode).toBe(200);
            done();
        });
    });
});
describe('Test the aqi value', () => {
    test('It should response the value', (done) => {
        request(app).get('/aqi').then((response) => {
            expect(response.body.aqi).toBe('209');
            done();
        });
    });
});