import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '1m', target: 100 },
  ],
  thresholds: {
    'http_req_duration': ['p(99)<1500'],
  },
};

const BASE_URL = 'https://play-api-staging.mineraland.io/api/v1/';

const authHeaders = {
  headers: {
    Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjI3LCJpYXQiOjE2NTQwMjYzMDAsImV4cCI6MTY1NDYyNjMwMH0.Ov9SPAm_vc1hzD1W6IJ4VOkvt7I2qp3w1X3MHzaq3Bw`,
    'Content-Type': 'application/json',
  },
};

export default () => {

  const getDiggers = http.get(BASE_URL + 'digger/user-diggers', authHeaders);

  const actionBegin = JSON.stringify({
    "action": [
      {
        "diggerId": "629",
        "blockId": "754368c2-6883-4e4e-8ae8-34ffa73cd24c"
      }
    ]
  })

  const actionFinish = JSON.stringify({
    "action": [
      {
        "diggerId": "629",
        "blockId": "754368c2-6883-4e4e-8ae8-34ffa73cd24c"
      }
    ]
  })

  const diggerActionBegin = http.post(BASE_URL + 'digger/digger-action-begin', actionBegin, authHeaders);

  check(diggerActionBegin, { 'Action Begin 2xx': (obj) => obj.status >= 200 && obj.status < 300 });
  check(diggerActionBegin, { 'Action Begin 3xx': (obj) => obj.status >= 300 && obj.status < 400 });
  check(diggerActionBegin, { 'Action Begin 4xx': (obj) => obj.status >= 400 && obj.status < 500 });
  check(diggerActionBegin, { 'Action Begin 5xx': (obj) => obj.status >= 500 && obj.status < 600 });

  const diggerActionFinish = http.post(BASE_URL + 'digger/digger-action-finish', actionFinish, authHeaders);

  check(diggerActionFinish, { 'Action Finish 2xx': (obj) => obj.status >= 200 && obj.status < 300 });
  check(diggerActionFinish, { 'Action Finish 3xx': (obj) => obj.status >= 300 && obj.status < 400 });
  check(diggerActionFinish, { 'Action Finish 4xx': (obj) => obj.status >= 400 && obj.status < 500 });
  check(diggerActionFinish, { 'Action Finish 5xx': (obj) => obj.status >= 500 && obj.status < 600 });

  sleep(1);
};