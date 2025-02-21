import employeeRepository from '../repositories/employee-repository.js';
import { validateEmployee } from '../validations/employee-validation.js';

/**
 * Service class for handling employee-related business logic.
 * @class EmployeeService
 */
class EmployeeService {
  /**
   * Retrieves all employees with pagination and filters.
   * @param {Object} options - Query options.
   * @param {number} options.limit - Number of employees per page.
   * @param {number} options.page - Page number.
   * @param {Object} options.filters - Filtering options.
   * @returns {Promise<Object>} Paginated list of employees.
   * @throws {Error} If limit or page is less than 1.
   */
  async getAllEmployees({ limit, page, filters }) {
    if (limit < 1 || page < 1) {
      throw new Error('Limit and page must be positive integers');
    }
    return await employeeRepository.getAll({ limit, page, filters });
  }

  /**
   * Retrieves an employee by ID.
   * @param {number} id - Employee ID.
   * @returns {Promise<Object>} Employee data.
   * @throws {Error} If the employee is not found.
   */
  async getEmployeeById(id) {
    const employee = await employeeRepository.getById(id);
    if (!employee) {
      throw new Error(`Employee with ID ${id} not found`);
    }
    return employee;
  }

  /**
   * Creates a new employee.
   * @param {Object} employeeData - Employee details.
   * @returns {Promise<Object>} Created employee data.
   * @throws {Error} If validation fails.
   */
  async createEmployee(employeeData) {
    validateEmployee(employeeData);
    return await employeeRepository.create(employeeData);
  }

  /**
   * Updates an existing employee.
   * @param {number} id - Employee ID.
   * @param {Object} employeeData - Updated employee details.
   * @returns {Promise<Object>} Updated employee data.
   * @throws {Error} If the employee does not exist or validation fails.
   */
  async updateEmployee(id, employeeData) {
    const existingEmployee = await employeeRepository.getById(id);
    if (!existingEmployee) {
      throw new Error(`Employee with ID ${id} not found`);
    }
    validateEmployee(employeeData);
    return await employeeRepository.update(id, employeeData);
  }

  /**
   * Deletes an employee by ID.
   * @param {number} id - Employee ID.
   * @returns {Promise<void>} Resolves when the deletion is complete.
   * @throws {Error} If the employee does not exist.
   */
  async deleteEmployee(id) {
    const existingEmployee = await employeeRepository.getById(id);
    if (!existingEmployee) {
      throw new Error(`Employee with ID ${id} not found`);
    }
    await employeeRepository.delete(id);
  }
}

export default new EmployeeService();
