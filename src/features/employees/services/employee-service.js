import GenericCriteria from '../../../core/filters/criteria/generic-criteria.js';
import employeeRepository from '../repositories/employee-repository.js';
import { validateEmployee } from '../validations/employee-validation.js';
import { AppError } from '../../../core/utils/response/error-handler.js';
import { getLogger } from '../../../core/utils/logger/logger.js';

/**
 * Service class for handling employee-related business logic.
 * @class EmployeeService
 */
class EmployeeService {
  /**
   * Retrieves all employees.
   * @param {Object} params - Query parameters.
   * @returns {Promise<Object[]>} List of employees.
   */
  async getAll(params) {
    try {
      const criteria = new GenericCriteria(params, {
        name: { column: 'name', operator: 'like' },
        minSalary: { column: 'salary', operator: '>=' },
        hireDate: { column: 'hire_date', operator: '=' },
      });
      return await employeeRepository.getAll(criteria);
    } catch (error) {
      getLogger().error(`Error getAll employees: ${error.message}`);
      throw new AppError('Database error while retrieving employees', 500);
    }
  }

  /**
   * Retrieves an employee by ID.
   * @param {number} id - Employee ID.
   * @returns {Promise<Object>} Employee data.
   */
  async getById(id) {
    try {
      const employee = await employeeRepository.getById(id);
      if (!employee)
        throw new AppError(`Employee with ID ${id} not found`, 404);
      return employee;
    } catch (error) {
      getLogger().error(`Error getById employee: ${error.message}`);
      throw new AppError(
        error.message || 'Database error while retrieving employee',
        error.statusCode || 500,
      );
    }
  }

  /**
   * Creates a new employee.
   * @param {Object} data - Employee details.
   * @returns {Promise<Object>} Created employee data.
   */
  async create(data) {
    try {
      validateEmployee(data);
      return await employeeRepository.create(data);
    } catch (error) {
      getLogger().error(`Error create employee: ${error.message}`);
      throw new AppError(
        error.message || 'Database error while creating employee',
        error.statusCode || 500,
      );
    }
  }

  /**
   * Updates an existing employee.
   * @param {number} id - Employee ID.
   * @param {Object} data - Updated employee details.
   * @returns {Promise<Object>} Updated employee data.
   */
  async update(id, data) {
    try {
      const employee = await this.getById(id);
      validateEmployee(data);
      return await employeeRepository.update(employee.id, data);
    } catch (error) {
      getLogger().error(`Error update employee: ${error.message}`);
      throw new AppError(
        error.message || 'Database error while updating employee',
        error.statusCode || 500,
      );
    }
  }

  /**
   * Deletes an employee by ID.
   * @param {number} id - Employee ID.
   * @returns {Promise<void>} Resolves when the deletion is complete.
   */
  async delete(id) {
    try {
      const employee = await this.getById(id);
      return await employeeRepository.delete(employee.id);
    } catch (error) {
      getLogger().error(`Error delete employee: ${error.message}`);
      throw new AppError(
        error.message || 'Database error while deleting employee',
        error.statusCode || 500,
      );
    }
  }
}

export default new EmployeeService();
