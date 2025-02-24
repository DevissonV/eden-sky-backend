import app from '../../src/server.js';
import request from 'supertest';

describe('Employee API', () => {
  let token;
  let createdEmployeeId;

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
  });

  afterAll(async () => {
    await request(app)
      .delete('/api/users/')
      .set('Authorization', `Bearer ${token}`)
      .send({ username: 'userCreatedForTesting' });
  });

  it('should create a new employee', async () => {
    const employeeData = {
      name: 'Devisson',
      hire_date: '2025-02-01',
      salary: 5000,
    };

    const response = await request(app)
      .post('/api/employees/')
      .set('Authorization', `Bearer ${token}`)
      .send(employeeData);

    expect(response.status).toBe(201);
    expect(response.body.data[0]).toHaveProperty('name', employeeData.name);
    createdEmployeeId = response.body.data[0].id;
  });

  it('should get all employees', async () => {
    const response = await request(app)
      .get('/api/employees/')
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('data');
    expect(Array.isArray(response.body.data)).toBe(true);
  });

  it('should get a single employee by ID', async () => {
    const response = await request(app)
      .get(`/api/employees/${createdEmployeeId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body.data).toHaveProperty('id', createdEmployeeId);
  });

  it('should update an employee', async () => {
    const updatedData = {
      name: 'Dev',
      hire_date: '2025-03-01',
      salary: 3000,
    };

    const response = await request(app)
      .patch(`/api/employees/${createdEmployeeId}`)
      .set('Authorization', `Bearer ${token}`)
      .send(updatedData);

    expect(response.status).toBe(200);
    expect(response.body.data[0]).toHaveProperty('name', updatedData.name);
  });

  it('should delete an employee', async () => {
    const response = await request(app)
      .delete(`/api/employees/${createdEmployeeId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('status', true);
  });
});
