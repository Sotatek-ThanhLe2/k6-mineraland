import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '1s', target: 100 },
  ],
  thresholds: {
    'http_req_duration': ['p(99)<1500'],
  },
};

const BASE_URL = 'http://127.0.0.1:3023/api/v1/';

const authHeaders = {
  headers: {
    Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjI3LCJpYXQiOjE2NTQ1MDQ1NDMsImV4cCI6MTY1ODEwNDU0M30.OM_shJPb7UUuTi3Jtbnw4UKnw1nDO4LQZBlpCy1Uzno`,
    'Content-Type': 'application/json',
  },
};

export default () => {

  const getDiggers = http.get(BASE_URL + 'digger/user-diggers', authHeaders);

  const actionBegin = JSON.stringify({
    "action": [
      {
        "diggerId": 54,
        "blockId": "ea04d226-0be7-4e9f-a2fa-8f0dbdd5fd7a"
      }
    ]
  })
  
  
  const actionFinish = JSON.stringify({
    "action": [
      {
        "diggerId": 54,
        "blockId": "ea04d226-0be7-4e9f-a2fa-8f0dbdd5fd7a"
      }
    ]
  })

  check(getDiggers, { 'Get Diggers 2xx': (obj) => obj.status >= 200 && obj.status < 300 });
  check(getDiggers, { 'Get Diggers 3xx': (obj) => obj.status >= 300 && obj.status < 400 });
  check(getDiggers, { 'Get Diggers 4xx': (obj) => obj.status >= 400 && obj.status < 500 });
  check(getDiggers, { 'Get Diggers 5xx': (obj) => obj.status >= 500 && obj.status < 600 });

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