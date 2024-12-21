import employeeRepository from '../repositories/employee-repository.js';
import { validateEmployee } from '../utils/validations/employee-validation.js';

class EmployeeService {
  async getAllEmployees({ limit, page, filters }) {
    if (limit < 1 || page < 1) {
      throw new Error('Limit and page must be positive integers');
    }

    return await employeeRepository.getAll({ limit, page, filters });
  }

  async getEmployeeById(id) {
    const employee = await employeeRepository.getById(id);
    if (!employee) {
      throw new Error(`Employee with ID ${id} not found`);
    }
    return employee;
  }

  async createEmployee(employeeData) {
    validateEmployee(employeeData);
    return await employeeRepository.create(employeeData);
  }

  async updateEmployee(id, employeeData) {
    const existingEmployee = await employeeRepository.getById(id);
    if (!existingEmployee) {
      throw new Error(`Employee with ID ${id} not found`);
    }

    validateEmployee(employeeData);
    return await employeeRepository.update(id, employeeData);
  }

  async deleteEmployee(id) {
    const existingEmployee = await employeeRepository.getById(id);
    if (!existingEmployee) {
      throw new Error(`Employee with ID ${id} not found`);
    }

    await employeeRepository.delete(id);
  }
}

export default new EmployeeService();
