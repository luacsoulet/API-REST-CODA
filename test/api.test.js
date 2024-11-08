import { expect, test } from 'vitest';
import got from 'got';

const client = got.extend({
  prefixUrl: 'http://localhost:3001/',
  responseType: 'json',
  throwHttpErrors: false,
});

// test('[VALID] POST /signup', async () => {
//   const res = await client.post('signup', { 
//     json: { 
//       email: 'test@test.com', 
//       username: 'test', 
//       password: 'test' 
//     },
//     responseType: 'json',
//   });
//   const data = res.body;
//   expect(res.statusCode).toBe(200);
//   expect(data).toHaveProperty('id');
//   expect(data.email).toBe('test@test.com');
//   expect(data.username).toBe('test');
//   expect(data).to.not.have.property('password');
// });

test('[VALID] POST /login', async () => {
  const res = await client.post('login', { 
    json: { 
      email: 'test@test.com', 
      password: 'test' 
    },
    responseType: 'json',
  });
  const data = res.body;
  expect(res.statusCode).toBe(200);
  expect(data).toHaveProperty('id');
  expect(data.email).toBe('test@test.com');
  expect(data.username).toBe('test');
  expect(data).to.not.have.property('password');
});

test('[VALID] POST /posts', async () => {
  const res = await client.post('login', { 
    json: { 
      email: 'test@test.com', 
      password: 'test' 
    },
    responseType: 'json',
  });
  const token = res.body.token;

  const res2 = await client.post('posts', { 
    json: { 
      title: 'Title test unitaire', 
      content: 'Content test unitaire'
    },
    headers: {
      Authorization: `Bearer ${token}`
    },
    responseType: 'json',
  });
  const data = res2.body;
  expect(res2.statusCode).toBe(200);
  expect(data).toHaveProperty('id');
  expect(data.title).toBe('Title test unitaire');
});

test('[VALID] DELETE /posts', async () => {
  const res = await client.post('login', { 
    json: { 
      email: 'test@test.com', 
      password: 'test' 
    },
    responseType: 'json',
  });
  const token = res.body.token;

  const res3 = await client.delete('posts/4', { 
    headers: {
      Authorization: `Bearer ${token}`
    },
    responseType: 'json',
  });
  const data3 = res3.body;
  expect(res3.statusCode).toBe(200);
  expect(data3).toHaveProperty('id');
  expect(data3).toHaveProperty('title');
  expect(data3.title).toBe('Title test unitaire');
});