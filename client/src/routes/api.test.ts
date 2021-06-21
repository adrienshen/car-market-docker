// require('dotenv').config();
import * as request from 'supertest';
import server from '../app';

console.log('Environment: ', process.env.CAR_SERVICE_URL);

// TODO: improvement: mock the car-service since it's already tested in the micro-service code
jest.setTimeout(15000)

test('GET: /v1/cars/:id returns correct data', () => {
  return request(server).get('/api/v1/cars/JHk290Xj')
    .then(response => {
      expect(response.status).toBe(200);
      expect(response.text).toMatchSnapshot();
      expect(response.body.car.id).toBe('JHk290Xj');
      expect(response.body.message).toBe('2010 Ford F10 with 120123 miles available for $19,999.00 listed since Sun Jun 20 2021 13:58:46 GMT-0500 (Central Daylight Time)');
    })
});

test('GET: /v1/cars?make=Toyota returns correct data', () => {
  return request(server).get('/api/v1/cars?make=Toyota').then(response => {
    // console.log('response: ', response.body);
    expect(response.status).toBe(200);
    expect(response.body.results.length).toBe(2);
    expect(response.text).toMatchSnapshot();
  })
});

test('GET: /v1/cars?year=2018&mileage_gt=24000 returns correct data', () => {
  return request(server).get('/api/v1/cars?year=2018&mileage_gt=24000').then(response => {
    console.log('3. response: ', response.body);
    expect(response.status).toBe(200);
    expect(response.body.results.length).toBe(1);
    expect(response.text).toMatchSnapshot();
    expect(response.body.results[0].id).toBe('1i3xjRllc');
  })
});
