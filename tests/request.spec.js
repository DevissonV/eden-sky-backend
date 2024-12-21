import app from '../server.js';
import request from 'supertest';

describe('Request API', () => {
  let token; 
  let createdRequestId;
  let employeeId = 2;

  beforeAll(async () => {
    const loginResponse = await request(app).post('/api/users/login').send({
      username: 'admin1',
      password: 'securepassword123',
    });
    token = loginResponse.body.data.token;
  });

  it('Create a new request', async () => {
    const requestData = {
      code: 'REQ001',
      description: 'First request description',
      summary: 'Summary of the first request',
      employee_id: employeeId,
    };

    const response = await request(app)
      .post('/api/requests/create-request')
      .set('Authorization', `Bearer ${token}`)
      .send(requestData);

    expect(response.status).toBe(201);
    expect(response.body.data[0]).toHaveProperty('code', requestData.code);

    createdRequestId = response.body.data[0].id;
  });

  it('Get all requests', async () => {
    const response = await request(app)
      .get('/api/requests/get-requests')
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('data');
    expect(response.body.data).toBeInstanceOf(Array);
  });

  it('Get a single request by ID', async () => {
    const response = await request(app)
      .get(`/api/requests/get-request/${createdRequestId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body.data).toHaveProperty('id', createdRequestId);
  });

  it('Update a request', async () => {
    const updatedData = {
      code: 'REQ001',
      description: 'edit request description',
      summary: 'Summary of the first request',
      employee_id: employeeId,
    };

    const response = await request(app)
      .put(`/api/requests/update-request/${createdRequestId}`)
      .set('Authorization', `Bearer ${token}`)
      .send(updatedData);

    expect(response.status).toBe(200);
    expect(response.body.data[0]).toHaveProperty('description', updatedData.description);
  });

  it('Delete a request', async () => {
    const response = await request(app)
      .delete(`/api/requests/delete-request/${createdRequestId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('status', true);
  });
});
