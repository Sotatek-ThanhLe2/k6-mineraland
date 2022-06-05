import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '10m', target: 10000 },
  ],
  thresholds: {
    'http_req_duration': ['p(99)<1500'],
  },
};

const BASE_URL = 'http://play-api.mineraland.io/api/v1/';


const authHeaders = {
  headers: {
    Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjI3LCJpYXQiOjE2NTQwMjYzMDAsImV4cCI6MTY1NDYyNjMwMH0.Ov9SPAm_vc1hzD1W6IJ4VOkvt7I2qp3w1X3MHzaq3Bw`,
    'Content-Type': 'application/json',
  },
};

export default () => {

  const loadTest = http.get(BASE_URL + 'health/load-test?secret=secret-load-test-key');

  check(loadTest, { 'loadTest 2xx': (obj) => obj.status >= 200 && obj.status < 300 });
  check(loadTest, { 'loadTest 3xx': (obj) => obj.status >= 300 && obj.status < 400 });
  check(loadTest, { 'loadTest 4xx': (obj) => obj.status >= 400 && obj.status < 500 });
  check(loadTest, { 'loadTest 5xx': (obj) => obj.status >= 500 && obj.status < 600 });

  sleep(1);
};