import server from "../start";
import supertest from 'supertest';


const request = supertest(server);

afterEach(() => server.close());

test('GET: /v1/cars/:id returns 1 result with id JHk290Xj', async done => {
    const response = await request.get('/v1/cars/JHk290Xj')
    console.log('response body: ', response.body);
    expect(response.status).toBe(200);
    expect(response.text).toMatchSnapshot();
    expect(response.body.id).toBe('JHk290Xj');
    done();
});

test('GET: /v1/cars returns 4 results', done => {
    request.get('/v1/cars')
        .then(response => {
            expect(response.status).toBe(200);
            expect(response.text).toMatchSnapshot();
            expect(response.body.length).toBe(4);
            done();
        })
        .catch(err => done(err));
});

test('GET: v1/cars?make=Toyota&model=Rav4 return 1 result', done => {
    request.get('/v1/cars?make=Toyota&model=Rav4')
        .then(response => {
            expect(response.status).toBe(200);
            expect(response.body.length).toBe(1);
            expect(response.text).toMatchSnapshot();
            done();
        })
        .catch(err => done(err));
});

test('GET: v1/cars?make=Toyota&model=Rav4?mileage_lt=9000 should not return results', done => {
    request.get('/v1/cars?make=Toyota&model=Rav4&mileage_lt=9000')
        .then(response => {
            expect(response.status).toBe(404);
            expect(response.body.length).toBe(0);
            done();
        })
        .catch(err => done(err));
});

test('GET: v1/cars?year=2019 should return 1 result with id fWI37la', done => {
    request.get('/v1/cars?year=2019')
        .then(response => {
            expect(response.status).toBe(200);
            expect(response.body.length).toBe(1);
            expect(response.text).toMatchSnapshot();
            expect(response.body[0].id).toBe('fWI37la');
            done();
        })
        .catch(err => done(err));
});
