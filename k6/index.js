import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
  scenarios: {
    constant_vu_scenario: {
        vus: 2,
        duration: '20s',
        executor: 'constant-vus',
    },
    ramping_vu_scenario: {
        executor: 'ramping-vus',
        stages: [
            { duration: '20s', target: 10 },
            { duration: '10s', target: 0 },
        ],
    },
    constant_arrival_scenario: {
        preAllocatedVUs: 2,
        maxVUs: 10,
        rate: 30,
        duration: '20s',
        executor: 'constant-arrival-rate',
    },
  },
};
export default function () {
  http.get('http://127.0.0.1:3000/');
  sleep(Math.random() * 5);
}