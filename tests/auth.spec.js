import app from '../server.js';
import request from 'supertest';

describe('Authentication API', () => {

  it('Register, login, and delete the user', async () => {
    
    const registerResponse = await request(app).post('/api/users/register').send({
      username: 'UserPruebaUnit',
      password: 'securepassword123',
      role: 'admin',
    });
    expect(registerResponse.status).toBe(201);

    const loginResponse = await request(app).post('/api/users/login').send({
      username: 'UserPruebaUnit',
      password: 'securepassword123',
    });
    expect(loginResponse.status).toBe(200);
    expect(loginResponse.body).toHaveProperty('data.token');

    const token = loginResponse.body.data.token;
    const deleteResponse = await request(app)
      .delete('/api/users/delete')
      .set('Authorization', `Bearer ${token}`)
      .send({
        username: 'UserPruebaUnit',
      });
    expect(deleteResponse.status).toBe(200);
    expect(deleteResponse.body).toHaveProperty('status', true);
  });
});
