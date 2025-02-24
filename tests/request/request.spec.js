import app from '../../src/server.js';
import request from 'supertest';

describe('Request API', () => {
  let token;
  let createdRequestId;
  let createdEmployeeId;

  const createEmployee = async () => {
    const employeeData = {
      name: 'Devisson',
      hire_date: '2025-02-01',
      salary: 5000,
    };

    const res = await request(app)
      .post('/api/employees/')
      .set('Authorization', `Bearer ${token}`)
      .send(employeeData);

    return res.body.data[0].id;
  };

  const registerAndLoginUser = async () => {
    await request(app).post('/api/users/register').send({
      username: 'userCreatedForTesting',
      password: 'securepassword123',
      role: 'admin',
    });

    const loginResponse = await request(app).post('/api/users/login').send({
      username: 'userCreatedForTesting',
      password: 'securepassword123',
    });

    return loginResponse.body.data.token;
  };

  beforeAll(async () => {
    token = await registerAndLoginUser();
    createdEmployeeId = await createEmployee();
  });

  afterAll(async () => {
    await request(app)
      .delete(`/api/users/`)
      .set('Authorization', `Bearer ${token}`)
      .send({ username: 'userCreatedForTesting' });
  });

  it('should create a new request', async () => {
    const requestData = {
      code: 'REQ001',
      description: 'First request description',
      summary: 'Summary of the first request',
      employee_id: createdEmployeeId,
    };

    const response = await request(app)
      .post('/api/requests/')
      .set('Authorization', `Bearer ${token}`)
      .send(requestData);

    expect(response.status).toBe(201);
    expect(response.body.data[0]).toHaveProperty('code', requestData.code);
    createdRequestId = response.body.data[0].id;
  });

  it('should get all requests', async () => {
    const response = await request(app)
      .get('/api/requests')
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('data');
    expect(Array.isArray(response.body.data)).toBe(true);
  });

  it('should get a single request by ID', async () => {
    const response = await request(app)
      .get(`/api/requests/${createdRequestId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body.data).toHaveProperty('id', createdRequestId);
  });

  it('should update a request', async () => {
    const updatedData = {
      code: 'REQ001',
      description: 'Edit request description',
      summary: 'Summary of the first request',
      employee_id: createdEmployeeId,
    };

    const response = await request(app)
      .patch(`/api/requests/${createdRequestId}`)
      .set('Authorization', `Bearer ${token}`)
      .send(updatedData);

    expect(response.status).toBe(200);
    expect(response.body.data[0]).toHaveProperty(
      'description',
      updatedData.description,
    );
  });

  it('should delete a request', async () => {
    const response = await request(app)
      .delete(`/api/requests/${createdRequestId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('status', true);
  });
});
