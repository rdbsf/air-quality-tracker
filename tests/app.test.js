const request = require('supertest');
const app = require('../app')
describe('Test the aqi path', () => {
    test('It should response the GET method', (done) => {
        request(app).get('/aqi').then((response) => {
            expect(response.statusCode).toBe(200);
            done();
        });
    });
});
