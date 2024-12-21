import app from '../server.js';
import request from 'supertest';

describe('Employee API', () => {
  let token; 
  let createdEmployeeId;

  beforeAll(async () => {
    const loginResponse = await request(app).post('/api/users/login').send({
      username: 'admin1',
      password: 'securepassword123',
    });

    token = loginResponse.body.data.token;
  });

  it('Create a new employee', async () => {
    const employeeData = {
      name: 'John Doe',
      hire_date: '2023-01-01',
      salary: 5000,
    };

    const response = await request(app)
      .post('/api/employees/create-employee')
      .set('Authorization', `Bearer ${token}`)
      .send(employeeData);

    expect(response.status).toBe(201);
    expect(response.body.data[0]).toHaveProperty('name', employeeData.name);

    createdEmployeeId = response.body.data[0].id; 
  });

  it('Get all employees', async () => {
    const response = await request(app)
      .get('/api/employees/get-employees')
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('data');
    expect(response.body.data).toBeInstanceOf(Array);
  });

  it('Get a single employee by ID', async () => {
    const response = await request(app)
      .get(`/api/employees/get-employee/${createdEmployeeId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body.data).toHaveProperty('id', createdEmployeeId);
  });

  it('Update an employee', async () => {
    const updatedData = {
      name: 'Dev',
      hire_date: '2024-01-01',
      salary: 3000,
    };

    const response = await request(app)
      .put(`/api/employees/update-employee/${createdEmployeeId}`)
      .set('Authorization', `Bearer ${token}`)
      .send(updatedData);

    expect(response.status).toBe(200);
    expect(response.body.data[0]).toHaveProperty('name', updatedData.name);
  });

  it('Delete an employee', async () => {
    const response = await request(app)
      .delete(`/api/employees/delete-employee/${createdEmployeeId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('status', true);
  });
});
