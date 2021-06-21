import request from 'supertest';
import server from '../index';

test('GET: /v1/cars/:id works', async done => {
    return request(server).get('/v1/cars/JHk290Xj')
        .then(response => {
            expect(response.status).toBe(200);
            expect(response.text).toMatchSnapshot();
            expect(response.body.id).toBe('JHk290Xj');
            done();
        })
        .catch(err => done(err))
});

test('GET: /v1/cars works', async done => {
    return request(server).get('/v1/cars')
        .then(response => {
            expect(response.status).toBe(200);
            expect(response.text).toMatchSnapshot();
            expect(response.body.length).toBe(4);
            done();
        })
        .catch(err => done(err));
});

test('GET: v1/cars?make=Toyota&model=Rav4 works', async done => {
    return request(server).get('/v1/cars?make=Toyota&model=Rav4')
        .then(response => {
            expect(response.status).toBe(200);
            expect(response.body.length).toBe(1);
            expect(response.text).toMatchSnapshot();
            done();
        })
        .catch(err => done(err));
});

test('GET: v1/cars?make=Toyota&model=Rav4?mileage_lt=9000 should not return results', async done => {
    return request(server).get('/v1/cars?make=Toyota&model=Rav4&mileage_lt=9000')
        .then(response => {
            expect(response.status).toBe(404);
            expect(response.body.length).toBe(0);
            done();
        })
        .catch(err => done(err));
});
